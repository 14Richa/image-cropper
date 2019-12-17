import objectToParams from './objectToParams'

const getRSZioUrl = (src, options) => {
  let result = src

  // if is link
  if (/^https?:\/\//.test(src)) {
    result = result.replace(/^(https?:\/\/)/, '$1rsz.io/')
    if (options) {
      result += '?' + objectToParams(options)
    }
  }
  return result
}

export default getRSZioUrl