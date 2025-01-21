import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import ora from 'ora';
import chalk from 'chalk';

export async function connectDB() {
    try {
        const spinner = ora('Connecting to the database...').start();
        await mongoose.connect(process.env.MONGO_URI);
        spinner.stop();
        console.log(chalk.greenBright('Database connected'));
    }catch(error){
        console.error(chalk.redBright('Error connecting to the database'), error);
        process.exit(1);
    }
}

export async function disconnectBD(){
    try{
        await mongoose.disconnect();
        console.log(chalk.greenBright('Database disconnected'));
    }catch(error){
        console.error(chalk.redBright('Error disconnecting to the database'), error);
        process.exit(1);
    }
}