import { printMessage } from '../message.js'
import * as os from 'os'

export const osInfo = async (inputParams) => {

    const parametr = inputParams[0]

    const allowedParams = [
        '--EOL',
        '--cpus',
        '--homedir',
        '--username',
        '--architecture'
    ]

    if (!allowedParams.includes(parametr)) {
        printMessage('error', `Unknown parametr: ${parametr}\n Possible varints: ${allowedParams}`)
    } else {
        console.log('parametr = ', parametr)

        const getSysInfo = async() => {
            const myEOL = os.EOL
            const systemCpuCores = os.cpus()
            const systemArch = os.arch()
            const { username, homedir } = os.userInfo()
            
        return { myEOL, systemCpuCores, homedir, username, systemArch }
        }
        const sysInfo = await getSysInfo()
        let result

        switch(parametr) {
            case '--EOL':
              result = sysInfo.myEOL
              break
            case '--cpus':
              result = sysInfo.systemArch
              break         
            case '--homedir':
              result = sysInfo.homedir
              break
            case '--username':
              result = sysInfo.username
              break
            case '--architecture':
              result = sysInfo.systemArch
              break
            default:
                result = null
              break
          }

        printMessage('message', `Command: os ${parametr}\n Return value: ${JSON.stringify(result)}`)
    }
}