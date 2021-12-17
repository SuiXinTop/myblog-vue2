export function isInteger(obj) {
  let reg = /^[-+]?\d+$/;
  if (!reg.test(obj)) {
    return false;
  } else {
    //这里加入
    return obj * 1 > 0;
    //return true;
  }
}
