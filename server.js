import * as http from 'http'
import {} from 'dotenv/config'
import validatePath from './lib/validatePath.js'
import * as lib from './lib/lib.js'
import { getHandler } from './handlers/getHandler.js'
import { postHandler } from './handlers/postHandler.js'

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
                  lib.sendResponse(response, stCode, body, ctType)
            } else {
                  const serverURL = new URL(request.url, HOST)
                  let pathname = serverURL.pathname
                  pathname = lib.removeLast(pathname, '/')

                  const path = validatePath(pathname)
                  
                  if (!path['isValid']) {
                        body = {
                              pathname,
                              isValid: path['isValid'],
                              reason: path['reason']
                         }
                         lib.sendResponse(response, lib.statusCode.BadRequest, body)
                  } else {
                        serverURL.pathname = path.validated
                        const router = {
                              'GET/api/users': getHandler,
                              'POST/api/users': postHandler,
/*                               'PUT/api/users': putHandler,
                              'DELETE/api/users': deleteHandler,
                              'default': noResponse */
                          }
                        const handler = router[request.method + serverURL.pathname] || router['default']
                        handler(request, response, serverURL)
                  }
            }
      })
server.listen(PORT, () => {
      console.log(` 🚀🚀🚀 Server is running at ${HOST}:${PORT} 🚀🚀🚀 `)
})
export default server