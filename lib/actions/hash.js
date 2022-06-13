import * as fs from 'fs'
import crypto from 'crypto'
import { readStream } from '../streams/read.js'
import { printMessage } from '../message.js'
import { checkFileExist } from '../checkFileExist.js'
Error.stackTraceLimit = 0


export const hash = async (file) => {

    function checksumFile(hashName, path) {
        return new Promise((resolve, reject) => {
          const hash = crypto.createHash(hashName)
          const stream = fs.createReadStream(path)
          stream.on('error', err => reject(err))
          stream.on('data', chunk => hash.update(chunk))
          stream.on('end', () => resolve(hash.digest('hex')))
        })
      }

    if (!checkFileExist(file, fs.constants.F_OK | fs.constants.R_OK)) {
        printMessage('error', `Operation failed. File ${file} does not exists.`)
    } else {
        const hashOut = await checksumFile('sha1', file)
        printMessage('message', `Hash sha1sum ${hashOut} of File ${file}.`)

    }
}