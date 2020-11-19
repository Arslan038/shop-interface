<template>
    <div class="my-membership">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h5 class="text-orange"><strong>My Memberships</strong></h5>
                            <p>Choose the subscription that suits you.</p>
                        </div>
                    </div>
                    <div class="row mx-5 mt-3 pb-5">
                        <div class="col-12 col-lg-4 col-xl-3 col-md-4 col-sm-6 mt-3" v-for="(subscription, index) in listSubscriptions" :key="index">
                            <!-- <p>{{listSubscriptions}}</p> -->
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-9">
                                            <strong class="mt-2">{{subscription.Name}}</strong>
                                        </div>
                                        <div class="col-3 text-right">
                                            <b-avatar :src="subscription.PhotoUrl"></b-avatar>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-6">
                                            <h6><strong>$ CAD</strong></h6>
                                        </div>
                                        <div class="col-6 text-right">
                                            <h6><strong>{{subscription.Price}}</strong></h6>
                                        </div>  
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-12">
                                            <p class="text-orange"><strong>E-commerce</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Clients groups</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbUserGroups}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Online services</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbProducts}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Coupons</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbCoupons}}</strong></p>
                                        </div>

                                        <div class="col-12">
                                            <p class="text-orange"><strong>Marketing</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Loyality cards</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbLoyaltyProducts}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Discounts</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbDiscounts}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>User Group Discounts</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbUserGroupDiscounts}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Notifications</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbNotifications}}</strong></p>
                                        </div>
                                        <div class="col-6">
                                            <p><i>Dashboards</i></p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <p><strong>{{subscription.NbDashboardTable}}</strong></p>
                                        </div>
                                        <div class="col-12" v-if="!subscribed(subscription.Id)">
                                            <button :hidden="userSubscription && userSubscription == subscription.Id" @click="send(subscription.Id)" class="btn btn-secondary btn-block">Select</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>

                      
                
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import {mapActions, mapGetters} from 'vuex'
import globalMixin from '../mixins/global'
import moment from 'moment'
export default {
    name: "MyMembership",
    mixins: [globalMixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getExistingSubscriptions', 'getRequestStatus']),
        listSubscriptions() {
            return this.getExistingSubscriptions
        },
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            isOpen: true,
            userSubscription: null,
            request: {
                id: null,
                RequestType: 0,
                FromType: 2,
                FromId: null,
                FromName: null,
                FromSystem: false,
                OnType: 12,
                OnId: null,
                Title: "Abonnement / Subscription",
                Message: "Modification / Change",
                MustMakeDecision: true,
                FromDate: null,
            }
        }
    },
    methods: {
        ...mapActions(['listOfExistingSubscription', 'sendRequest']),
        subscribed(id) {
            const flateRateId = this.getUserData().Contract.FlatRateId
            if(flateRateId == id) {
                return true
            }
            return false
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        send(id) {
            this.request.OnId = id
            this.request.FromDate = moment().format('YYYY-MM-DD hh:mm:ssZ')
            this.sendRequest(this.request)
        }
    },
    created() {
        if(!this.getExistingSubscriptions.length) {
            this.listOfExistingSubscription()
        }
        if(this.getUserData()) {
            this.userSubscription = this.getUserData().Contract.FlatRateId
            this.request.FromId = this.getUserData().Shop.Id
            this.request.FromName = this.getUserData().Shop.Name
            this.request.id = this.getUser().id
        }
    },
    watch: {
        getRequestStatus(val) {
            if(val && val == 'success') {
                this.notification('Request Sent Successfully', 'success')
            }
            if(val && val != 'success') {
                this.notification('Request Failed', 'error')
            }
        }
    }
}
</script>

<style scoped>
.title-area {
    border: 1px solid #E96928;
}
.body-area {
    background: #f9f9f9;
    min-height: 355px;
}
.hidden {
    visibility: hidden;
}
</style>