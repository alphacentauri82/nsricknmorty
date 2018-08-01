const httpModule = require('http')
const apiUrl = 'https://rickandmortyapi.com/api/'

const api = {}

api.getCharacters = function (name) {
    let url = `${apiUrl}/character/`
    name && (url += `?name=${name}`)

    return httpModule.request({ url: `${apiUrl}/`, method: 'GET' })
      .then(res => {
        return res.content.toJSON()
      })
      .then(res => {
        console.log(res)
        return res
      })
}

export default api