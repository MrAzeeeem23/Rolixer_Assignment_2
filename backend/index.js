import express from 'express';
import sequelize from './database/db.js';
import dotenv from 'dotenv';
import UserRoute from "./routes/user.routes.js"
import StoreRoute from "./routes/store.routes.js"
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.send('Server is running');
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await sequelize.sync();
        console.log('Database synced successfully');

        app.use('/signUp', UserRoute)
        app.use('/api/v1/store', StoreRoute)
    
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });

    } catch (error) {
        console.error('Failed to connect with DB:', error.message);
        console.error(error.stack);
    }
})();
