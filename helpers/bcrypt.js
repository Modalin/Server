const bcrypt = require('bcrypt');

function encrypt (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function decrypt (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { encrypt, decrypt }