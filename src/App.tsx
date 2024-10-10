import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DeleteCategory from './components/category/deleteCategory/DeleteCategory';
import CategoryForm from './components/category/categoryForms/CategoryForm';
import ListCategories from './components/category/listCategories/ListCategories';
import SingUp from './pages/singUp/SingUp';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login/Login';
import ProductList from './components/product/productList/ProductList';
import DeleteProduct from './components/product/deleteProduct/DeleteProduct';
import ProductForm from './components/product/productForm/ProductForm';
import Profille from './pages/profille/Profille';
import { Home } from './pages/home/Home';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
// import Parabens from './pages/parabens/Parabens';  // Importar a nova página "Parabéns"
// import Obrigado from './pages/obrigado/Obrigado';  // Importar a nova página "Obrigado"
import { CartProvider } from './contexts/CartContext'; // Importar o CartProvider
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Definindo o estado de isAdmin

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
          <ToastContainer />
            <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} /> {/* Passando o estado isAdmin */}
            <div className="min-h-[80vh] bg-white">
              <Routes>
                <Route path="/" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SingUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/category" element={<ListCategories />} />
                <Route path="/registerCategory" element={<CategoryForm />} />
                <Route path="/updateCategory/:id" element={<CategoryForm />} />
                <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
                <Route path="/product" element={<ProductList isAdmin={isAdmin} />} /> {/* Passando isAdmin */}
                <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
                <Route path="/registerProduct" element={<ProductForm />} />
                <Route path="/editProduct/:id" element={<ProductForm />} />
                <Route path="/user" element={<Profille />} />
                <Route path="/shopping" element={<ShoppingCart />} />
               {/* <Route path="/parabens" element={<Parabens />} />  Nova rota para Parabéns */}
               {/* <Route path="/obrigado" element={<Obrigado />} />  Nova rota para Obrigado */}
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
