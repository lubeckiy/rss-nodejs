
export const removeLast = (string, param) => string.endsWith(param) ? string.slice(0, -1) : string
export const contentType = {
      xicon: { 'Content-Type': 'image/x-icon' },
      json: { 'Content-Type': 'application/json' }
}
export const statusCode = {
      'OK': 200,
      'BadRequest': 400,
      'NotFound': 404,
      'InternalServerError': 500
}