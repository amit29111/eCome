# WestStyle Backend API

A comprehensive e-commerce backend API built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with user roles
- **Product Management**: CRUD operations with filtering, search, and pagination
- **Order Management**: Complete order lifecycle management
- **User Management**: Profile management and admin controls
- **Security**: Password hashing, input validation, and protected routes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/featured/list` - Get featured products

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id/status` - Update user status (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin only)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/weststyle
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Seed Database** (Optional)
   ```bash
   node utils/seedData.js
   ```

5. **Start Server**
   ```bash
   npm run dev
   ```

## Database Models

### User
- Personal information (name, email, phone)
- Address details
- Authentication (hashed password)
- Role-based access (user/admin)

### Product
- Product details (name, description, price)
- Category and subcategory
- Images and variants (sizes, colors)
- Stock management
- Search indexing

### Order
- User reference
- Product items with quantities
- Shipping address
- Payment and order status
- Tracking information

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Role-based access control
- Protected admin routes

## Testing

Use tools like Postman or Thunder Client to test the API endpoints. Sample requests are available in the documentation.

## Admin Credentials (After Seeding)

- Email: admin@weststyle.com
- Password: admin123