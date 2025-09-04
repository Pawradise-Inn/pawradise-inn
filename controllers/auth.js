const prisma = require('../prisma/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        // Accept either camelCase or snake_case keys from frontend
        const firstname   = req.body.firstname   ?? req.body.firstname;
        const lastname    = req.body.lastname    ?? req.body.lastname;
        const email       = (req.body.email || '').trim();
        const phone_number = req.body.phone_number ?? req.body.phone_number;
        const user_name    = req.body.user_name    ?? req.body.user_name;
        const password    = req.body.password;
        const role        = (req.body.role ?? 'CUSTOMER').toUpperCase(); // if Role is enum
        console.log(req.body);

        // unique check
        /*const exist = await prisma.user.findUnique({ where: { username : req.params.username } });
        if (exist) {
            return res.status(409).json({ success: false, message: 'Username already registered' });
        }*/

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                phone_number,
                user_name,
                password : hashed,
                role
            },
        });
        console.log(`User created: ${user.id} - ${user.username}`);

        // Create token
        //const token = user.getSignedJwtToken();
        //res.status(200).json({success: true, token});
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error.stack);
    }
};

/*exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    //const token = user.getSignedJwtToken();
    //res.status(200).json({ success: true, token });
    sendTokenResponse(user, 200, res);
};*/

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const days = Number(process.env.JWT_COOKIE_EXPIRE || 7);
    const options = {
        expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token });
};

exports.getMe = async (req, res) => {
    try {
        const idParam = req.params.id;
        if (!idParam) return res.status(400).json({ success: false, error: "Missing id param" });

        const user = await prisma.user.findUnique({
        where: { id: Number(idParam) },
        select: { id: true, firstname: true, lastname: true, email: true, phone_number: true, user_name: true, role: true },
        });

        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, data: user });
  } catch (err) {
        res.status(500).json({ success: false, error: err.message });
  }
};


exports.logout = async (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, message: 'Logged out' });
};