import * as fs from 'fs';
Error.stackTraceLimit = 0;


export const list = async (dir) => {
    if (!fs.existsSync(dir)) {
        throw Error(`FS operation failed:\n  Directory "${dir}" does not exists.`);
    } else {
        fs.readdir(dir, (err, files) => {
            if (err) {
                throw Error (`FS operation failed:\n  Something went wrong.\n    ${err}`)
            } else {
                files.forEach( file => console.log(file));
            }
        })
    }
};