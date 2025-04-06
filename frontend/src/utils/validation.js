export const validation = (input) => {
    switch (input.name) {
      case "username":
        if (input.value.length < 3 || input.value.length > 20) {
          return "Username should be between 3 and 20 characters."
        }
        if (!/^[a-zA-Z0-9_]+$/.test(input.value)) {
          return "Username can only contain letters, numbers, and underscores."
        }
        break
  
      case "email":
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input.value)) {
          return "Please enter a valid email address."
        }
        break
  
      case "password":
        if (input.value.length < 8 || input.value.length > 30) {
          return "Password must be between 8 and 30 characters long."
        }
        if (!/[A-Z]/.test(input.value)) {
          return "Password must contain at least one uppercase letter."
        }
        if (!/[a-z]/.test(input.value)) {
          return "Password must contain at least one lowercase letter."
        }
        if (!/[0-9]/.test(input.value)) {
          return "Password must contain at least one number."
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.value)) {
          return "Password must contain at least one special character."
        }
        break
  
      default:
        return null
    }
    return null
  }
  