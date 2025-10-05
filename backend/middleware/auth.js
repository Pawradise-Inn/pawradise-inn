const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Check header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id from token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach only what you need to req.user
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};
module.exports = { protect };


// // Restrict routes to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: 'User role not authorized to access this route' });
//     }
//     next();
//   };
// };

