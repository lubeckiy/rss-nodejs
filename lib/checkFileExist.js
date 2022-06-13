import * as fs from 'fs'

export const checkFileExist = (file, constants) => {
    let flag = true
    try{
        fs.accessSync(file, constants)
    } catch(error) {
        flag = false
    }
  return flag
}