<template>
    <div class="my-notifications">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h4 class="text-orange" v-if="getNotifications"><strong>My Notifications ({{countNotifications.total}}/{{countNotifications.limit}})</strong></h4>
                        </div>
                    </div>
                    <div class="row mx-5 pt-3 mb-5">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Notifications...</p>
                        </div>
                        <div class="col-12 col-md-6 mt-3" v-for="(notification, index) in myNotifications" :key="index">
                            <div class="card" @click="move('my-notification/'+notification.Id)">
                                <div class="card-body">
                                    <div class="row mx-3">
                                        <!-- <div class="col-3 image">
                                        </div> -->
                                        <div class="col-12">
                                            <p class="pt-2"><strong>{{notification.Title}}</strong></p>
                                            <div class="details">
                                                <p>{{notification.Message}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 pl-4 mt-2 pl-5">
                                            <p class="text-orange">{{setDate(notification.FromDate)}}</p>
                                        </div>
                                        <div class="col-6 pr-4 mt-2 text-right pr-5">
                                            <b-badge v-if="notification.Status == 2" variant="success">Active</b-badge>
                                            <b-badge v-if="notification.Status == 1" variant="secondary">Pending</b-badge>
                                            <b-badge v-if="notification.Status == 3" variant="info">Inactive</b-badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger btn-sm mt-2" @click="deleteModal(notification)">X</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

        <b-modal title="Delete Notification" :hide-footer="true" v-model="showModal">
            <div class="row">
                <div class="col-12 text-center">
                    <h6>Are you sure you want to Delete Notification "<span class="text-orange" v-if="notificationToDelete">{{notificationToDelete.Title}}</span>" ?</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <button class="btn btn-danger btn-block" @click="deleteNow">Yes, Delete</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-secondary btn-block" @click="cancel">No, Cancel</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import mixin from '../mixins/global'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "MyNotifications",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    data() {
        return {
            showModal: false,
            loading: false,
            notificationToDelete: null,
            isOpen: true,
            mon: false,
            tue: true,
            wed: true,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        }
    },
    computed: {
        ...mapGetters(['getNotifications', 'getNotificationDeleted']),
        myNotifications() {
            if(this.getNotifications && this.getNotifications.length) {
                return this.getNotifications.filter(c => c.Status < 4)
            }
            return
        },
        countNotifications() {
            if(this.getNotifications) {
                const limit = this.getUserData().Contract.NbNotifications
                const count = this.getNotifications.filter(d => d.Status < 3)
                return {
                    total: count.length,
                    limit: limit
                }
            }
        }
    },
    methods: {
        ...mapActions(['fetchNotifications', 'deleteNotification']),
        move(link) {
            this.$router.push({path: link})
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        setDate(date) {
            let getDate = date.split('T')[0]
            let getMonth = getDate.split('-')[1]
            let getYear = getDate.split('-')[0]
            let getDay = getDate.split('-')[2]
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            let finalDate = getDay + " " + months[getMonth - 1] + " " + getYear

            return finalDate
        },
        deleteModal(notification) {
            this.notificationToDelete = notification
            this.showModal = true
        },
        cancel() {
            this.showModal = false
        },
        deleteNow() {
            const payload = {
                id: this.getUser().id,
                Id: this.notificationToDelete.Id
            }
            this.deleteNotification(payload)
        }
    },
    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.loading = true
            this.fetchNotifications(payload)
        }
    },

    watch: {
        getNotifications(val) {
            if(val) {
                this.loading = false
            }
        },
        getNotificationDeleted(val) {
            if(val && val == 'success') {
                this.notification('Notification Deleted Successfully!', 'success')
                this.showModal = false
            }
            if(val && val != 'success') {
                this.notification(val, 'error')
                this.showModal = false
            }
        }
    }
}
</script>

<style scoped>

.body-area {
    background: #f9f9f9;
    padding-bottom: 25px;
}
.card {
    margin: 0;
    padding: 0;
}
.image-area {
    background: url('../assets/service.jpg');
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
}
.card {
    margin: 0;
    padding: 0;
    border: 1px solid #ddd;
}
.card-body {
    margin: 0;
    padding: 0;
}
.card-body p {
    margin: 0;
    padding: 0;
}

.image {
    background: url('../assets/image.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100px;
    width: 100%;
    border: 1px solid black;
    display: inline-block;
    margin-top: 10px;
}
.align-bottom {
    position: absolute;
    bottom: 0;
    right: 10px;
}
.details {
    padding: 5px 0px;
}


</style>