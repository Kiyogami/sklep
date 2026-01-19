import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('prascy-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('prascy-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variant === variant
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant,
        quantity
      }];
    });
  };

  const removeFromCart = (productId, variant) => {
    setCart(prev => prev.filter(
      item => !(item.productId === productId && item.variant === variant)
    ));
  };

  const updateQuantity = (productId, variant, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setCart(prev => prev.map(item => 
      item.productId === productId && item.variant === variant
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
