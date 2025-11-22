function Footer() {
  return (
    <footer style={{
      background: "#004d40",
      padding: "1rem",
      marginTop: "2rem",
      color: "white",
      textAlign: "center"
    }}>
      © {new Date().getFullYear()} IntercambioGo — Consumo sostenible ♻
    </footer>
  );
}

export default Footer;