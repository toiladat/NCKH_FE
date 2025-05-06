import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  // Phương thức này sẽ được gọi khi có lỗi xảy ra
  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị UI lỗi
    return { hasError: true }
  }

  // Phương thức này sẽ được gọi khi lỗi xảy ra
  componentDidCatch(error, errorInfo) {
    // Ghi lại lỗi cho việc debug (có thể ghi vào log)
    console.log(error, errorInfo)
  }

  render() {
    // Nếu có lỗi, hiển thị giao diện lỗi thay vì component con
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    // Nếu không có lỗi, render bình thường
    return this.props.children
  }
}

export default ErrorBoundary
