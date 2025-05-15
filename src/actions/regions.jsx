import fetchData from './utils/fetchData'
const url= import.meta.env.VITE_APP_SERVER_URL + '/admin'

export const getRegion = async () => {
  const result = await fetchData({ url: url+ '/regions', method:'GET' })
  return result ? result :[]
}