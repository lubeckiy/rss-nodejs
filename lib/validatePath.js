import { validate as uuidValidate } from 'uuid';

const validatePath = path => {
      let isValid
      let reason = 'It`s OK.'
      let validated = null
      let id = null
      const splitted = path.split('/')

      console.log(splitted)
      console.log(splitted.length)

      switch (true) {
            case (splitted[1] !== 'api'):
                  isValid = false
                  reason = `Mistake in path: '${splitted[1]}', must be: 'api'.`
                  break
            case (splitted[2] !== 'users'):
                  isValid = false
                  reason = `Mistake in path: '${splitted[2]}', must be: 'users'.`
                  break
            case (!uuidValidate(splitted[3]) && splitted.length === 4):
                  isValid = false
                  reason = `id must be valid UUID. You enter: '${splitted[3]}'.`
                  break
            case ((!splitted.length === 3) || (!splitted.length === 4)):
                  isValid = false
                  reason = `Wrong URL`
                  break
            default:
                  isValid = true
                  id = splitted.length === 4 ? splitted[3] : null
                  validated = '/' + splitted[1] + '/' +splitted[2]
                  break
      }

      return { isValid, reason, validated, id }
}

export default validatePath