import { printMessage } from "./message.js"
import { list } from './actions/list.js'

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
    name: 'exit',
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
            printMessage('error', `Operation failed. Error while changing directory`)
          }
    }
}
]


/* ,
'cat',
'add',
'rn',
'cp',
'mv',
'rm',
'os',
'hash',
'compress',
'decompress',
*/