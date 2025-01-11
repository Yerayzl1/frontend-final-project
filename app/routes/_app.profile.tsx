import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import fs from "fs";
import path from "path";

export async function loader() {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const user = await response.json();
    return { user };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Response("Failed to fetch user data.", { status: 401 });
  }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const file = formData.get("profile_image") as File;

  if (!file || !file.name.endsWith(".webp")) {
    return new Response("Only .webp files are allowed.", { status: 400 });
  }

  const userName = formData.get("name") as string;
  const fileName = `${userName.toLowerCase().replace(/ /g, "-")}.webp`;
  const publicPath = path.join(process.cwd(), "public/img/profile_image");
  const filePath = path.join(publicPath, fileName);

  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  const writeStream = fs.createWriteStream(filePath);
  const fileStream = file.stream();

  const reader = fileStream.getReader();
  const writer = writeStream;

  async function pump() {
    const { done, value } = await reader.read();
    if (done) {
      writer.end();
      return;
    }
    writer.write(Buffer.from(value));
    await pump();
  }

  try {
    await pump();
    console.log("File uploaded successfully to:", filePath);
    return new Response("Profile image updated successfully.", { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response("Error uploading file.", { status: 500 });
  }
}

export default function Profile() {
  const { user } = useLoaderData();
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith(".webp")) {
        alert("Only .webp files are allowed.");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#704214] mb-6">My Profile</h1>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={
                profileImage ||
                `/img/profile_image/${user.name.toLowerCase().replace(/ /g, "-")}.webp`
              }
              alt={user.name}
              className="w-36 h-36 rounded-full shadow-md"
            />
          </div>

          {/* User Details */}
          <div>
            <p className="text-sm font-semibold text-[#704214]">Full Name:</p>
            <p className="text-lg text-gray-700 mb-4">{user.name}</p>

            <p className="text-sm font-semibold text-[#704214]">Email:</p>
            <p className="text-lg text-gray-700 mb-4">{user.email}</p>

            <p className="text-sm font-semibold text-[#704214]">Role:</p>
            <p className="text-lg text-gray-700">{user.role.name}</p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form method="post" encType="multipart/form-data" className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#704214]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#704214]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="profile_image" className="block text-sm font-medium text-[#704214]">
              Profile Image (.webp only)
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept=".webp"
              onChange={handleImageChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
