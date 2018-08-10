<template>
  <div class="login">
      <div class="wrapper">
        <div class="container">
          <h1>Welcome</h1>
          <!-- form -->
          <el-form :model="form" ref="form" label-width="80px">
            <!-- username -->
              <input
                type="text"
                v-model="form.username"
                placeholder="Username" />
            <!-- password -->
              <input
                type="password"
                v-model="form.password"
                id="password"
                auto-complete="off"
                placeholder="Password"
                @keyup.enter="submit('form')" />
            <!-- Login -->
            <el-button
              ref="loginButton"
              :loading="loading"
              @click="submit('form')">Login</el-button>
          </el-form>
        </div>
        <!-- ul动态 -->
        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: '123',
      },
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$http.post('login', {
        username: this.form.username,
        password: this.form.password,
      })
        .then((response) => {
          if (response) {
            console.log(response);
            // this.$store.mutations.getToken(response.headers.authorization);
            this.$store.commit('setToken', response.headers.authorization);
            this.$utils.setCache('token', response.headers.authorization);
            // console.log(this.$store.state.token);
            if (this.$store.state.token) {
              this.$message({
                message: '登录成功！',
                type: 'success',
                duration: 1500,
              });
              this.$router.push({
                name: 'summary',
              });
            } else {
              this.$router.replace('/login');
              this.$message.error('错误！');
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          // 请求失败页面弹出失败框
          console.log(error.response.data);
          // console.log(error.response.status);
          if (error.response.data.message) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error('服务器连接错误!');
          }
        });
    },
  },
};
</script>

<style lang="less">
@import url(/css/icon.css);
body {
  color: #fff;
  font-weight: 300;
  height: 100%;
  background-color: #fff;
}
body ::-webkit-input-placeholder  {
  /* WebKit */
  font-family: 'Source Sans Pro', sans-serif;
  color: #fff;
  font-weight: 300;
}
body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: #fff;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: #fff;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  /* IE 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: #fff;
  font-weight: 300;
}
.login {
    height:100%;
    width:100%;
    max-height:100%;
    position:absolute;
    z-index:1;
    left:0;
    top:0;
    background-image: url(../../assets/backend_notfound.png);
    background-repeat:no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 600;
    font-family: 'Source Sans Pro', sans-serif;
  }
  .wrapper {
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 240px 0;
    height: 400px;
    color: #fff;
    text-align: center;
  }
  .container h1 {
    font-size: 40px;
    -webkit-transition-duration: 1s;
            transition-duration: 1s;
    -webkit-transition-timing-function: ease-in-put;
            transition-timing-function: ease-in-put;
    font-weight: 200;
  }
  .el-form {
    padding: 20px 0;
    position: relative;
    z-index: 2;
  }
  input{
    -webkit-appearance: none;
      -moz-appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 9px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: #fff;
    -webkit-transition-duration: 0.25s;
            transition-duration: 0.25s;
    font-weight: 300;
  }
  input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  input:focus {
    background-color: #fff;
    width: 300px;
    color: #53e3a6;
  }
  .el-button {
    -webkit-appearance: none;
      -moz-appearance: none;
    outline: 0;
    background-color: #fff;
    padding: 12px 15px;
    color: #53e3a6;
    border-radius: 3px;
    width: 250px;
    font-size: 18px;
    -webkit-transition-duration: 0.25s;
            transition-duration: 0.25s;
    span {
      font-weight: 600;
    }
  }
  .el-button:hover {
    cursor: pointer;
    color: #53e3a6;
    background-color: #f5f7f9;
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }
  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    -webkit-animation-delay: 2s;
            animation-delay: 2s;
    -webkit-animation-duration: 17s;
            animation-duration: 17s;
  }
  .bg-bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
            animation-delay: 4s;
  }
  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    -webkit-animation-duration: 22s;
            animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }
  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }
  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    -webkit-animation-delay: 3s;
            animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 7s;
            animation-delay: 7s;
  }
  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 15s;
            animation-delay: 15s;
    -webkit-animation-duration: 40s;
            animation-duration: 40s;
  }
  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
            animation-delay: 2s;
    -webkit-animation-duration: 40s;
            animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 11s;
            animation-delay: 11s;
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
              transform: translateY(-700px) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
              transform: translateY(-700px) rotate(600deg);
    }
  }
}
</style>
