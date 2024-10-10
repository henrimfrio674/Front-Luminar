import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext'; // Importar o contexto do carrinho
import Products from '../../../models/Products';

interface CardProductProps {
  product: Products;
  isAdmin: boolean; // Nova prop para determinar se o modo administrador está ativo
}

function CardProduct({ product, isAdmin }: CardProductProps) {
  const { addToCart } = useCart(); // Usar o contexto do carrinho
  const navigate = useNavigate();

  const handleBuy = () => {
    addToCart(product);  // Adicionar o produto ao carrinho
    navigate('/shopping'); // Redirecionar para a página do carrinho
  };

  return (
    <div className="flex flex-row items-center w-[300px] bg-[#ece9e9] rounded-lg shadow-none">
      {/* Informações do produto à esquerda */}
      <div className="flex flex-col p-4 w-1/2">
        <p className="font-semibold">{product.name}</p>
        <p className="font-semibold">Estoque: {product.quantity}</p>
        <span className="bg-[#220660] w-28 rounded-2xl px-4 py-2 text-white text-center">
          R${product.price},00
        </span>
        <button
          onClick={handleBuy}
          className="bg-[#F9C23C] hover:bg-[#ffde59] w-full p-2 text-center rounded-lg mt-2"
        >
          Comprar
        </button>

        {/* Exibir botões de editar e deletar apenas no modo administrador */}
        {isAdmin && (
          <div className="flex flex-col mt-2">
            <Link to={`/editProduct/${product.id}`} className="w-full mb-2">
              <button className="w-full bg-[#FFDE59] h-[40px] hover:bg-[#F9C23C] flex items-center justify-center transition-colors duration-300">
                Editar
              </button>
            </Link>
            <Link to={`/deleteProduct/${product.id}`} className="w-full">
              <button className="w-full bg-red-400 h-[40px] hover:bg-red-700 flex items-center justify-center">
                Deletar
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Imagem à direita */}
      <div className="w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover rounded-r-lg" />
      </div>
    </div>
  );
}

export default CardProduct;
