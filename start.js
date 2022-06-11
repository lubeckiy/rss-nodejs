import { getUserName } from './lib/getUserName.js'
import { printMessage, clearTerminal } from './lib/message.js'
import { validateCommand } from './lib/validateCommand.js'
import readline from 'readline'

Error.stackTraceLimit = 0
const args = process.argv.slice(2)

const { userName, errorMessage } = getUserName(args)

try {
    if (userName)  {
        clearTerminal()
        printMessage('message', `Welcome to the File Manager, ${userName}`)
        printMessage('message', `You are currently in: ${process.cwd()}`)

        const rl = readline.createInterface({
            input: process.stdin, 
            output: process.stdout,
        })

        rl.on('SIGINT', () => {
            printMessage('message', `Thank you for using File Manager, ${userName}`)
            process.exit(1)
        });

        function commandLine(promt) {
            rl.question(promt, (command) => {
                validateCommand(command, userName)
                rl.write(`The command received:  ${command}\n`)        
                commandLine(promt)
            })
        }

        commandLine('> ')

    } else {
        throw Error(errorMessage)
    }

} catch (error){
    console.log(error)
}