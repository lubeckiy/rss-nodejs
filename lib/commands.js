import fs from 'fs'
import { checkFileExist } from './checkFileExist.js'
import { printMessage } from "./message.js"
import { list } from './actions/list.js'
import { create } from './actions/create.js'
import { remove } from './actions/delete.js'
import { rename } from './actions/rename.js'
import { readStream } from './streams/read.js'


export const Commands = [
    {
    name: 'up',
    paramNumber: 0,
    successMessage: `You are currently in: ${process.cwd()}`,
    errorMessage: `Operation failed`,
    action: function() { 
        process.chdir('../')
        printMessage('message', `You are currently in: ${process.cwd()}`)
    }
},
{
    name: 'clear',
    paramNumber: 0,
    successMessage: `You are currently in: ${process.cwd()}`,
    errorMessage: `Operation failed`,
    action: function() { 
        process.stdout.write("\u001b[2J\u001b[0;0H")
        printMessage('message', this.successMessage)
    }
},
{
    name: '.exit',
    paramNumber: 0,
    successMessage: `Thank you for using File Manager`,
    errorMessage: `Operation failed`,
    action: function(inputParams, userName) { 
        printMessage('message', `Thank you for using File Manager, ${userName}`)
        process.exit(1)  
    }
},
{
    name: 'ls',
    paramNumber: 0,
    successMessage: `You are currently in: ${process.cwd()}`,
    errorMessage: `Operation failed`,
    action: function(inputParams, userName) { 
        printMessage('message', `You are currently in: ${process.cwd()}`)
        console.log('-----------------------------------')
        list(process.cwd())
    }
},
{
    name: 'cd',
    paramNumber: 1,
    successMessage: `You are currently in: ${process.cwd()}`,
    errorMessage: `Operation failed. Error while changing directory`,
    action: function(inputParams, userName) { 

        console.log('-----------------------------------')
        try {
            process.chdir(inputParams[0]);
            printMessage('message', `You are currently in: ${process.cwd()}`)
          } catch (err) {
            printMessage('error', 
                `Operation failed. Error while changing directory\n    Current directory: '${process.cwd()}'\n    You input: '${inputParams[0]}'\n    Use 'ls' to list directory.`)
          }
    }
},
{
    name: 'add',
    paramNumber: 1,
    successMessage: `File has been created.`,
    errorMessage: `Operation failed. File has not been created.`,
    action: function(inputParams, userName) { 
        try {
            create(inputParams[0])
            printMessage('message', `You are currently in: ${process.cwd()}`)
          } catch (err) {
            printMessage('error', 
                `Operation failed. Error while create file\n    Current directory: '${process.cwd()}'\n    You input: '${inputParams[0]}'\n    Use 'ls' to list directory.`)
          }
    }
},
{
    name: 'rm',
    paramNumber: 1,
    successMessage: `File has been deleted.`,
    errorMessage: `Operation failed. File has not been deleted.`,
    action: function(inputParams, userName) { 
        try {
            remove(inputParams[0])
            printMessage('message', `You are currently in: ${process.cwd()}`)
          } catch (err) {
            printMessage('error', 
                `Operation failed. Error while delete file\n    Current directory: '${process.cwd()}'\n    You input: '${inputParams[0]}'\n    Use 'ls' to list directory.`)
          }
    }
},
{
    name: 'rn',
    paramNumber: 2,
    successMessage: `File has been renamed.`,
    errorMessage: `Operation failed. File has not been renamed.`,
    action: function(inputParams, userName) { 
            rename(inputParams[0], inputParams[1])
            printMessage('message', `You are currently in: ${process.cwd()}`)
    }
},
{
    name: 'cat',
    paramNumber: 1,
    successMessage: `File printed.`,
    errorMessage: `Operation failed. File has not been printed.`,
    action: function(inputParams, userName) {
        const file = inputParams[0]
        if (checkFileExist(file, fs.constants.F_OK | fs.constants.R_OK)) {
            readStream(file)
                .on('data', () => console.log(`\n<----- start of file ${file}`))
                .on('end', () => console.log(`<----- end of file ${file}\n`))
                .pipe(process.stdout)
        } else {
            printMessage('error', `Operation failed. File ${file} does not exists.`)
        }
            printMessage('message', `You are currently in: ${process.cwd()}`)
    }
},
]


/* ,
'cat',
'rn',
'cp',
'mv',
'os',
'hash',
'compress',
'decompress',
*/