<template>
  <div id="contain">
    <img src="../../assets/images/error.jpg" alt="" />
    <h1>抱歉您访问的页面出错了</h1>
    <h2>您可能输错了网址，或该网页已删除或不存在</h2>
    <div class="btna">
      <a href="http://118.31.15.127">返回主页</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFound",
};
</script>

<style scoped>
#contain {
  margin-top: 20px;
  background: rgb(233, 233, 233);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btna {
  margin-top: 32px;
  height: 40px;
}

.btna a {
  text-decoration: none;
  background: #2f435e;
  color: #f2f2f2;
  padding: 10px 30px 10px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  -webkit-transition: all linear 0.3s;
  -moz-transition: all linear 0.3s;
  transition: all linear 0.3s;
}

.btna a:hover {
  background: #d7114f;
}
</style>
