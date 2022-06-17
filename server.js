import * as http from 'http'
import {} from 'dotenv/config'
import validatePath from './lib/validatePath.js'
import * as lib from './lib/lib.js'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'


const server = http.createServer((request, response) =>
      {     
            let stCode
            let ctType
            let body
            
            if (request.url === '/favicon.ico') {
                  stCode = lib.statusCode.OK
                  ctType = lib.contentType.xicon
                  body = null
                  console.log('File favicon.ico are requested.')
            } else {
                  const serverURL = new URL(request.url, HOST)
                  let pathname = serverURL.pathname
                  pathname = lib.removeLast(pathname, '/')

                  const path = validatePath(pathname)
                  
                  if (!path['isValid']) {
                        stCode = lib.statusCode.BadRequest
                        ctType = lib.contentType.json
                        body = JSON.stringify({
                              pathname,
                              isValid: path['isValid'],
                              reason: path['reason']
                         })
                  } else {
                        serverURL.pathname = path.validated

                        console.log(path.validated)
                        console.log(path.id)

/*                         const router = {
                              'GET/api/users': handleGETrequest,
                              'POST/api/users': handlePOSTrequest,
                              'PUT/api/users': handlePUTrequest,
                              'DELETE/api/users': handleDELETErequest,
                              'default': noResponse
                          } */

                        console.log(request.method + serverURL.pathname)

                        stCode = lib.statusCode.OK
                        ctType = lib.contentType.json
                        body = JSON.stringify({
                              pathname,
                         })
                  }
                  response.writeHead(stCode, ctType)
                  response.write(body)
                  response.end()
            }
      })
server.listen(PORT, () => {
      console.log(` 🚀🚀🚀 Server is running at ${HOST}:${PORT} 🚀🚀🚀 `)
})
export default server