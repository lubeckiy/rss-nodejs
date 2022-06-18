import usersDB from "../inmemoryDB.js"
import * as lib from "../lib/lib.js"
import url from 'node:url'

export const getHandler = ( request, response, serverURL) =>{
      let stCode
      const ctType = lib.contentType.json
      let body
      const id = request.url.split('/')[3] ? request.url.split('/')[3] : null
 
      try{
            if (id) {
                  const user = usersDB.find(user => user.id === id)
                  stCode = user ? lib.statusCode.OK : lib.statusCode.NotFound
                  body = user
            } else {
                  stCode = lib.statusCode.OK
                  body = usersDB
            }
      } catch(error){
            stCode = lib.statusCode.InternalServerError
            body = JSON.stringify(error)
      } finally {
            return { stCode, ctType, body}
      }
}