import axios from 'axios'
import { GET_ERRORS, UPLOAD_IMAGES } from './types'

export const uploadImages = (files, id, category) => dispatch => {
  switch (category) {
    case 'project':
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let fd = new FormData()
      console.log(id)
      // FIXME: Files should be iterable!

      // files.map(file => {
      //   fd.append('File[]', file)
      // })
      axios
        .post(`/api/projects/${id}/img_upload`, fd, config)
        .then(res => {
          // dispatch({
          //   type: GET_PROJECTS,
          //   payload: res.data
          // })
          console.log(res.data)
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: {}
          })
        )
      break
    default:
      return null
  }
}
