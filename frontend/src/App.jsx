import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import LoginRegister from './components/LoginRegister';
import EditarPerfil from './components/EditarPerfil';
import Perfil from './components/Perfil';
import ProductDetail from "./components/ProductDetail";
import UploadProduct from "./components/UploadProduct";
import Intercambios from "./components/Intercambios";
import Chat from "./components/Chat";
import IntercambioPanel from "./components/IntercambioPanel";
import Membresia from "./components/Membresia";

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/subir-producto" element={<UploadProduct />} />
          <Route path="/intercambios" element={<Intercambios />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/mis-intercambios" element={<IntercambioPanel />} />
          <Route path="/membresia" element={<Membresia />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
