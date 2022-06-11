let errorMessage
let userName

export const getUserName = (args) => {

    if (args.length === 0) {
        flag = false
        errorMessage = `Invalid input. You shoud input your username:\n\n   npm run start -- --username=your_username\n`
    } else {
        args[0].trim().startsWith('--username=') ? 
        (
            args[0].split('=')[1] ? userName = args[0].split('=')[1] :
            (
                userName = null,
                errorMessage =  `Invalid input. Username can not be empty:\n\n   npm run start -- --username=your_username\n`
            )
        ) : 
        (
            errorMessage = `Invalid input. Parametr 'username' should looks like:\n\n  --username=your_username\n`,
            userName = null
        )
    }
    return { userName, errorMessage }
}