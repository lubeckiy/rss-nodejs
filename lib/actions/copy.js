import fs from 'fs'
import { readStream } from '../streams/read.js'
import { writeStream } from '../streams/write.js'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from '../message.js'
import { create } from './create.js'

export const copy = (fromPath, toPath) => {
    if (!checkFileExist(fromPath, fs.constants.F_OK | fs.constants.R_OK)) {
        printMessage('error', `Operation failed. File ${fromPath} does not exists.`)
    } else if (checkFileExist(toPath, fs.constants.F_OK | fs.constants.W_OK))
    {
        printMessage('error', `Operation failed. File ${toPath} already exists.`)
    } else {
        create(toPath)
        const fromStream = readStream(fromPath)
        fromStream.pipe(fs.createWriteStream(toPath))

                    //.on('end', () => console.log(`File ${oldPath} has been renamed to ${newPath} successfully.`))
            //.on('error', () => printMessage('error', `Operation failed. Error: ${err}.`))
    }
}