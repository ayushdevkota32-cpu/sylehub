export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  trending?: boolean;
  deal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Silk Blouse",
    price: 129,
    description: "A timeless piece crafted from 100% pure silk. Perfect for both professional and evening wear.",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800",
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FFFFFF", "#F5F5F5", "#8E7676"],
    trending: true,
  },
  {
    id: "2",
    name: "Tailored Wool Trousers",
    price: 189,
    description: "Expertly cut trousers in premium Italian wool. Features a high-waist silhouette and sharp pleats.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    category: "Bottoms",
    sizes: ["2", "4", "6", "8", "10"],
    colors: ["#1A1A1A", "#4A4A4A"],
    deal: true,
  },
  {
    id: "3",
    name: "Cashmere Wrap Coat",
    price: 450,
    description: "Luxurious double-faced cashmere coat with a belted waist. The ultimate investment piece.",
    image: "https://images.unsplash.com/photo-1539533377285-340d1c4a5a7c?auto=format&fit=crop&q=80&w=800",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
    colors: ["#D2B48C", "#8E7676"],
    trending: true,
  },
  {
    id: "4",
    name: "Minimalist Leather Tote",
    price: 295,
    description: "Structured tote bag made from vegetable-tanned leather. Spacious enough for all your essentials.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["#000000", "#8B4513"],
  },
  {
    id: "5",
    name: "Linen Midi Dress",
    price: 155,
    description: "Breathable linen dress with a square neckline and side slits. Ideal for warm summer days.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FFFFFF", "#E6E6FA"],
    deal: true,
  },
  {
    id: "6",
    name: "Satin Slip Skirt",
    price: 89,
    description: "Fluid satin skirt with a bias cut for a flattering drape. Versatile for day-to-night styling.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    category: "Bottoms",
    sizes: ["S", "M", "L"],
    colors: ["#FFD700", "#000000"],
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "c1", name: "New Arrivals", thumbnail: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=200" },
  { id: "c2", name: "Dresses", thumbnail: "https://images.unsplash.com/photo-1539008835270-21735614b6cc?auto=format&fit=crop&q=80&w=200" },
  { id: "c3", name: "Tops", thumbnail: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=200" },
  { id: "c4", name: "Bottoms", thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=200" },
  { id: "c5", name: "Outerwear", thumbnail: "https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=200" },
  { id: "c6", name: "Accessories", thumbnail: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=200" },
];
