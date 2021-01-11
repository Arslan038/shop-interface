<template>
    <div class="account-creation">
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
                                <h4 class="text-orange">Manager Account</h4>
                            </div>
                            <div class="col-2 text-right">
                                <i class="fa fa-times fa-2x" @click="move('/')"></i>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h5><strong>Manager Profile</strong></h5>
                                <form @submit.prevent="createAccount">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="text" class="form-control" placeholder="First Name" v-model="register.Firstname" required>
                                            <input type="text" class="form-control mt-3" placeholder="Last Name" v-model="register.Lastname" required>
                                            <input type="email" class="form-control mt-3" placeholder="Email" v-model="register.Email" required>
                                            <input type="password" class="form-control mt-3" placeholder="New Password" v-model="register.Password" required>
                                            <input type="password" class="form-control mt-3" placeholder="Confirm Password" v-model="confirmPassword" required>
                                        </div>
                                    </div>
                                    <div class="row mt-5">
                                        <div class="col-12">
                                            <h5><strong>Company Profile</strong></h5>
                                            <input type="text" class="form-control" placeholder="Shop Name" v-model="register.ShopName" required>
                                            <select class="form-control mt-3" @change="getFlatRate">
                                                <option :value="null">Select Flate Rate</option>
                                                <option v-for="(flat, index) in listSubscriptions" :key="index" :value="flat">{{flat.Name}}</option>
                                            </select>
                                            <label for="" class="mt-3"><strong>Account Type</strong></label>
                                            <input type="text" class="form-control" v-model="register.AccountType" disabled>
                                            <textarea class="form-control my-3" rows="4" v-model="description" disabled placeholder="Description..."></textarea>
                                            <p><strong>Total: </strong>{{price}} $</p>
                                            <b-form-checkbox
                                                v-model="agree"
                                                name="checkbox-1"
                                                value="yes"
                                                unchecked-value="no"
                                                >
                                                I accept terms &amp; conditions
                                                </b-form-checkbox>
                                            <button class="btn btn-secondary btn-block mt-4" type="submit">{{btnText}}</button>
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
import globalMixin from '../mixins/global'
//import StaticHeader from '@/components/StaticHeader.vue'
export default {
    name: 'AccountCreation',
    mixins: [globalMixin],
    data() {
        return {
            btnText: 'Create My Account',
            confirmPassword: null,
            description: null,
            price: 0.0,
            agree: 'no',
            register: {
                Email: null,
                Firstname: null,
                Lastname: null,
                Password: null,
                AccountType: 20,
                ShopName: null,
                FlatrateId: null
            }
        }
    },
    components: {
        //StaticHeader
    },
    computed: {
        ...mapGetters(['getExistingSubscriptions', 'getRegistered']),
        listSubscriptions() {
            return this.getExistingSubscriptions
        }
    },
    methods: {
        ...mapActions(['listOfExistingSubscription', 'registerNewUser']),
        getFlatRate(e) {
            if(e.target.value) {
                let index = e.target.selectedIndex
                let flat = this.getExistingSubscriptions[index-1]
                this.register.FlatrateId = flat.Id
                this.description = flat.Description
                this.price = flat.Price
            }
        },
        createAccount() {
            if(this.register.Password != this.confirmPassword) {
                this.notification('Password Mismatch!', 'error')
                return
            }
            if(this.register.Password.length < 6) {
                this.notification('Password should be atleast 6 characters!', 'error')
                return
            }
            if(this.agree != 'yes') {
                this.notification('Please accept to conditions of use!', 'error')
                return
            }
            this.registerNewUser(this.register)
            this.btnText = 'Creating Account...'
        },
        move(to) {
            this.$router.push(to)
        }
    },
    created() {
        if(!this.getExistingSubscriptions.length) {
            this.listOfExistingSubscription()
        } 
    },

    watch: {
        getRegistered(val) {
            if(val && val == 'success') {
                this.notification('Account Created Successfully!', 'success')
                this.btnText = 'Create Account'
                this.$router.push({path: '/'})
            }
            if(val && val == 'failed') {
                this.notification('Something went wrong!', 'error')
                this.btnText = 'Create Account'
            }
        }
    }
}
</script>

<style scoped>
.account-creation {
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