const objectToParams = (obj) => {
  var str = ''

  for (let key in obj) {
    if (str != '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(obj[key])
  }

  return str
}

export default objectToParams