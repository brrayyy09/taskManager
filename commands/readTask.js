import { connectDB, disconnectBD } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import ora from 'ora';
import chalk from 'chalk';

export default async function readTask(){
    try{
        await connectDB();

        const spinner = ora('Fetching the todos...').start();

        const todos = await Todos.find({});

        spinner.stop();

        if(todos.length === 0){
            console.log(chalk.blueBright('No todos found'));
        }else{
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo code: ') + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Detail: ') + todo.detail + '\n'
            )});
        }
        await disconnectBD();
    }catch(error){
        console.error(chalk.redBright("Something went wrong with the read"), error);
    }
}
