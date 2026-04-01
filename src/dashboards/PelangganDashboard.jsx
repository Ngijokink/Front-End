import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/Axios";
import { baseCSS, Modal, ConfirmModal, Navbar, rupiah } from "../shared/theme.jsx";

const BASE_IMG = "https://unbeaten-rarely-ardella.ngrok-free.dev/storage/";

const PelangganDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  const [tab, setTab]             = useState("menu");
  const [menus, setMenus]         = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart]           = useState([]);
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [katAktif, setKatAktif]   = useState("Semua");
  const [imgErrors, setImgErrors] = useState(new Set());

  // Modals
  const [showCart, setShowCart]           = useState(false);
  const [showCheckout, setShowCheckout]   = useState(false);
  const [showPayment, setShowPayment]     = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [removeItemId, setRemoveItemId]   = useState(null);

  const [payForm, setPayForm]   = useState({ amount: "", method: "tunai" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]     = useState("");
  const [successMsg, setSuccessMsg]   = useState("");

  /* ── FETCH ── */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [mRes, cRes, oRes] = await Promise.all([
        api.get("/menus"), api.get("/categories"), api.get("/orders"),
      ]);
      setMenus(Array.isArray(mRes.data.data) ? mRes.data.data : []);
      setCategories(Array.isArray(cRes.data.data) ? cRes.data.data : []);
      setOrders(Array.isArray(oRes.data.data) ? oRes.data.data : []);
    } catch { }
    finally { setLoading(false); }
  };

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(Array.isArray(res.data.data) ? res.data.data : []);
    } catch { setCart([]); }
  };

  useEffect(() => { fetchAll(); fetchCart(); }, []);

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  /* ── CART OPS ── */
  const addToCart = async (menu) => {
    try {
      await api.post("/cart/add", { user_id: userId, id_menu: menu.id_menu, quantity: 1 });
      fetchCart();
    } catch (e) {
      alert(e.response?.data?.message || "Gagal tambah ke keranjang");
    }
  };

  const updateQty = async (itemId, qty) => {
    if (qty < 1) return;
    try { await api.put(`/cart/update/${itemId}`, { quantity: qty }); fetchCart(); } catch {}
  };

  const removeFromCart = async () => {
    setFormLoading(true);
    try { await api.delete(`/cart/remove/${removeItemId}`); fetchCart(); setShowConfirmRemove(false); } catch {}
    finally { setFormLoading(false); }
  };

  /* ── CHECKOUT ── */
  const handleCheckout = async () => {
    setFormLoading(true); setFormError("");
    try {
      await api.post(`/cart/checkout/${userId}`);
      await fetchAll(); fetchCart();
      setShowCheckout(false);
      setSuccessMsg("Pesanan berhasil dibuat! Silakan lakukan pembayaran.");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (e) { setFormError(e.response?.data?.message || "Checkout gagal"); }
    finally { setFormLoading(false); }
  };

  /* ── PAYMENT ── */
  const handlePayment = async (orderId) => {
    setFormLoading(true); setFormError("");
    try {
      await api.post("/payments", { order_id: orderId, amount: payForm.amount, method: payForm.method });
      setShowPayment(false);
      setPayForm({ amount: "", method: "tunai" });
      fetchAll();
      setSuccessMsg("Pembayaran berhasil! Terima kasih 🌿");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (e) { setFormError(e.response?.data?.message || "Pembayaran gagal"); }
    finally { setFormLoading(false); }
  };

  /* ── FILTER ── */
  const katList = useMemo(() => {
    const names = menus.map((m) => m.category?.category).filter(Boolean).filter((v,i,a) => a.indexOf(v)===i);
    return ["Semua", ...names];
  }, [menus]);

  const filtered = menus.filter((m) => {
    const kat = m.category?.category || "";
    const cocok = katAktif === "Semua" || kat === katAktif;
    const cari  = m.name?.toLowerCase().includes(search.toLowerCase());
    return cocok && cari;
  });

  const cartTotal = cart.reduce((a, i) => a + Number(i.price || 0) * Number(i.quantity || 1), 0);
  const cartCount = cart.reduce((a, i) => a + Number(i.quantity || 1), 0);

  const orderStatusBadge = (s) => {
    const map = { pending:"badge-yellow", processing:"badge-blue", completed:"badge-green", cancelled:"badge-red" };
    return <span className={`badge ${map[s] || "badge-blue"}`}>{s}</span>;
  };

  return (
    <>
      <style>{baseCSS}{`
        .plg-banner {
          background: linear-gradient(135deg, #0c4a6e, #0369a1, #0284c7);
          padding: 32px 24px 28px; text-align: center; position: relative; overflow: hidden;
        }
        .plg-banner::before {
          content:''; position:absolute; inset:0;
          background: repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.025) 10px,rgba(255,255,255,0.025) 20px);
        }
        .plg-banner-title {
          font-family:'Playfair Display',serif; font-size:clamp(1.8rem,5vw,3rem);
          color:#bae6fd; font-weight:700; letter-spacing:4px; text-transform:uppercase;
        }
        .plg-banner-sub { color:rgba(186,230,253,0.65); font-size:0.85rem; letter-spacing:2px; margin-top:6px; font-style:italic; }
        .accent-blue { height:4px; background:linear-gradient(90deg,#0369a1,#c9a84c,#0369a1); }

        /* kat pills */
        .kat-pills { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:18px; }
        .kat-pill {
          background:transparent; border:1.5px solid rgba(82,183,136,0.35);
          color:var(--g-sed); padding:5px 14px; border-radius:999px;
          font-family:'Lora',serif; font-size:0.78rem; cursor:pointer; transition:all 0.2s;
        }
        .kat-pill:hover { border-color:var(--g-muda); color:var(--g-tua); }
        .kat-pill.aktif { background:var(--g-sed); border-color:var(--g-sed); color:white; font-weight:600; }

        /* menu card pelanggan */
        .plg-menu-card {
          background:white; border-radius:10px; overflow:hidden;
          border:1px solid rgba(82,183,136,0.2);
          box-shadow:0 3px 14px rgba(26,61,43,0.07);
          animation: fadeUp 0.4s ease both;
          transition: transform 0.25s, box-shadow 0.25s;
          display:flex; flex-direction:column;
        }
        .plg-menu-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(26,61,43,0.14); }
        .plg-img { width:100%; height:150px; overflow:hidden; background:var(--g-pucat); position:relative; }
        .plg-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.3s; }
        .plg-menu-card:hover .plg-img img { transform:scale(1.06); }
        .plg-img-err { width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:4px; color:var(--g-sed); font-size:0.75rem; font-style:italic; opacity:0.6; }
        .plg-card-body { padding:12px 14px; flex:1; }
        .plg-card-name { font-family:'Playfair Display',serif; font-size:0.95rem; font-weight:600; color:var(--g-tua); line-height:1.3; margin-bottom:4px; }
        .plg-card-price { font-family:'Playfair Display',serif; color:var(--g-sed); font-size:1.05rem; font-weight:600; margin-top:6px; }
        .plg-card-footer { border-top:1px solid rgba(82,183,136,0.12); padding:10px 14px; }
        .add-btn {
          width:100%; background:linear-gradient(135deg,var(--g-sed),var(--g-tua));
          color:white; border:none; padding:8px; border-radius:6px;
          font-family:'Lora',serif; font-size:0.83rem; cursor:pointer; font-weight:600;
          transition:opacity 0.2s;
        }
        .add-btn:hover { opacity:0.88; }
        .add-btn:disabled { background:#ccc; cursor:not-allowed; }

        /* cart fab */
        .cart-fab {
          position:fixed; bottom:28px; right:28px; z-index:300;
          background:linear-gradient(135deg,var(--g-sed),var(--g-tua));
          color:white; border:none; border-radius:999px;
          padding:14px 20px; font-size:0.9rem; cursor:pointer;
          box-shadow:0 6px 24px rgba(26,61,43,0.35);
          display:flex; align-items:center; gap:8px; font-family:'Lora',serif; font-weight:600;
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .cart-fab:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(26,61,43,0.45); }
        .cart-fab-badge {
          background:var(--emas); color:var(--g-tua);
          border-radius:999px; padding:1px 7px; font-size:0.72rem; font-weight:700;
        }

        /* success toast */
        .toast {
          position:fixed; top:80px; left:50%; transform:translateX(-50%);
          background:var(--g-tua); color:white; padding:12px 24px; border-radius:999px;
          font-size:0.87rem; z-index:999; box-shadow:0 6px 20px rgba(0,0,0,0.2);
          animation:fadeIn 0.3s ease;
          border:1px solid var(--emas);
        }

        /* cart item */
        .cart-item {
          display:flex; align-items:center; gap:12px;
          padding:12px 0; border-bottom:1px solid rgba(82,183,136,0.12);
        }
        .cart-item:last-child { border-bottom:none; }
        .cart-item-name { flex:1; font-weight:600; color:var(--g-tua); font-size:0.88rem; }
        .cart-item-price { font-family:'Playfair Display',serif; color:var(--g-sed); font-size:0.95rem; }
        .qty-ctrl { display:flex; align-items:center; gap:6px; }
        .qty-btn { background:var(--g-pucat); border:none; width:26px; height:26px; border-radius:50%; cursor:pointer; font-size:0.9rem; color:var(--g-tua); font-weight:700; display:flex; align-items:center; justify-content:center; }
        .qty-num { font-weight:600; min-width:20px; text-align:center; }

        /* order card */
        .order-card { background:white; border-radius:10px; padding:16px; margin-bottom:12px; border:1px solid rgba(82,183,136,0.2); box-shadow:0 3px 12px rgba(26,61,43,0.06); }
        .order-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .order-id { font-family:'Playfair Display',serif; color:var(--g-tua); font-weight:600; }
        .order-meta { font-size:0.8rem; color:#999; margin-bottom:8px; }
        .order-total { font-family:'Playfair Display',serif; color:var(--g-sed); font-size:1.1rem; font-weight:600; }

        @media(max-width:640px) {
          .cart-fab { bottom:16px; right:16px; padding:12px 16px; }
        }
      `}</style>

      <div className="wrap">
        <Navbar role="pelanggan" username={user.name} onLogout={handleLogout} />

        <div className="plg-banner">
          <div className="plg-banner-title">Selamat Datang!</div>
          <div className="plg-banner-sub">Sugeng rawuh ing Warung Ngijo ✿</div>
        </div>
        <div className="accent-blue" />

        <div className="content">
          {/* Stats */}
          <div className="stats-row">
            {[
              { label: "Menu Tersedia", val: menus.filter((m) => Number(m.stock)>0).length, icon: "🍽️" },
              { label: "Keranjang", val: cartCount, icon: "🛒" },
              { label: "Total Pesanan", val: orders.length, icon: "📋" },
              { label: "Total Belanja", val: rupiah(orders.reduce((a,o)=>a+Number(o.total||0),0)), icon: "💰" },
            ].map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-val" style={{ fontSize: typeof s.val === "string" ? "1.1rem" : "1.7rem" }}>{s.val}</div>
              </div>
            ))}
          </div>

          {successMsg && <div className="toast">{successMsg}</div>}

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab-btn ${tab==="menu"?"active":""}`} onClick={() => setTab("menu")}>🍽️ Menu</button>
            <button className={`tab-btn ${tab==="orders"?"active":""}`} onClick={() => setTab("orders")}>📋 Pesanan Saya</button>
          </div>

          {/* ══ MENU TAB ══ */}
          {tab === "menu" && (
            <>
              {/* Search */}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:16, alignItems:"center" }}>
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input className="search-input" placeholder="Goleki menu..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>

              {/* Kategori pills */}
              <div className="kat-pills">
                {katList.map((k) => (
                  <button key={k} className={`kat-pill ${katAktif===k?"aktif":""}`} onClick={() => setKatAktif(k)}>{k}</button>
                ))}
              </div>

              {loading ? <div className="spinner"><span className="spin">🌿</span></div> : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
                  {filtered.length === 0 ? <p className="empty">Menu tidak ditemukan</p> :
                    filtered.map((m, i) => (
                      <div className="plg-menu-card" key={m.id_menu} style={{ animationDelay:`${i*0.04}s` }}>
                        <div className="plg-img">
                          {imgErrors.has(m.id_menu) || !m.image
                            ? <div className="plg-img-err">🖼️<span>Tidak ada gambar</span></div>
                            : <img src={BASE_IMG+m.image} alt={m.name} onError={() => setImgErrors((p) => new Set([...p,m.id_menu]))} />
                          }
                          {Number(m.stock)===0 && (
                            <span style={{ position:"absolute", top:8, right:0, background:"var(--merah)", color:"white", fontSize:"0.6rem", fontWeight:700, padding:"3px 8px", borderRadius:"2px 0 0 2px" }}>HABIS</span>
                          )}
                        </div>
                        <div className="plg-card-body">
                          <div className="plg-card-name">{m.name}</div>
                          {m.category?.category && <span className="badge badge-green" style={{ fontSize:"0.6rem" }}>{m.category.category}</span>}
                          <div className="plg-card-price">{rupiah(m.price)}</div>
                          <div style={{ fontSize:"0.75rem", color:"#aaa", marginTop:4 }}>Stok: {m.stock}</div>
                        </div>
                        <div className="plg-card-footer">
                          <button className="add-btn" disabled={Number(m.stock)===0} onClick={() => addToCart(m)}>
                            {Number(m.stock)===0 ? "Stok Habis" : "🛒 Tambah ke Keranjang"}
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </>
          )}

          {/* ══ ORDERS TAB ══ */}
          {tab === "orders" && (
            <>
              <div className="section-head">
                <div className="section-title-text">📋 Pesanan Saya</div>
                <div className="section-line" />
              </div>
              {loading ? <div className="spinner"><span className="spin">🌿</span></div> : (
                orders.length === 0 ? <div className="empty">Belum ada pesanan</div> :
                  orders.map((o) => (
                    <div className="order-card" key={o.id}>
                      <div className="order-card-head">
                        <div className="order-id">Order #{o.id}</div>
                        {orderStatusBadge(o.status || "pending")}
                      </div>
                      <div className="order-meta">📅 {o.created_at ? new Date(o.created_at).toLocaleDateString("id-ID") : "-"}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div className="order-total">{rupiah(o.total || 0)}</div>
                        <div style={{ display:"flex", gap:8 }}>
                          <button className="btn btn-outline btn-sm" onClick={() => { setSelectedOrder(o); setShowOrderDetail(true); }}>📋 Detail</button>
                          {(o.status === "pending" || !o.payment) && (
                            <button className="btn btn-gold btn-sm" onClick={() => { setSelectedOrder(o); setPayForm({ amount: o.total||"", method:"tunai" }); setFormError(""); setShowPayment(true); }}>
                              💳 Bayar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Cart FAB ── */}
      {cartCount > 0 && (
        <button className="cart-fab" onClick={() => setShowCart(true)}>
          🛒 Keranjang <span className="cart-fab-badge">{cartCount}</span>
        </button>
      )}

      {/* ═══ MODAL KERANJANG ═══ */}
      {showCart && (
        <Modal large title="🛒 Keranjang Belanja" onClose={() => setShowCart(false)}
          footer={<>
            <div style={{ flex:1, fontFamily:"'Playfair Display',serif", color:"var(--g-sed)", fontSize:"1.05rem", fontWeight:600 }}>
              Total: {rupiah(cartTotal)}
            </div>
            <button className="btn btn-outline" onClick={() => setShowCart(false)}>Tutup</button>
            <button className="btn btn-primary" disabled={cart.length===0} onClick={() => { setShowCart(false); setFormError(""); setShowCheckout(true); }}>
              ✅ Checkout
            </button>
          </>}
        >
          {cart.length === 0
            ? <div className="empty">Keranjang masih kosong</div>
            : cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-name">{item.name || item.menu?.name}</div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, Number(item.quantity)-1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, Number(item.quantity)+1)}>+</button>
                </div>
                <div className="cart-item-price">{rupiah(Number(item.price||0)*Number(item.quantity||1))}</div>
                <button className="btn btn-danger btn-sm" onClick={() => { setRemoveItemId(item.id); setShowConfirmRemove(true); }}>🗑️</button>
              </div>
            ))
          }
        </Modal>
      )}

      {/* ═══ CONFIRM CHECKOUT ═══ */}
      {showCheckout && (
        <ConfirmModal
          icon="🧾"
          message={`Konfirmasi checkout dengan total <strong>${rupiah(cartTotal)}</strong>?`}
          onConfirm={handleCheckout}
          onCancel={() => setShowCheckout(false)}
          confirmLabel={formLoading ? "Memproses..." : "✅ Ya, Checkout"}
          confirmClass="btn btn-primary"
        />
      )}

      {/* ═══ CONFIRM HAPUS ITEM ═══ */}
      {showConfirmRemove && (
        <ConfirmModal
          icon="🗑️"
          message="Hapus item ini dari keranjang?"
          onConfirm={removeFromCart}
          onCancel={() => setShowConfirmRemove(false)}
          confirmLabel="Hapus"
        />
      )}

      {/* ═══ MODAL PEMBAYARAN ═══ */}
      {showPayment && selectedOrder && (
        <Modal title={`💳 Pembayaran — Order #${selectedOrder.id}`} onClose={() => setShowPayment(false)}
          footer={<>
            <button className="btn btn-outline" onClick={() => setShowPayment(false)}>Batal</button>
            <button className="btn btn-gold" onClick={() => handlePayment(selectedOrder.id)} disabled={formLoading}>
              {formLoading ? "Memproses..." : "💳 Bayar Sekarang"}
            </button>
          </>}
        >
          <div style={{ background:"var(--g-pucat)", borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
            <div style={{ fontSize:"0.78rem", color:"var(--g-sed)", textTransform:"uppercase", letterSpacing:1 }}>Total Tagihan</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem", color:"var(--g-tua)", fontWeight:700 }}>{rupiah(selectedOrder.total||0)}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Jumlah Dibayar (Rp)</label>
            <input className="form-input" type="number" value={payForm.amount}
              onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })} placeholder={selectedOrder.total} />
          </div>
          <div className="form-group">
            <label className="form-label">Metode Pembayaran</label>
            <select className="form-select" value={payForm.method} onChange={(e) => setPayForm({ ...payForm, method: e.target.value })}>
              <option value="tunai">💵 Tunai</option>
              <option value="transfer">🏦 Transfer Bank</option>
              <option value="qris">📱 QRIS</option>
            </select>
          </div>
          {formError && <p style={{ color:"var(--merah)", fontSize:"0.82rem" }}>{formError}</p>}
        </Modal>
      )}

      {/* ═══ MODAL ORDER DETAIL ═══ */}
      {showOrderDetail && selectedOrder && (
        <Modal large title={`📋 Detail Order #${selectedOrder.id}`} onClose={() => setShowOrderDetail(false)}
          footer={<button className="btn btn-outline" onClick={() => setShowOrderDetail(false)}>Tutup</button>}
        >
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#999", fontSize:"0.8rem" }}>Status</span>
              {orderStatusBadge(selectedOrder.status||"pending")}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#999", fontSize:"0.8rem" }}>Tanggal</span>
              <span style={{ fontSize:"0.85rem" }}>{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString("id-ID",{dateStyle:"long"}) : "-"}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"#999", fontSize:"0.8rem" }}>Meja</span>
              <span style={{ fontSize:"0.85rem" }}>{selectedOrder.nomor_meja || selectedOrder.meja?.nomor_meja || "-"}</span>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(82,183,136,0.15)", paddingTop:14, marginBottom:14 }}>
            {(selectedOrder.items || selectedOrder.order_items || []).map((item, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(82,183,136,0.1)", fontSize:"0.86rem" }}>
                <span>{item.name || item.menu?.name} × {item.quantity}</span>
                <span style={{ fontWeight:600, color:"var(--g-sed)" }}>{rupiah(Number(item.price||0)*Number(item.quantity||1))}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", color:"#555", fontSize:"0.9rem" }}>Total</span>
            <span style={{ fontFamily:"'Playfair Display',serif", color:"var(--g-sed)", fontSize:"1.3rem", fontWeight:700 }}>{rupiah(selectedOrder.total||0)}</span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PelangganDashboard;