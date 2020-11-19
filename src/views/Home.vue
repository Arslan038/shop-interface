<template>
  <div class="home">
    <div class="row align-items-center">
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 image"></div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 px-4 mb-5">
        <div class="text-center mt-5">
          <img src="../assets/logo.png" width="20%" alt="">
        </div>
        <h5 class="text-uppercase mt-5"><strong class="text-dark">Access my space</strong></h5>
        <p class="mt-3"> Welcome to shops interface</p>
        <p>This space will allow you to create and distribute your services with modern proximity marketing tools. It will help you to observe
          and manage your business effectively like never before. </p>
        <p><strong>SETTLE IN, LET'S GO !!! </strong></p>
        
        <div class="row mt-4">
          <div class="col-6">
            <div class="login-area pr-3">
              <h5><strong>Login</strong></h5>
              <form @submit.prevent="login">
                <div class="row">
                  <div class="col-12">
                    <input type="email" class="form-control" placeholder="Email" v-model="user.email" required>
                    <input type="password" class="form-control mt-3" placeholder="Password" v-model="user.password" required>
                    <input type="checkbox" class="mt-3"> Remember Me
                    <br><button class="btn btn-primary mt-3" type="submit">{{btnText}}</button>

                    <p class="text-danger mt-2 forgot" @click="forgot">You forgot your password?</p>
                  </div>
                </div>
              </form>
            </div>

            <div class="signup-area mt-4">
              <button class="btn btn-secondary" @click="register">Register</button>
            </div>
            
          </div>

          <div class="col-6 px-4 mt-2">
            <p class="text-danger pt-4" v-if="!found">Wrong email or password. Please contact your manager.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapGetters} from 'vuex'
import globalMixin from '../mixins/global'
export default {
  name: 'Home',
  mixins: [globalMixin],
  data() {
    return {
      btnText: 'Login',
      found: true,
      user: {
        email: 'rostand.monkam@manicards.com',
        password: 'rostand0',
      }
    }
  },
  components: {
    //HelloWorld
  },
  computed: {
    ...mapGetters(['getLoggedIn', 'getLoggedUserData']),
  },
  methods: {
    ...mapActions(['loginUser', 'setLoginProfile']),
    login() {
      this.loginUser(this.user)
      this.btnText = 'Logging in...'
      //this.$router.push({path: '/dashboard'})
    },
    register() {
      this.$router.push({path: '/create-account'})
    },
    forgot() {
      this.$router.push({path: '/forgot-password'})
    }
  },

  created() {
    if(this.getUser() && this.getUserData()) {
      this.$router.push({path: '/current-actions'});
    }
  },

  watch: {
    getLoggedIn(val) {
      if(val && val == 'yes') {
        let user = this.getUser()
        this.setLoginProfile(user.id)
        this.found = true
        //this.notification('Login Successfull', 'success')
        //this.$router.push({path: '/dashboard'})
      }
      if(val && val == 'no') {
        this.btnText = 'Login'
        this.found = false
        this.notification('Login Failed. Please check your Credentials', 'error')
      }
    },

    getLoggedUserData(val) {
      if(val) {
        this.btnText = 'Login'
        this.notification('Login Successfull', 'success')
        this.$router.push({path: '/current-actions'})
      }
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh !important;
  background: #f9f9f9;
  overflow-x: hidden;
}
.image {
  background: url('../assets/mcommerce.png');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.login-area {
  border-right: 5px solid white
}
input {
  height: 35px;
  border: 1px solid #000;
}

input:focus {
  box-shadow: none !important;
  border: 1px solid #000;
}

input[type="checkbox"] {
  border: 2px solid #000 !important;
}

.btn {
  padding: 2px 40px;
  color: #000;
}
.btn:active {
  color: #000;
}
.btn-secondary {
  padding: 2px 60px;
  color: #000 !important;
}
.btn-secondary:hover, .btn-secondary:active {
  color: #000 !important;
}

.forgot:hover {
  cursor: pointer;
}
</style>
