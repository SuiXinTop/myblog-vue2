export function getToken() {
  return localStorage.getItem("token");
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function getUserName() {
  return localStorage.getItem("userName");
}

export function getUserImg() {
  return localStorage.getItem("userImg");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function setAll(token, userId, userName, userImg, role) {
  setToken(token);
  setUserId(userId);
  setUserName(userName);
  setUserImg(userImg);
  setRole(role);
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function setUserId(userId) {
  return localStorage.setItem("userId", userId);
}

export function setUserName(userName) {
  return localStorage.setItem("userName", userName);
}

export function setUserImg(userImg) {
  return localStorage.setItem("userImg", userImg);
}

export function setRole(role) {
  return localStorage.setItem("role", role);
}

export function delAll() {
  delToken();
  delUserId();
  delUserName();
  delUserImg();
  delRole();
}

export function delToken() {
  return localStorage.removeItem("token");
}

export function delUserId() {
  return localStorage.removeItem("userId");
}

export function delUserName() {
  return localStorage.removeItem("userName");
}

export function delUserImg() {
  return localStorage.removeItem("userImg");
}

export function delRole() {
  return localStorage.removeItem("token");
}
