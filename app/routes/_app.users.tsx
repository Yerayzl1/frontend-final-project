import { useState } from "react";
import AddUserModal from "./users/AddUserModal";
import EditUserModal from "./users/EditUserModal";
import AppointmentHistoryModal from "./appointments/AppointmentHistoryModal";
import UserReportModal from "./reports/UserReportModel";
import DeleteUserModal from "./users/DeleteUserModal";

export default function Users() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAppointmentHistoryModalOpen, setIsAppointmentHistoryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  type UserRole = "Client" | "Admin" | "Professional";

  interface User {
    id: number;
    name: string;
    username: string;
    role: UserRole;
    dob: string;
  }

  interface Appointment {
    id: number;
    service: string;
    date: string;
    time: string;
    professional: string;
  }

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Sarah Johnson", username: "sarahj", role: "Client", dob: "07/02/1998" },
    { id: 2, name: "Yeray Zafra", username: "yerayz", role: "Admin", dob: "01/01/2005" },
    { id: 3, name: "John Bones", username: "johnb", role: "Professional", dob: "09/07/1974" },
    { id: 4, name: "Jessica Jones", username: "jessicaj", role: "Client", dob: "15/09/1977" },
    { id: 5, name: "Emiliano García", username: "emilianog", role: "Client", dob: "24/12/1999" },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, service: "Haircut", date: "2025-01-15", time: "10:00 AM", professional: "John Doe" },
    { id: 2, service: "Manicure", date: "2025-02-10", time: "02:00 PM", professional: "Sarah Smith" },
  ]);

  const roleColors = {
    Client: "text-green-600",
    Admin: "text-red-600",
    Professional: "text-orange-600",
  };

  const openAddUserModal = () => setIsAddUserModalOpen(true);
  const closeAddUserModal = () => setIsAddUserModalOpen(false);

  const openEditUserModal = (user: User) => {
    setEditUser(user);
    setIsEditUserModalOpen(true);
  };
  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
    setEditUser(null);
  };

  const openAppointmentHistoryModal = (user: User) => {
    setSelectedUser(user);
    setIsAppointmentHistoryModalOpen(true);
  };
  const closeAppointmentHistoryModal = () => {
    setIsAppointmentHistoryModalOpen(false);
    setSelectedUser(null);
  };

  const openReportModal = (user: User) => {
    setSelectedUser(user);
    setIsReportModalOpen(true);
  };
  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteUserModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserModalOpen(true);
  };
  const closeDeleteUserModal = () => {
    setSelectedUser(null);
    setIsDeleteUserModalOpen(false);
  };

  const handleCreateUser = (user: User) => {
    setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
    console.log("Created User:", user);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    console.log("Updated User:", updatedUser);
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser?.id));
    console.log(`Deleted user: ${selectedUser?.name}`);
    closeDeleteUserModal();
  };

  const getReportData = (userId: number) => {
    const reportData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      data: [10, 20, 15, 25, 30, 40],
    };

    console.log(`Fetching report for user ID: ${userId}`);
    return reportData;
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search a user"
          className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500"
        />
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
          >
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-lg font-semibold text-[#704214]">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
              {/* Aligned Role */}
              <div className="w-40 text-center">
                <p className={`text-sm font-bold ${roleColors[user.role]}`}>{user.role}</p>
              </div>
              <p className="text-sm text-gray-500">{user.dob}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => openEditUserModal(user)} 
                className="text-yellow-500 hover:text-yellow-600"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => openAppointmentHistoryModal(user)}
                className="text-gray-500 hover:text-gray-600"
              >
                <i className="fa-solid fa-clock-rotate-left"></i>
              </button>
              <button
                onClick={() => openReportModal(user)}
                className="text-black hover:text-gray-600"
              >
                <i className="fa-regular fa-clipboard"></i>
              </button>
              <div className="border-l border-gray-300"></div>
                <button 
                  onClick={() => openDeleteUserModal(user)} 
                  className="text-red-500 hover:text-red-600"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New User Button */}
      <div className="flex justify-center mt-6">
        <button onClick={openAddUserModal} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
          New user
        </button>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={closeAddUserModal}
          onCreate={handleCreateUser}
        />
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && editUser && (
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onClose={closeEditUserModal}
          user={editUser}
          onUpdate={handleUpdateUser}
        />
      )}

      {/* Appointment History Modal */}
      {isAppointmentHistoryModalOpen && selectedUser && (
        <AppointmentHistoryModal
          isOpen={isAppointmentHistoryModalOpen}
          onClose={closeAppointmentHistoryModal}
          appointments={appointments}
          userName={selectedUser.name}
        />
      )}

      {/* Report Modal */}
      {isReportModalOpen && selectedUser && (
        <UserReportModal
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          user={selectedUser}
          getReportData={getReportData}
        />
      )}

      {/* Delete User Modal */}
      {isDeleteUserModalOpen && selectedUser && (
        <DeleteUserModal
          userId={selectedUser.id}
          userName={selectedUser.name}
          onClose={closeDeleteUserModal}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}
