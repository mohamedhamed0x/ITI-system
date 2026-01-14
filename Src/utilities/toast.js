const Toast = {
  container: null,

  init() {
    if (this.container) return;
    this.container = document.createElement("div");
    this.container.id = "toast-container";
    this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
    document.body.appendChild(this.container);
  },

  show(message, type = "success", duration = 3000) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };

    const colors = {
      success: { bg: "#d4edda", border: "#28a745", text: "#155724" },
      error: { bg: "#f8d7da", border: "#dc3545", text: "#721c24" },
      warning: { bg: "#fff3cd", border: "#ffc107", text: "#856404" },
      info: { bg: "#cce5ff", border: "#17a2b8", text: "#004085" },
    };

    const color = colors[type] || colors.info;

    toast.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: ${color.bg};
            border-left: 4px solid ${color.border};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            color: ${color.text};
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            min-width: 280px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            transition: all 0.3s ease;
        `;

    toast.innerHTML = `
            <span style="font-size: 20px; font-weight: bold;">${icons[type]}</span>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: ${color.text};
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                opacity: 0.7;
            ">×</button>
        `;

    if (!document.getElementById("toast-styles")) {
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  success(message, duration) {
    return this.show(message, "success", duration);
  },

  error(message, duration) {
    return this.show(message, "error", duration);
  },

  warning(message, duration) {
    return this.show(message, "warning", duration);
  },

  info(message, duration) {
    return this.show(message, "info", duration);
  },
};
