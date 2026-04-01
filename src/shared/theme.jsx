import { useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────────
   BASE CSS - Shared Styles
   ──────────────────────────────────────────────────────────────────────────────── */

export const baseCSS = `
  :root {
    --g-tua: #1a3d2b;
    --g-sed: #2d6a4f;
    --g-muda: #52b788;
    --g-terang: #95d5b2;
    --g-pucat: #d8f3dc;
    --krem: #fefae0;
    --coklat: #7f4f24;
    --coklat-muda: #e0c49a;
    --emas: #c9a84c;
    --emas-muda: #f0d080;
    --merah: #e57373;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--krem);
    font-family: 'Lora', serif;
    color: var(--g-tua);
  }

  .wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 24px 16px;
  }

  /* Stats */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: white;
    border-radius: 10px;
    padding: 18px;
    border: 1px solid rgba(82, 183, 136, 0.2);
    box-shadow: 0 3px 14px rgba(26, 61, 43, 0.06);
    text-align: center;
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--g-sed);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .stat-val {
    font-family: 'Playfair Display', serif;
    color: var(--g-tua);
    font-weight: 600;
  }

  /* Tabs */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid rgba(82, 183, 136, 0.2);
  }

  .tab-btn {
    background: transparent;
    border: none;
    padding: 10px 16px;
    color: var(--g-sed);
    cursor: pointer;
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
  }

  .tab-btn:hover {
    color: var(--g-tua);
  }

  .tab-btn.active {
    color: var(--g-tua);
    border-bottom-color: var(--g-sed);
    font-weight: 600;
  }

  /* Search */
  .search-wrap {
    position: relative;
    flex: 1;
    max-width: 400px;
  }

  .search-input {
    width: 100%;
    padding: 10px 16px 10px 40px;
    border: 2px solid var(--g-terang);
    border-radius: 999px;
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    background: white;
    color: var(--g-tua);
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    border-color: var(--g-sed);
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--g-muda);
    font-size: 1rem;
  }

  /* Buttons */
  .btn {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 600;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--g-sed), var(--g-tua));
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-outline {
    background: transparent;
    border: 1.5px solid var(--g-terang);
    color: var(--g-sed);
  }

  .btn-outline:hover:not(:disabled) {
    border-color: var(--g-sed);
    color: var(--g-tua);
  }

  .btn-danger {
    background: var(--merah);
    color: white;
  }

  .btn-danger:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-gold {
    background: linear-gradient(135deg, var(--emas), var(--coklat-muda));
    color: var(--g-tua);
  }

  .btn-gold:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .badge-green {
    background: rgba(82, 183, 136, 0.2);
    color: var(--g-sed);
  }

  .badge-yellow {
    background: rgba(255, 193, 7, 0.2);
    color: #f57f17;
  }

  .badge-blue {
    background: rgba(3, 169, 244, 0.2);
    color: #0277bd;
  }

  .badge-red {
    background: rgba(229, 115, 115, 0.2);
    color: var(--merah);
  }

  /* Forms */
  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--g-tua);
    margin-bottom: 8px;
  }

  .form-input,
  .form-select {
    width: 100%;
    padding: 10px 12px;
    border: 1.5px solid var(--g-terang);
    border-radius: 6px;
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    background: white;
    color: var(--g-tua);
    outline: none;
    transition: border-color 0.2s;
  }

  .form-input:focus,
  .form-select:focus {
    border-color: var(--g-sed);
  }

  /* Section */
  .section-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 16px;
  }

  .section-title-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: var(--g-tua);
    font-weight: 600;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--g-sed), transparent);
  }

  /* Empty State */
  .empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--g-sed);
    font-style: italic;
    opacity: 0.7;
  }

  /* Spinner */
  .spinner {
    text-align: center;
    padding: 60px 20px;
  }

  .spin {
    font-size: 3rem;
    animation: spin 1.5s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .modal-box {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(82, 183, 136, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: var(--g-tua);
    font-weight: 600;
  }

  .modal-close-btn {
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    color: var(--g-sed);
    transition: color 0.2s;
  }

  .modal-close-btn:hover {
    color: var(--g-tua);
  }

  .modal-body {
    padding: 20px 24px;
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid rgba(82, 183, 136, 0.15);
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .content { padding: 16px 12px; }
    .modal-box { max-width: 90vw; }
  }
`;

/* ────────────────────────────────────────────────────────────────────────────────
   RUPIAH FORMATTER
   ──────────────────────────────────────────────────────────────────────────────── */

export const rupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

/* ────────────────────────────────────────────────────────────────────────────────
   NAVBAR COMPONENT
   ──────────────────────────────────────────────────────────────────────────────── */

export const Navbar = ({ role = "user", username = "User", onLogout }) => (
  <nav style={{
    background: "linear-gradient(135deg, var(--g-tua), var(--g-sed))",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    boxShadow: "0 4px 12px rgba(26, 61, 43, 0.2)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: "1.8rem" }}>🌿</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Warung Ngijo</div>
        <div style={{ fontSize: "0.7rem", opacity: 0.8, letterSpacing: "1px", textTransform: "uppercase" }}>
          {role}
        </div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ fontSize: "0.9rem" }}>👤 {username}</div>
      <button
        onClick={onLogout}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.8rem",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.3)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
        }}
      >
        🚪 Logout
      </button>
    </div>
  </nav>
);

/* ────────────────────────────────────────────────────────────────────────────────
   MODAL COMPONENT
   ──────────────────────────────────────────────────────────────────────────────── */

export const Modal = ({ title, onClose, children, footer, large = false }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal-box" style={{ maxWidth: large ? 700 : 500 }}>
      <div className="modal-header">
        <div className="modal-title">{title}</div>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────────────────────────────
   CONFIRM MODAL
   ──────────────────────────────────────────────────────────────────────────────── */

export const ConfirmModal = ({ icon = "⚠️", message, onConfirm, onCancel, confirmLabel = "Ya, Lanjutkan", confirmClass = "btn btn-primary" }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
    <div className="modal-box" style={{ maxWidth: 380 }}>
      <div style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{icon}</div>
        <div style={{ fontSize: "0.95rem", color: "var(--g-tua)", lineHeight: 1.5, marginBottom: "24px" }} dangerouslySetInnerHTML={{ __html: message }} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn btn-outline" onClick={onCancel}>Batal</button>
          <button className={`btn ${confirmClass}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  </div>
);
