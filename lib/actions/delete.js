import * as fs from 'fs'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from "../message.js"
Error.stackTraceLimit = 0

export const remove = async (fileToRemove) => {

    if (!checkFileExist(fileToRemove, fs.constants.F_OK)) {
        printMessage('error', `Operation failed. File ${fileToRemove} does not exists.`)
    } else {
        fs.unlink(fileToRemove, (err) =>{
            if (err) { printMessage('error', `Operation failed. Error: ${err}.`) }
            console.log(`File ${fileToRemove} has been deleted.` )
        })
    }

}