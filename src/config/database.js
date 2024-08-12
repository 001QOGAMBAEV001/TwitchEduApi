const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB-ga muvaffaqiyatli ulandi database.js');
    } catch (error) {
        console.error('MongoDB-ga ulanishda xatolik:');
        console.error('Xato xabari:', error.message);
        if (error.reason) {
            console.error('Sabab:', error.reason);
        }
        console.error(`To'liq xato: `, error);
    process.exit(1);
    }
};

module.exports = connectDB;