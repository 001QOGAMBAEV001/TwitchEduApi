const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Muhit o'zgaruvchilarini yuklash
dotenv.config();

// Route importlari
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const streamRoutes = require('./routes/streamRoutes');
const groupRoutes = require('./routes/groupRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// JSON ma'lumotlarini qabul qilish uchun middleware
app.use(express.json());

// MongoDB-ga ulanish
(async () => {
    try {
        await connectDB();
        console.log('MongoDB-ga muvaffaqiyatli ulandi app.js');

        // Routelarni ishga tushirish
        app.use('/auth', authRoutes);
        app.use('/users', userRoutes);
        app.use('/streams', streamRoutes);
        app.use('/groups', groupRoutes);
        app.use('/ratings', ratingRoutes);
        app.use('/notifications', notificationRoutes);

        // Swagger UI
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // Xatolarni qayta ishlash middleware'i
        app.use(errorHandler);

        // Serverni ishga tushirish
        const PORT = process.env.PORT || 3001;
        const DOMAIN = process.env.DOMAIN || 'localhost';

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server http://${DOMAIN}:${PORT} manzilida ishga tushdi`);
            console.log(`Swagger dokumentatsiyasi http://${DOMAIN}:${PORT}/api-docs manzilida mavjud`);
        });
    } catch (error) {
        console.error('Serverni ishga tushirishda xatolik:');
        console.error('Xato xabari:', error.message);
        console.error(`To'liq xato: `, error);
        process.exit(1);
    }
})();

// Boshqa xatolarni ushlab qolish
process.on('unhandledRejection', (error) => {
    console.error('Kutilmagan xato yuz berdi:');
    console.error(error);
    process.exit(1);
});