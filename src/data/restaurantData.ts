import { MenuItem, SignatureDish, ExperienceItem, GalleryItem, ReviewItem, OccasionItem } from '../types';

export const RESTAURANT_INFO = {
  name: "KINGS' CROWN",
  tagline: "Best Family AC Bar & Restaurant in Chinsurah",
  subTagline: "Indian • Chinese • Continental • Tandoor",
  elevatorPitch: "An elevated dining experience in the heart of Chinsurah, crafted for memorable meals, celebrations and evenings worth remembering.",
  level: "Level 4 (Rooftop & AC Dining)",
  building: "Rupali Arcade",
  locality: "Chinsurah R.S.",
  city: "Chinsurah",
  state: "West Bengal",
  pincode: "712101",
  country: "India",
  fullAddress: "Rupali Arcade, Level 4, Chinsurah R.S., Chinsurah, West Bengal 712101",
  phone: "+91 91470 05547",
  secondaryPhone: "09147005547",
  whatsappNumber: "919147005547",
  email: "reservations@kingscrownchinsurah.com",
  googleMapsUrl: "https://maps.google.com/?q=Rupali+Arcade+Level+4+Chinsurah+RS+West+Bengal+712101",
  googleRating: 4.7,
  totalReviewsCount: "850+",
  priceRange: "₹500 - ₹1,200 for two",
  hours: [
    { days: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { days: "Friday – Sunday", time: "12:00 PM – 11:30 PM" }
  ],
  amenities: [
    "Open-Air Rooftop & Poolside Ambience",
    "100% Climate Controlled AC Dining Hall",
    "Full Bar & Signature Mocktails",
    "Family & Kids Friendly Seating",
    "Elevator Access to Level 4",
    "Celebration & Birthday Party Zones",
    "Valet & Dedicated Parking Support",
    "High-Speed Wi-Fi & Live Sports Screenings"
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "01",
    number: "01",
    title: "CURATED CUISINE",
    subtitle: "Flavour & Presentation Masterclass",
    description: "Indian, Chinese, Continental and Tandoor favourites prepared with meticulous attention to authentic spices, slow cooking techniques, and modern aesthetic presentation.",
    highlight: "4 Distinct Culinary Traditions Under One Roof",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Master Chefs with 15+ years luxury kitchen pedigree",
      "Authentic clay tandoor charcoal roasting",
      "Fresh daily produce & premium imported spices",
      "Handcrafted gravies simmered for 8+ hours"
    ]
  },
  {
    id: "02",
    number: "02",
    title: "ROOFTOP AMBIENCE",
    subtitle: "Level 4 Open Sky Panoramas",
    description: "An elevated rooftop setting designed for relaxed breezes, glowing evening lights, handcrafted drinks, and lively conversations under the stars of Chinsurah.",
    highlight: "Chinsurah's Premier Sky Dining Deck",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Panoramic skyline views over Hooghly district",
      "Soft acoustic lighting & breezy alfresco decks",
      "Poolside corner tables for intimate dates",
      "Sunset aperitif lounge with soothing music"
    ]
  },
  {
    id: "03",
    number: "03",
    title: "FAMILY FRIENDLY",
    subtitle: "Spacious Comfort & AC Luxury",
    description: "A warm and welcoming dining environment crafted for comfortable multi-generational family gatherings, relaxed couple dinners, and reunion lunches.",
    highlight: "Expansive 100% Climate-Controlled Salons",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Plush sofa booths & banquet-style long tables",
      "Child-friendly culinary options & mild spice profiles",
      "Elevator access straight from arcade lobby",
      "Attentive, courteous family hospitality"
    ]
  },
  {
    id: "04",
    number: "04",
    title: "CELEBRATION READY",
    subtitle: "Unforgettable Milestone Moments",
    description: "A sophisticated destination equipped with custom lighting, bespoke menu curation, and dedicated staff for birthdays, anniversaries, and corporate banquets.",
    highlight: "Private Party Sections & Custom Setups",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Dedicated party zones accommodating 15 to 100 guests",
      "Custom birthday/anniversary decor coordination",
      "Customizable multi-course banquet menus",
      "High-fidelity sound for celebrations"
    ]
  }
];

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: "sig-1",
    name: "Butter Garlic Pepper Chicken",
    tag: "CHEF'S SIGNATURE CREATION",
    description: "Tender chicken morsels tossed in browned cultured butter, freshly crushed tellicherry pepper, golden toasted garlic, and garden scallions.",
    detailedProfile: "A legendary dish celebrated by our patrons. We pan-sear premium succulent chicken cuts before basting them in rich garlic-infused butter and finishing with coarse aromatic black pepper.",
    price: 360,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
    pairingNotes: "Pairs magnificently with an icy Mint Lime Mojito or our house lager.",
    preparationTime: "18-22 mins",
    isVeg: false,
    flavorNotes: ["Garlicky Richness", "Black Pepper Warmth", "Silky Butter Glaze"]
  },
  {
    id: "sig-2",
    name: "Royal Awadhi Mutton Biryani",
    tag: "HERITAGE DUM SPECIALTY",
    description: "Aromatic long-grain aged Basmati rice layered with melt-in-mouth Kolkata-style mutton chunk, golden saffron potato, boiled egg, and whole mace.",
    detailedProfile: "Slow cooked in traditional sealed handis (Dum Pukht) over fragrant embers. Infused with saffron, kewra water, and artisanal desi ghee, releasing mesmerizing steam upon table presentation.",
    price: 420,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
    pairingNotes: "Served alongside chilled Burani Raita and spiced onion salad.",
    preparationTime: "20-25 mins",
    isVeg: false,
    flavorNotes: ["Saffron Fragrance", "Tender Marrow", "Fluffy Basmati Grain"]
  },
  {
    id: "sig-3",
    name: "Grilled Chicken Steak with Mushroom Glaze",
    tag: "CONTINENTAL MASTERWORK",
    description: "Herb-marinated tender chicken breast seared to golden perfection, served with creamy wild mushroom demi-glace, herb butter tossed veggies, and creamy mash.",
    detailedProfile: "Crafted for lovers of refined Continental dining. The breast is brined in fresh rosemary, thyme, and Dijon mustard before hitting the cast iron grill, creating a juicy, succulent center.",
    price: 390,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1000&auto=format&fit=crop",
    pairingNotes: "Ideal with our signature Cranberry Rosemary Cooler or dry red wine.",
    preparationTime: "20-24 mins",
    isVeg: false,
    flavorNotes: ["Wild Mushroom Umami", "Herbal Rosemary", "Velvety Potato Puree"]
  },
  {
    id: "sig-4",
    name: "Royal Charcoal Chicken Tikka Platter",
    tag: "TANDOOR JEWEL",
    description: "Boneless chicken chunks marinated in Kashmiri chilli, hung curd, and stone-ground spices, roasted over live lump-wood charcoal with bell peppers.",
    detailedProfile: "Charred with delicate smoky notes while locking in juicy tender moisture. Drizzled with clarified butter and chaat masala, served with laccha onions and mint chutney.",
    price: 340,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop",
    pairingNotes: "Best paired with Butter Garlic Naan and a chilled King's Crown Mocktail.",
    preparationTime: "18-20 mins",
    isVeg: false,
    flavorNotes: ["Smoky Charcoal", "Zesty Kashmiri Spice", "Tangy Mint Glaze"]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // TANDOOR
  {
    id: "tnd-1",
    name: "Chicken Tikka Kebab",
    category: "TANDOOR",
    description: "Boneless chicken steeped in spiced yoghurt marinade with crushed coriander, roasted in clay tandoor.",
    price: 320,
    isVeg: false,
    isSignature: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop",
    tags: ["Bestseller", "Smoky"]
  },
  {
    id: "tnd-2",
    name: "Murgh Malai Kebab",
    category: "TANDOOR",
    description: "Melt-in-mouth chicken pieces steeped in clotted cream, cardamom, mild cheese, and white pepper.",
    price: 350,
    isVeg: false,
    isChefSpecial: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
    tags: ["Creamy", "Mild"]
  },
  {
    id: "tnd-3",
    name: "Paneer Tikka Angara",
    category: "TANDOOR",
    description: "Fresh cottage cheese cubes spiced with roasted carom seeds, bell peppers, and tangy mustard oil.",
    price: 290,
    isVeg: true,
    isChefSpecial: false,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
    tags: ["Vegetarian", "Smoky"]
  },
  {
    id: "tnd-4",
    name: "Tandoori Chicken (Full)",
    category: "TANDOOR",
    description: "Whole spring chicken marinated overnight in Kashmiri chilli, ginger-garlic paste and roasted in clay oven.",
    price: 490,
    isVeg: false,
    isSignature: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop",
    tags: ["Classic", "Clay Oven"]
  },

  // BIRYANI
  {
    id: "bir-1",
    name: "Special Chicken Biryani",
    category: "BIRYANI",
    description: "Double chicken pieces, aromatic Kolkata basmati rice, tender spiced potato, and rich boiled egg.",
    price: 360,
    isVeg: false,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
    tags: ["Royal Dum", "Crowd Favourite"]
  },
  {
    id: "bir-2",
    name: "Awadhi Mutton Biryani",
    category: "BIRYANI",
    description: "Succulent mutton pieces slow-cooked on dum with fragrant saffron rice, fried onions, and whole spices.",
    price: 420,
    isVeg: false,
    isChefSpecial: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
    tags: ["Signature", "Slow Cooked"]
  },
  {
    id: "bir-3",
    name: "Shahi Paneer Dum Biryani",
    category: "BIRYANI",
    description: "Aromatic basmati rice cooked with marinaded cottage cheese cubes, saffron, mint, and toasted dry fruits.",
    price: 280,
    isVeg: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop",
    tags: ["Vegetarian", "Fragrant"]
  },

  // INDIAN
  {
    id: "ind-1",
    name: "Butter Chicken Delhi Style",
    category: "INDIAN",
    description: "Charred tandoori chicken simmered in a velvety, buttery tomato gravy with sun-dried fenugreek leaves.",
    price: 350,
    isVeg: false,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop",
    tags: ["Velvety", "Best Seller"]
  },
  {
    id: "ind-2",
    name: "Paneer Lababdar",
    category: "INDIAN",
    description: "Cottage cheese simmered in a rich tomato, onion and cashew gravy finished with grated paneer and cream.",
    price: 310,
    isVeg: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop",
    tags: ["Vegetarian", "Rich Gravy"]
  },
  {
    id: "ind-3",
    name: "Mutton Rogan Josh",
    category: "INDIAN",
    description: "Kashmiri style tender mutton braised in aromatic gravy of ratan jot, fennel seed, and dry ginger.",
    price: 430,
    isVeg: false,
    isChefSpecial: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=800&auto=format&fit=crop",
    tags: ["Heritage", "Rich"]
  },
  {
    id: "ind-4",
    name: "Dal Makhani Handi",
    category: "INDIAN",
    description: "Black lentils slow-cooked overnight with white butter, cream, and gentle spices in a clay pot.",
    price: 240,
    isVeg: true,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
    tags: ["Overnight Simmered", "Comfort"]
  },

  // CHINESE
  {
    id: "chn-1",
    name: "Butter Garlic Pepper Chicken",
    category: "CHINESE",
    description: "Chef's crown creation — crispy chicken pieces tossed in toasted garlic, butter, and crushed black pepper.",
    price: 360,
    isVeg: false,
    isChefSpecial: true,
    isSignature: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    tags: ["Top Ranked", "Must Try"]
  },
  {
    id: "chn-2",
    name: "Crispy Chilli Babycorn",
    category: "CHINESE",
    description: "Crisp fried tender babycorn strips tossed in dark soya, wok-scorched peppers, garlic, and green chillies.",
    price: 260,
    isVeg: true,
    spiciness: "spicy",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop",
    tags: ["Crunchy", "Wok Tossed"]
  },
  {
    id: "chn-3",
    name: "Golden Fried Prawns",
    category: "CHINESE",
    description: "Plump ocean prawns wrapped in crispy golden panko batter, served with sweet chilli dip and scallions.",
    price: 440,
    isVeg: false,
    isChefSpecial: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1559742811-822863ccbaaf?q=80&w=800&auto=format&fit=crop",
    tags: ["Seafood", "Crisp"]
  },
  {
    id: "chn-4",
    name: "Chilli Garlic Hakka Noodles",
    category: "CHINESE",
    description: "Handmade noodles tossed in fiery wok with shredded vegetables, roasted garlic chips, and spicy oil.",
    price: 220,
    isVeg: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    tags: ["Wok Hei", "Classic"]
  },

  // CONTINENTAL
  {
    id: "cnt-1",
    name: "Grilled Chicken Steak",
    category: "CONTINENTAL",
    description: "Char-grilled juicy chicken breast served with creamy pepper mushroom sauce, butter vegetables and mash.",
    price: 390,
    isVeg: false,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop",
    tags: ["Gourmet", "Signature"]
  },
  {
    id: "cnt-2",
    name: "Fish & Chips with Tartar Glaze",
    category: "CONTINENTAL",
    description: "Golden crumbed Kolkata Bekti fillets served with steakhouse potato wedges and house lemon tartar.",
    price: 410,
    isVeg: false,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=800&auto=format&fit=crop",
    tags: ["Crispy", "Fresh Fish"]
  },
  {
    id: "cnt-3",
    name: "Continental Herb Roast Chicken",
    category: "CONTINENTAL",
    description: "Half chicken basted in thyme, rosemary butter, garlic jus, and roasted with seasonal root veggies.",
    price: 380,
    isVeg: false,
    isChefSpecial: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=800&auto=format&fit=crop",
    tags: ["Herbal", "Roast"]
  },

  // SIZZLERS
  {
    id: "siz-1",
    name: "Italian Chicken Sizzler",
    category: "SIZZLERS",
    description: "Smouldering iron plate with grilled chicken breasts, creamy pasta, potato wedges, and roasted cheese crust.",
    price: 430,
    isVeg: false,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    tags: ["Sizzling", "Dramatic"]
  },
  {
    id: "siz-2",
    name: "Paneer & Veggie Fiesta Sizzler",
    category: "SIZZLERS",
    description: "Sizzling platter with marinated cottage cheese steaks, buttered rice, French fries, and BBQ glaze.",
    price: 360,
    isVeg: true,
    spiciness: "medium",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
    tags: ["Vegetarian", "Hot Platter"]
  },

  // PASTA
  {
    id: "pst-1",
    name: "Penne Alfredo with Smoked Chicken",
    category: "PASTA",
    description: "Artisanal penne pasta tossed in rich parmesan cream sauce, roasted garlic, cracked pepper, and smoked chicken.",
    price: 330,
    isVeg: false,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?q=80&w=800&auto=format&fit=crop",
    tags: ["Parmesan Rich", "Comfort"]
  },
  {
    id: "pst-2",
    name: "Spicy Arrabbiata Pasta (Veg)",
    category: "PASTA",
    description: "Penne tossed in crushed San Marzano tomato sauce, fresh basil, extra virgin olive oil, and chilli flakes.",
    price: 270,
    isVeg: true,
    spiciness: "spicy",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop",
    tags: ["Vegetarian", "Tangy & Spicy"]
  },

  // DESSERTS
  {
    id: "dst-1",
    name: "Warm Sizzling Brownie with Vanilla",
    category: "DESSERTS",
    description: "Gooey Belgian chocolate fudge brownie served on a sizzling skillet with vanilla bean gelato and dark chocolate ganache.",
    price: 210,
    isVeg: true,
    isSignature: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
    tags: ["Sizzling Chocolate", "Belgian"]
  },
  {
    id: "dst-2",
    name: "Royal Shahi Tukda",
    category: "DESSERTS",
    description: "Crispy ghee-fried bread steeped in saffron cardamom syrup, topped with thick reduced rabri, pistachios and silver vark.",
    price: 190,
    isVeg: true,
    isChefSpecial: true,
    spiciness: "mild",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    tags: ["Traditional", "Saffron Rabri"]
  },

  // BEVERAGES
  {
    id: "bev-1",
    name: "Kings' Crown Signature Sunset Mocktail",
    category: "BEVERAGES",
    description: "Layered blood orange, passionfruit puree, sparkling tonic, fresh rosemary sprig and crushed ice.",
    price: 180,
    isVeg: true,
    isSignature: true,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    tags: ["Signature", "Refreshing"]
  },
  {
    id: "bev-2",
    name: "Electric Blue Lagoon Cooler",
    category: "BEVERAGES",
    description: "Blue curacao essence, zesty fresh lime, ginger ale, mint sprigs, and rock salt rim.",
    price: 160,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop",
    tags: ["Chilled", "Citrus"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Rooftop Evening Atmosphere",
    category: "ROOFTOP",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    caption: "Open air breeze and ambient warm lighting on Level 4 terrace deck.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-2",
    title: "Signature Butter Garlic Pepper Chicken",
    category: "FOOD",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
    caption: "Wok tossed with butter, tellicherry black pepper and golden fried garlic.",
    aspectRatio: "square"
  },
  {
    id: "gal-3",
    title: "The AC Family Lounge & Dining Hall",
    category: "INTERIORS",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
    caption: "Plush leather sofa booths and refined contemporary architectural design.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-4",
    title: "Clay Oven Tandoori Specials",
    category: "FOOD",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop",
    caption: "Smoky charcoal roasted chicken tikka prepared by master tandoor chefs.",
    aspectRatio: "portrait"
  },
  {
    id: "gal-5",
    title: "Sunset Bar & Cocktail Counter",
    category: "ROOFTOP",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
    caption: "Chilled beverages, curated mocktails and spirits overlooking Chinsurah skyline.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-6",
    title: "Warm Family Dinners & Celebrations",
    category: "PEOPLE",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
    caption: "Welcoming spaces where multi-generational families celebrate milestones.",
    aspectRatio: "square"
  },
  {
    id: "gal-7",
    title: "Golden Hour Glow on Rooftop Deck",
    category: "EVENINGS",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop",
    caption: "As twilight sets over Rupali Arcade, the atmosphere turns magical.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-8",
    title: "Royal Awadhi Dum Biryani Handi",
    category: "FOOD",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
    caption: "Aged basmati rice, tender spiced mutton and saffron aromatics.",
    aspectRatio: "square"
  },
  {
    id: "gal-9",
    title: "Private Corner Booth for Intimate Dates",
    category: "INTERIORS",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000&auto=format&fit=crop",
    caption: "Warm candlelight and discrete service for romantic evenings.",
    aspectRatio: "portrait"
  },
  {
    id: "gal-10",
    title: "Celebration Gatherings & Group Toasts",
    category: "PEOPLE",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    caption: "Birthdays, anniversaries and friendship reunions hosted in elegance.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-11",
    title: "Night View & Illuminated Terrace",
    category: "EVENINGS",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
    caption: "Nightlife energy with sophisticated decor and gentle breeze.",
    aspectRatio: "landscape"
  },
  {
    id: "gal-12",
    title: "Sizzling Italian Platter Serving",
    category: "FOOD",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    caption: "Piping hot sizzlers arriving with fragrant herb butter steam.",
    aspectRatio: "square"
  }
];

export const OCCASIONS: OccasionItem[] = [
  {
    id: "occ-1",
    title: "DATE NIGHT",
    subtitle: "Candlelight & Intimate Conversations",
    description: "Quiet rooftop corner tables with starry sky panoramas, ambient lighting, and hand-crafted mocktails designed for romantic connections.",
    capacity: "Couples & Duos",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop",
    perks: ["Candlelight table setup", "Quiet corner seating", "Complimentary chef dessert on prior booking"],
    recommendedSeating: "Rooftop Terrace / Poolside Corner"
  },
  {
    id: "occ-2",
    title: "FAMILY DINNER",
    subtitle: "Generations Together Over Great Food",
    description: "Spacious plush seating with full AC comfort, mild gourmet dishes for elders and children, and courteous family-oriented staff.",
    capacity: "4 to 16 Guests",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    perks: ["Connected sofa booths", "Fast elevator access", "Custom multi-course family platters"],
    recommendedSeating: "Main AC Dining Hall"
  },
  {
    id: "occ-3",
    title: "BIRTHDAY CELEBRATION",
    subtitle: "Make Another Year Unforgettable",
    description: "Dynamic vibrant spaces with room for cake cutting, custom lighting, dedicated servers, and custom party sizzler platters.",
    capacity: "8 to 40 Guests",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    perks: ["Cake cutting service & cutlery", "Special background music coordination", "Group celebration discount"],
    recommendedSeating: "Rooftop Lounge Zone"
  },
  {
    id: "occ-4",
    title: "ANNIVERSARY",
    subtitle: "Honouring Years of Love in Luxury",
    description: "Celebrate milestones with fine dining excellence, exquisite tandoor kebabs, sizzlers, and personalized hospitality.",
    capacity: "2 to 20 Guests",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    perks: ["Personalized table reservation card", "Chef's anniversary pastry", "Sommelier-style beverage pairing"],
    recommendedSeating: "Private Elevated Deck"
  },
  {
    id: "occ-5",
    title: "FRIENDS & GET-TOGETHERS",
    subtitle: "Laughter, Drinks & Wok-Hei Bites",
    description: "Catch up over Butter Garlic Pepper Chicken, loaded sizzlers, chilled drinks, and cool rooftop breezes under the stars.",
    capacity: "4 to 25 Guests",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    perks: ["Sharing platters", "Quick bar service", "High-energy ambient music"],
    recommendedSeating: "Open Air Rooftop Deck"
  },
  {
    id: "occ-6",
    title: "SPECIAL CELEBRATIONS",
    subtitle: "Corporate Dinners & Festive Parties",
    description: "Host official company achievements, festival parties (Durga Puja, Diwali, New Year), and private banquets with tailored hospitality.",
    capacity: "20 to 100+ Guests",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
    perks: ["Exclusive zone reservation", "Custom fixed-rate buffet menus", "Dedicated event manager"],
    recommendedSeating: "Full Level 4 Suite / Banquet Wing"
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Sourav Mukherjee",
    rating: 5,
    date: "1 week ago",
    review: "Hands down the best dining place in Chinsurah! The rooftop ambience on Level 4 of Rupali Arcade is truly unmatched. We ordered Butter Garlic Pepper Chicken and the Royal Awadhi Biryani — the flavours were rich, balanced, and so fresh. Excellent service!",
    occasionTag: "Family Dinner",
    dishMentioned: "Butter Garlic Pepper Chicken & Awadhi Biryani",
    verified: true
  },
  {
    id: "rev-2",
    name: "Ananya Ghosh",
    rating: 5,
    date: "2 weeks ago",
    review: "Finally a high-end luxury restaurant in Chinsurah where we can celebrate special occasions without traveling all the way to Kolkata. The AC lounge is super comfortable, aesthetic, and the Italian Chicken Sizzler was sizzling hot and mouthwatering.",
    occasionTag: "Birthday Celebration",
    dishMentioned: "Italian Chicken Sizzler",
    verified: true
  },
  {
    id: "rev-3",
    name: "Dr. Ritwik Banerjee",
    rating: 5,
    date: "A month ago",
    review: "Came with my family including elderly parents. The elevator access made it effortless to reach Level 4. The staff was remarkably courteous, and the Tandoori Chicken and Paneer Lababdar were cooked to perfection. Highly recommended.",
    occasionTag: "Family Reunion",
    dishMentioned: "Tandoori Chicken & Paneer Lababdar",
    verified: true
  },
  {
    id: "rev-4",
    name: "Debapriya Sen",
    rating: 5,
    date: "3 weeks ago",
    review: "The rooftop evening vibe is magical! Cool breeze, ambient lighting, and great mocktails. We spent 3 hours talking and enjoying our dinner. The Continental Chicken steak was juicy and tender. Will definitely come back every month.",
    occasionTag: "Date Night",
    dishMentioned: "Continental Grilled Chicken Steak",
    verified: true
  },
  {
    id: "rev-5",
    name: "Arindam Dutta",
    rating: 5,
    date: "Last weekend",
    review: "We booked Kings' Crown for my sister's birthday with 15 friends. The management organized our table so beautifully. Everyone praised the Crispy Chilli Babycorn and Golden Fried Prawns. Chinsurah really needed a royal place like this.",
    occasionTag: "Group Gathering",
    dishMentioned: "Golden Fried Prawns",
    verified: true
  }
];
