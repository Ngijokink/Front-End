// ─── shared/theme.js ─────────────────────────────────────────────────────────
// Central CSS + reusable components for all role dashboards

export const batikBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='2' fill='%2322543d' opacity='0.12'/%3E%3Ccircle cx='0' cy='0' r='2' fill='%2322543d' opacity='0.12'/%3E%3Ccircle cx='60' cy='0' r='2' fill='%2322543d' opacity='0.12'/%3E%3Ccircle cx='0' cy='60' r='2' fill='%2322543d' opacity='0.12'/%3E%3Ccircle cx='60' cy='60' r='2' fill='%2322543d' opacity='0.12'/%3E%3Cpath d='M15 30 Q30 15 45 30 Q30 45 15 30Z' fill='none' stroke='%2322543d' stroke-width='0.8' opacity='0.08'/%3E%3C/svg%3E")`;

export const baseCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  :root {
    --g-tua:    #1a3d2b;
    --g-sed:    #2d6a4f;
    --g-muda:   #52b788;
    --g-terang: #95d5b2;
    --g-pucat:  #d8f3dc;
    --krem:     #fefae0;
    --emas:     #c9a84c;
    --emas2:    #f0d080;
    --coklat:   #e0c49a;
    --merah:    #e57373;
    --biru:     #4a90d9;
    --ungu:     #8b5cf6;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--krem); font-family: 'Lora', serif; }

  /* WRAPPER */
  .wrap {
    min-height: 100vh;
    background: var(--krem);
    background-image: ${batikBg};
  }

  /* STICKY NAVBAR */
  .navbar {
    background: var(--g-tua);
    position: sticky; top: 0; z-index: 200;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .navbar-inner {
    max-width: 1400px; margin: 0 auto;
    padding: 0 24px; height: 58px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .navbar-brand { display: flex; align-items: center; gap: 10px; }
  .brand-orb {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--emas), var(--emas2));
    display: flex; align-items: center; justify-content: center;
    font-size: 17px; box-shadow: 0 0 0 2px rgba(201,168,76,0.4);
    flex-shrink: 0;
  }
  .brand-text { line-height: 1; }
  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--emas2); letter-spacing: 3px; text-transform: uppercase;
  }
  .brand-sub {
    font-size: 0.6rem; color: var(--g-terang);
    letter-spacing: 2px; font-style: italic; opacity: 0.8;
  }
  .navbar-role-badge {
    padding: 4px 14px; border-radius: 999px;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
  }
  .badge-superadmin { background: linear-gradient(135deg,#7c3aed,#a855f7); color:#fff; }
  .badge-admin      { background: linear-gradient(135deg,#b45309,#d97706); color:#fff; }
  .badge-manager    { background: linear-gradient(135deg,var(--g-sed),var(--g-muda)); color:#fff; }
  .badge-pelanggan  { background: linear-gradient(135deg,#0369a1,#0ea5e9); color:#fff; }

  .navbar-right { display: flex; align-items: center; gap: 10px; }
  .user-chip {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(149,213,178,0.2);
    color: var(--g-terang); padding: 5px 12px; border-radius: 999px;
    font-size: 0.75rem; white-space: nowrap;
  }
  .logout-btn {
    background: transparent; border: 1px solid rgba(201,168,76,0.5);
    color: var(--emas2); padding: 5px 14px; border-radius: 999px;
    cursor: pointer; font-family: 'Lora', serif; font-size: 0.75rem;
    transition: all 0.2s;
  }
  .logout-btn:hover { background: rgba(201,168,76,0.15); border-color: var(--emas); }

  /* ACCENT LINE */
  .navbar-accent {
    height: 3px;
    background: linear-gradient(90deg, var(--g-sed), var(--emas), var(--g-sed));
  }

  /* CONTENT AREA */
  .content { max-width: 1400px; margin: 0 auto; padding: 28px 24px 60px; }

  /* PAGE HEADER */
  .page-header {
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(82,183,136,0.25);
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; color: var(--g-tua); font-weight: 700;
  }
  .page-desc { color: var(--g-sed); font-size: 0.85rem; font-style: italic; margin-top: 4px; }

  /* STAT CARDS */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px; margin-bottom: 28px;
  }
  .stat-card {
    background: white; border-radius: 10px;
    border: 1px solid rgba(82,183,136,0.25);
    padding: 16px 18px;
    box-shadow: 0 4px 16px rgba(26,61,43,0.07);
    position: relative; overflow: hidden;
  }
  .stat-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--g-muda), var(--emas));
  }
  .stat-label { color: var(--g-sed); font-size: 0.72rem; letter-spacing: 1px; text-transform: uppercase; }
  .stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem; color: var(--g-tua); margin-top: 6px; line-height: 1;
  }
  .stat-icon { position: absolute; right: 12px; top: 12px; font-size: 1.6rem; opacity: 0.15; }

  /* SECTION */
  .section-head {
    display: flex; align-items: center; justify-content: space-between;
    margin: 28px 0 16px; gap: 12px;
  }
  .section-title-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; color: var(--g-tua); font-weight: 600;
    display: flex; align-items: center; gap: 8px;
  }
  .section-line { flex: 1; height: 1px; background: linear-gradient(to right, var(--g-sed), transparent); }

  /* TABLE */
  .tbl-wrap {
    background: white; border-radius: 10px; overflow: hidden;
    border: 1px solid rgba(82,183,136,0.2);
    box-shadow: 0 4px 20px rgba(26,61,43,0.07);
  }
  table { width: 100%; border-collapse: collapse; }
  thead { background: linear-gradient(135deg, var(--g-tua), var(--g-sed)); }
  th {
    padding: 12px 16px; text-align: left;
    font-family: 'Lora', serif; font-size: 0.75rem;
    font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--g-terang);
  }
  td {
    padding: 12px 16px; font-size: 0.88rem;
    color: #333; border-bottom: 1px solid rgba(82,183,136,0.1);
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(216,243,220,0.3); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 6px;
    font-family: 'Lora', serif; font-size: 0.82rem;
    cursor: pointer; border: none; font-weight: 600;
    transition: all 0.2s; letter-spacing: 0.3px;
  }
  .btn-primary { background: var(--g-sed); color: white; }
  .btn-primary:hover { background: var(--g-tua); transform: translateY(-1px); }
  .btn-gold { background: var(--emas); color: var(--g-tua); }
  .btn-gold:hover { background: var(--emas2); transform: translateY(-1px); }
  .btn-danger { background: #fee2e2; color: #b91c1c; }
  .btn-danger:hover { background: #fecaca; }
  .btn-edit { background: rgba(74,144,217,0.12); color: var(--biru); }
  .btn-edit:hover { background: rgba(74,144,217,0.22); }
  .btn-sm { padding: 4px 10px; font-size: 0.75rem; }
  .btn-outline {
    background: transparent; border: 1px solid var(--g-terang);
    color: var(--g-sed);
  }
  .btn-outline:hover { background: var(--g-pucat); }

  /* MODAL OVERLAY */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(10,20,15,0.65);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn 0.18s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-box {
    background: white; border-radius: 14px;
    width: 100%; max-width: 480px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.25);
    animation: slideUp 0.22s ease;
    overflow: hidden;
    max-height: 90vh; display: flex; flex-direction: column;
  }
  .modal-box-lg { max-width: 640px; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  .modal-header {
    background: linear-gradient(135deg, var(--g-tua), var(--g-sed));
    padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: white; font-weight: 600;
  }
  .modal-close {
    background: rgba(255,255,255,0.12); border: none;
    color: white; width: 28px; height: 28px; border-radius: 50%;
    cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .modal-close:hover { background: rgba(255,255,255,0.25); }

  .modal-body { padding: 22px; overflow-y: auto; flex: 1; }
  .modal-footer {
    padding: 14px 22px;
    border-top: 1px solid rgba(82,183,136,0.15);
    display: flex; justify-content: flex-end; gap: 10px;
  }

  /* FORM */
  .form-group { margin-bottom: 16px; }
  .form-label {
    display: block; margin-bottom: 6px;
    font-size: 0.78rem; font-weight: 600;
    color: var(--g-tua); letter-spacing: 0.5px; text-transform: uppercase;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 9px 13px;
    border: 1.5px solid rgba(82,183,136,0.35); border-radius: 7px;
    font-family: 'Lora', serif; font-size: 0.88rem;
    color: var(--g-tua); background: white;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--g-muda);
    box-shadow: 0 0 0 3px rgba(82,183,136,0.12);
  }
  .form-textarea { resize: vertical; min-height: 80px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* CONFIRM MODAL */
  .confirm-icon { text-align: center; font-size: 3rem; margin-bottom: 12px; }
  .confirm-msg {
    text-align: center; color: #444;
    font-size: 0.92rem; line-height: 1.6;
  }
  .confirm-msg strong { color: var(--g-tua); }

  /* BADGE STATUS */
  .badge {
    display: inline-block; padding: 2px 10px; border-radius: 999px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  }
  .badge-green  { background: #d1fae5; color: #065f46; }
  .badge-red    { background: #fee2e2; color: #b91c1c; }
  .badge-yellow { background: #fef9c3; color: #854d0e; }
  .badge-blue   { background: #dbeafe; color: #1e40af; }
  .badge-purple { background: #ede9fe; color: #5b21b6; }

  /* EMPTY */
  .empty { text-align: center; padding: 48px 20px; color: var(--g-sed); font-style: italic; opacity: 0.7; }

  /* CARD GRID */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
    gap: 16px;
  }
  .card {
    background: white; border-radius: 10px;
    border: 1px solid rgba(82,183,136,0.2);
    box-shadow: 0 3px 14px rgba(26,61,43,0.07);
    overflow: hidden; transition: transform 0.25s, box-shadow 0.25s;
    animation: fadeUp 0.4s ease both;
  }
  .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,61,43,0.14); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

  .card-header-strip {
    background: linear-gradient(135deg, var(--g-tua), var(--g-sed));
    padding: 14px 16px;
  }
  .card-title {
    font-family: 'Playfair Display', serif;
    color: white; font-size: 1rem; font-weight: 600;
  }
  .card-body { padding: 14px 16px; }
  .card-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.83rem; }
  .card-key { color: #999; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .card-val { color: var(--g-tua); font-weight: 600; }
  .card-footer-strip {
    border-top: 1px solid rgba(82,183,136,0.12);
    padding: 10px 16px;
    display: flex; gap: 8px; justify-content: flex-end;
  }

  /* LOADING SPINNER */
  .spinner { text-align: center; padding: 60px; }
  .spin { display: inline-block; font-size: 2.5rem; animation: rot 1.2s linear infinite; }
  @keyframes rot { to { transform: rotate(360deg); } }

  /* SEARCH INPUT */
  .search-wrap { position: relative; max-width: 300px; }
  .search-input {
    width: 100%; padding: 8px 14px 8px 38px;
    border: 1.5px solid var(--g-terang); border-radius: 999px;
    font-family: 'Lora', serif; font-size: 0.85rem;
    color: var(--g-tua); outline: none; transition: border-color 0.2s;
    background: white;
  }
  .search-input:focus { border-color: var(--g-sed); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: var(--g-muda); }

  /* TABS */
  .tabs { display: flex; gap: 4px; border-bottom: 2px solid var(--g-pucat); margin-bottom: 20px; }
  .tab-btn {
    background: transparent; border: none;
    padding: 10px 18px; cursor: pointer;
    font-family: 'Lora', serif; font-size: 0.85rem;
    color: var(--g-sed); border-bottom: 2px solid transparent;
    margin-bottom: -2px; transition: all 0.2s;
  }
  .tab-btn.active { color: var(--g-tua); border-bottom-color: var(--emas); font-weight: 600; }
  .tab-btn:hover { color: var(--g-tua); }

  @media (max-width: 640px) {
    .form-row { grid-template-columns: 1fr; }
    .content { padding: 16px 14px 40px; }
    .navbar-inner { padding: 0 14px; }
  }
`;

// ─── Reusable Modal ───────────────────────────────────────────────────────────
export const Modal = ({ title, onClose, children, footer, large }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className={`modal-box ${large ? "modal-box-lg" : ""}`}>
      <div className="modal-header">
        <div className="modal-title">{title}</div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  </div>
);

// ─── Confirm Modal ────────────────────────────────────────────────────────────
export const ConfirmModal = ({ icon = "⚠️", message, onConfirm, onCancel, confirmLabel = "Ya, Lanjutkan", confirmClass = "btn btn-danger" }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
    <div className="modal-box" style={{ maxWidth: 380 }}>
      <div className="modal-header">
        <div className="modal-title">Konfirmasi</div>
        <button className="modal-close" onClick={onCancel}>✕</button>
      </div>
      <div className="modal-body">
        <div className="confirm-icon">{icon}</div>
        <div className="confirm-msg" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onCancel}>Batal</button>
        <button className={confirmClass} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

// ─── Shared Navbar ────────────────────────────────────────────────────────────
export const Navbar = ({ role, username, onLogout, children }) => {
  const badgeMap = {
    superadmin: "badge-superadmin",
    admin: "badge-admin",
    manager: "badge-manager",
    pelanggan: "badge-pelanggan",
  };
  const labelMap = {
    superadmin: "⚡ Superadmin",
    admin: "🛡️ Admin",
    manager: "📊 Manager",
    pelanggan: "🛒 Pelanggan",
  };
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="brand-orb">🌿</div>
          <div className="brand-text">
            <div className="brand-name">Ngijo</div>
            <div className="brand-sub">Warung Tradisional</div>
          </div>
        </div>
        {children}
        <div className="navbar-right">
          <span className={`navbar-role-badge ${badgeMap[role] || ""}`}>{labelMap[role] || role}</span>
          <span className="user-chip">👤 {username || "User"}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="navbar-accent" />
    </div>
  );
};

// ─── Format helpers ───────────────────────────────────────────────────────────
export const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);