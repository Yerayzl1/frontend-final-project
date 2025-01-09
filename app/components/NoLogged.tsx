export default function NoLogged() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5E5D3]">
      <h1 className="text-2xl font-bold text-[#704214] mb-4">
        You are not logged in.
      </h1>
      <a
        href="/login"
        className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
      >
        Go to Login
      </a>
    </div>
  );
}
