import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/Axios";
import { baseCSS, Modal, Navbar, rupiah } from "../shared/theme.jsx";

const BASE_IMG = "https://unbeaten-rarely-ardella.ngrok-free.dev/storage/";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("menus");
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // Modal states
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", category_id: "" });
  const [categoryForm, setCategoryForm] = useState({ category: "" });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("🎯 Manager fetching data...");
      const [menusRes, catsRes] = await Promise.all([
        api.get("/menus"),
        api.get("/categories"),
      ]);
      
      setMenus(Array.isArray(menusRes.data.data) ? menusRes.data.data : []);
      setCategories(Array.isArray(catsRes.data.data) ? catsRes.data.data : []);
      console.log("✅ Menus:", menusRes.data.data?.length);
      console.log("✅ Categories:", catsRes.data.data?.length);
    } catch (err) {
      console.error("❌ Error:", err.message);
      alert("Gagal mengambil data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async () => {
    if (!formData.name || !formData.price || !formData.stock || !formData.category_id) {
      alert("Semua field harus diisi!");
      return;
    }

    setFormLoading(true);
    try {
      await api.post("/menus", {
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        category_id: formData.category_id,
      });
      alert("Menu berhasil ditambahkan!");
      setShowAddMenu(false);
      setFormData({ name: "", price: "", stock: "", category_id: "" });
      fetchData();
    } catch (err) {
      alert("Gagal menambah menu: " + (err.response?.data?.message || err.message));
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryForm.category) {
      alert("Nama kategori harus diisi!");
      return;
    }

    setFormLoading(true);
    try {
      await api.post("/categories", {
        category: categoryForm.category,
      });
      alert("Kategori berhasil ditambahkan!");
      setShowAddCategory(false);
      setCategoryForm({ category: "" });
      fetchData();
    } catch (err) {
      alert("Gagal menambah kategori: " + (err.response?.data?.message || err.message));
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateStock = async (menuId, newStock) => {
    try {
      await api.put(`/menus/${menuId}`, { stock: newStock });
      alert("Stok berhasil diupdate!");
      fetchData();
    } catch (err) {
      alert("Gagal update stok: " + err.message);
    }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Hapus menu ini?")) return;
    try {
      await api.delete(`/menus/${id}`);
      alert("Menu berhasil dihapus!");
      fetchData();
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleImageError = (menuId) => {
    setImageErrors((prev) => new Set([...prev, menuId]));
  };

  const totalStok = menus.reduce((a, m) => a + Number(m.stock || 0), 0);
  const totalValue = menus.reduce((a, m) => a + (Number(m.price || 0) * Number(m.stock || 0)), 0);

  return (
    <>
      <style>{baseCSS}</style>
      <div className="wrap">
        <Navbar role="manager" username={user.name || "Manager"} onLogout={handleLogout} />

        <div className="content">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: "0 0 8px 0" }}>📊 Manager Dashboard</h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Kelola menu dan stok warung Anda</p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">🍽️</div>
              <div className="stat-label">Total Menu</div>
              <div className="stat-val">{menus.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📂</div>
              <div className="stat-label">Kategori</div>
              <div className="stat-val">{categories.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-label">Total Stok</div>
              <div className="stat-val">{totalStok}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-label">Nilai Stok</div>
              <div className="stat-val" style={{ fontSize: "1.1rem" }}>{rupiah(totalValue)}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab-btn ${tab === "menus" ? "active" : ""}`} onClick={() => setTab("menus")}>🍽️ Menu</button>
            <button className={`tab-btn ${tab === "categories" ? "active" : ""}`} onClick={() => setTab("categories")}>📂 Kategori</button>
          </div>

          {loading ? (
            <div className="spinner"><span className="spin">🌿</span></div>
          ) : (
            <>
              {/* MENU TAB */}
              {tab === "menus" && (
                <div>
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0, fontSize: "1.2rem" }}>🍽️ Menu Warung</h2>
                    <button className="btn btn-primary" onClick={() => setShowAddMenu(true)}>➕ Tambah Menu</button>
                  </div>

                  {menus.length === 0 ? (
                    <p className="empty">Tidak ada menu</p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                      {menus.map((m) => (
                        <div key={m.id_menu} style={{
                          background: "white",
                          border: "1px solid rgba(82,183,136,0.2)",
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          transition: "transform 0.2s"
                        }}>
                          <div style={{
                            width: "100%",
                            height: 150,
                            background: "#f5f5f5",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {imageErrors.has(m.id_menu) || !m.image ? (
                              <div style={{ color: "#999", fontSize: "0.8rem" }}>📷 Tidak ada gambar</div>
                            ) : (
                              <img 
                                src={BASE_IMG + m.image} 
                                alt={m.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={() => handleImageError(m.id_menu)}
                              />
                            )}
                          </div>
                          <div style={{ padding: 14 }}>
                            <h3 style={{ margin: "0 0 6px 0", fontSize: "0.95rem", fontWeight: 600 }}>{m.name}</h3>
                            {m.category?.category && (
                              <p style={{ margin: "4px 0", fontSize: "0.75rem", color: "#fff", background: "var(--g-sed)", padding: "2px 8px", borderRadius: 3, display: "inline-block" }}>
                                {m.category.category}
                              </p>
                            )}
                            <p style={{ margin: "8px 0 0 0", fontSize: "1rem", fontWeight: "bold", color: "var(--g-sed)" }}>
                              {rupiah(m.price)}
                            </p>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginTop: 8,
                              padding: "8px",
                              background: m.stock === 0 ? "rgba(229,115,115,0.1)" : "rgba(82,183,136,0.1)",
                              borderRadius: 4
                            }}>
                              <span style={{ fontSize: "0.8rem", flex: 1 }}>📦 Stok:</span>
                              <input 
                                type="number" 
                                value={m.stock} 
                                onChange={(e) => handleUpdateStock(m.id_menu, e.target.value)}
                                style={{
                                  width: 50,
                                  padding: "4px",
                                  border: "1px solid var(--g-terang)",
                                  borderRadius: 4,
                                  textAlign: "center"
                                }}
                              />
                            </div>
                            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                              <button className="btn btn-sm btn-outline" style={{ flex: 1 }}>✏️ Edit</button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMenu(m.id_menu)}>🗑️</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CATEGORY TAB */}
              {tab === "categories" && (
                <div>
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0, fontSize: "1.2rem" }}>📂 Kategori ({categories.length})</h2>
                    <button className="btn btn-primary" onClick={() => setShowAddCategory(true)}>➕ Tambah Kategori</button>
                  </div>
                  {categories.length === 0 ? (
                    <p className="empty">Tidak ada kategori</p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                      {categories.map((c) => (
                        <div key={c.id_category} style={{
                          background: "white",
                          border: "1px solid rgba(82,183,136,0.2)",
                          borderRadius: 8,
                          padding: 16,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }}>
                          <h3 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: 600 }}>{c.category}</h3>
                          <p style={{ margin: 0, fontSize: "0.8rem", color: "#999" }}>
                            {menus.filter((m) => m.category_id === c.id_category).length} item
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ADD MENU MODAL */}
      {showAddMenu && (
        <Modal title="➕ Tambah Menu" onClose={() => setShowAddMenu(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowAddMenu(false)}>Batal</button>
              <button className="btn btn-primary" onClick={handleAddMenu} disabled={formLoading}>
                {formLoading ? "Menyimpan..." : "💾 Simpan"}
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Nama Menu</label>
            <input className="form-input" placeholder="Contoh: Nasi Kuning" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Harga (Rp)</label>
            <input className="form-input" type="number" placeholder="10000" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Stok Awal</label>
            <input className="form-input" type="number" placeholder="10" value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Kategori</label>
            <select className="form-select" value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
              <option value="">Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c.id_category} value={c.id_category}>{c.category}</option>
              ))}
            </select>
          </div>
        </Modal>
      )}

      {/* ADD CATEGORY MODAL */}
      {showAddCategory && (
        <Modal title="➕ Tambah Kategori" onClose={() => setShowAddCategory(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowAddCategory(false)}>Batal</button>
              <button className="btn btn-primary" onClick={handleAddCategory} disabled={formLoading}>
                {formLoading ? "Menyimpan..." : "💾 Simpan"}
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Nama Kategori</label>
            <input className="form-input" placeholder="Contoh: Snack" value={categoryForm.category}
              onChange={(e) => setCategoryForm({ ...categoryForm, category: e.target.value })} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ManagerDashboard;