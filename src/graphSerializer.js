import fs from 'fs'

const deserialize = (path) => {
  const buffer = fs.readFileSync(path, (err, buffer) => {
    if (err) {
      console.log('File read failed', err)
      return
    }
    return buffer
  })

  try {
    return JSON.parse(buffer)
  }
  catch(err) {
    console.log('Error parsing JSON buffer', err)
  }
}

export {
  deserialize
}