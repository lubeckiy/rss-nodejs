import usersDB from "../inmemoryDB.js"
import * as lib from "../lib/lib.js"
import url from 'node:url'

export const getHandler = ( request, response, serverURL) =>{
      const id = request.url.split('/')[3] ? request.url.split('/')[3] : null
 
      try{
            if (id) {
                  const user = usersDB.find(user => user.id === id)

                  lib.sendResponse(
                        response,
                        user ? lib.statusCode.OK : lib.statusCode.NotFound, 
                        user)
            } else {
                  lib.sendResponse(
                        response,
                        lib.statusCode.OK, 
                        usersDB)
            }
      } catch(error){
            lib.sendResponse(
                  response,
                  lib.statusCode.InternalServerError, 
                  JSON.stringify(error))

      }
}