import { useState } from "react";

const PRODUCTS = [
  { id:"1", name:"Classic Silk Blouse", price:129, description:"A timeless piece crafted from 100% pure silk. Perfect for both professional and evening wear.", image:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800", category:"Tops", sizes:["XS","S","M","L"], colors:["#FFFFFF","#F5F5F5","#8E7676"], trending:true },
  { id:"2", name:"Tailored Wool Trousers", price:189, description:"Expertly cut trousers in premium Italian wool. Features a high-waist silhouette and sharp pleats.", image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800", category:"Bottoms", sizes:["2","4","6","8","10"], colors:["#1A1A1A","#4A4A4A"], deal:true },
  { id:"3", name:"Cashmere Wrap Coat", price:450, description:"Luxurious double-faced cashmere coat with a belted waist. The ultimate investment piece.", image:"https://images.unsplash.com/photo-1539533377285-340d1c4a5a7c?auto=format&fit=crop&q=80&w=800", category:"Outerwear", sizes:["S","M","L"], colors:["#D2B48C","#8E7676"], trending:true },
  { id:"4", name:"Minimalist Leather Tote", price:295, description:"Structured tote bag made from vegetable-tanned leather. Spacious enough for all your essentials.", image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800", category:"Accessories", sizes:["One Size"], colors:["#000000","#8B4513"] },
  { id:"5", name:"Linen Midi Dress", price:155, description:"Breathable linen dress with a square neckline and side slits. Ideal for warm summer days.", image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", category:"Dresses", sizes:["XS","S","M","L","XL"], colors:["#FFFFFF","#E6E6FA"], deal:true },
  { id:"6", name:"Satin Slip Skirt", price:89, description:"Fluid satin skirt with a bias cut for a flattering drape. Versatile for day-to-night styling.", image:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800", category:"Bottoms", sizes:["S","M","L"], colors:["#FFD700","#000000"] }
];

const CATEGORIES = [
  { id:"c1", name:"New Arrivals", thumbnail:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=200" },
  { id:"c2", name:"Dresses", thumbnail:"https://images.unsplash.com/photo-1539008835270-21735614b6cc?auto=format&fit=crop&q=80&w=200" },
  { id:"c3", name:"Tops", thumbnail:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=200" },
  { id:"c4", name:"Bottoms", thumbnail:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=200" },
  { id:"c5", name:"Outerwear", thumbnail:"https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=200" },
  { id:"c6", name:"Accessories", thumbnail:"https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=200" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --base: #F5F5F5;
    --accent: #8E7676;
    --cta: #FF9900;
    --white: #ffffff;
    --zinc-50: #fafafa;
    --zinc-100: #f4f4f5;
    --zinc-200: #e4e4e7;
    --zinc-300: #d4d4d8;
    --zinc-400: #a1a1aa;
    --zinc-500: #71717a;
    --zinc-600: #52525b;
    --zinc-700: #3f3f46;
    --zinc-800: #27272a;
    --zinc-900: #18181b;
    --emerald-50: #ecfdf5;
    --emerald-100: #d1fae5;
    --emerald-500: #10b981;
    --emerald-600: #059669;
    --red-50: #fef2f2;
    --red-100: #fee2e2;
    --red-500: #ef4444;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--base); color: var(--zinc-900); }
  h1,h2,h3,h4,h5,h6 { font-family: 'Playfair Display', serif; }

  .app-shell {
    max-width: 430px;
    margin: 0 auto;
    height: 100dvh;
    background: var(--base);
    box-shadow: 0 0 60px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .screen { flex: 1; overflow-y: auto; scrollbar-width: none; }
  .screen::-webkit-scrollbar { display: none; }

  /* Fade transition */
  .fade-in { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }

  /* Buttons */
  .btn {
    border-radius: 20px;
    padding: 12px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s, transform 0.1s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn:active { transform: scale(0.97); }
  .btn-primary { background: var(--cta); color: white; }
  .btn-primary:hover { opacity: 0.9; }
  .btn-outline { background: transparent; border: 1.5px solid var(--zinc-200); color: var(--zinc-800); }
  .btn-outline:hover { background: var(--zinc-50); }
  .btn-ghost { background: transparent; color: var(--zinc-600); }
  .btn-ghost:hover { background: var(--zinc-100); }
  .btn-full { width: 100%; }
  .btn-lg { padding: 16px 24px; font-size: 16px; }

  /* Inputs */
  .input-wrap { display: flex; flex-direction: column; gap: 6px; width: 100%; }
  .input-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--zinc-500); padding-left: 4px; }
  .input-field {
    width: 100%;
    padding: 14px 20px;
    background: white;
    border: 1.5px solid var(--zinc-100);
    border-radius: 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    color: var(--zinc-900);
  }
  .input-field::placeholder { color: var(--zinc-400); }
  .input-field:focus { border-color: rgba(142,118,118,0.4); box-shadow: 0 0 0 3px rgba(142,118,118,0.1); }

  /* Cards */
  .card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--zinc-50); }
  .rounded-card { border-radius: 12px; overflow: hidden; }

  /* Product Card */
  .product-card { cursor: pointer; }
  .product-card:hover .product-img { transform: scale(1.05); }
  .product-card-img-wrap { aspect-ratio: 3/4; border-radius: 12px; background: var(--zinc-100); overflow: hidden; position: relative; margin-bottom: 10px; }
  .product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .product-wish-btn { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.85); backdrop-filter: blur(4px); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .product-deal-badge { position: absolute; top: 10px; left: 10px; background: var(--cta); color: white; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 3px 8px; border-radius: 4px; }
  .product-name { font-size: 13px; font-weight: 500; color: var(--zinc-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .product-price { font-size: 13px; color: var(--zinc-500); margin-top: 2px; }

  /* Nav */
  .bottom-nav {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(16px);
    border-top: 1px solid var(--zinc-100);
    padding: 12px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 50;
    flex-shrink: 0;
  }
  .nav-btn { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 4px 8px; transition: color 0.15s; }
  .nav-btn.active { color: var(--cta); }
  .nav-btn:not(.active) { color: var(--zinc-400); }
  .nav-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; }

  /* Splash */
  .splash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px; flex: 1; }
  .splash-img { width: 100%; height: 100%; object-fit: cover; }
  .splash-footer { padding: 32px; text-align: center; background: var(--base); display: flex; flex-direction: column; gap: 16px; }
  .splash-title { font-size: 52px; letter-spacing: -2px; line-height: 1; }
  .splash-sub { color: var(--zinc-500); font-weight: 300; font-size: 15px; }

  /* Auth */
  .auth-wrap { padding: 40px 32px; display: flex; flex-direction: column; height: 100%; }
  .auth-title { font-size: 40px; line-height: 1.1; margin-bottom: 8px; }
  .auth-sub { color: var(--zinc-500); font-size: 14px; margin-bottom: 40px; }
  .auth-fields { display: flex; flex-direction: column; gap: 16px; }
  .auth-divider { position: relative; padding: 16px 0; text-align: center; }
  .auth-divider::before { content:''; position: absolute; inset: 50% 0 auto; height: 1px; background: var(--zinc-200); }
  .auth-divider-text { position: relative; background: var(--base); padding: 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--zinc-400); }
  .auth-social { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .auth-toggle { text-align: center; font-size: 13px; color: var(--zinc-500); margin-top: auto; padding-top: 32px; }
  .auth-toggle-btn { background: none; border: none; color: var(--cta); font-weight: 600; cursor: pointer; font-size: 13px; }

  /* Home */
  .hero-wrap { padding: 24px 24px 0; }
  .hero-img-wrap { position: relative; border-radius: 12px; overflow: hidden; height: 380px; }
  .hero-img { width: 100%; height: 100%; object-fit: cover; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 32px; }
  .hero-tag { color: rgba(255,255,255,0.8); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px; }
  .hero-title { font-size: 36px; color: white; margin-bottom: 16px; }

  .section { padding: 0 24px; margin-top: 40px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 20px; }
  .section-link { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--cta); background: none; border: none; cursor: pointer; }
  .section-link-muted { color: var(--zinc-400); }

  .cat-scroll { display: flex; gap: 16px; overflow-x: auto; padding: 0 24px; scrollbar-width: none; }
  .cat-scroll::-webkit-scrollbar { display: none; }
  .cat-item { flex-shrink: 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
  .cat-circle { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .cat-circle img { width: 100%; height: 100%; object-fit: cover; }
  .cat-name { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--zinc-600); }

  .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 12px; }

  .lifestyle-banner { position: relative; height: 220px; border-radius: 12px; overflow: hidden; }
  .lifestyle-overlay { position: absolute; inset: 0; background: rgba(142,118,118,0.25); display: flex; align-items: center; justify-content: center; }
  .lifestyle-text { text-align: center; color: white; padding: 24px; }
  .lifestyle-title { font-size: 28px; font-style: italic; margin-bottom: 6px; }
  .lifestyle-sub { font-size: 13px; font-weight: 300; letter-spacing: 0.05em; }

  /* PDP */
  .pdp-wrap { display: flex; flex-direction: column; height: 100%; background: white; }
  .pdp-scroll { flex: 1; overflow-y: auto; scrollbar-width: none; }
  .pdp-scroll::-webkit-scrollbar { display: none; }
  .pdp-img-wrap { aspect-ratio: 3/4; position: relative; }
  .pdp-img { width: 100%; height: 100%; object-fit: cover; }
  .pdp-back-btn { position: absolute; top: 24px; left: 24px; z-index: 10; background: rgba(255,255,255,0.85); backdrop-filter: blur(4px); border: none; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .pdp-info { padding: 32px; display: flex; flex-direction: column; gap: 28px; }
  .pdp-name-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .pdp-name { font-size: 28px; line-height: 1.2; }
  .pdp-price { font-size: 22px; font-weight: 300; color: var(--zinc-900); margin-top: 4px; }
  .pdp-desc { font-size: 14px; color: var(--zinc-500); line-height: 1.7; font-weight: 300; }
  .pdp-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--zinc-400); margin-bottom: 12px; }
  .size-options { display: flex; flex-wrap: wrap; gap: 10px; }
  .size-btn { padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--zinc-100); background: var(--zinc-50); color: var(--zinc-600); transition: all 0.15s; }
  .size-btn.active { background: var(--zinc-900); color: white; border-color: var(--zinc-900); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .color-options { display: flex; gap: 14px; }
  .color-btn { width: 36px; height: 36px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: transform 0.15s, border-color 0.15s; outline: none; }
  .color-btn.active { border-color: var(--cta); transform: scale(1.15); }
  .pdp-footer { padding: 20px 24px; border-top: 1px solid var(--zinc-100); background: white; flex-shrink: 0; }

  /* Cart */
  .cart-wrap { padding: 24px; display: flex; flex-direction: column; height: 100%; }
  .cart-title { font-size: 32px; margin-bottom: 28px; }
  .cart-items { flex: 1; overflow-y: auto; scrollbar-width: none; display: flex; flex-direction: column; gap: 16px; }
  .cart-item { display: flex; gap: 14px; padding: 14px; background: white; border-radius: 12px; border: 1px solid var(--zinc-50); box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .cart-item-img { width: 88px; height: 112px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
  .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
  .cart-item-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 4px 0; }
  .cart-item-name { font-size: 14px; font-weight: 500; }
  .cart-item-meta { font-size: 11px; color: var(--zinc-400); margin-top: 4px; }
  .cart-item-bottom { display: flex; align-items: center; justify-content: space-between; }
  .cart-item-price { font-weight: 600; font-size: 15px; }
  .qty-ctrl { display: flex; align-items: center; gap: 12px; background: var(--zinc-50); border-radius: 20px; padding: 6px 14px; border: 1px solid var(--zinc-100); }
  .qty-btn { background: none; border: none; cursor: pointer; color: var(--zinc-400); font-size: 16px; line-height: 1; }
  .qty-val { font-size: 13px; font-weight: 500; }
  .cart-summary { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--zinc-100); display: flex; flex-direction: column; gap: 10px; }
  .summary-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--zinc-500); }
  .summary-row span:last-child { color: var(--zinc-900); font-weight: 500; }
  .summary-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; padding-top: 8px; border-top: 1px solid var(--zinc-50); }

  /* Checkout */
  .checkout-wrap { padding: 24px; display: flex; flex-direction: column; height: 100%; }
  .checkout-title { font-size: 32px; margin-bottom: 28px; }
  .checkout-body { flex: 1; overflow-y: auto; scrollbar-width: none; display: flex; flex-direction: column; gap: 28px; }
  .checkout-body::-webkit-scrollbar { display: none; }
  .section-block-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--zinc-400); margin-bottom: 12px; }
  .address-card { padding: 16px; background: white; border-radius: 12px; border: 1px solid var(--zinc-100); box-shadow: 0 1px 4px rgba(0,0,0,0.04); position: relative; }
  .address-name { font-weight: 500; margin-bottom: 4px; }
  .address-text { font-size: 13px; color: var(--zinc-500); }
  .edit-btn { position: absolute; top: 14px; right: 14px; background: none; border: none; color: var(--cta); font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer; }
  .payment-card { padding: 16px; background: white; border-radius: 12px; border: 1px solid var(--zinc-100); display: flex; align-items: center; gap: 14px; }
  .visa-badge { width: 48px; height: 30px; background: var(--zinc-900); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 700; }
  .card-num { font-weight: 500; font-size: 14px; }
  .card-exp { font-size: 11px; color: var(--zinc-400); margin-top: 2px; }
  .check-icon { margin-left: auto; color: var(--emerald-500); }
  .order-summary-rows { font-size: 13px; display: flex; flex-direction: column; gap: 8px; }
  .order-row { display: flex; justify-content: space-between; color: var(--zinc-500); }
  .order-row-total { display: flex; justify-content: space-between; font-weight: 700; font-size: 17px; padding-top: 10px; border-top: 1px solid var(--zinc-100); margin-top: 4px; }

  /* Confirmation */
  .confirm-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px 32px; text-align: center; gap: 24px; }
  .confirm-icon { width: 88px; height: 88px; background: var(--emerald-50); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--emerald-500); animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
  .confirm-title { font-size: 40px; margin-bottom: 8px; }
  .confirm-sub { font-size: 14px; color: var(--zinc-500); font-weight: 300; line-height: 1.6; }

  /* Profile */
  .profile-wrap { padding: 24px; }
  .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
  .profile-avatar { width: 88px; height: 88px; border-radius: 50%; overflow: hidden; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .profile-name { font-size: 24px; }
  .profile-since { font-size: 13px; color: var(--zinc-500); margin-top: 2px; }
  .profile-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  .stat-card { background: white; padding: 14px; border-radius: 12px; text-align: center; border: 1px solid var(--zinc-50); }
  .stat-val { font-size: 18px; font-weight: 700; }
  .stat-label { font-size: 9px; color: var(--zinc-400); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }
  .profile-menu { display: flex; flex-direction: column; gap: 6px; }
  .profile-menu-item { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 16px; background: white; border-radius: 12px; border: none; cursor: pointer; border: 1px solid var(--zinc-50); transition: background 0.15s; }
  .profile-menu-item:hover { background: var(--zinc-50); }
  .profile-menu-label { font-size: 14px; font-weight: 500; color: var(--zinc-700); }

  /* Search */
  .search-wrap { padding: 24px; }
  .search-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .search-input-wrap { flex: 1; position: relative; }
  .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--zinc-400); }
  .search-input { width: 100%; padding: 12px 16px 12px 44px; background: white; border: 1.5px solid var(--zinc-100); border-radius: 20px; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; }
  .search-input:focus { border-color: rgba(142,118,118,0.4); }
  .filter-btn { background: white; border: 1.5px solid var(--zinc-100); border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--zinc-600); }

  /* Filter Modal */
  .modal-overlay { position: absolute; inset: 0; z-index: 100; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: flex-end; }
  .modal-sheet { width: 100%; background: white; border-radius: 32px 32px 0 0; padding: 32px; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .modal-title { font-size: 26px; }
  .modal-close { background: var(--zinc-100); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

  /* Wishlist / Generic */
  .wishlist-wrap { padding: 24px; }
  .wishlist-title { font-size: 32px; margin-bottom: 28px; }

  /* Sub screens */
  .sub-wrap { padding: 24px; }
  .sub-header { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
  .sub-back-btn { background: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .sub-title { font-size: 30px; }
  .list-item { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: white; border-radius: 12px; border: 1px solid var(--zinc-100); margin-bottom: 6px; }
  .list-item-label { font-size: 14px; font-weight: 500; color: var(--zinc-700); }

  /* Category explore */
  .explore-wrap { padding: 24px; }
  .explore-title { font-size: 32px; margin-bottom: 24px; }
  .explore-item { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: white; border-radius: 12px; border: 1px solid var(--zinc-50); margin-bottom: 8px; cursor: pointer; transition: background 0.15s; }
  .explore-item:hover { background: var(--zinc-50); }
  .explore-item-left { display: flex; align-items: center; gap: 14px; }
  .explore-thumb { width: 48px; height: 48px; border-radius: 10px; overflow: hidden; }
  .explore-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .explore-name { font-size: 14px; font-weight: 500; }

  /* Orders */
  .order-card { padding: 14px; background: white; border-radius: 12px; border: 1px solid var(--zinc-100); margin-bottom: 12px; }
  .order-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .order-id { font-size: 10px; font-weight: 700; color: var(--zinc-400); text-transform: uppercase; letter-spacing: 0.1em; }
  .order-status { padding: 3px 10px; background: var(--emerald-50); color: var(--emerald-600); font-size: 10px; font-weight: 700; text-transform: uppercase; border-radius: 4px; }
  .order-card-body { display: flex; align-items: center; gap: 14px; }
  .order-thumb { width: 60px; height: 60px; border-radius: 8px; overflow: hidden; background: var(--zinc-100); }
  .order-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .order-info { flex: 1; }
  .order-date { font-size: 13px; font-weight: 500; }
  .order-meta { font-size: 11px; color: var(--zinc-500); margin-top: 2px; }

  /* Reviews */
  .review-item { padding-bottom: 20px; border-bottom: 1px solid var(--zinc-100); margin-bottom: 20px; }
  .review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .reviewer { display: flex; align-items: center; gap: 8px; }
  .reviewer-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--zinc-200); }
  .reviewer-name { font-size: 13px; font-weight: 500; }
  .stars { display: flex; gap: 2px; color: var(--cta); }
  .review-text { font-size: 13px; color: var(--zinc-500); font-weight: 300; line-height: 1.6; }

  /* Settings */
  .toggle { width: 40px; height: 22px; background: var(--zinc-200); border-radius: 11px; position: relative; }
  .toggle-knob { position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
`;

// SVG Icons
const Icons = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Heart: ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  ChevronRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Star: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  CheckCircle: ({size=48}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

// Reusable components
const Btn = ({ children, variant="primary", className="", style={}, ...props }) => {
  const cls = { primary:"btn-primary", outline:"btn-outline", ghost:"btn-ghost" }[variant] || "btn-primary";
  return <button className={`btn ${cls} ${className}`} style={style} {...props}>{children}</button>;
};

const InputField = ({ label, ...props }) => (
  <div className="input-wrap">
    {label && <label className="input-label">{label}</label>}
    <input className="input-field" {...props} />
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={onClick}>
    <div className="product-card-img-wrap">
      <img src={product.image} alt={product.name} className="product-img" referrerPolicy="no-referrer" />
      <button className="product-wish-btn" onClick={e => e.stopPropagation()}>
        <Icons.Heart size={15} />
      </button>
      {product.deal && <span className="product-deal-badge">Deal</span>}
    </div>
    <p className="product-name">{product.name}</p>
    <p className="product-price">${product.price}</p>
  </div>
);

// ---- Screens ----

const SplashScreen = ({ onNext }) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div className="splash-grid">
      {[
        {src:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400", style:{height:240}},
        {src:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400", style:{height:180,marginTop:48}},
        {src:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400", style:{height:220,marginTop:-32}},
        {src:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400", style:{height:280,marginTop:-64}},
      ].map((img, i) => (
        <div key={i} className="rounded-card" style={{overflow:"hidden",...img.style}}>
          <img src={img.src} className="splash-img" referrerPolicy="no-referrer" alt="" />
        </div>
      ))}
    </div>
    <div className="splash-footer">
      <h1 className="splash-title">StyleHub</h1>
      <p className="splash-sub">Your daily outfit, delivered.</p>
      <Btn onClick={onNext} className="btn-full btn-lg">Get Started</Btn>
    </div>
  </div>
);

const AuthScreen = ({ type, onNext, onToggle }) => (
  <div className="auth-wrap">
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <h2 className="auth-title">{type === "login" ? "Welcome Back" : "Create Account"}</h2>
      <p className="auth-sub">{type === "login" ? "Sign in to continue your journey." : "Join us for a curated experience."}</p>
      <div className="auth-fields">
        {type === "signup" && <InputField label="Full Name" placeholder="Jane Doe" />}
        <InputField label="Email Address" placeholder="jane@example.com" type="email" />
        <InputField label="Password" placeholder="••••••••" type="password" />
        <Btn onClick={onNext} className="btn-full btn-lg" style={{marginTop:8}}>
          {type === "login" ? "Sign In" : "Sign Up"}
        </Btn>
      </div>
      <div className="auth-divider"><span className="auth-divider-text">Or continue with</span></div>
      <div className="auth-social">
        <Btn variant="outline" style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
          <img src="https://www.google.com/favicon.ico" style={{width:16,height:16}} alt="" /> Google
        </Btn>
        <Btn variant="outline" style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
          <Icons.User /> Apple
        </Btn>
      </div>
    </div>
    <p className="auth-toggle">
      {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
      <button className="auth-toggle-btn" onClick={onToggle}>
        {type === "login" ? "Sign Up" : "Sign In"}
      </button>
    </p>
  </div>
);

const HomeScreen = ({ onProductClick }) => (
  <div style={{paddingBottom:96}}>
    <div className="hero-wrap">
      <div className="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800" className="hero-img" referrerPolicy="no-referrer" alt="" />
        <div className="hero-overlay">
          <p className="hero-tag">Trending Now</p>
          <h2 className="hero-title">Summer Essentials</h2>
          <Btn style={{width:"fit-content",padding:"12px 28px"}}>Shop Collection</Btn>
        </div>
      </div>
    </div>

    <div style={{marginTop:36}}>
      <div className="section-header" style={{padding:"0 24px",marginBottom:16}}>
        <h3 className="section-title">Categories</h3>
        <button className="section-link">View All</button>
      </div>
      <div className="cat-scroll">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="cat-item">
            <div className="cat-circle"><img src={cat.thumbnail} alt={cat.name} referrerPolicy="no-referrer" /></div>
            <p className="cat-name">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="section">
      <div className="section-header">
        <h3 className="section-title">Great Deals</h3>
        <button className="section-link section-link-muted">See More</button>
      </div>
      <div className="product-grid">
        {PRODUCTS.filter(p => p.deal).map(p => <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />)}
      </div>
    </div>

    <div className="section" style={{marginTop:36}}>
      <div className="lifestyle-banner">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" style={{width:"100%",height:"100%",objectFit:"cover"}} referrerPolicy="no-referrer" alt="" />
        <div className="lifestyle-overlay">
          <div className="lifestyle-text">
            <h3 className="lifestyle-title">The Art of Living</h3>
            <p className="lifestyle-sub">Explore our lifestyle collection</p>
          </div>
        </div>
      </div>
    </div>

    <div className="section">
      <h3 className="section-title" style={{marginBottom:20}}>Trending This Week</h3>
      <div className="product-grid">
        {PRODUCTS.filter(p => p.trending).map(p => <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />)}
      </div>
    </div>
  </div>
);

const ExploreScreen = () => (
  <div className="explore-wrap">
    <h2 className="explore-title">Explore</h2>
    {CATEGORIES.map(cat => (
      <div key={cat.id} className="explore-item">
        <div className="explore-item-left">
          <div className="explore-thumb"><img src={cat.thumbnail} alt={cat.name} referrerPolicy="no-referrer" /></div>
          <span className="explore-name">{cat.name}</span>
        </div>
        <Icons.ChevronRight />
      </div>
    ))}
  </div>
);

const ProductDetailScreen = ({ product, onBack, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  return (
    <div className="pdp-wrap" style={{height:"100%"}}>
      <div className="pdp-scroll">
        <div className="pdp-img-wrap">
          <button className="pdp-back-btn" onClick={onBack}><Icons.ArrowLeft /></button>
          <img src={product.image} className="pdp-img" referrerPolicy="no-referrer" alt={product.name} />
        </div>
        <div className="pdp-info">
          <div>
            <div className="pdp-name-row">
              <h2 className="pdp-name">{product.name}</h2>
              <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--zinc-400)",padding:8}}><Icons.Heart size={22} /></button>
            </div>
            <p className="pdp-price">${product.price}</p>
          </div>
          <p className="pdp-desc">{product.description}</p>
          <div>
            <p className="pdp-section-label">Select Size</p>
            <div className="size-options">
              {product.sizes.map(s => (
                <button key={s} className={`size-btn${selectedSize===s?" active":""}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="pdp-section-label">Select Color</p>
            <div className="color-options">
              {product.colors.map(c => (
                <button key={c} className={`color-btn${selectedColor===c?" active":""}`} style={{backgroundColor:c,boxShadow:c==="#FFFFFF"?"inset 0 0 0 1px #ddd":"none"}} onClick={() => setSelectedColor(c)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pdp-footer">
        <Btn className="btn-full btn-lg" onClick={onAddToCart}><Icons.Bag /> Add to Cart</Btn>
      </div>
    </div>
  );
};

const CartScreen = ({ onCheckout }) => (
  <div className="cart-wrap" style={{height:"100%"}}>
    <h2 className="cart-title">Your Bag</h2>
    <div className="cart-items">
      {[PRODUCTS[0], PRODUCTS[1]].map((item, i) => (
        <div key={i} className="cart-item">
          <div className="cart-item-img"><img src={item.image} alt={item.name} referrerPolicy="no-referrer" /></div>
          <div className="cart-item-info">
            <div>
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-meta">Size: M · Color: Mauve</p>
            </div>
            <div className="cart-item-bottom">
              <span className="cart-item-price">${item.price}</span>
              <div className="qty-ctrl">
                <button className="qty-btn">−</button>
                <span className="qty-val">1</span>
                <button className="qty-btn">+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="cart-summary">
      <div className="summary-row"><span>Subtotal</span><span>$318.00</span></div>
      <div className="summary-row"><span>Shipping</span><span>Free</span></div>
      <div className="summary-total"><span>Total</span><span>$318.00</span></div>
      <Btn className="btn-full btn-lg" style={{marginTop:8}} onClick={onCheckout}>Checkout</Btn>
    </div>
  </div>
);

const CheckoutScreen = ({ onConfirm }) => (
  <div className="checkout-wrap" style={{height:"100%"}}>
    <h2 className="checkout-title">Checkout</h2>
    <div className="checkout-body">
      <div>
        <p className="section-block-label">Shipping Address</p>
        <div className="address-card">
          <p className="address-name">Jane Doe</p>
          <p className="address-text">123 Minimalist Way, Design District, NY 10001</p>
          <button className="edit-btn">Edit</button>
        </div>
      </div>
      <div>
        <p className="section-block-label">Payment Method</p>
        <div className="payment-card">
          <div className="visa-badge">VISA</div>
          <div>
            <p className="card-num">•••• •••• •••• 4242</p>
            <p className="card-exp">Expires 12/26</p>
          </div>
          <div className="check-icon"><Icons.CheckCircle size={20} /></div>
        </div>
      </div>
      <div>
        <p className="section-block-label">Order Summary</p>
        <div className="order-summary-rows">
          <div className="order-row"><span>Items (2)</span><span>$318.00</span></div>
          <div className="order-row"><span>Delivery</span><span>$0.00</span></div>
          <div className="order-row-total"><span>Total</span><span>$318.00</span></div>
        </div>
      </div>
    </div>
    <Btn className="btn-full btn-lg" style={{marginTop:24}} onClick={onConfirm}>Place Order</Btn>
  </div>
);

const ConfirmationScreen = ({ onHome }) => (
  <div className="confirm-wrap">
    <div className="confirm-icon"><Icons.CheckCircle size={48} /></div>
    <div>
      <h2 className="confirm-title">Order Confirmed!</h2>
      <p className="confirm-sub">Your fashion journey has begun. We'll notify you when your items are on their way.</p>
    </div>
    <div style={{width:"100%",paddingTop:16,display:"flex",flexDirection:"column",gap:8}}>
      <Btn className="btn-full btn-lg" onClick={onHome}>Continue Shopping</Btn>
      <Btn variant="ghost" className="btn-full">Track Order</Btn>
    </div>
  </div>
);

const SearchScreen = ({ onProductClick, onFilter }) => (
  <div className="search-wrap">
    <div className="search-bar-row">
      <div className="search-input-wrap">
        <span className="search-icon"><Icons.Search /></span>
        <input className="search-input" placeholder="Search items..." />
      </div>
      <button className="filter-btn" onClick={onFilter}><Icons.Filter /></button>
    </div>
    <div className="product-grid">
      {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />)}
    </div>
  </div>
);

const WishlistScreen = ({ onProductClick }) => (
  <div className="wishlist-wrap">
    <h2 className="wishlist-title">Wishlist</h2>
    <div className="product-grid">
      {PRODUCTS.slice(0,4).map(p => <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />)}
    </div>
  </div>
);

const ProfileScreen = ({ onNavigate }) => (
  <div className="profile-wrap">
    <div className="profile-header">
      <div className="profile-avatar">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" referrerPolicy="no-referrer" alt="Profile" />
      </div>
      <div>
        <h2 className="profile-name">Jane Doe</h2>
        <p className="profile-since">Member since 2024</p>
      </div>
    </div>
    <div className="profile-stats">
      {[["12","Orders"],["24","Wishlist"],["1.2k","Points"]].map(([v,l]) => (
        <div key={l} className="stat-card"><p className="stat-val">{v}</p><p className="stat-label">{l}</p></div>
      ))}
    </div>
    <div className="profile-menu">
      {[{label:"My Orders",screen:"orders"},{label:"Settings",screen:"settings"},{label:"Help Center",screen:"help"},{label:"Shipping Address",screen:"profile"},{label:"Payment Methods",screen:"profile"}].map(item => (
        <button key={item.label} className="profile-menu-item" onClick={() => onNavigate(item.screen)}>
          <span className="profile-menu-label">{item.label}</span>
          <Icons.ChevronRight />
        </button>
      ))}
    </div>
    <Btn variant="outline" className="btn-full" style={{marginTop:20,color:"var(--red-500)",borderColor:"var(--red-100)"}}>Sign Out</Btn>
  </div>
);

const OrdersScreen = ({ onBack }) => (
  <div className="sub-wrap">
    <div className="sub-header">
      <button className="sub-back-btn" onClick={onBack}><Icons.ArrowLeft /></button>
      <h2 className="sub-title">My Orders</h2>
    </div>
    {[1,2,3].map(i => (
      <div key={i} className="order-card">
        <div className="order-card-top">
          <span className="order-id">Order #VV-9823{i}</span>
          <span className="order-status">Delivered</span>
        </div>
        <div className="order-card-body">
          <div className="order-thumb"><img src={PRODUCTS[i-1].image} alt="" referrerPolicy="no-referrer" /></div>
          <div className="order-info">
            <p className="order-date">Order placed on March {i}, 2024</p>
            <p className="order-meta">2 items · $245.00</p>
          </div>
          <Icons.ChevronRight />
        </div>
      </div>
    ))}
  </div>
);

const SettingsScreen = ({ onBack }) => (
  <div className="sub-wrap">
    <div className="sub-header">
      <button className="sub-back-btn" onClick={onBack}><Icons.ArrowLeft /></button>
      <h2 className="sub-title">Settings</h2>
    </div>
    {["Push Notifications","Email Preferences","Dark Mode","Language","Privacy Policy","Terms of Service"].map(item => (
      <div key={item} className="list-item">
        <span className="list-item-label">{item}</span>
        <div className="toggle"><div className="toggle-knob" /></div>
      </div>
    ))}
  </div>
);

const HelpScreen = ({ onBack }) => (
  <div className="sub-wrap">
    <div className="sub-header">
      <button className="sub-back-btn" onClick={onBack}><Icons.ArrowLeft /></button>
      <h2 className="sub-title">Help Center</h2>
    </div>
    {["Shipping & Delivery","Returns & Refunds","Payment Options","Account Issues","Size Guide"].map(item => (
      <div key={item} className="list-item" style={{cursor:"pointer"}}>
        <span className="list-item-label">{item}</span>
        <Icons.ChevronRight />
      </div>
    ))}
  </div>
);

const ReviewsScreen = ({ onBack }) => (
  <div className="sub-wrap">
    <div className="sub-header">
      <button className="sub-back-btn" onClick={onBack}><Icons.ArrowLeft /></button>
      <h2 className="sub-title">Reviews</h2>
    </div>
    {[1,2,3].map(i => (
      <div key={i} className="review-item">
        <div className="review-header">
          <div className="reviewer">
            <div className="reviewer-avatar" />
            <span className="reviewer-name">Customer {i}</span>
          </div>
          <div className="stars">{[1,2,3,4,5].map(s => <Icons.Star key={s} />)}</div>
        </div>
        <p className="review-text">Absolutely love the quality of this piece. The silk is so soft and the fit is perfect. Highly recommend!</p>
      </div>
    ))}
  </div>
);

const FilterModal = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-sheet" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">Filter</h3>
        <button className="modal-close" onClick={onClose}><Icons.X /></button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:24}}>
        <div>
          <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--zinc-400)",marginBottom:12}}>Price Range</p>
          <div style={{display:"flex",gap:12}}>
            <InputField placeholder="Min" type="number" />
            <InputField placeholder="Max" type="number" />
          </div>
        </div>
        <div>
          <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--zinc-400)",marginBottom:12}}>Sort By</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {["Newest","Price: Low to High","Price: High to Low","Popularity"].map(s => (
              <button key={s} style={{padding:"8px 14px",borderRadius:20,border:"1.5px solid var(--zinc-100)",fontSize:13,cursor:"pointer",background:"white",fontFamily:"inherit"}}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <Btn className="btn-full btn-lg" style={{marginTop:28}} onClick={onClose}>Apply Filters</Btn>
    </div>
  </div>
);

// ---- Main App ----
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showFilter, setShowFilter] = useState(false);

  const go = (s) => setScreen(s);

  const handleProductClick = (p) => { setSelectedProduct(p); go("pdp"); };

  const renderScreen = () => {
    switch(screen) {
      case "splash":    return <SplashScreen onNext={() => go("login")} />;
      case "login":     return <AuthScreen type="login" onNext={() => { go("home"); setActiveTab("home"); }} onToggle={() => go("signup")} />;
      case "signup":    return <AuthScreen type="signup" onNext={() => { go("home"); setActiveTab("home"); }} onToggle={() => go("login")} />;
      case "home":      return <HomeScreen onProductClick={handleProductClick} />;
      case "category":  return <ExploreScreen />;
      case "pdp":       return selectedProduct ? <ProductDetailScreen product={selectedProduct} onBack={() => go("home")} onAddToCart={() => go("cart")} /> : null;
      case "cart":      return <CartScreen onCheckout={() => go("checkout")} />;
      case "checkout":  return <CheckoutScreen onConfirm={() => go("confirmation")} />;
      case "confirmation": return <ConfirmationScreen onHome={() => { go("home"); setActiveTab("home"); }} />;
      case "profile":   return <ProfileScreen onNavigate={go} />;
      case "search":    return <SearchScreen onProductClick={handleProductClick} onFilter={() => setShowFilter(true)} />;
      case "wishlist":  return <WishlistScreen onProductClick={handleProductClick} />;
      case "orders":    return <OrdersScreen onBack={() => go("profile")} />;
      case "settings":  return <SettingsScreen onBack={() => go("profile")} />;
      case "help":      return <HelpScreen onBack={() => go("profile")} />;
      case "reviews":   return <ReviewsScreen onBack={() => go("pdp")} />;
      default:          return <HomeScreen onProductClick={handleProductClick} />;
    }
  };

  const showNav = ["home","category","cart","profile","search","wishlist"].includes(screen);
  const navItems = [
    { id:"home", label:"Home", icon:<Icons.Home /> },
    { id:"search", label:"Search", icon:<Icons.Search /> },
    { id:"wishlist", label:"Wishlist", icon:<Icons.Heart size={20} /> },
    { id:"profile", label:"Profile", icon:<Icons.User /> },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <div className="screen fade-in" key={screen}>
          {renderScreen()}
        </div>

        {showNav && (
          <nav className="bottom-nav">
            {navItems.map(item => (
              <button key={item.id} className={`nav-btn${activeTab===item.id?" active":""}`} onClick={() => { setActiveTab(item.id); go(item.id); }}>
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        )}

        {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
      </div>
    </>
  );
}
