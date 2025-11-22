import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

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

    const fetchProduct = async () => {
      const res = await API.get("/products");
      const p = res.data.find(pr => pr.id === Number(selectedProductId));
      setProduct(p);
    };

    fetchProduct();

    const fetchMyProducts = async () => {
      const res = await API.get("/products");
      setMyProducts(res.data.filter(pr => pr.owner_id === u.id));
    };
    fetchMyProducts();
  }, [selectedProductId]);

  if (!product || !user) return <p>Cargando...</p>;

  if (product.owner_id === user.id) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link to="/productos">⬅ Volver</Link>
        <h2>No puedes intercambiar tu propio producto ❌</h2>
      </div>
    );
  }

  const requestTrade = async (myItem) => {
    await API.post("/trades", {
      user_product_id: myItem.id,
      target_product_id: product.id,
      requester_id: user.id,
      receiver_id: product.owner_id
    });
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
          <div key={item.id}>
            <strong>{item.title}</strong>
            <button onClick={() => requestTrade(item)}>Ofrecer este producto</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Intercambios;
