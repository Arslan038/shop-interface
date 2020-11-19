<template>
    <div class="current-actions">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h5 class="text-orange">Current Actions</h5>
                        </div>
                        <div class="col-md-3 col-12 mt-3" v-for="(action, index) in actions" :key="index">
                            <div class="card" @click="findRequests(action.RequestType)">
                                <div class="card-body text-right">
                                    <h2><strong>{{action.count}}</strong></h2>
                                    <h5 class="text-orange"><strong>{{action.Name}}</strong></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-5 pt-3 mb-5" v-if="requests">
                        <div class="col-12 mt-3" v-for="(req, i) in requests" :key="i">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex">
                                        <h6><strong>{{req.Title}}:</strong> <strong class="text-orange">{{req.FromName}}</strong></h6>
                                        <button class="btn btn-primary btn-sm ml-4" @click="details(req.Id)">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <b-modal title="Message" :hide-footer="true" v-model="openDetails">
                    <div class="row" v-if="reqDetails">
                        <div class="col-6">
                            <p><strong>From: {{reqDetails.FromName}}</strong></p>
                        </div>
                        <div class="col-6">
                            <p><strong>Date: {{reqDetails.FromDate ? getDate(reqDetails.FromDate) : 'Not Found'}}</strong></p>
                        </div>
                        <div class="col-12 mt-3">
                            <p><strong>Subject</strong></p>
                            <input type="text" class="form-control" v-model="reqDetails.Title" disabled>
                        </div>
                        <div class="col-12 mt-3">
                            <p><strong>Message</strong></p>
                            <textarea v-model="reqDetails.Message" class="form-control" disabled></textarea>
                        </div>
                        <div class="col-6 mt-3" v-if="reqDetails.Decision != null">
                            <button class="btn btn-secondary" @click="accept">Accept</button>
                        </div>
                        <div class="col-6 mt-3" v-if="reqDetails.Decision != null">
                            <button class="btn btn-secondary" @click="decline">Decline</button>
                        </div>
                        <div class="col-6 mt-3" v-if="reqDetails.Decision == null">
                            <button class="btn btn-secondary" @click="understood">Understood</button>
                        </div>
                    </div>
                </b-modal>
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: "CurrentActions",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getPendingActions', 'getActionDetails', 'getActionUpdated'])
    },
    data() {
        return {
            isOpen: true,
            openDetails: false,
            allActions: [],
            actions: null,
            requestTypes: [],
            requests: [],
            reqDetails: null,
        }
    },
    methods: {
        ...mapActions(['fetchPendingActions', 'fetchActionDetails', 'updateActionDetails']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        findRequests(req) {
            //console.log(req)
            this.requests = []
            this.requests = this.allActions.filter(a => a.RequestType == req)
            
        },
        details(id) {
            const payload = {
                Id: id,
                id: this.getUser().id
            }
            this.openDetails = true
            this.fetchActionDetails(payload)
        },
        getDate(date) {
            let months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let getMonth = date.split('T')[0].split('-')[1]
            let getDay = date.split('T')[0].split('-')[2]
            let getYear = date.split('T')[0].split('-')[0]
            return getDay + " " + months[getMonth-1] + " " +getYear
        },

        accept() {
            this.reqDetails.id = this.getUser().id
            this.reqDetails.Completed = true
            this.reqDetails.Decision = true
            this.updateActionDetails(this.reqDetails)
        },
        decline() {
            this.reqDetails.id = this.getUser().id
            this.reqDetails.Completed = true
            this.reqDetails.Decision = false
            this.updateActionDetails(this.reqDetails)
        },
        understood() {
            this.reqDetails.id = this.getUser().id
            this.reqDetails.Completed = true
            this.reqDetails.Decision = null
            this.updateActionDetails(this.reqDetails)
            console.log(this.reqDetails)
        }
    },

    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.fetchPendingActions(payload)
        }
        if(this.getUserData()) {
            this.requestTypes = this.getUserData().RequestTypes
        }
    },

    watch: {
        getActionUpdated(val) {
            if(val && val == 'success') {
                this.notification('Action Updated Successfully', 'success')
                this.openDetails = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
            }
        },
        getActionDetails(val) {
            if(val) {
                this.reqDetails = val
                //console.log(val)
            }
        },
        getPendingActions(val) {
            if(val) {
                if(this.getUserData()) {
                    this.requestTypes = this.getUserData().RequestTypes
                    this.allActions = val
                    this.actions = []
                    val.forEach(item => {
                        let found = this.actions.find(a => a.RequestType == item.RequestType)
                        if(found) {
                            found.count++
                        }
                        else {
                            const name = this.requestTypes.find(r => r.Id == item.RequestType)
                            if(name) {
                                const obj = {
                                    count: 1,
                                    Id: item.Id,
                                    RequestType: item.RequestType,
                                    Name: name.Shortname.Strings.English

                                }
                                this.actions.push(obj)
                            }
                            
                        }
                    })
                }
            }
        }
    }
}
</script>

<style scoped>

.body-area {
    background: #f9f9f9;
    min-height: 460px;
}
.card {
    border-radius: 10px;
}
.card:hover {
    cursor: pointer;
}
</style>