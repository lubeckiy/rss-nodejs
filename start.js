import readline from 'readline'
import { getUserName } from './lib/getUserName.js'
import { printMessage, clearTerminal, currentDir } from './lib/message.js'
import { validateCommand } from './lib/validateCommand.js'
import { Commands } from './lib/commands.js'


Error.stackTraceLimit = 0
const args = process.argv.slice(2)
const { userName, errorMessage } = getUserName(args)

try {
    if (userName)  {
        clearTerminal()
        printMessage('message', `Welcome to the File Manager, ${userName}`)
        printMessage('message', `You are currently in: ${currentDir().path}`)

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
                const inputParams = inputArray.slice(1).filter( param => param !== '')


                if (validateCommand(inputCommand, inputParams, userName)) {
                    const command = Commands.find( command => command.name === inputCommand)
                    command.paramNumber === inputParams.length ? 
                    command.action(inputParams, userName) :
                    printMessage('Error', 
                            `No required parametrs provided\n    Required: ${command.paramNumber}\n    Provided: ${inputParams.length}`)
                } else 
                printMessage('message', `The command received:  ${input}\n`)

                commandLine(`${currentDir().promt} > `)
            })
        }

        commandLine(`${currentDir().promt} > `)

    } else {
        throw Error(errorMessage)
    }

} catch (error){
    console.log(error)
}