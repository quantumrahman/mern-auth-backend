// import modules ----------------------------------------->
import chalk from 'chalk';
import app from './app.js';

// function ----------------------------------------------->
const startServer = () => {
    try {
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(chalk.green(`Server running on http://localhost:${port}`));
        });
    } catch (error) {
        console.log(chalk.red('Server running failure:', error.message));
    }
};

// start server ------------------------------------------->
startServer();