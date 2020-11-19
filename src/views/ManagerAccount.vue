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
                                    <div class="row" v-if="manager">
                                        <div class="col-12">
                                            <input type="text" class="form-control" placeholder="First Name" v-model="manager.Firstname" required>
                                            <input type="text" class="form-control mt-3" placeholder="Last Name" v-model="manager.Lastname" required>
                                            <input type="email" class="form-control mt-3" placeholder="Email" disabled v-model="manager.Email" required>
                                            <input type="tel" class="form-control mt-3" placeholder="Phone" v-model="manager.Phone">
                                            <button class="btn btn-secondary btn-block mt-4" type="submit">{{btnText}}</button>
                                        </div>
                                    </div>
                                </form>
                                <button class="btn btn-secondary btn-block mt-3" @click="move('/reset-password')">Reset My Password</button>
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
    name: 'ManagerAccount',
    mixins: [globalMixin],
    data() {
        return {
            btnText: 'Update My Account',
            manager: null
        }
    },
    components: {
        //StaticHeader
    },
    computed: {
        ...mapGetters(['getManagerProfile', 'getManagerUpdated']),
        
    },
    methods: {
        ...mapActions(['fetchManagerProfile', 'updateManagerProfile']),
        
        createAccount() {
            this.manager.id = this.getUser().id
            this.updateManagerProfile(this.manager)
            this.btnText = 'Updating Account...'
        },
        move(to) {
            this.$router.push(to)
        }
    },
    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }

            this.fetchManagerProfile(payload)
        }
        
    },

    watch: {
        getManagerProfile(val) {
            if(val) {
                this.manager = val[0]
                console.log(val)
            }
            
        },

        getManagerUpdated(val) {
            if(val && val == 'success') {
                this.notification('Account Updated Successfully!', 'success')
                this.btnText = 'Update My Account'
            }
            if(val && val == 'failed') {
                this.notification('Something went wrong!', 'error')
                this.btnText = 'Update My Account'
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