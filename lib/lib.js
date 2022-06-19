export const removeLast = (string, param) => string.endsWith(param) ? string.slice(0, -1) : string
export const contentType = {
      xicon: { 'Content-Type': 'image/x-icon' },
      json: { 'Content-Type': 'application/json' }
}
export const statusCode = {
      'OK': 200,
      'Created': 201,
      'No Content': 204,
      'BadRequest': 400,
      'NotFound': 404,
      'InternalServerError': 500
}

export const sendResponse = (response, stCode, body, ctType = contentType.json) => {
      response.writeHead(stCode, ctType)
      if (body) response.write(JSON.stringify(body))
      response.end()
}