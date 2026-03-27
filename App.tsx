import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  X, 
  CheckCircle2,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, Product, Category } from './types';

// --- UI Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: 'bg-brand-cta text-white hover:bg-opacity-90',
    secondary: 'bg-brand-accent text-white hover:bg-opacity-90',
    outline: 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50',
    ghost: 'text-zinc-600 hover:bg-zinc-100',
  };

  return (
    <button 
      className={`rounded-button px-6 py-3 font-medium transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-4">{label}</label>}
    <input 
      className="w-full px-5 py-3.5 bg-white border border-zinc-100 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all placeholder:text-zinc-400"
      {...props}
    />
  </div>
);

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="group cursor-pointer"
  >
    <div className="aspect-[3/4] rounded-card bg-zinc-100 overflow-hidden relative mb-3">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-zinc-900 hover:bg-white transition-colors">
        <Heart size={16} />
      </button>
      {product.deal && (
        <span className="absolute top-3 left-3 px-2 py-1 bg-brand-cta text-white text-[10px] font-bold uppercase tracking-widest rounded">
          Deal
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-zinc-900 truncate">{product.name}</h3>
    <p className="text-sm text-zinc-500 mt-0.5">${product.price}</p>
  </motion.div>
);

// --- Screens ---

const SplashScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="relative h-full w-full bg-brand-base overflow-hidden flex flex-col">
    <div className="flex-1 relative grid grid-cols-2 gap-2 p-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-card overflow-hidden h-64">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-card overflow-hidden h-48 mt-12">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-card overflow-hidden h-56 -mt-8">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-card overflow-hidden h-72 -mt-16">
        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </motion.div>
    </div>
    <div className="p-8 space-y-6 text-center bg-brand-base">
      <h1 className="text-5xl editorial-header leading-tight">StyleHub</h1>
      <p className="text-zinc-500 font-light">Your daily outfit, delivered.</p>
      <Button onClick={onNext} className="w-full py-4 text-lg">Get Started</Button>
    </div>
  </div>
);

const AuthScreen = ({ type, onNext, onToggle }: { type: 'login' | 'signup', onNext: () => void, onToggle: () => void }) => (
  <div className="h-full w-full bg-brand-base p-8 flex flex-col">
    <div className="flex-1 flex flex-col justify-center space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl editorial-header">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-zinc-500">{type === 'login' ? 'Sign in to continue your journey.' : 'Join us for a curated experience.'}</p>
      </div>
      
      <div className="space-y-4">
        {type === 'signup' && <Input label="Full Name" placeholder="Jane Doe" />}
        <Input label="Email Address" placeholder="jane@example.com" type="email" />
        <Input label="Password" placeholder="••••••••" type="password" />
        <Button onClick={onNext} className="w-full py-4 mt-2">{type === 'login' ? 'Sign In' : 'Sign Up'}</Button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-brand-base px-4 text-zinc-400">Or continue with</span></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex items-center justify-center gap-2 py-3">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Google
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2 py-3">
          <User size={16} /> Apple
        </Button>
      </div>
    </div>
    
    <p className="text-center text-sm text-zinc-500 mt-8">
      {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
      <button onClick={onToggle} className="text-brand-cta font-semibold">{type === 'login' ? 'Sign Up' : 'Sign In'}</button>
    </p>
  </div>
);

const HomeScreen = ({ onProductClick }: { onProductClick: (p: Product) => void }) => (
  <div className="pb-24">
    {/* Hero Section */}
    <section className="px-6 pt-8">
      <div className="relative h-[400px] rounded-card overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
          <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2">Trending Now</span>
          <h2 className="text-4xl editorial-header text-white mb-4">Summer Essentials</h2>
          <Button className="w-fit px-8">Shop Collection</Button>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="mt-10">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-xl editorial-header">Categories</h3>
        <button className="text-xs font-bold uppercase tracking-widest text-brand-cta">View All</button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
        {MOCK_CATEGORIES.map(cat => (
          <div key={cat.id} className="flex-shrink-0 text-center space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src={cat.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Great Deals */}
    <section className="mt-12 px-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl editorial-header">Great Deals</h3>
        <button className="text-xs font-bold uppercase tracking-widest text-zinc-400">See More</button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {MOCK_PRODUCTS.filter(p => p.deal).map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>
    </section>

    {/* Lifestyle Banner */}
    <section className="mt-12 px-6">
      <div className="h-64 rounded-card overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-brand-accent/20 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h3 className="text-3xl editorial-header italic mb-2">The Art of Living</h3>
            <p className="text-sm font-light tracking-wide">Explore our lifestyle collection</p>
          </div>
        </div>
      </div>
    </section>

    {/* Trending Grid */}
    <section className="mt-12 px-6">
      <h3 className="text-xl editorial-header mb-6">Trending This Week</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {MOCK_PRODUCTS.filter(p => p.trending).map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>
    </section>
  </div>
);

const CategoryScreen = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-3xl editorial-header">Explore</h2>
    <div className="space-y-4">
      {MOCK_CATEGORIES.map(cat => (
        <motion.div 
          key={cat.id}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between p-4 bg-white rounded-card shadow-sm border border-zinc-50"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img src={cat.thumbnail} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-medium text-zinc-800">{cat.name}</span>
          </div>
          <ChevronRight size={18} className="text-zinc-300" />
        </motion.div>
      ))}
    </div>
  </div>
);

const ProductDetailScreen = ({ product, onBack, onAddToCart }: { product: Product, onBack: () => void, onAddToCart: () => void }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative flex-1 overflow-y-auto no-scrollbar">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="aspect-[3/4] w-full">
          <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl editorial-header">{product.name}</h2>
              <button className="p-2 text-zinc-400 hover:text-brand-cta transition-colors">
                <Heart size={24} />
              </button>
            </div>
            <p className="text-2xl font-light text-zinc-900">${product.price}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-zinc-500 leading-relaxed font-light">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Size</h4>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSize === size 
                      ? 'bg-zinc-900 text-white shadow-md' 
                      : 'bg-zinc-50 text-zinc-600 border border-zinc-100 hover:bg-zinc-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Color</h4>
            <div className="flex gap-4">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color ? 'border-brand-cta scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-100 bg-white">
        <Button onClick={onAddToCart} className="w-full py-4 text-lg flex items-center justify-center gap-3">
          <ShoppingBag size={20} /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

const CartScreen = ({ onCheckout }: { onCheckout: () => void }) => (
  <div className="h-full flex flex-col p-6">
    <h2 className="text-3xl editorial-header mb-8">Your Bag</h2>
    <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
      {[MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]].map((item, idx) => (
        <div key={idx} className="flex gap-4 p-4 bg-white rounded-card shadow-sm border border-zinc-50">
          <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h4 className="font-medium text-zinc-900">{item.name}</h4>
              <p className="text-xs text-zinc-400 mt-1">Size: M | Color: Mauve</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">${item.price}</span>
              <div className="flex items-center gap-3 bg-zinc-50 rounded-full px-3 py-1 border border-zinc-100">
                <button className="text-zinc-400">-</button>
                <span className="text-sm font-medium">1</span>
                <button className="text-zinc-400">+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 space-y-4 pt-6 border-t border-zinc-100">
      <div className="flex justify-between text-sm text-zinc-500">
        <span>Subtotal</span>
        <span className="text-zinc-900 font-medium">$318.00</span>
      </div>
      <div className="flex justify-between text-sm text-zinc-500">
        <span>Shipping</span>
        <span className="text-zinc-900 font-medium">Free</span>
      </div>
      <div className="flex justify-between text-xl font-semibold pt-2">
        <span>Total</span>
        <span>$318.00</span>
      </div>
      <Button onClick={onCheckout} className="w-full py-4 mt-4">Checkout</Button>
    </div>
  </div>
);

const CheckoutScreen = ({ onConfirm }: { onConfirm: () => void }) => (
  <div className="h-full flex flex-col p-6">
    <h2 className="text-3xl editorial-header mb-8">Checkout</h2>
    <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Shipping Address</h4>
        <div className="p-4 bg-white rounded-card border border-zinc-100 shadow-sm relative">
          <p className="font-medium">Jane Doe</p>
          <p className="text-sm text-zinc-500 mt-1">123 Minimalist Way, Design District, NY 10001</p>
          <button className="absolute top-4 right-4 text-brand-cta text-xs font-bold uppercase">Edit</button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Payment Method</h4>
        <div className="p-4 bg-white rounded-card border border-zinc-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-8 bg-zinc-900 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
          <div className="flex-1">
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-xs text-zinc-400">Expires 12/26</p>
          </div>
          <CheckCircle2 className="text-emerald-500" size={20} />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-500"><span>Items (2)</span><span>$318.00</span></div>
          <div className="flex justify-between text-zinc-500"><span>Delivery</span><span>$0.00</span></div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-zinc-50"><span>Total</span><span>$318.00</span></div>
        </div>
      </div>
    </div>
    <Button onClick={onConfirm} className="w-full py-4 mt-8">Place Order</Button>
  </div>
);

const ConfirmationScreen = ({ onHome }: { onHome: () => void }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
    <motion.div 
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center"
    >
      <CheckCircle2 size={48} />
    </motion.div>
    <div className="space-y-2">
      <h2 className="text-4xl editorial-header">Order Confirmed!</h2>
      <p className="text-zinc-500 font-light">Your fashion journey has begun. We'll notify you when your items are on their way.</p>
    </div>
    <div className="w-full pt-8">
      <Button onClick={onHome} className="w-full py-4">Continue Shopping</Button>
      <Button variant="ghost" className="w-full mt-2">Track Order</Button>
    </div>
  </div>
);

const SearchResultsScreen = ({ onProductClick, onFilter }: { onProductClick: (p: Product) => void, onFilter: () => void }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input 
          placeholder="Search items..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-100 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>
      <button onClick={onFilter} className="p-3 bg-white border border-zinc-100 rounded-full text-zinc-600"><Filter size={20} /></button>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
      {MOCK_PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  </div>
);

const WishlistScreen = ({ onProductClick }: { onProductClick: (p: Product) => void }) => (
  <div className="p-6 space-y-8">
    <h2 className="text-3xl editorial-header">Wishlist</h2>
    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
      {MOCK_PRODUCTS.slice(0, 4).map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  </div>
);

const OrdersScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
      <h2 className="text-3xl editorial-header">My Orders</h2>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map(order => (
        <div key={order} className="p-4 bg-white rounded-card border border-zinc-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Order #VV-9823{order}</span>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded">Delivered</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded bg-zinc-100 overflow-hidden">
              <img src={MOCK_PRODUCTS[order-1].image} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Order placed on March {order}, 2024</p>
              <p className="text-xs text-zinc-500 mt-1">2 items • $245.00</p>
            </div>
            <ChevronRight size={18} className="text-zinc-300" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
      <h2 className="text-3xl editorial-header">Settings</h2>
    </div>
    <div className="space-y-2">
      {['Push Notifications', 'Email Preferences', 'Dark Mode', 'Language', 'Privacy Policy', 'Terms of Service'].map(item => (
        <div key={item} className="flex items-center justify-between p-4 bg-white rounded-card border border-zinc-50">
          <span className="text-zinc-700 font-medium">{item}</span>
          <div className="w-10 h-5 bg-zinc-200 rounded-full relative">
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HelpScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
      <h2 className="text-3xl editorial-header">Help Center</h2>
    </div>
    <div className="space-y-4">
      {['Shipping & Delivery', 'Returns & Refunds', 'Payment Options', 'Account Issues', 'Size Guide'].map(item => (
        <div key={item} className="p-4 bg-white rounded-card border border-zinc-100 flex items-center justify-between">
          <span className="font-medium">{item}</span>
          <ChevronRight size={18} className="text-zinc-300" />
        </div>
      ))}
    </div>
  </div>
);

const ReviewsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
      <h2 className="text-3xl editorial-header">Reviews</h2>
    </div>
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-3 pb-6 border-b border-zinc-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-200" />
              <span className="text-sm font-medium">Customer {i}</span>
            </div>
            <div className="flex text-brand-cta"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
          </div>
          <p className="text-sm text-zinc-500 font-light leading-relaxed">"Absolutely love the quality of this piece. The silk is so soft and the fit is perfect. Highly recommend!"</p>
        </div>
      ))}
    </div>
  </div>
);

const ProfileScreen = ({ onNavigate }: { onNavigate: (s: any) => void }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h2 className="text-2xl editorial-header">Jane Doe</h2>
        <p className="text-zinc-500 text-sm">Member since 2024</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-card text-center shadow-sm border border-zinc-50">
        <p className="text-lg font-bold">12</p>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Orders</p>
      </div>
      <div className="bg-white p-4 rounded-card text-center shadow-sm border border-zinc-50">
        <p className="text-lg font-bold">24</p>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Wishlist</p>
      </div>
      <div className="bg-white p-4 rounded-card text-center shadow-sm border border-zinc-50">
        <p className="text-lg font-bold">1.2k</p>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Points</p>
      </div>
    </div>

    <div className="space-y-2">
      {[
        { label: 'My Orders', screen: 'orders' },
        { label: 'Settings', screen: 'settings' },
        { label: 'Help Center', screen: 'help' },
        { label: 'Shipping Address', screen: 'profile' },
        { label: 'Payment Methods', screen: 'profile' },
      ].map(item => (
        <button 
          key={item.label} 
          onClick={() => onNavigate(item.screen)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-card hover:bg-zinc-50 transition-colors border border-zinc-50"
        >
          <span className="text-zinc-700 font-medium">{item.label}</span>
          <ChevronRight size={18} className="text-zinc-300" />
        </button>
      ))}
    </div>

    <Button variant="outline" className="w-full py-4 text-red-500 border-red-100 hover:bg-red-50">Sign Out</Button>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'signup' | 'home' | 'category' | 'pdp' | 'cart' | 'checkout' | 'confirmation' | 'profile' | 'search' | 'wishlist' | 'orders' | 'settings' | 'help' | 'reviews'>('splash');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'wishlist' | 'profile'>('home');
  const [showFilter, setShowFilter] = useState(false);

  const navigateTo = (screen: typeof currentScreen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('pdp');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen onNext={() => navigateTo('login')} />;
      case 'login': return <AuthScreen type="login" onNext={() => navigateTo('home')} onToggle={() => navigateTo('signup')} />;
      case 'signup': return <AuthScreen type="signup" onNext={() => navigateTo('home')} onToggle={() => navigateTo('login')} />;
      case 'home': return <HomeScreen onProductClick={handleProductClick} />;
      case 'category': return <CategoryScreen />;
      case 'pdp': return selectedProduct ? <ProductDetailScreen product={selectedProduct} onBack={() => navigateTo('home')} onAddToCart={() => navigateTo('cart')} /> : null;
      case 'cart': return <CartScreen onCheckout={() => navigateTo('checkout')} />;
      case 'checkout': return <CheckoutScreen onConfirm={() => navigateTo('confirmation')} />;
      case 'confirmation': return <ConfirmationScreen onHome={() => navigateTo('home')} />;
      case 'profile': return <ProfileScreen onNavigate={navigateTo} />;
      case 'search': return <SearchResultsScreen onProductClick={handleProductClick} onFilter={() => setShowFilter(true)} />;
      case 'wishlist': return <WishlistScreen onProductClick={handleProductClick} />;
      case 'orders': return <OrdersScreen onBack={() => navigateTo('profile')} />;
      case 'settings': return <SettingsScreen onBack={() => navigateTo('profile')} />;
      case 'help': return <HelpScreen onBack={() => navigateTo('profile')} />;
      case 'reviews': return <ReviewsScreen onBack={() => navigateTo('pdp')} />;
      default: return <HomeScreen onProductClick={handleProductClick} />;
    }
  };

  const showNav = ['home', 'category', 'cart', 'profile', 'search', 'wishlist'].includes(currentScreen);

  return (
    <div className="max-w-md mx-auto h-screen bg-brand-base shadow-2xl relative flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {showNav && (
        <nav className="bg-white/80 backdrop-blur-md border-t border-zinc-100 px-8 py-4 flex justify-between items-center z-50">
          <button 
            onClick={() => { setActiveTab('home'); navigateTo('home'); }}
            className={`transition-colors flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-brand-cta' : 'text-zinc-400'}`}
          >
            <Home size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button 
            onClick={() => { setActiveTab('search'); navigateTo('search'); }}
            className={`transition-colors flex flex-col items-center gap-1 ${activeTab === 'search' ? 'text-brand-cta' : 'text-zinc-400'}`}
          >
            <Search size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
          </button>
          <button 
            onClick={() => { setActiveTab('wishlist'); navigateTo('wishlist'); }}
            className={`transition-colors flex flex-col items-center gap-1 ${activeTab === 'wishlist' ? 'text-brand-cta' : 'text-zinc-400'}`}
          >
            <Heart size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Wishlist</span>
          </button>
          <button 
            onClick={() => { setActiveTab('profile'); navigateTo('profile'); }}
            className={`transition-colors flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-brand-cta' : 'text-zinc-400'}`}
          >
            <User size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
          </button>
        </nav>
      )}

      {/* Filter Modal Overlay */}
      <AnimatePresence>
        {showFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-[32px] p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl editorial-header">Filter</h3>
                <button onClick={() => setShowFilter(false)} className="p-2 bg-zinc-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Price Range</h4>
                  <div className="flex items-center gap-4">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sort By</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Newest', 'Price: Low to High', 'Price: High to Low', 'Popularity'].map(sort => (
                      <button key={sort} className="px-4 py-2 rounded-full border border-zinc-100 text-sm hover:bg-zinc-50">{sort}</button>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={() => setShowFilter(false)} className="w-full py-4">Apply Filters</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
