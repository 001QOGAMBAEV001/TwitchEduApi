const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Muhit o'zgaruvchilarini yuklash
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI muhit o\'zgaruvchisi topilmadi');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB-ga muvaffaqiyatli ulandi');
    } catch (error) {
        console.error('MongoDB-ga ulanishda xatolik:');
        console.error('Xato xabari:', error.message);
        console.error('To\'liq xato:', error);
        process.exit(1);
    }
};

module.exports = connectDB;