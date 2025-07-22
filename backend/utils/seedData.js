const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const sampleProducts = [
  {
    name: "Studiofit Red Text Printed Cotton-Blend Tub Top",
    description: "Comfortable cotton-blend tub top with stylish text print. Perfect for casual wear.",
    price: 499,
    originalPrice: 699,
    category: "women",
    subcategory: "tops",
    brand: "Studiofit",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=60",
        alt: "Red text printed tub top"
      }
    ],
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 }
    ],
    colors: ["Red", "Black", "White"],
    tags: ["casual", "summer", "cotton"],
    isFeatured: true
  },
  {
    name: "Studiofit Red Star Printed High-Rise Cotton Skirt",
    description: "High-rise cotton skirt with star print design. Comfortable and stylish.",
    price: 799,
    originalPrice: 999,
    category: "women",
    subcategory: "bottoms",
    brand: "Studiofit",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=500&auto=format&fit=crop&q=60",
        alt: "Red star printed skirt"
      }
    ],
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 18 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 6 }
    ],
    colors: ["Red", "Blue", "Green"],
    tags: ["casual", "cotton", "high-rise"],
    isFeatured: true
  },
  {
    name: "Men's Classic Denim Jacket",
    description: "Classic denim jacket for men. Perfect for layering and casual outings.",
    price: 1299,
    originalPrice: 1599,
    category: "men",
    subcategory: "jackets",
    brand: "WestStyle",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60",
        alt: "Men's denim jacket"
      }
    ],
    sizes: [
      { size: "M", stock: 20 },
      { size: "L", stock: 25 },
      { size: "XL", stock: 15 },
      { size: "XXL", stock: 8 }
    ],
    colors: ["Blue", "Black", "Light Blue"],
    tags: ["denim", "casual", "jacket"],
    isFeatured: false
  },
  {
    name: "Kids Rainbow T-Shirt",
    description: "Colorful rainbow print t-shirt for kids. Soft and comfortable fabric.",
    price: 399,
    originalPrice: 499,
    category: "kids",
    subcategory: "tops",
    brand: "KidsWear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&auto=format&fit=crop&q=60",
        alt: "Kids rainbow t-shirt"
      }
    ],
    sizes: [
      { size: "2-3Y", stock: 15 },
      { size: "4-5Y", stock: 20 },
      { size: "6-7Y", stock: 18 },
      { size: "8-9Y", stock: 12 }
    ],
    colors: ["Multicolor"],
    tags: ["kids", "colorful", "cotton"],
    isFeatured: true
  }
];

const sampleAdmin = {
  name: "Admin User",
  email: "admin@weststyle.com",
  password: "admin123",
  phone: "9876543210",
  role: "admin",
  address: {
    street: "123 Admin Street",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India"
  }
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    // Insert admin user
    const admin = new User(sampleAdmin);
    await admin.save();
    console.log('Admin user created');

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@weststyle.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = {seedDatabase};