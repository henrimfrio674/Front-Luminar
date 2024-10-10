import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import { MagnifyingGlass, ShoppingCart } from '@phosphor-icons/react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ isAdmin, setIsAdmin }: NavbarProps) {
  let navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar o menu hambúrguer

  function logout() {
    handleLogout();
    alert('User successfully logged out');
    navigate('/login');
  }

  function toggleAdminMode() {
    setIsAdmin(!isAdmin); // Alterna o modo administrador
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen); // Abre/fecha o menu hambúrguer
  }

  function closeSidebar() {
    setIsSidebarOpen(false); // Fecha o menu hambúrguer
  }

  // Verifica se o usuário está logado antes de renderizar o Navbar
  if (!user || !user.token) {
    return null; // Retorna null para não renderizar o Navbar se o usuário não estiver logado
  }

  return (
    <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={'/home'}>
            <img src={logo} alt="Luminar logo" className="h-16" />
          </Link>
          {/* Barra de pesquisa, oculta em telas pequenas */}
          <div className="hidden md:flex items-center bg-indigo-700 rounded-full px-4 py-2">
            <MagnifyingGlass size={20} className="text-gray-400" style={{ cursor: 'pointer' }} />
            <input
              type='text'
              placeholder='Pesquisar produto'
              className='bg-transparent text-white ml-2 outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Ícone de menu hambúrguer para telas pequenas */}
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Links de navegação visíveis apenas em telas maiores */}
        <div className="hidden md:flex items-center gap-8">
          <Link to='/product' className='hover:underline'>Produtos</Link>

          {isAdmin ? (
            <>
              <Link to='/registerProduct' className='hover:underline'>Cadastrar Produto</Link>
              <Link to='/registerCategory' className='hover:underline'>Cadastrar Categoria</Link>
            </>
          ) : (
            <Link to='/shopping' className='hover:underline'>
              <ShoppingCart size={24} className='text-white cursor-pointer' />
            </Link>
          )}

          <button onClick={toggleAdminMode} className='hover:underline'>
            {isAdmin ? 'Modo Cliente' : 'Modo Administrador'}
          </button>

          <Link to='' onClick={logout} className='hover:underline'>Logout</Link>
        </div>
      </div>

      {/* Menu hambúrguer para telas pequenas */}
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-900 text-white transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-50`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={closeSidebar} className="text-white">
            &times;
          </button>
        </div>
        <nav className="flex flex-col p-4">
          <Link to="/product" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Produtos</Link>
          {isAdmin && (
            <>
              <Link to="/registerProduct" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Cadastrar Produto</Link>
              <Link to="/registerCategory" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Cadastrar Categoria</Link>
            </>
          )}
          {!isAdmin && (
            <Link to="/shopping" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>
              Compras
            </Link>
          )}
          <button onClick={toggleAdminMode} className='hover:underline py-2'>
            {isAdmin ? 'Modo Cliente' : 'Modo Administrador'}
          </button>
          <Link to="" onClick={() => { closeSidebar(); logout(); }} className="hover:text-[#FFDE59] py-2">Logout</Link>
        </nav>
      </div>

      {/* Background overlay when Sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
