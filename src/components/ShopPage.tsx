import { motion } from "motion/react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ShopPageProps {
  onBack: () => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Aftercare Balm",
    category: "Aftercare",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    description: "Organic healing balm for fresh tattoos"
  },
  {
    id: 2,
    name: "Tattoo Moisturizer",
    category: "Aftercare",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    description: "Daily moisturizer for healed tattoos"
  },
  {
    id: 3,
    name: "99 Roots Black Hoodie",
    category: "Apparel",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Premium quality studio hoodie"
  },
  {
    id: 4,
    name: "Gold Logo T-Shirt",
    category: "Apparel",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    description: "Exclusive studio merchandise"
  },
  {
    id: 5,
    name: "Healing Soap Bar",
    category: "Aftercare",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba60f2f?w=800&q=80",
    description: "Gentle antibacterial soap"
  },
  {
    id: 6,
    name: "Studio Tote Bag",
    category: "Accessories",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    description: "Limited edition canvas tote"
  },
  {
    id: 7,
    name: "Gift Card - €50",
    category: "Gift Cards",
    price: 50.00,
    image: "https://images.unsplash.com/photo-1549298222-1d4b1c0d8f7e?w=800&q=80",
    description: "Perfect gift for tattoo lovers"
  },
  {
    id: 8,
    name: "Gift Card - €100",
    category: "Gift Cards",
    price: 100.00,
    image: "https://images.unsplash.com/photo-1549298222-1d4b1c0d8f7e?w=800&q=80",
    description: "Premium gift card option"
  },
  {
    id: 9,
    name: "Numbing Cream",
    category: "Aftercare",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    description: "Professional grade numbing solution"
  }
];

const categories = ["All", "Aftercare", "Apparel", "Accessories", "Gift Cards"];

export function ShopPage({ onBack }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-studio-black">
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-studio-black/95 backdrop-blur-sm border-b border-gold/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-inter">Back to Home</span>
            </button>
            
            <h1 className="font-playfair text-gold text-3xl md:text-4xl">Shop</h1>
            
            <div className="w-24"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 border transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold text-black border-gold"
                    : "bg-transparent text-white border-gold/40 hover:border-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-[#151515]/40 border border-gold/20 hover:border-gold/60 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-[#151515]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gold/70 text-sm mb-1">{product.category}</p>
                      <h3 className="font-playfair text-white text-xl mb-2">
                        {product.name}
                      </h3>
                    </div>
                    <p className="font-inter text-gold text-xl">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-6">
                    {product.description}
                  </p>

                  <button className="w-full py-3 bg-gold text-black font-inter tracking-wider hover:bg-gold/90 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 text-xl">No products found in this category</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-32 left-8 w-12 h-12 border-t-2 border-l-2 border-gold/20 pointer-events-none"></div>
      <div className="fixed top-32 right-8 w-12 h-12 border-t-2 border-r-2 border-gold/20 pointer-events-none"></div>
    </div>
  );
}