#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Usage: npx create-zeekaptcha-app <app-name>');
    process.exit(1);
}

const appName = args[0];

const cwd = process.cwd();
const appDirectory = path.join(cwd, appName);

try {
    fs.mkdirSync(appDirectory);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.error(chalk.red(`The directory ${appName} already exists in the current directory.`));
    } else {
        console.error(chalk.red(`Error creating directory ${appName}:`), err);
    }
    process.exit(1);
}


const templateDir = path.join(__dirname, 'cza-template');

try {
    fse.copySync(templateDir, appDirectory);
} catch (err) {
    console.error(chalk.red(`Error copying files from ${templateDir} to ${appDirectory}:`), err);
    process.exit(1);
}

const packageJson = {
    "name": appName,
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "zeekaptcha": "^1.0.8"
    },
    "devDependencies": {
      "@types/react": "^18.2.15",
      "@types/react-dom": "^18.2.7",
      "@typescript-eslint/eslint-plugin": "^6.0.0",
      "@typescript-eslint/parser": "^6.0.0",
      "@vitejs/plugin-react": "^4.0.3",
      "eslint": "^8.45.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.3",
      "typescript": "^5.0.2",
      "vite": "^4.4.5"
    }
};

const packageJsonPath = path.join(appDirectory, 'package.json');

try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
} catch (err) {
    console.error(chalk.red(`Error creating package.json in ${appDirectory}:`), err);
    process.exit(1);
}

console.log(chalk.green("Created " + appName + " at " + appDirectory));
