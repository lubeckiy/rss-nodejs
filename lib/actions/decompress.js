import fs from 'fs'
import { readStream } from '../streams/read.js'
import { writeStream } from '../streams/write.js'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from '../message.js'
import { create } from './create.js'
import * as zlib from 'node:zlib'

export const decompress = async (fromPath, toPath) => {
    if (!checkFileExist(fromPath, fs.constants.F_OK | fs.constants.R_OK)) {
        printMessage('error', `Operation failed. File ${fromPath} does not exists.`)
    } else if (checkFileExist(toPath, fs.constants.F_OK | fs.constants.W_OK))
    {
        printMessage('error', `Operation failed. File ${toPath} already exists.`)
    } else {
        create(toPath)
        const fromStream = readStream(fromPath)
        const decompressStream = zlib.createBrotliDecompress()
            .on('error', (error) => {
                if (error.code === 'Z_BUF_ERROR' || error.code === 'ERR_CONTEXT_MAP_REPEAT') {
                    decompressStream.end();
                return;
            }})
        fromStream
            .pipe(decompressStream)
            .pipe(fs.createWriteStream(toPath))
            .on('finish', (data) => {
                console.log(`    Decommpsession of file ${toPath} is complited successfully.😎`)})
    }
}