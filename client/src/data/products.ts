
// Importing products from Roopak and Shan-e-Delhi
import shahiGaramMasalaImg from "@/components/products/Roopak veg/Shahi Garam Masala.jpg";
import kashmiriMirchImg from "@/components/products/Roopak veg/Red Chilli Kashmiri Powder.jpg";
import punjabiCholeImg from "@/components/products/Roopak veg/Punjabi Chole Masala.jpg";
import rajmaMasalaImg from "@/components/products/Roopak veg/Rajma Masala.jpg";
import pavBhajiImg from "@/components/products/Roopak veg/PAV BHAJI MASALA.jpg";
import dalMakhaniImg from "@/components/products/Roopak veg/Dal Makhani Masala.jpg";
import shahiPaneerImg from "@/components/products/Roopak veg/Shahi Paneer Masala.jpg";
import sambarMasalaImg from "@/components/products/Roopak veg/Sambar Masala Powder.jpg";
import biryaniRiceImg from "@/components/products/Roopak veg/Biryani Rice Masala.jpg";
import dahiBhallaImg from "@/components/products/Roopak veg/DAHI BHALLA MASALA.jpg";

import butterChickenImg from "@/components/products/Shan e delhi Pics/butter-chicken-image.jpg";
import chickenTikkaImg from "@/components/products/Shan e delhi Pics/chicken-tikka-image.jpg";
import muttonQuormaImg from "@/components/products/Shan e delhi Pics/mutton-quorma-masala.jpg";
import nihariMasalaImg from "@/components/products/Shan e delhi Pics/nihari-masala.jpg";
import roghanJoshImg from "@/components/products/Shan e delhi Pics/roghan-josh-image.jpg";
import seekhKababImg from "@/components/products/Shan e delhi Pics/seekh-kabab-image.jpg";
import tandooriChickenImg from "@/components/products/Shan e delhi Pics/tandoori-chicken-masala.jpg";
import yakhniBiryaniImg from "@/components/products/Shan e delhi Pics/Yakhni-Biryani-Masala.jpg";
import fruitChatImg from "@/components/products/Shan e delhi Pics/Fruit Chat Masala.jpg";
import subziMasalaImg from "@/components/products/Shan e delhi Pics/SubziMasala.jpg";

export const allProducts = [
  { id: 1, title: "Shahi Garam Masala", brand: "Roopak", category: "Best Sellers", price: "$6.99 AUD", weight: 0.1, rating: 4.8, tags: ["Royal", "Aromatic"], image: shahiGaramMasalaImg.src, desc: "Perfect for Sunday paneer & royal curries" },
  { id: 2, title: "Kashmiri Lal Mirch", brand: "Roopak", category: "All Products", price: "$5.49 AUD", weight: 0.1, rating: 4.9, tags: ["Mild", "Rich Color"], image: kashmiriMirchImg.src, desc: "Vibrant red hue without the heat." },
  { id: 3, title: "Punjabi Chole", brand: "Roopak", category: "Best Sellers", price: "$4.99 AUD", weight: 0.1, rating: 5.0, tags: ["Authentic", "Veg"], image: punjabiCholeImg.src, desc: "The secret to true Old Delhi style chole." },
  { id: 4, title: "Butter Chicken", brand: "Shan-e-Delhi", category: "Best Sellers", price: "$5.99 AUD", weight: 0.1, rating: 4.9, tags: ["Best Seller", "Non-Veg"], image: butterChickenImg.src, desc: "Restaurant-style creamy curry at home." },
  { id: 5, title: "Rajma Masala", brand: "Roopak", category: "All Products", price: "$4.49 AUD", weight: 0.1, rating: 4.7, tags: ["Classic", "Veg"], image: rajmaMasalaImg.src, desc: "Traditional North Indian comfort food blend." },
  { id: 6, title: "Mutton Quorma", brand: "Shan-e-Delhi", category: "New Arrivals", price: "$7.49 AUD", weight: 0.1, rating: 4.8, tags: ["Premium", "Rich"], image: muttonQuormaImg.src, desc: "Slow-cooked essence for royal meats." },
  { id: 7, title: "Dal Makhani", brand: "Roopak", category: "Best Sellers", price: "$5.25 AUD", weight: 0.1, rating: 4.9, tags: ["Creamy", "Veg"], image: dalMakhaniImg.src, desc: "Authentic buttery richness for black lentils." },
  { id: 8, title: "Chicken Tikka", brand: "Shan-e-Delhi", category: "All Products", price: "$6.25 AUD", weight: 0.1, rating: 4.8, tags: ["Tandoori", "Spicy"], image: chickenTikkaImg.src, desc: "Perfectly balanced charcoal-grilled flavor." },
  { id: 9, title: "Shahi Paneer", brand: "Roopak", category: "Combo Packs", price: "$5.99 AUD", weight: 0.1, rating: 4.9, tags: ["Creamy", "Royal"], image: shahiPaneerImg.src, desc: "A velvety blend for your festive paneer." },
  { id: 10, title: "Nihari Masala", brand: "Shan-e-Delhi", category: "New Arrivals", price: "$6.99 AUD", weight: 0.1, rating: 4.9, tags: ["Slow Cook", "Expert"], image: nihariMasalaImg.src, desc: "The legendary breakfast stew spice mix." },
  { id: 11, title: "PAV BHAJI MASALA", brand: "Roopak", category: "All Products", price: "$3.99 AUD", weight: 0.1, rating: 4.8, tags: ["Street Style", "Veg"], image: pavBhajiImg.src, desc: "Bring the streets of Mumbai to your table." },
  { id: 12, title: "Roghan Josh", brand: "Shan-e-Delhi", category: "New Arrivals", price: "$7.25 AUD", weight: 0.1, rating: 5.0, tags: ["Kashmiri", "Mild"], image: roghanJoshImg.src, desc: "Vibrant red & aromatic mutton specialty." },
  { id: 13, title: "Sambar Masala", brand: "Roopak", category: "All Products", price: "$3.99 AUD", weight: 0.1, rating: 4.7, tags: ["South Indian", "Tangy"], image: sambarMasalaImg.src, desc: "Authentic coastal blend for daily lentils." },
  { id: 14, title: "Seekh Kabab", brand: "Shan-e-Delhi", category: "Combo Packs", price: "$6.49 AUD", weight: 0.1, rating: 4.8, tags: ["Grilled", "Juicy"], image: seekhKababImg.src, desc: "Professional kabab seasoning for perfection." },
  { id: 15, title: "Biryani Rice", brand: "Roopak", category: "All Products", price: "$5.49 AUD", weight: 0.1, rating: 4.9, tags: ["Fragrant", "Royal"], image: biryaniRiceImg.src, desc: "Long-grain aroma in every single pinch." },
  { id: 16, title: "Tandoori Chicken", brand: "Shan-e-Delhi", category: "Best Sellers", price: "$6.99 AUD", weight: 0.1, rating: 4.9, tags: ["Oven Style", "Spicy"], image: tandooriChickenImg.src, desc: "Classic red marinade for grilled poultry." },
  { id: 17, title: "Fruit Chat Masala", brand: "Shan-e-Delhi", category: "All Products", price: "$3.49 AUD", weight: 0.1, rating: 4.8, tags: ["Tangy", "Zesty"], image: fruitChatImg.src, desc: "The perfect zing for your fruit salads." },
  { id: 18, title: "Yakhni Biryani", brand: "Shan-e-Delhi", category: "New Arrivals", price: "$7.49 AUD", weight: 0.1, rating: 4.9, tags: ["Kashmiri", "White"], image: yakhniBiryaniImg.src, desc: "Fragrant, mild and royal white biryani." },
  { id: 19, title: "Dahi Bhalla", brand: "Roopak", category: "Combo Packs", price: "$3.99 AUD", weight: 0.1, rating: 4.7, tags: ["Snack Style", "Cool"], image: dahiBhallaImg.src, desc: "The essential cooling mix for summer chats." },
  { id: 20, title: "Subzi Masala", brand: "Shan-e-Delhi", category: "All Products", price: "$4.99 AUD", weight: 0.1, rating: 4.8, tags: ["Everyday", "Veg"], image: subziMasalaImg.src, desc: "Upgrade your daily vegetables instantly." },
];
