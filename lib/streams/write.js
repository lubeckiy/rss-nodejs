import fs from 'fs'

export const writeStream = async (file) => {
    const toStream = fs.createWriteStream(file)
    return toStream
};