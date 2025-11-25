// function Footer() {
//   return (
//     <footer style={{
//       background: "#004d40",
//       padding: "1rem",
//       marginTop: "2rem",
//       color: "white",
//       textAlign: "center"
//     }}>
//       © {new Date().getFullYear()} IntercambioGo — Consumo sostenible ♻
//     </footer>
//   );
// }

// export default Footer;

// Footer.jsx
import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#009688', // El color verde oscuro de la imagen
    color: 'white',
    padding: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    // margin-top: 'auto' se maneja mejor en el app-shell/app-main de App.jsx
  };

  return (
    <footer style={footerStyle}>
      © 2025 IntercambioGo — Consumo sostenible ♻
    </footer>
  );
}

export default Footer;