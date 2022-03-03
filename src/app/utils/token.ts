import { TOKEN_NAME } from "../services/session.service";

export function isTokenValid() {
  let valid = false
  const token = localStorage.getItem(TOKEN_NAME)
  if (token != null) {
    const tokenDeserialized = JSON.parse(atob(token.split('.')[1]))
    const expiry = tokenDeserialized.exp;
    const actualDate = Math.floor((new Date()).getTime()/1000)
    valid = expiry > actualDate
  }
  return valid
}

export function getActualUserId() {
  const token = localStorage.getItem(TOKEN_NAME)
  if (token != null) {
    const tokenDeserialized = JSON.parse(atob(token.split('.')[1]))
    return tokenDeserialized.sub as string;
  }
  return null
}
