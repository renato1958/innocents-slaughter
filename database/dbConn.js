const mongoose = require('mongoose');

async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Collegamento con MongoDB stabilito con successo');
    } catch (error) {
        console.log('Impossibile collegarsi con MongoDB');
    }
}

module.exports = dbConnect;