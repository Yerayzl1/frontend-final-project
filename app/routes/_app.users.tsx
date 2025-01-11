import { useState } from "react";
import { useLoaderData } from '@remix-run/react';
import AddUserModal from "./users/AddUserModal";
import EditUserModal from "./users/EditUserModal";
import AppointmentHistoryModal from "./appointments/AppointmentHistoryModal";
import UserReportModal from "./reports/UserReportModel";
import DeleteUserModal from "./users/DeleteUserModal";
import { UsersData, User } from '~/components/data/users.server';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";
  const query = url.searchParams.get("query") || "";

  const response = await UsersData({ page: Number(page), limit: Number(limit), query });
  return response;
}

export default function Users() {
  const { data, total_elements, total_pages, page, limit } = useLoaderData<{
    data: User[];
    total_elements: number;
    total_pages: number;
    page: number;
    limit: number;
  }>();
  const [users] = useState<User[]>(data);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAppointmentHistoryModalOpen, setIsAppointmentHistoryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handlePageChange = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(newPage));
    window.location.href = url.toString();
  };

  const handleSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("query", searchQuery);
    url.searchParams.set("page", "1");
    window.location.href = url.toString();
  };

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
    console.log("Created User:", user);
  };

  const handleUpdateUser = () => {
    window.location.reload();
  };  

  const handleDeleteUser = () => {
    window.location.reload();
    closeDeleteUserModal();
  };

  function renderActions(user: User) {
    switch (user.role.name) {
      case "Admin":
        return (
          <button
            onClick={() => openEditUserModal(user)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        );
      case "Professional":
        return (
          <>
            <button
              onClick={() => openEditUserModal(user)}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <i className="fa-regular fa-pen-to-square"></i>
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
          </>
        );
      case "Client":
        return (
          <>
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
            <div className="border-l border-gray-300"></div>
            <button
              onClick={() => openDeleteUserModal(user)}
              className="text-red-500 hover:text-red-600"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search a user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500 w-36"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
          >
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-lg font-semibold text-[#704214]">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="w-40 text-center">
                <p className={`text-sm font-bold ${roleColors[user.role.name]}`}>
                  {user.role.name}
                </p>
              </div>
              <p className="text-sm text-gray-500">{user.phone_number}</p>
            </div>
            <div className="flex space-x-4">{renderActions(user)}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Mostrando del {(page - 1) * limit + 1} al{" "}
          {Math.min(page * limit, total_elements)} de {total_elements} usuarios
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="btn btn-outline-primary"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <select
            className="form-select"
            value={page}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            disabled={page >= total_pages}
            onClick={() => handlePageChange(page + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>          
          </button>
        </div>
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
          clientId={selectedUser.id}
          userName={selectedUser.name}
        />
      )}

      {/* Report Modal */}
      {isReportModalOpen && selectedUser && (
        <UserReportModal
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          user={selectedUser}
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
