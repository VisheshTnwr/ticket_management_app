import { useState } from "react";
import DashboardOverview from "./DashboardOverview";

export default function UserDashboard() {
  const [view, setView] = useState("dashboard"); // default to dashboard

  // Form states
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  // Tickets state
  const [tickets, setTickets] = useState([]);

  // Filter states for ticket status and priority
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  function handleSubmit(e) {
    e.preventDefault();
    if (!subject || !description) return;

    const newTicket = {
      id: Date.now(),
      subject,
      description,
      priority,
      status: "Open",
    };

    setTickets([...tickets, newTicket]);

    // Reset form
    setSubject("");
    setDescription("");
    setPriority("Low");

    // Switch to view tickets after submission
    setView("view");
  }

  // Helper to get background color class based on priority
  function priorityClass(priority) {
    switch (priority) {
      case "High":
        return "bg-red-600 text-white px-2 rounded";
      case "Medium":
        return "bg-yellow-400 text-black px-2 rounded";
      case "Low":
      default:
        return "bg-green-600 text-white px-2 rounded";
    }
  }

  // Filter tickets based on selected status and priority
  const filteredTickets = tickets.filter((t) => {
    const statusMatch = filterStatus === "All" || t.status === filterStatus;
    const priorityMatch = filterPriority === "All" || t.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-48 bg-slate-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">User Panel</h2>
        <ul>
          <li
            onClick={() => setView("dashboard")}
            className={`cursor-pointer py-2 px-3 rounded hover:bg-slate-700 ${
              view === "dashboard" ? "bg-slate-700" : ""
            }`}
          >
            Dashboard
          </li>
          <li
            onClick={() => setView("create")}
            className={`cursor-pointer py-2 px-3 rounded hover:bg-slate-700 ${
              view === "create" ? "bg-slate-700" : ""
            }`}
          >
            Create Ticket
          </li>
          <li
            onClick={() => setView("view")}
            className={`cursor-pointer py-2 px-3 rounded hover:bg-slate-700 ${
              view === "view" ? "bg-slate-700" : ""
            }`}
          >
            View Tickets
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 text-white">
        {view === "view" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>

            {/* Filter dropdowns */}
            <div className="mb-4 flex space-x-4 items-center">
              <div>
                <label className="mr-2 font-semibold">Filter by status:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-black px-3 py-2 rounded bg-blue-200"
                >
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="mr-2 font-semibold">Filter by priority:</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="text-black px-3 py-2 rounded bg-blue-200"
                >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {filteredTickets.length === 0 ? (
              <p>No tickets submitted yet.</p>
            ) : (
              <ul className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="bg-slate-700 p-4 rounded shadow"
                  >
                    <h3 className="text-xl font-semibold">{ticket.subject}</h3>
                    <p>{ticket.description}</p>
                    <p>
                      <span className="font-medium">Priority:</span>{" "}
                      <span className={priorityClass(ticket.priority)}>
                        {ticket.priority}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {ticket.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {view === "create" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Create a New Ticket</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 bg-blue-200 rounded text-black"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                placeholder="Describe your issue"
                className="w-full px-4 py-2 bg-blue-200 rounded text-black"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <select
                className="w-full px-4 py-2 bg-blue-200 rounded text-black"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        )}

        {view === "dashboard" && <DashboardOverview tickets={tickets} />}
      </main>
    </div>
  );
}
