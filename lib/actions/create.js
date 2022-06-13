import * as fs from 'fs'
import { checkFileExist } from '../checkFileExist.js'
import { printMessage } from "../message.js"

export const create = async (file, dataIn = '') => {
    if (checkFileExist(file, fs.constants.F_OK)) {
        printMessage('error', 'File already exists.')
    }
    else {
    fs.writeFile(file, dataIn, { flag: 'wx' }, function (err) {
        if (err) throw Error('FS operation failed')
        console.log(`    File ${file} is created successfully.`)
      })}
};