import { useState } from 'react';

export default function NewClientModal({ isOpen, onClose }) {
  const [error, setError] = useState("");
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const clientData = {
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      phone_number: formData.get("phone_number"),
      role_id: 3,
      is_active: formData.get("is_active") === "on" ? true : false,
      remember_token: null,
    };

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Object.values(data.errors).flat();
        setError(errorMessages.join(", "));
        throw new Error(errorMessages.join(", ") || "Failed to create client");
      }

      await response.json();
      setError("");
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">New Client</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#704214]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#704214]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#704214]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#704214]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-[#704214]">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Is Active */}
          <div>
            <label htmlFor="is_active" className="inline-flex items-center text-sm font-medium text-[#704214]">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                className="mr-2 rounded border-gray-300 focus:ring-[#704214]"
              />
              Active
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
