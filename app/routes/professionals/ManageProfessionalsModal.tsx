import React, { useState } from "react";

export default function ManageProfessionalsModal({
  isOpen,
  onClose,
  professionals,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  professionals: { id: number; name: string; email: string; phone: string }[];
  onUpdate: (updatedProfessional: any) => void;
}) {
  const [editingProfessional, setEditingProfessional] = useState(null);

  const handleEdit = (professional: any) => {
    setEditingProfessional(professional);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProfessional) {
      onUpdate(editingProfessional);
      setEditingProfessional(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditingProfessional((prev: any) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">Manage Professionals</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {editingProfessional ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#704214]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingProfessional.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#704214]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editingProfessional.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#704214]"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editingProfessional.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <ul className="space-y-4">
            {professionals.slice(0, 5).map((professional) => (
              <li
                key={professional.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <div>
                  <p className="text-lg font-bold text-[#704214]">
                    {professional.name}
                  </p>
                  <p className="text-sm text-gray-600">{professional.email}</p>
                  <p className="text-sm text-gray-600">{professional.phone}</p>
                </div>
                <button
                  onClick={() => handleEdit(professional)}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
