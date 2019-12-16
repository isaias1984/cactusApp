export function validateEmail (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLocaleLowerCase())
    }

export function validateDate(date) {
  const today = new Date()
  
  if((today.getTime() < date.getTime()) || ((today.getFullYear() === date.getFullYear()) && (today.getMonth() === date.getMonth()) && (today.getDate() === date.getDate()))) {
    return true
  } else {
    return false
  } 
}