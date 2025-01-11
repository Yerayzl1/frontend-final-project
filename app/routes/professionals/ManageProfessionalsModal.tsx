import React, { useState } from "react";
import UpdateProfessionalModal from "./UpdateProfessionalModal";

export default function ManageProfessionalsModal({
  isOpen,
  onClose,
  professionals,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  professionals: any[];
  onUpdate: (updatedProfessional: any) => void;
}) {
  const [editingProfessional, setEditingProfessional] = useState(null);

  const handleEdit = (professional: any) => {
    setEditingProfessional(professional);
  };

  const closeUpdateModal = () => {
    setEditingProfessional(null);
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

        <ul className="space-y-4">
          {professionals.map((professional) => (
            <li
              key={professional.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="text-lg font-bold text-[#704214]">{professional.name}</p>
                <p className="text-sm text-gray-600">{professional.email}</p>
                <p className="text-sm text-gray-600">{professional.phone_number}</p>
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

        {editingProfessional && (
          <UpdateProfessionalModal
            isOpen={!!editingProfessional}
            onClose={closeUpdateModal}
            professional={editingProfessional}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
}
