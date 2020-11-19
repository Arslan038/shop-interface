<template>
    <div class="forgot-password">
        <div class="row mt-5">
            <div class="col-12 text-center">
                <img src="../assets/logo.png" width="130px" />
            </div>
        </div>
        <div class="row mb-5 mx-3">
            <div class="col-xl-4 col-lg-4 col-md-12 col-12 offset-xl-4 offset-lg-4">
                <div class="card mt-5 shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="text-orange">Forgot Your Password</h4>
                            </div>
                            <div class="col-2 text-right">
                                <i class="fa fa-times fa-2x" @click="move('/')"></i>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p><strong>Enter your email, we will send you a temporary password</strong></p>
                                <form @submit.prevent="send">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="email" v-model="email" class="form-control mt-3" placeholder="Enter Email" required>
                                            <p class="text-danger mt-3">This email doesn't exists.</p>
                                            <button class="btn btn-secondary btn-block mt-3">Send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
//import StaticHeader from '@/components/StaticHeader.vue'
export default {
    name: 'ForgotPassword',
    components: {
        //StaticHeader
    },
    data() {
        return {
            email: null
        }
    },
    methods: {
        ...mapActions(['recoverPassword']),
        send() {
            this.recoverPassword(this.email)
        },
        move(to) {
            this.$router.push(to)
        }
    }
}
</script>

<style scoped>
.forgot-password {
    background: #f9f9f9;
    height: 100vh;
    overflow-x: hidden !important;
}
hr {
    border: 0.5px solid #E96928 !important;
}
.use {
    border-bottom: 1px solid black;
    color: black;
}
i:hover {
    cursor: pointer;
}
</style>