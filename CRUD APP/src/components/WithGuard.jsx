import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const WithGuard = ({ children }) => {
    const navigate=useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
  return (
      <>
          {!isLoggedIn? <h1> Please logg in first!</h1>: children  }
      </>
  )
}

export default WithGuard