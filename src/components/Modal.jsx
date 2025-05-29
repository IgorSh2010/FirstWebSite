const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded p-6 shadow-md max-w-sm text-center">
        <p className="text-lg mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;