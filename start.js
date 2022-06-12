import readline from 'readline'
import { getUserName } from './lib/getUserName.js'
import { printMessage, clearTerminal } from './lib/message.js'
import { validateCommand } from './lib/validateCommand.js'
import { Commands } from './lib/commands.js'


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
            rl.question(promt, (input) => {
                const inputArray = input.split(' ')
                const inputCommand = inputArray[0]
                const inputParams = inputArray.slice(1)

                if (validateCommand(inputCommand, inputParams, userName)) {
                    const command = Commands.find( command => command.name === inputCommand)
                    command.action(inputParams, userName)
                } else 
                printMessage('message', `The command received:  ${input}\n`)

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