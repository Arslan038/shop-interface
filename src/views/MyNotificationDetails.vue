<template>
    <div class="new-notification">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class=" mt-1 px-3">
                    <h4 class="text-orange"><strong>Notification Details</strong></h4>
                    <p class="">Send notifications to your customers to inform them about an opportunity or just to incite them to come in your shop. You can send a notification to all your cutomers or to one or many groups of clients  among the ones chosen before. </p>
                    <p class=""><strong>BRING THE CUSTOMER TO YOUR SHOP !!!</strong></p>
                </div>

                <div class="body-area mt-1 px-5">
                    <form @submit.prevent>
                        <div class="row">
                            <div class="col-12 mt-3">
                                <h5><strong>Notification</strong> <span class="text-orange">{{newNotification.Title}}</span></h5>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form mt-3">
                                    <input type="text" class="form-control mb-2" v-model="newNotification.Title" placeholder="Add a name">
                                    <label for=""><strong>Notification Type</strong></label>
                                    <select class="form-control" v-model="newNotification.TargetType">
                                        <option value="customers">My Customers</option>
                                        <option value="groups">My Group(s)</option>
                                    </select>
                                    <textarea class="form-control mt-2" rows="8" v-model="newNotification.Message" placeholder="Description..."></textarea>  
                                    <h5 class="text-orange my-3">Validity Period</h5>
                                    <div class="type d-flex mt-2">
                                        <label for=""><strong class="text-orange">Duration:</strong></label>
                                        <strong class="ml-3">{{duration}} Days</strong>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 mt-2">
                                            <span><strong class="text-orange">Begining:</strong></span>
                                            <input type="date" class="form-control" :min="today" @change="setDate" v-model="startDate" required>
                                        </div>
                                        <div class="col-6 mt-2">
                                            <span><strong class="text-orange">End:</strong></span>
                                            <input type="date" class="form-control" v-model="endDate" required disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mt-3" v-if="newNotification.TargetType = 2">
                                <div class="card">
                                    <div class="card-body">
                                        <h6 class="text-orange">List of groups</h6>
                                        <hr>
                                        <div class="row align-items-center group-list mt-3" v-for="(group, index) in groupList" :key="index">
                                            <div class="col-1">
                                                <b-form-checkbox :checked="newNotification.UserGroupId == group.Id" @change="selectGroup($event, group.Id)"></b-form-checkbox>
                                            </div>
                                            <div class="col-2">
                                                <img :src="getGroupIcon(group.Id)" width="100%" alt="">
                                            </div>
                                            <div class="col-9">
                                                <p>{{group.UserGroupName}}</p>
                                                <p class="text-orange">{{group.ShopName}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 mt-3">
                                <div class="form mt-3">
                                    <!-- <button class="btn btn-primary mt-5">Update</button> -->
                                        
                                    <div class="cost mt-3">
                                        <p><strong class="pr-3">Cost: </strong> {{newNotification.Cost}}$</p>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6 mt-3">
                                            <button class="btn btn-secondary btn-block" @click="addToCart">
                                                Add to cart
                                            </button>
                                        </div>
                                        <div class="col-12 col-md-6 mt-3">
                                            <button class="btn btn-secondary btn-block" @click="save">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
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
import mixin from '../mixins/global'
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
export default {
    name: "NewNotification",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getListOfGroups', 'getNotificationUpdated', 'getNotificationDetails', 'getNotifications']),
        groupList() {
            return this.getListOfGroups
        }
    },
    data() {
        return {
            today: null,
            disableGroups: false,
            isOpen: true,
            groups: [],
            agree: 'no',
            duration: 3,
            startDate: null,
            endDate: null,
            limitReached: false,
            newNotification: {
                Title: null,
                Message: null,
                Cost: 5.95000,
                ShopId: null,
                ShopName: null,
                FromDate: null,
                EndDate: null,
                Status: null,
                UserGroupId: null,
                TargetType: 2,
            }
        }
    },
    methods: {
        ...mapActions(['fetchListOfCustomerGroups', 'fetchNotificationDetails', 'updateNotification', 'fetchNotifications']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        getGroupIcon(id) {
            const group = this.getUserData().GroupTypes.find(g => g.Id == id)
            if(group) {
                return group.Parameter
            }
        },
        findNotification(group) {
            let g = this.groups.find(gr => gr.Id == group.Id)
            if(g) {
                return true
            }
            return false
        },
        selectGroup(e, id) {
            if(e) {
                if(this.groups.length > 0) {
                    this.disableGroups = true
                    this.notification('You can select only 1 group', 'warning')
                    return
                }
                this.disableGroups = false
                const obj = {
                    Id: id
                }
                this.groups.push(obj)
                
            }
            else {
                this.groups = this.groups.filter(item => {
                    return item.Id !== id
                })
                this.disableGroups = false
            }
        },
        setDate(e) {
            let date = e.target.value
            if(!this.duration) {
                this.notification('Please Select Duration First', 'warning');
                this.newNotification.FromDate = null
            }
            else {
                var start = new Date(date)
                var end = new Date(start.getFullYear(), start.getMonth(), start.getDate()+this.duration)
                
                this.endDate = moment(end).format('YYYY-MM-DD')
                this.startDate = moment(date).format('YYYY-MM-DD')

                this.newNotification.FromDate = moment(start).format('YYYY-MM-DD hh:mm:ssZ')
                this.newNotification.EndDate = moment(end).format('YYYY-MM-DD hh:mm:ssZ')
            }
        },
        addToCart() {
            this.newNotification.Status = 1
            if(this.limitReached) {
                this.notification('Sorry! Your Notifications Limit Reached in Cart.', 'warning')
                return
            }
            if(this.validateData()) {
                if(this.groups.length == 1) {
                    this.newNotification.UserGroupId = this.groups[0].Id
                }
                const payload = {
                    id: this.getUser().id,
                    Id: this.$route.params.id,
                    data: this.newNotification
                }
                //console.log(payload)
                this.updateNotification(payload)
            }
        },
        save() {
            this.newNotification.Status = 3
            if(this.validateData()) {
                if(this.groups.length == 1) {
                    this.newNotification.UserGroupId = this.groups[0].Id
                }
                const payload = {
                    id: this.getUser().id,
                    Id: this.$route.params.id,
                    data: this.newNotification
                }
                //console.log(payload)
                this.updateNotification(payload)
            }
        },
        validateData() {
            if(!this.newNotification.Title || this.newNotification.Title == '') {
                this.notification('Please Enter Notification Title.', 'warning')
                return false
            }
            if(!this.newNotification.Message || this.newNotification.Message == '') {
                this.notification('Please Enter Notification Message.', 'warning')
                return false
            }
            if(this.newNotification.TargetType == 2 && !this.groups.length) {
                this.notification('Please atleast 1 group', 'warning')
                return false
            }
            if(this.groups.length > 1) {
                this.notification('You can select only 1 group', 'warning')
                return false
            }
            if(!this.startDate) {
                this.notification('Please pick start date.', 'warning')
                return false
            }
            return true
        },
        countNotifications() {
            if(this.getNotifications) {
                const limit = this.getUserData().Contract.NbNotifications
                const count = this.getNotifications.filter(d => d.Status != 3)
                if(count.length >= limit) {
                    this.limitReached = true
                }
            }
        }
    },

    async created() {
        if(!this.getNotifications || !this.getNotifications.length) {
            const payload = {
                id: this.getUser().id
            }
            await this.fetchNotifications(payload)
        }
        else {
            await this.countNotifications()
        }
        this.today = new Date().toISOString().slice(0,10);
        if(this.getUser() && this.getUserData()) {
            const payload = {
                id: this.getUser().id,
                Id: this.$route.params.id
            }
            this.fetchListOfCustomerGroups(payload)
            this.fetchNotificationDetails(payload)

            this.newNotification.ShopId = this.getUser().shop
            this.newNotification.ShopName = this.getUserData().Shop.Name

        }
    },

    watch: {
        getNotifications(val) {
            if(val && typeof val == 'object') {
                this.countNotifications()
            }
        },
        getNotificationUpdated(val) {
            if(val && val == 'success') {
                this.notification('Notification Updated Successfully', 'success')
                this.$router.push({path: '/my-notifications'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
            }
        },
        getNotificationDetails(val) {
            if(val) {
                this.newNotification = val
                this.newNotification.ShopId = this.getUser().shop

                this.startDate = moment(val.FromDate).format('YYYY-MM-DD')
                this.endDate = moment(val.EndDate).format('YYYY-MM-DD')

                this.duration = 3

                if(this.newNotification.UserGroupId) {
                    this.groups = []
                    const group = {
                        Id: this.newNotification.UserGroupId
                    }
                    this.groups.push(group)
                    this.newNotification.TargetType = 2
                }
                else {
                    this.newNotification.TargetType = 1
                }
                
            }
        }
    }
}
</script>

<style scoped>

.body-area {
    background: #f9f9f9;
    padding-bottom: 20px;
}
.image {
    height: 100px;
    width: 100%;
    border: 1px solid black;
    display: inline-block;
    margin-top: 10px;
}
.group-list p {
    margin: 0;
}
hr {
    border: .5px solid #E96928 !important;;
}
</style>