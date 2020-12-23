const { findOne } = require('../models/user');
const User = require('../models/user'),
    bcrypt = require('bcrypt'),
    utils = require('../utils/utils');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passFlag = bcrypt.compare(password, user.password);
            if (passFlag) {
                console.log(user);
                const token = utils.generateToken({ id: user._id });
                res.status(200).json({ token });
            } else {
                res.status(400).json('Invaild email or password');
            }
        } else {
            res.status(400).json('Invaild email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}