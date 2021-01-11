<template>
    <div class="dashboard">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">

                <div class="body-area mt-1">
                    <form @submit.prevent="send">
                        <div class="row mx-5 pt-3">
                            <div class="col-12">
                                <h5 class="text-orange"><strong>My Payment History</strong></h5>
                                <p>You want to know more about how you’ve used your money?  It is simple: select the period, we will send you a summary by email. </p>
                                <p><strong>HOW MUCH DOES IT COSTS ME ?</strong></p>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-md-3 col-12 mt-3">
                                        <p class="text-orange"><strong>Select Title</strong></p>
                                        <select class="form-control" @change="setRequestType" v-model="request.Title" required>
                                            <option value="Purchases">Purchases</option>
                                            <option value="Payments">Payments</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-3 col-12 mt-3">
                                <p class="text-orange"><strong>Start</strong></p>
                                <input type="date" v-model="request.FromDate" required class="form-control">
                            </div>
                            <div class="col-md-3 col-12 mt-3">
                                <p class="text-orange"><strong>End</strong></p>
                                <input type="date" v-model="request.ToDate" required class="form-control">
                            </div>
                        </div>
                        <div class="row mx-5 mt-3">
                            <div class="col-md-6 col-12 mt-3">
                                <p class="text-orange"><strong>Email</strong></p>
                                <input type="email" v-model="request.Message" required placeholder="Enter your Email" class="form-control">
                            </div>  
                        </div>
                        <div class="row mx-5 mt-3 pb-5">
                            <div class="col-md-6 col-12 mt-3">
                                <button class="btn btn-secondary px-5 py-2">Send</button>
                            </div>  
                        </div>
                    </form>
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
    name: "History",
    mixins: [globalMixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getRequestStatus']),
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            isOpen: true,
            request: {
                id: null,
                RequestType: 4,
                FromType: 2,
                FromId: null,
                FromName: null,
                FromSystem: false,
                Title: "Purchases",
                Message: null,
                MustMakeDecision: true,
                FromDate: null,
                ToDate: null
            }
        }
    },
    methods: {
        ...mapActions(['sendRequest']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        setRequestType(e) {
            const type = e.target.value
            if(type == "Purchases") {
                this.request.RequestType = 5
            }
            if(type == "Payments") {
                this.request.RequestType = 4
            }
        },
        send() {
            // var start = new Date(date)
            // var end = new Date(start.getFullYear(), start.getMonth(), start.getDate()+1)
            
            // this.endDate = moment(end).format('YYYY-MM-DD')
            // this.startDate = moment(date).format('YYYY-MM-DD')

            this.request.FromDate = moment(this.request.FromDate).format('YYYY-MM-DD hh:mm:ssZ')
            this.request.ToDate = moment(this.request.ToDate).format('YYYY-MM-DD hh:mm:ssZ')
            //console.log(moment(this.request.FromDate).diff(this.request.ToDate))
            if(this.request.FromDate > this.request.ToDate) {
                this.notification('To Date should be greater than From Date', 'warning')
                return
            }
            this.sendRequest(this.request)
        }
    },
    created() {
        if(this.getUserData()) {
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
.body-area {
    background: #f9f9f9;
}
</style>