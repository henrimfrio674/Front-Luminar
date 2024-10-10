import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  const { cartItems, addToCart, removeFromCart, clearCart, decrementFromCart } = useCart(); // Adiciona clearCart
  const [showDonationPopup, setShowDonationPopup] = useState(false); // Controle para exibir o pop-up
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Controle para exibir o pop-up de confirmação
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]); // Produtos selecionados para doação
  const navigate = useNavigate();

  // Cálculo correto do subtotal, levando em consideração a quantidade
  const subtotal = cartItems.reduce((total, { product, quantity }) => total + product.price * quantity, 0);
  const frete = 20;
  const total = subtotal + frete;

  // Função para lidar com a seleção de produtos para doação
  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Função para finalizar compra sem doação
  const handleFinishWithoutDonation = () => {
    clearCart(); // Limpa o carrinho
    navigate('/home'); // Redireciona para a tela de parabéns
  };

  // Função para abrir o pop-up de confirmação de doação
  const handleDonateSelectedItems = () => {
    setShowDonationPopup(false); // Fecha o pop-up de seleção de doação
    setShowConfirmPopup(true); // Abre o pop-up de confirmação de doação
  };

  // Função para confirmar doação e finalizar
  const handleConfirmDonation = () => {
    const donatedProducts = cartItems.filter((cartItem) =>
      selectedProducts.includes(cartItem.product.id)
    );
    donatedProducts.forEach((cartItem) => {
      addToCart(cartItem.product); // Adiciona o produto ao carrinho como "doado"
    });
    clearCart(); // Limpa o carrinho
    setShowConfirmPopup(false); // Fecha o pop-up de confirmação
    navigate('/home'); // Redireciona para a tela de agradecimento pela doação
  };

  // Função para remover um produto do carrinho
  const handleRemoveProduct = (productId: string) => {
    decrementFromCart(productId); // Chama removeFromCart do contexto
  };
  const handleRemoveAll = (productId: string) => {
    removeFromCart(productId); // Chama removeFromCart do contexto
  };

  // Calcula o total após a doação
  const donatedProductsTotal = cartItems
    .filter((cartItem) => selectedProducts.includes(cartItem.product.id))
    .reduce((total, { product}) => total + product.price, 0);

  const updatedTotal = total + donatedProductsTotal; // Atualiza o total com o valor dos produtos doados

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-8">Carrinho de Compras</h1>

      <div className="bg-white shadow-lg p-8 border border-[#220660] rounded-[28px]">
        <div className="flex flex-col gap-4">
          {/* Verificar se o carrinho está vazio */}
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b border-[#220660] pb-4"
              >
                <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-[150px] h-[150px] object-cover rounded-r-lg" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-700">
                      {product.description || 'Descrição não disponível'}
                    </p>
                    <p className="text-sm text-slate-700">
                      Quantidade: {quantity}
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900">
                  R$ {product.price.toFixed(2)} x {quantity}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-500"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-green-500"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveAll(product.id)}
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Resumo do Pedido */}
          {cartItems.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Resumo do Pedido
              </h2>
              <div className="flex justify-between mb-4">
                <span className="text-slate-700">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-slate-700">Frete</span>
                <span className="text-lg font-bold text-slate-900">
                  R$ {frete.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-slate-700">Total</span>
                <span className="text-lg font-bold text-slate-900">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
          )}
          {/* Botão de Finalizar Compra */}
          {cartItems.length > 0 && (
            <>
              <button
                className="rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black font-bold py-2 px-4 w-full transition-colors duration-300"
                onClick={() => setShowDonationPopup(true)}
              >
                Finalizar Compra
              </button>

              {/* Pop-up de Doação */}
              {showDonationPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">Deseja doar algum produto?</h2>
                    <div className="flex flex-col gap-4">
                      {cartItems.map(({ product }) => (
                        <div key={product.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                            className="mr-2"
                          />
                          <span>{product.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        className="bg-gray-300 px-4 py-2 rounded-lg"
                        onClick={() => setShowDonationPopup(false)}
                      >
                        Retornar
                      </button>
                      <button
                        className="bg-gray-300 px-4 py-2 rounded-lg"
                        onClick={handleFinishWithoutDonation}
                      >
                        Finalizar Compra sem Doar
                      </button>
                      <button
                        className="bg-[#FFDE59] hover:bg-[#F9C23C] px-4 py-2 rounded-lg"
                        onClick={handleDonateSelectedItems}
                      >
                        Doar Item Selecionado
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pop-up de Confirmação de Doação */}
              {showConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">
                      Confirmar Doação e Finalizar Compra
                    </h2>
                    <p className="mb-4">
                      O novo total com a doação é: R$ {updatedTotal.toFixed(2)}
                    </p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        className="bg-gray-300 px-4 py-2 rounded-lg"
                        onClick={() => setShowConfirmPopup(false)}
                      >
                        Retornar
                      </button>
                      <button
                        className="bg-[#FFDE59] hover:bg-[#F9C23C] px-4 py-2 rounded-lg"
                        onClick={handleConfirmDonation}
                      >
                        Confirmar Doação
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
