const FgYellow = '\x1b[33m'
const Reset = '\x1b[0m'

export const printMessage = (type = 'message', message) => {
    const errorColor = '\x1b[32m> \x1b[31m'
    const messageColor = '\x1b[33m> \x1b[32m'

    type === 'message' ? console.log(messageColor, message) : console.log(errorColor, message)
}

export const clearTerminal = () => process.stdout.write("\u001b[2J\u001b[0;0H")

export const currentDir = () => ({ 'path': FgYellow + process.cwd() + Reset, 'promt': FgYellow + process.cwd().split('/').slice(-1) + Reset })