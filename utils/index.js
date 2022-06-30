import { execSync } from "child_process"
import chalk from "chalk"
import rimraf from "rimraf";

export const installDependencies = async(dir, framework) => {
    console.log(chalk.green(`Installing dependencies for ${chalk.green.bold.underline(framework)}`));
    const installCommand = `cd ${dir} && npm install`;
    execSync(installCommand);
}

export const executeGitDownload = async(dir, url, framework) => {
    try {
        execSync(`git clone ${url} ${dir}`);
        consoleLogMessages(dir, url, framework);
        rimraf.sync(`${dir}/.git`);
    } catch (error) {
        console.log(chalk.red(`Failed to download ${chalk.redBright.bold(framework)} Reason: ${error}`));
    }
}

const consoleLogMessages = async(dir,url, framework) => {
    for (let i = 0; i < 5; i++) {
        console.log(chalk.bgYellow(new Date().toLocaleDateString()) +'  ' + chalk.yellow(`Starting to download ${chalk.greenBright.bold(framework)}`));
        console.log(chalk.yellow(`Downloading from ${chalk.greenBright.bold(url)} to ${chalk.greenBright.bold(dir)}`));
        console.log(chalk.green(`Downloading ${chalk.magenta.bold(framework)} - |${'#'.repeat(i*5)}|`));
        setTimeout(() => {
            process.stdout.write('\x1b[2J\x1b[0f');
        }, 500);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(chalk.green(`Downloaded ${chalk.magenta.bold(framework)}`));
}
