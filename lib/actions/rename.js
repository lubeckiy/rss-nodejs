import fs from 'fs'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from "../message.js"
Error.stackTraceLimit = 0

export const rename = async (oldPath, newPath) => {
    if (!checkFileExist(oldPath, fs.constants.F_OK)) {
        printMessage('error', `Operation failed. File ${oldPath} does not exists.`)
    } else if (checkFileExist(newPath, fs.constants.F_OK))
    {
        printMessage('error', `Operation failed. File ${newPath} already exists.`)
    } else {
        fs.rename(oldPath, newPath, (err) => {
            if (err) { 
                printMessage('error', `Operation failed. Error: ${err}.`) }
            console.log(`File ${oldPath} has been renamed to ${newPath} successfully.` )
          })
    }
}