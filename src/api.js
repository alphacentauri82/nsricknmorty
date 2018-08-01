const httpModule = require('http')
const apiUrl = 'https://rickandmortyapi.com/api/'

const api = {}

api.getCharactersByName = function (name) {
    let url = `${apiUrl}/character/`
    name && (url += `?name=${name}`)

    return httpModule.request({ url: `${url}`, method: 'GET' })
      .then(res => res.content.toJSON())
}

api.getCharactersByUrl = function (url) {
  return httpModule.request({ url, method: 'GET' })
    .then(res => res.content.toJSON())
}

export default api