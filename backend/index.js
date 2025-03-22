import express from 'express';
import sequelize from './database/db.js';
import dotenv from 'dotenv';
import UserRoute from "./routes/user.routes.js"
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
        // Authenticate database connection
        await sequelize.authenticate();
        console.log('Database connected successfully');

        // Synchronize models with database
        await sequelize.sync();
        console.log('Database synced successfully');

        app.use('/signUp', UserRoute)
        // Start the server
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });

        

        // Uncomment for additional test code:
        // const user = await User.findOne({ where: { email: 'aashir@example.com' } });
        // const isMatch = await user?.isPasswordCorrect('13298hjasd');
        // console.log(isMatch);
        // console.log(user?.toJSON());

    } catch (error) {
        console.error('Failed to connect with DB:', error.message);
        console.error(error.stack);
    }
})();
