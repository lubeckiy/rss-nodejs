import fs from 'fs'
import { readStream } from '../streams/read.js'
import { writeStream } from '../streams/write.js'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from '../message.js'
import { create } from './create.js'

import * as zlib from 'zlib'

export const compress = async (fromPath, toPath) => {
    if (!checkFileExist(fromPath, fs.constants.F_OK | fs.constants.R_OK)) {
        printMessage('error', `Operation failed. File ${fromPath} does not exists.`)
    } else if (checkFileExist(toPath, fs.constants.F_OK | fs.constants.W_OK))
    {
        printMessage('error', `Operation failed. File ${toPath} already exists.`)
    } else {
        create(toPath)
        const fromStream = readStream(fromPath)
        const britoli = zlib.createBrotliCompress()
        fromStream
            .pipe(britoli)
            .pipe(fs.createWriteStream(toPath))
            .on('finish', () => {
                console.log(`    Commpsession to file ${toPath} is complited successfully.😎`);
          })
    }
}