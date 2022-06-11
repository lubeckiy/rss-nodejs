import { getUserName } from "./lib/getUserName.js"

Error.stackTraceLimit = 0
const args = process.argv.slice(2)

const { userName, errorMessage } = getUserName(args)
try {
    if (userName)  {
        console.log(`Welcome to the File Manager, ${userName}`)
        console.log(`You are currently in: ${process.cwd()}`);
    } else {
        throw Error(errorMessage)
    }

} catch (error){
    console.log(error)
}
