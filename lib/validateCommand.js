import { printMessage } from "./message.js"
import { Commands } from './commands.js'

const commands = Commands.map( command => command.name)

export const validateCommand = (inputCommand, inputParams, userName) => {
    let result = true
    if (!commands.includes(inputCommand)) {
        printMessage('error', `Invalid input. Unknown command: '${inputCommand}'`)
        result = false
    }

    if(commands === '.exit') {
        printMessage('message', `Thank you for using File Manager, ${userName}`)
        process.exit(1)                    
    }
    return result
}