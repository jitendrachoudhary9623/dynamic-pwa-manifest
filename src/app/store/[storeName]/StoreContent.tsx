"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import InstallPWA from '@/components/InstallPWA';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Dummy product data
const products = [
  { id: 1, name: 'T-Shirt', price: 19.99, image: '/api/placeholder/150/150' },
  { id: 2, name: 'Jeans', price: 49.99, image: '/api/placeholder/150/150' },
  { id: 3, name: 'Sneakers', price: 79.99, image: '/api/placeholder/150/150' },
  { id: 4, name: 'Hat', price: 14.99, image: '/api/placeholder/150/150' },
];

export default function StoreContent({ storeName }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = `/api/manifest/${storeName}`;
    document.head.appendChild(link);

    // Fetch the manifest and extract the logo URL
    fetch(link.href)
      .then(response => response.json())
      .then(data => {
        const icon = data.icons[0]?.src;
        if (icon) {
          setLogoUrl(icon.src);
        }
      })
      .catch(error => console.error('Error fetching manifest:', error));

    return () => {
      document.head.removeChild(link);
    };
  }, [storeName]);

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === parseInt(productId));
    return total + (product?.price || 0) * quantity;
  }, 0);

  return (
    <div className="container mx-auto p-4 pb-16">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          {logoUrl && (
            <img src={logoUrl} alt={`${storeName} logo`} className="w-10 h-10 mr-3" />
          )}
          <h1 className="text-3xl font-bold">Welcome to {storeName}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingCart className="mr-2" />
            Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
          </Button>
        </div>
      </div>

      {isCartOpen && (
        <Alert className="mb-8">
          <AlertTitle>Shopping Cart</AlertTitle>
          <AlertDescription>
            {Object.keys(cart).length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find((p) => p.id === parseInt(productId));
                  return (
                    <div key={productId} className="flex justify-between items-center mb-2">
                      <span>{product.name} x {quantity}</span>
                      <span>${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
                <div className="font-bold mt-4">Total: ${cartTotal.toFixed(2)}</div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-auto" />
              <p className="mt-2 text-xl font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => removeFromCart(product.id)} disabled={!cart[product.id]}>
                <Minus size={16} />
              </Button>
              <span>{cart[product.id] || 0}</span>
              <Button onClick={() => addToCart(product.id)}>
                <Plus size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* InstallPWA Overlay */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <InstallPWA storeName={storeName} />
      </div>
    </div>
  );
}