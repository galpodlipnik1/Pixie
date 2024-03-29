import chalk from "chalk";
import { executeGitDownload, installDependencies } from "./utils/index.js";
import readlineSync from "readline-sync";

export const getOptions = async(dir, params) => {
    if(params.length === 0){
        console.log(chalk.yellow(`Welcome to pixie!`));
        console.log(chalk.blue(`Please provide a framework to download or use ${chalk.red.bold.underline('pixie docs')} to see all available options`));
        return;
    }
    const isOption = params[0] === 'docs';
    if(isOption){
        logOptions(dir);
        return;
    }
    
    switch(params.length){
        case 1:
            getFramework(dir, params);
            break;
        case 2:
            if(params[1] === 'install'){
                getFramework(dir, params, true);
            } else {
                dir = dir + '/' + params[1];
                getFramework(dir, params, false);
            }
            break;
        case 3:
            if(params[2] === 'install'){
                dir = dir + '/' + params[1];
                getFramework(dir, params, true);
            }
            break;
        default:
            console.log(chalk.red(`Please provide a framework to download or use ${chalk.red.bold.underline('pixie docs')} to see all available options`));
    }
    
}

const getFramework = (dir, params, install) => {
    const framework = params[0];
    const isValidFramework = ['react','react-ts','vue-ts','svelte-ts','mern', 'vue', 'angular', 'svelte', 'nextjs'].includes(framework);
    if(!isValidFramework){
        console.log(chalk.red(`${chalk.red.bold.underline('pixie')} only supports the following frameworks: ${chalk.red.bold.underline('react, vue, angular, svelte, nextjs')}`));
        return;
    }
    const url = `https://github.com/Pixie-dirs/${framework}.git`;
    executeGitDownload(dir, url, framework);
    if(install){
        installDependencies(dir, framework);
    }
}

const logOptions = (dir) => {
    console.log(chalk.green( `Welcome to pixie! below are the available options: chose one or exit and write it in the command line`));
    console.log(chalk.yellow(`
        Available frameworks:
            [0]- ${chalk.green.bold('pixie react')}
            [1]- ${chalk.green.bold('pixie vue')}
            [2]- ${chalk.green.bold('pixie angular')}
            [3]- ${chalk.green.bold('pixie svelte')}
            [4]- ${chalk.green.bold('pixie nextjs')}
            [5]- ${chalk.green.bold('pixie react-ts')}
            [6]- ${chalk.green.bold('pixie vue-ts')}
            [7]- ${chalk.green.bold('pixie svelte-ts')}
            [8]- ${chalk.green.bold('pixie mern')}
            [9]- ${chalk.green.bold('exit')}
    `));
    //get the number from the user and save it to a variable
    const frameworkNum = readlineSync.question(chalk.yellow(`Please choose a framework to initialize: `));
    
    switch(frameworkNum){
        case '0':
            getFramework(dir, ['react'], false);
            break;
        case '1':
            getFramework(dir, ['vue'], false);
            break;
        case '2':
            getFramework(dir, ['angular'], false);
            break;
        case '3':
            getFramework(dir, ['svelte'], false);
            break;
        case '4':
            getFramework(dir, ['nextjs'], false);
            break;
        case '5':
            getFramework(dir, ['react-ts'], false);
            break;
        case '6':
            getFramework(dir, ['vue-ts'], false);
            break;
        case '7':
            getFramework(dir, ['svelte-ts'], false);
            break;
        case '8':
            getFramework(dir, ['mern'], false);
            break;
        case '9':
            console.log(chalk.yellow(`Exiting...`));
            break;
        default:
            console.log(chalk.red.bold(`Please choose a valid framework`));
            logOptions();
            break;
    }
}