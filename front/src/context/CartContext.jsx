import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (produit, quantite = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === produit.id)
      if (existing) {
        return prev.map(i => i.id === produit.id ? { ...i, quantite: i.quantite + quantite } : i)
      }
      return [...prev, { ...produit, quantite }]
    })
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + parseFloat(i.prix) * i.quantite, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}