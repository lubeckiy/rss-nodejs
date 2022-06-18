import usersDB from "../inmemoryDB.js"
import * as lib from "../lib/lib.js"

export const getHandler = ( id ) =>{
      let stCode
      const ctType = lib.contentType.json
      let body
      try{
            if (id) {
                  const user = usersDB.find(user => user.id === id)
                  stCode = user ? lib.statusCode.OK : lib.statusCode.NotFound
                  body = JSON.stringify(user)
            } else {
                  stCode = lib.statusCode.OK
                  body = JSON.stringify(usersDB)
            }
      } catch(error){
            stCode = lib.statusCode.InternalServerError
            body = JSON.stringify(error)
      } finally {
            return { stCode, ctType, body}
      }
}