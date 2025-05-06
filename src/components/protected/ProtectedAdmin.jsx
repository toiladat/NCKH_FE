import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdmin = () => {
  const token= JSON.parse(localStorage.getItem('admin'))
  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!token || token === 'null' || token ==='undefined') {
    return <Navigate to='/admin/login' replace />
  }
  return <Outlet />// Render các route con
}

export default ProtectedAdmin
