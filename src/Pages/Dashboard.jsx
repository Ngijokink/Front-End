import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/Axios";

const batikPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='2' fill='%2322543d' opacity='0.15'/%3E%3Ccircle cx='0' cy='0' r='2' fill='%2322543d' opacity='0.15'/%3E%3Ccircle cx='60' cy='0' r='2' fill='%2322543d' opacity='0.15'/%3E%3Ccircle cx='0' cy='60' r='2' fill='%2322543d' opacity='0.15'/%3E%3Ccircle cx='60' cy='60' r='2' fill='%2322543d' opacity='0.15'/%3E%3Cpath d='M15 30 Q30 15 45 30 Q30 45 15 30Z' fill='none' stroke='%2322543d' stroke-width='0.8' opacity='0.1'/%3E%3C/svg%3E")`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=Noto+Serif+Javanese&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  :root {
    --hijau-tua: #1a3d2b;
    --hijau-sedang: #2d6a4f;
    --hijau-muda: #52b788;
    --hijau-terang: #95d5b2;
    --hijau-pucat: #d8f3dc;
    --krem: #fefae0;
    --coklat: #7f4f24;
    --coklat-muda: #e0c49a;
    --emas: #c9a84c;
    --emas-muda: #f0d080;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--krem);
  }

  .ngijo-wrapper {
    min-height: 100vh;
    background-color: var(--krem);
    background-image: ${batikPattern};
    font-family: 'Lora', serif;
    position: relative;
    overflow-x: hidden;
  }

  .topbar {
    max-width: 900px;
    margin: 0 auto;
    padding: 18px 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .welcome-chip {
    background: rgba(254, 250, 224, 0.9);
    border: 1px solid var(--hijau-terang);
    color: var(--hijau-tua);
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }

  .logout-btn {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: transparent;
    color: white;
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background: rgba(255,255,255,0.12);
  }


  /* HEADER */
  .ngijo-header {
    background: var(--hijau-tua);
    position: relative;
    padding: 0;
    overflow: hidden;
  }

  .header-banner {
    background: linear-gradient(135deg, var(--hijau-tua) 0%, var(--hijau-sedang) 60%, var(--hijau-tua) 100%);
    padding: 40px 24px 32px;
    text-align: center;
    position: relative;
  }

  .header-banner::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 8px,
      rgba(255,255,255,0.03) 8px,
      rgba(255,255,255,0.03) 16px
    );
  }

  .ornamen-atas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  .ornamen-garis {
    flex: 1;
    max-width: 120px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--emas), transparent);
  }

  .ornamen-bunga {
    color: var(--emas);
    font-size: 20px;
  }

  .resto-nama {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 8vw, 5rem);
    font-weight: 600;
    color: var(--emas-muda);
    letter-spacing: 6px;
    text-transform: uppercase;
    line-height: 1;
    text-shadow: 0 0 40px rgba(201,168,76,0.4);
  }

  .resto-sub {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--hijau-terang);
    font-size: 1rem;
    letter-spacing: 3px;
    margin-top: 6px;
    opacity: 0.9;
  }

  .header-tagline {
    margin-top: 12px;
    color: var(--coklat-muda);
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  /* BORDER BATIK BAWAH HEADER */
  .batik-border {
    height: 24px;
    background: var(--emas);
    position: relative;
    overflow: hidden;
  }

  .batik-border::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: repeating-linear-gradient(
      90deg,
      var(--hijau-tua) 0px,
      var(--hijau-tua) 12px,
      var(--emas) 12px,
      var(--emas) 24px
    );
    opacity: 0.5;
  }

  /* KATEGORI NAV */
  .kategori-nav {
    background: var(--hijau-sedang);
    padding: 12px 16px;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 3px solid var(--emas);
  }

  .kategori-btn {
    background: transparent;
    border: 1px solid var(--hijau-terang);
    color: var(--hijau-pucat);
    padding: 6px 18px;
    border-radius: 999px;
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    letter-spacing: 1px;
  }

  .kategori-btn:hover,
  .kategori-btn.aktif {
    background: var(--emas);
    border-color: var(--emas);
    color: var(--hijau-tua);
    font-weight: 600;
  }

  /* KONTEN UTAMA */
  .ngijo-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 16px 60px;
  }



  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: white;
    border: 1px solid rgba(82, 183, 136, 0.3);
    border-radius: 10px;
    padding: 14px 16px;
    box-shadow: 0 4px 14px rgba(26,61,43,0.08);
  }

  .stat-label {
    color: var(--hijau-sedang);
    font-size: 0.78rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .stat-value {
    font-family: 'Playfair Display', serif;
    color: var(--hijau-tua);
    font-size: 1.55rem;
    margin-top: 6px;
    line-height: 1;
  }

  /* SECTION TITLE */
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 32px 0 20px;
  }

  .section-title span {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: var(--hijau-tua);
    font-weight: 600;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--hijau-sedang), transparent);
  }

  .section-leaf {
    color: var(--hijau-sedang);
    font-size: 1.2rem;
  }

  /* GRID MENU */
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }

  /* KARTU MENU */
  .menu-card {
    background: white;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(82, 183, 136, 0.25);
    box-shadow: 0 4px 20px rgba(26,61,43,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    animation: fadeUp 0.5s ease both;
  }

  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26,61,43,0.18);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ACCENT BAR KIRI */
  .menu-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, var(--hijau-muda), var(--hijau-sedang));
  }

  .menu-card-header {
    background: linear-gradient(135deg, var(--hijau-tua), var(--hijau-sedang));
    padding: 18px 18px 14px 20px;
    position: relative;
    overflow: hidden;
  }

  .menu-card-header::after {
    content: '✿';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.1);
    font-size: 2rem;
  }

  .menu-nama {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #fff;
    font-weight: 600;
    line-height: 1.3;
    padding-right: 28px;
  }

  .menu-badge {
    display: inline-block;
    background: var(--emas);
    color: var(--hijau-tua);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 2px;
    margin-top: 6px;
  }

  .menu-card-body {
    padding: 14px 18px 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .menu-harga {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: var(--hijau-sedang);
    font-weight: 600;
  }

  .menu-harga-label {
    font-size: 0.7rem;
    color: #999;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 2px;
    font-family: 'Lora', serif;
  }

  .menu-stok {
    text-align: right;
  }

  .stok-angka {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--hijau-muda);
    line-height: 1;
  }

  .stok-label {
    font-size: 0.65rem;
    color: #aaa;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Lora', serif;
  }

  .stok-habis .stok-angka { color: #e57373; }
  .stok-habis .stok-label { color: #e57373; }
  .stok-habis-tag {
    position: absolute;
    top: 12px;
    right: -1px;
    background: #e57373;
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 4px 10px;
    text-transform: uppercase;
  }

  .menu-divider {
    height: 1px;
    background: linear-gradient(to right, var(--hijau-pucat), transparent);
    margin: 0 18px 0 20px;
  }

  /* LOADING */
  .loading-wrap {
    text-align: center;
    padding: 80px 20px;
  }

  .loading-daun {
    font-size: 3rem;
    animation: spin 1.5s linear infinite;
    display: block;
    margin-bottom: 16px;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .loading-text {
    color: var(--hijau-sedang);
    font-style: italic;
    font-size: 1rem;
  }

  /* KOSONG */
  .empty-state {
    text-align: center;
    padding: 80px 20px;
    color: var(--hijau-sedang);
  }

  .empty-state .besar { font-size: 4rem; margin-bottom: 16px; }
  .empty-state p { font-style: italic; opacity: 0.7; }

  /* FOOTER */
  .ngijo-footer {
    text-align: center;
    padding: 24px;
    background: var(--hijau-tua);
    color: var(--hijau-terang);
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-family: 'Lora', serif;
    font-style: italic;
  }

  /* SEARCH BAR */
  .search-wrap {
    max-width: 400px;
    margin: 0 auto 8px;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 10px 16px 10px 42px;
    border: 2px solid var(--hijau-terang);
    border-radius: 999px;
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    background: white;
    color: var(--hijau-tua);
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus { border-color: var(--hijau-sedang); }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--hijau-muda);
    font-size: 1rem;
  }

  /* INFO JUMLAH */
  .info-jumlah {
    text-align: center;
    color: var(--hijau-sedang);
    font-size: 0.82rem;
    margin-bottom: 24px;
    font-style: italic;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .menu-grid { grid-template-columns: 1fr; }
    .resto-nama { font-size: 2.5rem; }
  }
`;

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

// Data dummy jika API belum tersedia
const dummyMenus = [
  { id_menu: 1, menu: "Nasi Liwet Jawa", price: 18000, stock: 25, kategori: "Nasi" },
  { id_menu: 2, menu: "Ayam Bakar Kecap", price: 25000, stock: 15, kategori: "Lauk" },
  { id_menu: 3, menu: "Tempe Orek Pedas", price: 8000, stock: 30, kategori: "Lauk" },
  { id_menu: 4, menu: "Sayur Lodeh Terong", price: 10000, stock: 0, kategori: "Sayur" },
  { id_menu: 5, menu: "Es Dawet Ngijo", price: 8000, stock: 20, kategori: "Minuman" },
  { id_menu: 6, menu: "Teh Poci Gulo Batu", price: 6000, stock: 50, kategori: "Minuman" },
  { id_menu: 7, menu: "Pecel Lele Sambal Ijo", price: 22000, stock: 10, kategori: "Lauk" },
  { id_menu: 8, menu: "Gudeg Yu Djum", price: 20000, stock: 8, kategori: "Nasi" },
];

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/menus")
      .then((res) => {
        const data = res.data.data;
        setMenus(Array.isArray(data) ? data : dummyMenus);
      })
      .catch(() => {
        setMenus(dummyMenus); // fallback dummy
      })
      .finally(() => setLoading(false));
  }, []);

  const kategoriList = [
    "Semua",
    ...Array.from(new Set(menus.map((m) => m.kategori).filter(Boolean))),
  ];

  const filtered = menus.filter((m) => {
    const cocokKategori =
      kategoriAktif === "Semua" || m.kategori === kategoriAktif;
    const cocokSearch = m.menu
      .toLowerCase()
      .includes(search.toLowerCase());
    return cocokKategori && cocokSearch;
  });

  const totalStok = useMemo(
    () => filtered.reduce((acc, item) => acc + Number(item.stock || 0), 0),
    [filtered],
  );

  const stokHabis = useMemo(
    () => filtered.filter((item) => Number(item.stock) === 0).length,
    [filtered],
  );

  const hargaRataRata = useMemo(() => {
    if (!filtered.length) return 0;
    const totalHarga = filtered.reduce((acc, item) => acc + Number(item.price || 0), 0);
    return Math.round(totalHarga / filtered.length);
  }, [filtered]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ngijo-wrapper">
        {/* HEADER */}
        <header className="ngijo-header">
          <div className="topbar">
            <div className="welcome-chip">👋 Sugeng rawuh, Admin Ngijo</div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <div className="header-banner">
            <div className="ornamen-atas">
              <div className="ornamen-garis" />
              <span className="ornamen-bunga">✿</span>
              <div className="ornamen-garis" />
            </div>
            <h1 className="resto-nama">Ngijo</h1>
            <p className="resto-sub">Warung Makan Tradisional</p>
            <p className="header-tagline">Mlaku · Mangan · Marisi</p>
          </div>
          <div className="batik-border" />
        </header>

        {/* KATEGORI */}
        {!loading && (
          <nav className="kategori-nav">
            {kategoriList.map((k) => (
              <button
                key={k}
                className={`kategori-btn ${kategoriAktif === k ? "aktif" : ""}`}
                onClick={() => setKategoriAktif(k)}
              >
                {k}
              </button>
            ))}
          </nav>
        )}

        {/* KONTEN */}
        <main className="ngijo-content">
          {loading ? (
            <div className="loading-wrap">
              <span className="loading-daun">🌿</span>
              <p className="loading-text">Nyiapke menu sabar ya, Mas/Mbak...</p>
            </div>
          ) : (
            <>
              {/* SEARCH */}
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Goleki menu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Menu tampil</div>
                  <div className="stat-value">{filtered.length}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Total stok</div>
                  <div className="stat-value">{totalStok}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Stok habis</div>
                  <div className="stat-value">{stokHabis}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Rata-rata harga</div>
                  <div className="stat-value">{formatRupiah(hargaRataRata)}</div>
                </div>
              </div>

              <p className="info-jumlah">
                {filtered.length} menu ditemukan
              </p>

              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="besar">🍃</div>
                  <p>Waduh, menu e ora ketemu...</p>
                </div>
              ) : (
                <>
                  <div className="section-title">
                    <span className="section-leaf">🌿</span>
                    <span>
                      {kategoriAktif === "Semua"
                        ? "Daftar Menu"
                        : kategoriAktif}
                    </span>
                    <div className="section-line" />
                  </div>

                  <div className="menu-grid">
                    {filtered.map((m, i) => (
                      <div
                        className="menu-card"
                        key={m.id_menu}
                        style={{ animationDelay: `${i * 0.07}s` }}
                      >
                        {m.stock === 0 && (
                          <div className="stok-habis-tag">Habis</div>
                        )}
                        <div className="menu-card-header">
                          <div className="menu-nama">{m.menu}</div>
                          {m.kategori && (
                            <span className="menu-badge">{m.kategori}</span>
                          )}
                        </div>
                        <div className="menu-divider" />
                        <div className="menu-card-body">
                          <div>
                            <span className="menu-harga-label">Harga</span>
                            <div className="menu-harga">
                              {formatRupiah(m.price)}
                            </div>
                          </div>
                          <div
                            className={`menu-stok ${m.stock === 0 ? "stok-habis" : ""}`}
                          >
                            <div className="stok-angka">{m.stock}</div>
                            <div className="stok-label">Stok</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </main>

        {/* FOOTER */}
        <footer className="ngijo-footer">
          ✿ &nbsp; Salam seko Warung Ngijo &nbsp; ✿
        </footer>
      </div>
    </>
  );
};

export default Menu;