import { connectDB, disconnectBD } from '../db/connectDB.js';
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";

export async function getTaskCode(){
    try{
        const answers = await inquirer.prompt([{
            type: 'input',
            name: 'code',
            message: 'Enter the code of the task:',
            validate: value => value ? true : 'Please enter the code of the task'
        }]);
        answers.code = answers.code.trim();

        return answers;
    }catch(error){
        console.error(chalk.redBright('Something went wrong with the getTaskCode'), error);
    }
}

export default async function deleteTask() {
    try {
        const userCode = await getTaskCode();

        await connectDB();
    
        const spinner = ora('Deleting the todo...').start();
    
        const todo = await Todos.findOneAndDelete({ code: userCode.code });
    
        spinner.stop();
    
        if(todo){
            console.log(chalk.greenBright('Todo deleted successfully'));
        }else{
            console.log(chalk.redBright('Todo not found'));
        }
        await disconnectBD();
    } catch (error) {
        console.error(chalk.redBright('Something went wrong with the delete'), error);
    }
}

deleteTask();
