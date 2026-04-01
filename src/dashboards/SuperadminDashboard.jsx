import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/Axios";
import { baseCSS, Modal, Navbar, rupiah } from "../shared/theme.jsx";

const SuperadminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");
  
  // Modal states
  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [menusRes, catsRes, usersRes] = await Promise.all([
        api.get("/menus"),
        api.get("/categories"),
        api.get("/users").catch(() => ({ data: { data: [] } })),
      ]);
      setMenus(Array.isArray(menusRes.data.data) ? menusRes.data.data : []);
      setCategories(Array.isArray(catsRes.data.data) ? catsRes.data.data : []);
      setUsers(Array.isArray(usersRes.data.data) ? usersRes.data.data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    setFormLoading(true);
    try {
      await api.post("/users", {
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        role: userForm.role,
      });
      alert("User berhasil ditambahkan!");
      setShowAddUser(false);
      setUserForm({ name: "", email: "", password: "", role: "admin" });
      fetchData();
    } catch (err) {
      alert("Gagal menambah user: " + err.response?.data?.message || err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <style>{baseCSS}</style>
      <div className="wrap">
        <Navbar role="superadmin" username={user.name || "Superadmin"} onLogout={handleLogout} />

        <div className="content">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: "0 0 8px 0" }}>👑 Superadmin Dashboard</h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Kelola semua aspek sistem Warung Ngijo</p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab-btn ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}>📊 Dashboard</button>
            <button className={`tab-btn ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>👥 Users</button>
            <button className={`tab-btn ${tab === "menus" ? "active" : ""}`} onClick={() => setTab("menus")}>🍽️ Menus</button>
            <button className={`tab-btn ${tab === "categories" ? "active" : ""}`} onClick={() => setTab("categories")}>📂 Kategori</button>
          </div>

          {loading ? (
            <div className="spinner"><span className="spin">🌿</span></div>
          ) : (
            <>
              {/* DASHBOARD TAB */}
              {tab === "dashboard" && (
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-label">Total Users</div>
                    <div className="stat-val">{users.length}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🍽️</div>
                    <div className="stat-label">Total Menu</div>
                    <div className="stat-val">{menus.length}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📂</div>
                    <div className="stat-label">Total Kategori</div>
                    <div className="stat-val">{categories.length}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-label">Total Stok</div>
                    <div className="stat-val">{menus.reduce((a, m) => a + Number(m.stock || 0), 0)}</div>
                  </div>
                </div>
              )}

              {/* USERS TAB */}
              {tab === "users" && (
                <div>
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0, fontSize: "1.2rem" }}>👥 Users ({users.length})</h2>
                    <button className="btn btn-primary" onClick={() => setShowAddUser(true)}>➕ Tambah User</button>
                  </div>

                  {users.length === 0 ? (
                    <p className="empty">Tidak ada user</p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                        <thead>
                          <tr style={{ background: "var(--g-pucat)", borderBottom: "2px solid var(--g-terang)" }}>
                            <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "var(--g-sed)" }}>Nama</th>
                            <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "var(--g-sed)" }}>Email</th>
                            <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "var(--g-sed)" }}>Role</th>
                            <th style={{ padding: 12, textAlign: "center", fontWeight: 600, color: "var(--g-sed)" }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u) => (
                            <tr key={u.id} style={{ borderBottom: "1px solid rgba(82,183,136,0.1)" }}>
                              <td style={{ padding: 12 }}>{u.name}</td>
                              <td style={{ padding: 12, fontSize: "0.9rem", color: "#666" }}>{u.email}</td>
                              <td style={{ padding: 12 }}>
                                <span className="badge badge-green">{u.role}</span>
                              </td>
                              <td style={{ padding: 12, textAlign: "center" }}>
                                <button className="btn btn-sm btn-danger">🗑️</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* MENUS TAB */}
              {tab === "menus" && (
                <div>
                  <h2 style={{ margin: "0 0 16px 0", fontSize: "1.2rem" }}>🍽️ Menu ({menus.length})</h2>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>Total stok: {menus.reduce((a, m) => a + Number(m.stock || 0), 0)} items</p>
                </div>
              )}

              {/* CATEGORIES TAB */}
              {tab === "categories" && (
                <div>
                  <h2 style={{ margin: "0 0 16px 0", fontSize: "1.2rem" }}>📂 Kategori ({categories.length})</h2>
                  {categories.map((c) => (
                    <div key={c.id_category} style={{ background: "white", padding: 12, borderRadius: 6, marginBottom: 8, border: "1px solid rgba(82,183,136,0.2)" }}>
                      {c.category}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showAddUser && (
        <Modal title="➕ Tambah User" onClose={() => setShowAddUser(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowAddUser(false)}>Batal</button>
              <button className="btn btn-primary" onClick={handleAddUser} disabled={formLoading}>
                {formLoading ? "Menyimpan..." : "💾 Simpan"}
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Nama</label>
            <input className="form-input" placeholder="Nama lengkap" value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="email@example.com" value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••" value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-select" value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="pelanggan">Pelanggan</option>
            </select>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SuperadminDashboard;