
export default function Profile() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Client",
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
              src={`/img/profile_image/${user.name.toLowerCase().replace(" ", "-")}.webp`}
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
            <p className="text-lg text-gray-700">{user.role}</p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form method="post" className="space-y-4">
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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#704214]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a new password"
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
