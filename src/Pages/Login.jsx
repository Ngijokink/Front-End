import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/Axios.js";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  :root {
    --hijau-tua: #1a3d2b;
    --hijau-sedang: #2d6a4f;
    --hijau-muda: #52b788;
    --hijau-terang: #95d5b2;
    --hijau-pucat: #d8f3dc;
    --krem: #fefae0;
    --coklat-muda: #e0c49a;
    --emas: #c9a84c;
    --emas-muda: #f0d080;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-page {
    min-height: 100vh;
    display: flex;
    font-family: 'Lora', serif;
    background: var(--hijau-tua);
    position: relative;
    overflow: hidden;
  }

  /* PANEL KIRI — ilustrasi/branding */
  .login-left {
    display: none;
    flex: 1;
    background: linear-gradient(160deg, var(--hijau-tua) 0%, var(--hijau-sedang) 100%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 48px;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .login-left { display: flex; }
  }

  /* motif lingkaran dekoratif */
  .deco-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .deco-c1 { width: 500px; height: 500px; top: -160px; left: -160px; }
  .deco-c2 { width: 340px; height: 340px; bottom: -100px; right: -100px; }
  .deco-c3 { width: 200px; height: 200px; top: 40%; left: 40%; }

  .left-logo {
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    color: var(--emas-muda);
    letter-spacing: 8px;
    text-align: center;
    text-shadow: 0 0 60px rgba(201,168,76,0.35);
    line-height: 1;
    position: relative;
    z-index: 1;
  }

  .left-sub {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--hijau-terang);
    letter-spacing: 3px;
    font-size: 0.9rem;
    margin-top: 10px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .left-ornamen {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 24px 0;
    position: relative;
    z-index: 1;
  }

  .left-ornamen-garis {
    width: 80px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--emas));
  }
  .left-ornamen-garis.kanan {
    background: linear-gradient(to left, transparent, var(--emas));
  }

  .left-ornamen span { color: var(--emas); font-size: 1.1rem; }

  .left-tagline {
    color: var(--coklat-muda);
    font-style: italic;
    font-size: 1rem;
    text-align: center;
    max-width: 260px;
    line-height: 1.7;
    opacity: 0.85;
    position: relative;
    z-index: 1;
  }

  /* badge bawah kiri */
  .left-badge {
    position: absolute;
    bottom: 32px;
    display: flex;
    gap: 6px;
    z-index: 1;
  }

  .badge-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--emas);
    opacity: 0.5;
  }
  .badge-dot.aktif { opacity: 1; }

  /* PANEL KANAN — form */
  .login-right {
    width: 100%;
    max-width: 440px;
    background: var(--krem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    position: relative;
    z-index: 2;
    box-shadow: -8px 0 40px rgba(0,0,0,0.3);
  }

  @media (max-width: 767px) {
    .login-right {
      max-width: 100%;
      min-height: 100vh;
      padding: 48px 28px;
    }
  }

  /* batik strip atas kanan */
  .batik-strip {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: repeating-linear-gradient(
      90deg,
      var(--hijau-tua) 0px, var(--hijau-tua) 12px,
      var(--emas) 12px, var(--emas) 24px
    );
  }

  .form-logo-mobile {
    display: block;
    text-align: center;
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    .form-logo-mobile { display: none; }
  }

  .form-logo-mobile h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--hijau-tua);
    letter-spacing: 5px;
  }

  .form-logo-mobile p {
    font-style: italic;
    color: var(--hijau-sedang);
    font-size: 0.85rem;
    letter-spacing: 2px;
    margin-top: 4px;
  }

  /* form header */
  .form-header {
    width: 100%;
    margin-bottom: 32px;
  }

  .form-greeting {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: var(--hijau-tua);
    font-weight: 600;
    line-height: 1.2;
  }

  .form-sub {
    color: var(--hijau-sedang);
    font-size: 0.88rem;
    margin-top: 6px;
    font-style: italic;
    opacity: 0.8;
  }

  /* form elements */
  .form-group {
    width: 100%;
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--hijau-tua);
    margin-bottom: 8px;
  }

  .form-input-wrap {
    position: relative;
  }

  .form-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: var(--hijau-muda);
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1.5px solid var(--hijau-terang);
    border-radius: 6px;
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    background: white;
    color: var(--hijau-tua);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input:focus {
    border-color: var(--hijau-sedang);
    box-shadow: 0 0 0 3px rgba(82,183,136,0.15);
  }

  .form-input::placeholder { color: #bbb; font-style: italic; }

  /* show/hide password */
  .show-pass {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--hijau-muda);
    padding: 0;
    line-height: 1;
  }

  /* error message */
  .form-error {
    background: #fff5f5;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    padding: 10px 14px;
    color: #b91c1c;
    font-size: 0.85rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: shake 0.3s ease;
    width: 100%;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  /* tombol login */
  .btn-login {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, var(--hijau-sedang), var(--hijau-tua));
    color: white;
    border: none;
    border-radius: 6px;
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 2px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 4px;
    position: relative;
    overflow: hidden;
  }

  .btn-login::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; right: 100%; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left 0.4s, right 0.4s;
  }

  .btn-login:hover::after { left: 0; right: 0; }
  .btn-login:hover { opacity: 0.92; }
  .btn-login:active { transform: scale(0.98); }
  .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

  /* loading spinner */
  .spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ornamen bawah form */
  .form-ornamen {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0 0;
    width: 100%;
  }

  .form-ornamen-garis {
    flex: 1;
    height: 1px;
    background: var(--hijau-terang);
    opacity: 0.5;
  }

  .form-ornamen span { color: var(--emas); font-size: 0.9rem; }

  .form-footer-text {
    text-align: center;
    margin-top: 16px;
    font-size: 0.78rem;
    color: var(--hijau-sedang);
    font-style: italic;
    opacity: 0.75;
    letter-spacing: 0.5px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { email: email.trim(), password });

      if (res.status === 204 || !res.data) {
        setError("Server tidak mengembalikan data. Hubungi admin.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Email atau password salah. Coba maneh, Mas/Mbak.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">

        {/* PANEL KIRI */}
        <div className="login-left">
          <div className="deco-circle deco-c1" />
          <div className="deco-circle deco-c2" />
          <div className="deco-circle deco-c3" />

          <div className="left-logo">Ngijo</div>
          <div className="left-sub">Warung Makan Tradisional</div>

          <div className="left-ornamen">
            <div className="left-ornamen-garis" />
            <span>✿</span>
            <div className="left-ornamen-garis kanan" />
          </div>

          <p className="left-tagline">
            "Sego panas, sambel mantap,<br />
            lan suwasana sing ora terlupakan."
          </p>

          <div className="left-badge">
            <div className="badge-dot aktif" />
            <div className="badge-dot" />
            <div className="badge-dot" />
          </div>
        </div>

        {/* PANEL KANAN */}
        <div className="login-right">
          <div className="batik-strip" />

          {/* Logo mobile only */}
          <div className="form-logo-mobile">
            <h1>Ngijo</h1>
            <p>Warung Makan Tradisional</p>
          </div>

          <div className="form-header">
            <div className="form-greeting">Sugeng Rawuh 🌿</div>
            <p className="form-sub">Masuk untuk kelola warung sampeyan</p>
          </div>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            {/* ERROR */}
            {error && (
              <div className="form-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input-wrap">
                <span className="form-icon">✉️</span>
                <input
                  className="form-input"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrap">
                <span className="form-icon">🔒</span>
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Kata sandi sampeyan"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="show-pass"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* TOMBOL */}
            <button className="btn-login" type="submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? "Sabar..." : "Mlebu · Masuk"}
            </button>
          </form>

          <div className="form-ornamen">
            <div className="form-ornamen-garis" />
            <span>✿</span>
            <div className="form-ornamen-garis" />
          </div>

          <p className="form-footer-text">
            Warung Ngijo · Mlaku, Mangan, Marisi
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;