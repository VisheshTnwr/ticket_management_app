// src/components/DashboardOverview.jsx
export default function DashboardOverview({ tickets }) {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const closedTickets = tickets.filter((t) => t.status === "Closed").length;
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 max-w-md">
        <div className="bg-slate-700 p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Total Tickets</h3>
          <p className="text-3xl">{totalTickets}</p>
        </div>
        <div className="bg-slate-700 p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
          <p className="text-3xl">{openTickets}</p>
        </div>
        <div className="bg-slate-700 p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">In Progress Tickets</h3>
          <p className="text-3xl">{inProgressTickets}</p>
        </div>
        <div className="bg-slate-700 p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Closed Tickets</h3>
          <p className="text-3xl">{closedTickets}</p>
        </div>
      </div>
    </div>
  );
}
