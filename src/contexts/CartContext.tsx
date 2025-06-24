import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  updateItemDetails: (
    id: string,
    oldSize: string,
    oldColor: string,
    newSize: string,
    newColor: string,
  ) => void;
  getItemCount: () => number;
  getTotal: () => number;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([
    // Mock initial cart items to match the design
    {
      id: "1",
      name: "Running Short",
      price: 50.0,
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "S",
      color: "green",
      quantity: 1,
    },
    {
      id: "2",
      name: "Wayfarer",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "M",
      color: "black",
      quantity: 2,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color,
      );

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // New item, add to cart
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color),
      ),
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const updateItemDetails = (
    id: string,
    oldSize: string,
    oldColor: string,
    newSize: string,
    newColor: string,
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === oldSize && item.color === oldColor
          ? { ...item, size: newSize, color: newColor }
          : item,
      ),
    );
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  const value: CartContextType = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    updateItemDetails,
    getItemCount,
    getTotal,
    toggleCart,
    closeCart,
    openCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
