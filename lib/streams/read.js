import fs from "fs"

export const readStream = (file) => {
			const fromStream = fs.createReadStream(file, { encoding: 'utf8', fd: null })
            return fromStream
};