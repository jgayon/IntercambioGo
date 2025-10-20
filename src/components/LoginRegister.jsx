import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        alert(`✅ Inicio de sesión exitoso: ${storedUser.name}`);
        localStorage.setItem('loggedIn', 'true');
        navigate('/perfil');
      } else {
        alert('❌ Credenciales incorrectas o usuario no registrado');
      }
    } else {
      // REGISTRO
      localStorage.setItem('user', JSON.stringify(formData));
      localStorage.setItem('loggedIn', 'true');
      alert(`🎉 Usuario registrado: ${formData.name}`);
      navigate('/perfil');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #1de9b6, #00bfa5)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem 3rem',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#00bfa5' }}>
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#00bfa5',
              color: '#fff',
              padding: '0.7rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {isLogin ? (
            <p>
              ¿No tienes una cuenta?{' '}
              <span
                style={{ color: '#00bfa5', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setIsLogin(false)}
              >
                Regístrate aquí
              </span>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <span
                style={{ color: '#00bfa5', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setIsLogin(true)}
              >
                Inicia sesión
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;