import { useEffect, useState } from 'react'

const useValidation = (password, confirmPassword) => {
  const [valid, setValid] = useState(null)
  useEffect(() => {
    if (confirmPassword.length === 0 || password.length === 0) {
      setValid(true)
    } else {
      if (password !== confirmPassword) {
        setValid(false)
      } else {
        setValid(true)
      }
    }
  }, [password, confirmPassword])
  return valid
}

export default useValidation
