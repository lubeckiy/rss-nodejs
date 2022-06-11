import { printMessage } from "./message.js"

export const validateCommand = (commands, userName) => {
    console.log(commands)
    if(commands === '.exit') {
        printMessage('message', `Thank you for using File Manager, ${userName}`)
        process.exit(1)                    
    }
}