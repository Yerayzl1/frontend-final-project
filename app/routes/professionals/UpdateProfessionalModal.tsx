import React, { useState } from "react";

export default function UpdateProfessionalModal({
  isOpen,
  onClose,
  professional,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  professional: any;
  onUpdate: (updatedProfessional: any) => void;
}) {
  const [formData, setFormData] = useState(professional);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${professional.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update professional");
      }

      const updatedProfessional = await response.json();
      onUpdate(updatedProfessional);
      onClose();
    } catch (error) {
      console.error("Error updating professional:", error);
    }
  };

  if (!isOpen || !professional) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">Update Professional</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

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
                value={formData[id] || ""}
                onChange={handleChange}
                required={id !== "password"}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
