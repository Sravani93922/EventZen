export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] animate-scaleIn">
        {children}

        <button className="btn mt-4 w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}