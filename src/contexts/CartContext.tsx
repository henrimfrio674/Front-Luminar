import { createContext, useContext, useState, ReactNode } from 'react';
import Products from '../models/Products';

interface CartItem {
  product: Products;
  quantity: number; // Adiciona a quantidade de cada produto
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Products) => void;
  removeFromCart: (productId: string) => void;
  decrementFromCart: (productId: string) => void; // Função para diminuir a quantidade
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Products) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const decrementFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevItems.filter(item => item.product.id !== productId); // Remove se quantidade for 1
    });
  };

  const clearCart = () => {
    setCartItems([]); // Limpa o carrinho
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
