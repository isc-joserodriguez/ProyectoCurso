const bcrypt = require('bcryptjs');
const config = require('../config');
const salt = config.salt;

const hashPassword = (pwd) => {
    try {
        return bcrypt.hash(pwd, salt);
    } catch (error) {
        throw error;
    }
};

const comparePassword = (pwd, hash) => {
    try {
        return bcrypt.compare(pwd, hash);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    hashPassword,
    comparePassword
} 