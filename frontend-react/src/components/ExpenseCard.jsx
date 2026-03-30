export default function ExpenseCard({ data }) {
  return (
    <div className="card bg-base-200 p-4">
      <p>Total Spent: ₹{data.totalSpent}</p>
      <p>Remaining: ₹{data.remainingBudget}</p>
      <p>Budget: ₹{data.eventBudget}</p>
    </div>
  );
}