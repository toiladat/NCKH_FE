const extractPublicId = (url) => {
  const regex = /\/v\d+\/(.+)\.\w+$/ // Regex để tìm public_id
  const match = url.match(regex)
  return match ? match[1] : null
}
export default extractPublicId