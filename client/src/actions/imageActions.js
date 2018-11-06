import axios from 'axios'
import { GET_ERRORS, UPLOAD_IMAGES } from './types'

export const uploadImages = (files, id, category) => dispatch => {
  switch (category) {
    case 'project':
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      // console.log(files)
      // FIXME: Files should be iterable!

      files.map(file => {
        let formData = new FormData()
        console.log(file.size)
        formData.append('file', file)
        formData.append('name', file.name)
        formData.append('size', file.size)
        formData.append('id', id)
        return axios
          .post('/api/projects/image_upload', formData)
          .then(res => {
            console.log(res.data)
          })
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: {}
            })
          )
      })

      break
    default:
      return null
  }
}
