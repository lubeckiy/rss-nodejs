import usersDB from "../inmemoryDB.js"
import * as lib from "../lib/lib.js"
import { v4 as uuidv4 } from 'uuid'

export const postHandler = ( request, response, serverURL ) =>{
      const id = request.url.split('/')[3] ? request.url.split('/')[3] : null
      let stCode
      let body = ''
      
            if (id) {
                  stCode = lib.statusCode.BadRequest
                  body = {
                        method: request.method,
                        url: request.headers.host + request.url,
                        reason: `Wrong URL`
                  }
                  lib.sendResponse(response, stCode, body)
            } else {
                  try{
                        request.on('data', data => {
                              body += data
            
                              if (body.length > 1e6) request.connection.destroy()
                        })
                        request.on('end', function () {
                              let jsonBody = JSON.parse(body)

                              if ((jsonBody.username && jsonBody.age && jsonBody.hobbies) !== undefined) {
                              
                                  const { username, age, hobbies } = jsonBody
                                  const newUser = { 'id': uuidv4(), username, age, hobbies }
                                  usersDB.push(newUser)
                                  stCode = lib.statusCode.Created
                                  body = newUser
                              } else {
                                  stCode = lib.statusCode.BadRequest
                                  body = { body: JSON.stringify(jsonBody),
                                  reason: `'body' does not contain required fields: username, age or hobbies` }
                              }
                              lib.sendResponse(response, stCode, body)
                        })
                  } catch(error){
                        lib.sendResponse(response, lib.statusCode.InternalServerError, error)
                  }
            }
}