import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/collections');
                }}
                className="text-brand-orange font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-brand-orange font-medium mt-1">₹{item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:text-brand-orange transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:text-brand-orange transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Shipping & taxes calculated at checkout</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-orange text-white py-4 rounded-full font-bold uppercase tracking-wider hover:bg-brand-orangeHover transition-colors shadow-lg"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
