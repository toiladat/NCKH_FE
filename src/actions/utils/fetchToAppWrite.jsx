import { Client, Storage } from 'appwrite'
// Cấu hình Appwrite Client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_API_APPWRITE) // Thay thế bằng endpoint Appwrite của bạn
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Project ID của bạn

const storage = new Storage(client)
const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID


export const uploadToAppWrite = async (file) => {


  try {
    const response = await storage.createFile(bucketId, 'unique()', file)

    // setUploadedFile(response); // Lưu thông tin file đã upload

    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${response.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
    return {
      url:fileUrl,
      uploadedFile:response.$id
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error uploading file:', error)
  }

}

export const deleteOnAppWrite = async (uploadedFile) => {
  try {
    await storage.deleteFile(bucketId, uploadedFile)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting file:', error)
  }
}