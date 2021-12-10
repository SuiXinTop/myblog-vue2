//生成4位随机验证码
export function randomCode() {
  const str = "0123456789abcdefghjklmnpqrstuvwxyz";
  let res = "";
  for (let i = 0; i < 4; i++) {
    //随机产生字符串的下标
    let n = parseInt(Math.random() * str.length);
    res += str[n];
  }
  return res;
}
