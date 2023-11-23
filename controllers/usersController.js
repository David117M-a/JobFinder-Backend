const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/user");

const registerUser = async (req = request, res = response) => {
    const { name, phoneNumber, introduction, stack, password } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone Number is required" });
    }

    if (!introduction) {
        return res.status(400).json({ message: "Introduction is required" });
    }

    if (!stack) {
        return res.status(400).json({ message: "Stack is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ phoneNumber });
    if (user) {
        return res.status(400).json({
            message: 'Phone Number is already registered by another user'
        });
    }

    const isPasswordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" });
    }

    const salt = bcryptjs.genSaltSync();
    const newUser = new User({
        name,
        phoneNumber,
        introduction,
        stack,
        password: bcryptjs.hashSync(password, salt)
    });
    const savedUser = await User.create(newUser);
    delete savedUser.password;
    return res.status(201).json(savedUser);
};

const getUsers = async (req = request, res = response) => {
    return res.status(200).json((await User.find()));
};

const login = async (req, res = response) => {

    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).json({
                message: 'User or Password not valid'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'User or Password not valid'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error, communicate with administrator'
        });
    }
}

const resetPassword = async (req = request, res = response) => {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone Number is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        });
    }

    const isPasswordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" });
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)
    const savedUser = await User.updateOne({ _id: user._id }, user);
    delete savedUser.password;
    return res.status(201).json(savedUser);
};

module.exports = {
    registerUser,
    getUsers,
    login,
    resetPassword
}