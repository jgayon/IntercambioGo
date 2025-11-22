import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api/axios";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email: formData.email, password: formData.password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(`✅ Bienvenido ${res.data.user.name}`);
        navigate("/perfil");
      } else {
        const res = await API.post("/auth/register", { name: formData.name, email: formData.email, password: formData.password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(`🎉 Usuario registrado: ${res.data.user.name}`);
        navigate("/perfil");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error de autenticación");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #1de9b6, #00bfa5)' }}>
      <div style={{ background: '#fff', padding: '2rem 3rem', borderRadius: '10px', width: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#00bfa5' }}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label>Nombre completo</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <label>Correo electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Contraseña</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">{isLogin ? 'Entrar' : 'Registrarse'}</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {isLogin ? (
            <span onClick={() => setIsLogin(false)}>Regístrate aquí</span>
          ) : (
            <span onClick={() => setIsLogin(true)}>Inicia sesión</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
