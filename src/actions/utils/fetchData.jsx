import { updateAdmin } from '~/redux/actions/admin'
import { updateUser } from '~/redux/actions/user'
import { updateAlert } from '~/redux/actions/util'

const fetchData = async (
  { url, method='POST', token='', body = null },
  dispatch
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${ token }` }
    : { 'Content-Type': 'application/json' }

  body = body ? { body :JSON.stringify(body) } : {}
  try {
    const response = await fetch(url, {
      headers, method, ...body
    })
    const data = await response.json()
    if (!data.success) {
      if (response.status === 401 ) {
        dispatch(updateUser(null))
      }

      throw new Error(data.message) // catch sẽ bắt
    }
    return data.result
  } catch (error) {
    console.log(error)

    dispatch(updateAlert({
      open: true,
      severity: 'error',
      message: error.message
    }))
    // eslint-disable-next-line no-console
    return null
  }
}

export default fetchData