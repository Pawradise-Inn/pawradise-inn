const prisma = require('../../prisma/prisma');
<<<<<<< HEAD
const bcrypt = require('bcrytjs');
=======
const bcrypt = require('../../node_modules/bcryptjs/umd');
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
const jwt = require('jsonwebtoken');

const findUserByUsername = async(username)=>{
    const user = await prisma.user.findFirst({
        where: {user_name: username}
    });

    return user;
};

const findUserByEmail = async(email)=>{
    const user = await prisma.user.findFirst({
        where: {email: email}
    });

    return user;
};

const findUserByPhone = async(phone)=>{
    const user = await prisma.user.findFirst({
        where: {phone_number: phone}
    });

    return user;
};

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const matchPassword = async(enteredPassword, hashedPassword)=>{
    return await bcrypt.compare(enteredPassword, hashedPassword)
};

const getSignedJwtToken = (userId)=>{
    return jwt.sign(
        {id: userId}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE}
    );
};

module.exports = {
    findUserByUsername,
    findUserByEmail,
    findUserByPhone,
    hashPassword,
    matchPassword,
    getSignedJwtToken
}