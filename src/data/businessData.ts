/**
 * Business Information & Catalog Data
 * Easily edit business details, products, prices, and FAQs here.
 */

export interface BusinessInfo {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  phonePlaceholder: string;
  whatsAppNumber: string; // Used for wa.me links; digits only if provided or placeholder
  emailPlaceholder: string;
  addressPlaceholder: string;
  workingHours: string;
  instagramPlaceholder: string;
  facebookPlaceholder: string;
  pinterestPlaceholder: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "Handcrafted Studio",
  tagline: "Artisan Creations for Life's Cherished Milestones",
  heroHeadline: "Handcrafted with Care, Created for Your Special Moments",
  heroSubheadline: "Everlasting pipe-cleaner florals, bespoke gift hampers, and artisanal keepsakes made with patience, love, and intricate attention to detail.",
  phonePlaceholder: "+91 XXXXX XXXXX",
  whatsAppNumber: "91XXXXXXXXXX", // Replace with owner's active WhatsApp number without '+' or symbols
  emailPlaceholder: "contact@handcraftedstudio.com",
  addressPlaceholder: "[Artisan Studio & Workshop, City, State, India]",
  workingHours: "Mon – Sat: 10:00 AM – 7:30 PM",
  instagramPlaceholder: "instagram.com/[your_studio_handle]",
  facebookPlaceholder: "facebook.com/[your_studio_page]",
  pinterestPlaceholder: "pinterest.com/[your_studio_pins]",
};

export interface FlowerPriceItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  category: "single" | "bundle" | "wrapped";
  description: string;
  badge?: string;
  icon?: string;
  image: string;
}

export const PIPE_CLEANER_PRICE_LIST: FlowerPriceItem[] = [
  {
    id: "daisy",
    name: "Daisy",
    price: 60,
    priceDisplay: "₹60",
    category: "single",
    description: "Classic single-tier delicate daisy with vibrant central disc.",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tulip",
    name: "Tulip",
    price: 100,
    priceDisplay: "₹100",
    category: "single",
    description: "Elegant closed-cup tulip stem in pastel pink, peach, or butter yellow.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    price: 100,
    priceDisplay: "₹100",
    category: "single",
    description: "Bright sunny golden petals with chocolate textured chenille center.",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rose",
    name: "Rose",
    price: 120,
    priceDisplay: "₹120",
    category: "single",
    description: "Multi-layered spiraled rose bloom with gentle velvet finish.",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lily",
    name: "Lily",
    price: 130,
    priceDisplay: "₹130",
    category: "single",
    description: "Flared trumpet lily with delicate wire stamen details.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lavender",
    name: "Lavender bunch (3)",
    price: 120,
    priceDisplay: "₹120",
    category: "bundle",
    description: "Set of three textured lilac lavender stems with subtle greenery.",
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    price: 140,
    priceDisplay: "₹140",
    category: "single",
    description: "Vibrant tropical bloom with long stamen and scalloped petal edges.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "double-daisy",
    name: "Double Layer Daisy",
    price: 100,
    priceDisplay: "₹100",
    category: "single",
    description: "Lush double-petal layer giving a fuller, premium cottage garden look.",
    image: "https://images.unsplash.com/photo-1464851707681-f9d5fdac settings?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "large-tulip",
    name: "Large Tulip",
    price: 150,
    priceDisplay: "₹150",
    category: "single",
    description: "Oversized statement tulip with sturdy wrapped florist stem and leaf.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "large-sunflower",
    name: "Large Sunflower",
    price: 200,
    priceDisplay: "₹200",
    category: "single",
    description: "Grand diameter sunflower bloom ideal as the focal point of bouquets.",
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wrapped-single",
    name: "Wrapped single flower",
    price: 165,
    priceDisplay: "₹150 – ₹180",
    category: "wrapped",
    description: "Single signature flower wrapped in Korean waterproof paper and satin ribbon.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wrapped-four",
    name: "Wrapped 4 flowers",
    price: 225,
    priceDisplay: "₹200 – ₹250",
    category: "wrapped",
    description: "Harmonious 4-bloom arrangement with accent eucalyptus and elegant wrap.",
    badge: "Popular Gift",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "premium-bouquet",
    name: "Premium customized bouquet",
    price: 999,
    priceDisplay: "₹999+",
    category: "wrapped",
    description: "Grand custom-crafted luxury floral arrangement designed for weddings & milestones.",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=600&q=80",
  },
];

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  numericPrice?: number;
  description: string;
  image: string;
  occasion?: string;
  featured?: boolean;
}

export const PRODUCT_CATEGORIES = [
  "All",
  "Pipe-cleaner flowers",
  "Customized bouquets",
  "Customized gifts",
  "Bangles",
  "Earrings",
  "Embroidery work",
  "Gift hampers",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Pastel Meadow Pipe-Cleaner Bouquet",
    category: "Customized bouquets",
    price: "₹850",
    numericPrice: 850,
    description: "A soft pastel blend of pink tulips, daisies, and lavender sprigs wrapped in textured kraft paper.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80",
    occasion: "Birthdays & Anniversaries",
    featured: true,
  },
  {
    id: "p2",
    name: "Handmade Floral Haldi Bangles Set",
    category: "Bangles",
    price: "₹450",
    numericPrice: 450,
    description: "Vibrant yellow and marigold-inspired fabric and bead bangles handcrafted for Haldi and Mehendi rituals.",
    image: "https://images.unsplash.com/photo-1611591475155-426c04514819?auto=format&fit=crop&w=700&q=80",
    occasion: "Haldi & Wedding Functions",
    featured: true,
  },
  {
    id: "p3",
    name: "Sunflower & Daisy Sunshine Bunch",
    category: "Pipe-cleaner flowers",
    price: "₹380",
    numericPrice: 380,
    description: "cheerful everlasting bunch comprising 2 bright sunflowers, 2 white daisies, and soft greenery.",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=700&q=80",
    occasion: "Get Well Soon & Birthdays",
    featured: true,
  },
  {
    id: "p4",
    name: "Personalized Wedding Date Embroidery Hoop",
    category: "Embroidery work",
    price: "₹799",
    numericPrice: 799,
    description: "Detailed hand-stitched floral frame with couple's names and wedding date on pure linen in a wooden hoop.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    occasion: "Weddings & Keepsakes",
    featured: true,
  },
  {
    id: "p5",
    name: "Haldi Ceremony Festive Gift Hamper",
    category: "Gift hampers",
    price: "₹1,250",
    numericPrice: 1250,
    description: "Curated gift box featuring handmade floral earrings, Haldi bangles, a mini sunflower stem, and sweet treats.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80",
    occasion: "Haldi & Bridesmaid Gifting",
    featured: true,
  },
  {
    id: "p6",
    name: "Handcrafted Floral Petal Earrings",
    category: "Earrings",
    price: "₹280",
    numericPrice: 280,
    description: "Lightweight artisan earrings designed with soft fabric petals and pearl drops for festive outfits.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    occasion: "Festivals & Special Occasions",
    featured: false,
  },
  {
    id: "p7",
    name: "Wrapped Single Rose in Gift Sleeve",
    category: "Pipe-cleaner flowers",
    price: "₹160",
    numericPrice: 160,
    description: "Hand-rolled crimson or blush velvet pipe-cleaner rose sealed in a translucent frosted cone with silk bow.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    occasion: "Gifting & Return Favors",
    featured: false,
  },
  {
    id: "p8",
    name: "Bespoke Anniversary Memory Box",
    category: "Customized gifts",
    price: "₹950",
    numericPrice: 950,
    description: "Custom engraved wooden box lined with velvet, featuring mini pipe-cleaner florals and photo accordion.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80",
    occasion: "Anniversaries & Birthdays",
    featured: false,
  },
  {
    id: "p9",
    name: "Grand Premium Customized Bouquet",
    category: "Customized bouquets",
    price: "₹999+",
    numericPrice: 999,
    description: "Deluxe multi-stem arrangement with large sunflowers, roses, lilies, double daisies, and satin ribbons.",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80",
    occasion: "Weddings, Graduations, Milestones",
    featured: true,
  },
  {
    id: "p10",
    name: "Floral Baby Birth Announcement Hoop",
    category: "Embroidery work",
    price: "₹850",
    numericPrice: 850,
    description: "Handmade nursery keepsake with delicate pastel wreaths, baby name, birth date, weight, and time.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=700&q=80",
    occasion: "Baby Showers & Birthdays",
    featured: false,
  },
  {
    id: "p11",
    name: "Handcrafted Silk Thread Bridal Bangles",
    category: "Bangles",
    price: "₹550",
    numericPrice: 550,
    description: "Rich silk thread wound bangles with stone chains and gold ball hangings customized to match your saree or lehenga.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=700&q=80",
    occasion: "Weddings & Traditional Occasions",
    featured: false,
  },
  {
    id: "p12",
    name: "Celebration Birthday Gift Hamper",
    category: "Gift hampers",
    price: "₹1,499",
    numericPrice: 1499,
    description: "An enchanting gift box with wrapped 4-flower bouquet, customized scented candle, handmade card, and treats.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80",
    occasion: "Birthdays & Special Friends",
    featured: false,
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  occasion: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Pastel Tulip & Lavender Bridal Toss Bouquet",
    category: "Bouquets",
    occasion: "Wedding Ceremony",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: "Handmade Floral Haldi Jewelry for Bride & Sisters",
    category: "Haldi & Bangles",
    occasion: "Haldi Function",
    image: "https://images.unsplash.com/photo-1611591475155-426c04514819?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: "Golden Sunflower Desk Pot Arrangement",
    category: "Pipe Cleaner Florals",
    occasion: "Birthday Gift",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    title: "Couples Initials Floral Embroidery Hoop",
    category: "Embroidery",
    occasion: "Wedding Keepsake",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    title: "Wrapped 4-Flower Pastel Gifting Bunch",
    category: "Bouquets",
    occasion: "Graduation & Special Days",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    title: "Customized Festive Treat & Floral Hamper",
    category: "Gift Hampers",
    occasion: "Family Special Occasion",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  },
];

export interface CustomerReview {
  id: string;
  namePlaceholder: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  itemOrdered: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "r1",
    namePlaceholder: "[Customer: Priya S.]",
    occasion: "Haldi Ceremony Order",
    rating: 5,
    date: "Recent Order",
    comment: "The floral jewelry set and yellow pipe cleaner sunflower bouquets for our Haldi ceremony were so vibrant! All the guests asked where we got them from. They never wilted in the heat and made our photos look magical.",
    itemOrdered: "Haldi Bangles & Sunflower Bouquet",
  },
  {
    id: "r2",
    namePlaceholder: "[Customer: Rahul M.]",
    occasion: "Birthday Gifting",
    rating: 5,
    date: "Recent Order",
    comment: "I gave a ₹500 budget and the AI suggested the exact 4-flower wrapped tulip combo. Ordering on WhatsApp was so straightforward—they sent progress pictures before dispatching!",
    itemOrdered: "Wrapped 4 Flowers Bouquet",
  },
  {
    id: "r3",
    namePlaceholder: "[Customer: Ananya K.]",
    occasion: "Wedding Keepsake",
    rating: 5,
    date: "Recent Order",
    comment: "The hand-embroidered wedding hoop with our date is now hanging in our bedroom. The craftsmanship and neatness of each French knot is unbelievable. Worth every rupee.",
    itemOrdered: "Customized Name Embroidery Hoop",
  },
  {
    id: "r4",
    namePlaceholder: "[Customer: Sneha D.]",
    occasion: "Anniversary Surprise",
    rating: 5,
    date: "Recent Order",
    comment: "Real flowers fade in 3 days, but this handcrafted rose and lily bouquet still looks brand new on our mantelpiece months later. Superb packaging!",
    itemOrdered: "Premium Customized Bouquet",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What are pipe-cleaner flowers made of and how long do they last?",
    answer: "Our flowers are individually hand-twisted using premium high-density velvet chenille stems around bendable florist wire. Unlike natural flowers, they are everlasting! They never wilt, require zero water, and can maintain their shape and colors for years.",
  },
  {
    question: "Can I customize the colors, flower types, and wrapping paper?",
    answer: "Yes, absolutely! Everything is made to order. You can request any flower combination (e.g., sunflowers + tulips + daisies), specify your preferred palette (pastels, vibrant yellow for Haldi, romantic reds/pinks, or custom hues), and choose your wrapping style.",
  },
  {
    question: "How do I place an order?",
    answer: "You can select any product card or use our 'Custom Order Form' below. Simply fill in your name, required product, budget, event date, and preferred color, then click 'Send Order on WhatsApp'. We will directly receive your details and confirm payment and dispatch timeline.",
  },
  {
    question: "How many days in advance should I order for weddings or Haldi events?",
    answer: "For single flowers and small bouquets, we usually require 2–3 days. For wedding favors, bridesmaid hampers, or bulk Haldi bangles and jewelry, we recommend ordering 7–10 days in advance so we can craft everything with meticulous care.",
  },
  {
    question: "Can you create something within my specific budget?",
    answer: "Yes! You can ask our built-in AI Shopping Assistant (e.g. 'I have ₹500, what can I get?') or enter your budget directly into the Custom Order Form. We will design the best bouquet or hamper combination matching your exact budget.",
  },
  {
    question: "How do I care for pipe-cleaner flowers?",
    answer: "Keep them indoors away from direct rain or heavy moisture. To clean, simply use a soft dry brush, gentle hairdryer on cool setting, or lightly dust with a microfiber cloth.",
  },
];
