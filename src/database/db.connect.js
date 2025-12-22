// import modules ----------------------------------------->
import mongoose from 'mongoose';
import chalk from 'chalk';

// function ----------------------------------------------->
const dbConnect = async () => {
    try {
        const db_uri = process.env.DB_URI.replace('<db_password>', process.env.DB_PASS);
        mongoose.connection.on('connected', () => {
            console.log(chalk.green('MongoDB connected successfully!'));
        });

        await mongoose.connect(db_uri);
    } catch (error) {
        console.log(chalk.red('MongoDB connection failure:', error.message));
        process.exit(1);
    }
};

// export modules ----------------------------------------->
export default dbConnect;