import React, { useState } from "react";

export default function AddProfessionalModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (professional: any) => void;
}) {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone_number: "",
    role_id: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Object.values(data.errors).flat();
        setError(errorMessages.join(", "));
        throw new Error(errorMessages.join(", ") || "Failed to create professional");
      }

      const data = await response.json();
      onAdd(data.data);
      setError("");
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">Add Professional</h1>
          <button onClick={onClose} className="text-[#704214] hover:text-red-600" title="Close">
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
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "username", label: "Username", type: "text" },
            { id: "password", label: "Password", type: "password" },
            { id: "phone_number", label: "Phone Number", type: "tel" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-[#704214]">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
            >
              Add Professional
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
