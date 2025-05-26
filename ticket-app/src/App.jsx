import { useState } from "react";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";


export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex justify-between items-center px-6 py-4 bg-slate-800">
        <h1 className="text-xl font-bold">IT Service Desk</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}
