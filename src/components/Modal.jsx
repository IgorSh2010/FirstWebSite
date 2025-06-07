const Modal = ({ message, onClose, onConfirm, confirmMode = false }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded p-6 shadow-md max-w-sm text-center">
        <p className="text-lg mb-4">{message}</p>
        {confirmMode ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onConfirm()}}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Tak
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose()}}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Nie
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;