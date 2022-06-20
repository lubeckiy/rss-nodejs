import usersDB from "../inmemoryDB.js"
import * as lib from "../lib/lib.js"
import url from 'node:url'

export const deleteHandler = ( request, response, serverURL) =>{
      const FindUser = (id) => {
            let user = usersDB.find(user => user.id === id)
		return user ? JSON.stringify(user) : undefined
      }

      const DeleteUser = (id) => {
            let user = usersDB.find(user => user.id === id)
		let index = usersDB.indexOf(user)
		usersDB.splice(index,1)
      } 
 
      try {
            const id = request.url.split('/')[3] ? request.url.split('/')[3] : null
                  if (FindUser(id)) {
                        DeleteUser(id)
                        lib.sendResponse(response, lib.statusCode.NoContent, null )
                  } else {
                        lib.sendResponse( response, lib.statusCode.NotFound, null)
                  }
      } catch(error){
            lib.sendResponse(response, lib.statusCode.InternalServerError, error)
      }
}