import { printMessage } from "./message.js"

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
    name: 'cd',
    paramNumber: 1,
    successMessage: `You are currently in: ${process.cwd()}`,
    errorMessage: `Operation failed`,
    action: function(userName) { console.log('CD!')}
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
}
]


/* ,
'cd',
'ls',
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