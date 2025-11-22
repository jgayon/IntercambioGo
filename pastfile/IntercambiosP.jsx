import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Intercambios() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const selectedProductId = query.get("producto");

  const [product, setProduct] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    const localProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");
    setMyProducts(localProducts);

    const local = localProducts.find(p => p.id === Number(selectedProductId));

    if (local) setProduct(local);
    else {
      fetch(`https://dummyjson.com/products/${selectedProductId}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, []);

  if (!product || !user) return <p>Cargando...</p>;

  // ❌ No intercambiar contigo mismo
  if (product.owner === user.email) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link to="/productos">⬅ Volver</Link>
        <h2>No puedes intercambiar tu propio producto ❌</h2>
      </div>
    );
  }

  const requestTrade = (myItem) => {
    const trades = JSON.parse(localStorage.getItem("trades") || "[]");

    const newTrade = {
      id: Date.now(),
      userProduct: myItem,
      targetProduct: product,
      status: "pendiente"
    };

    localStorage.setItem("trades", JSON.stringify([...trades, newTrade]));
    alert("Solicitud enviada ✔");
    navigate("/mis-intercambios");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/productos">⬅ Volver</Link>
      <h2>Proponer intercambio</h2>

      <h3>Producto seleccionado:</h3>
      <p>{product.title}</p>

      <h3>Elige uno de tus productos:</h3>

      {myProducts.length === 0 ? (
        <p>No tienes productos. <Link to="/subir-producto">Sube uno</Link></p>
      ) : (
        myProducts.map(item => (
          <div key={item.id} style={{ margin: "1rem 0" }}>
            <strong>{item.title}</strong>
            <br />
            <button
              onClick={() => requestTrade(item)}
              style={{
                background: "#00bfa5",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
              }}
            >
              Ofrecer este producto
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Intercambios;
