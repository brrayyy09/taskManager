import inquirer from 'inquirer';
import { connectDB, disconnectBD } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import ora from 'ora';
import chalk from 'chalk';

export async function input(){
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the task:',
            validate: value => value ? true : 'Please enter the name of the task'
        },
        {
            type: 'input',
            name: 'detail',
            message: 'Enter the detail of the task:',
            validate: value => value ? true : 'Please enter the detail of the task'
        }
    ]);
    return answers;
}

export const askQuestions = async() => {
    const todoArray = [];
    let loop = false;

    do{
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQ = await inquirer.prompt([{
            name: 'confirm',
            type: 'confirm',
            message: 'Do you want to add another task?'
        }]);
        if (confirmQ.confirm){
            loop = true;
        }else{
            loop = false;
        }
    }while(loop);
    return todoArray;
}

export default async function addTask(){
    try{
        //calling askQuestions() to get array of todo's
        const todos = await askQuestions();
        //connecting to the database
        await connectDB();

        let spinner = ora('Creating the todos...').start();

        todos.forEach(async(todo) => {
            await Todos.create(todo);
        });

        spinner.stop();
        console.log(chalk.greenBright('Todos created successfully'));

        //disconnecting to the database
        await disconnectBD();
    }catch(error){
        console.error(chalk.redBright('Error creating todos'), error);
        process.exit(1);
    }
}
