function Alert({ type, message, onClose }) {
  try {
    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
    const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';

    return (
      <div 
        className={`${bgColor} ${textColor} p-4 rounded-lg mb-6 flex items-start gap-3`}
        data-name="alert"
        data-file="components/Alert.js"
      >
        <div className={`icon-${icon} text-xl ${iconColor} flex-shrink-0`}></div>
        <p className="flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition"
        >
          <div className="icon-x text-lg"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}