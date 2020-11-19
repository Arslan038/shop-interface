<template>
    <div class="bookings">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                
                <div class=" mt-1 px-3">
                    <h4 class="text-orange pt-1"><strong>Bookings</strong></h4>
                    <p class="pb-3">In this space, validate your customers' requests. Fill in your order book.</p>
                </div>

                <div class="body-area mt-1">
                    <div class="row mx-1 mt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Bookings...</p>
                        </div>
                        <div class="col-12" v-if="fetchedBookings.length">
                            <p><i>Result: {{fetchedBookings.length}} item found.</i></p>
                            <div class="table-responsive">
                                <a-table
                                    class="table"
                                    :columns="columns"
                                    :dataSource="fetchedBookings"
                                    rowKey="Id"
                                    :scroll="{ x: 900 }"
                                    :loading="loading">
                                    <span slot="messages" slot-scope="id, record">
                                        <span>{{getLastMessageDate(record.Messages)}}</span>
                                    </span>
                                    <span slot="date" slot-scope="id, record">
                                        <span>{{getDate(record.CreateDate)}}</span>
                                    </span>
                                    <span slot="actions" slot-scope="id, record">
                                        <i class="fa fa-pencil text-orange" @click="serviceModal(record)"></i>
                                        <i class="fa fa-trash text-orange ml-2" @click="deleteModal(record)"></i>
                                    </span>
                                </a-table>
                            </div>
                        </div>
                    </div>
                </div>

                      
                
                <Footer />
            </div>
        </div>

        <b-modal :hide-footer="true" size="xl" v-model="openServiceModal">
            <div v-if="bookingDetails">
                <div class="row">
                    <div class="col-12">
                        <p><strong class="text-orange">Service: </strong> <strong>{{bookingDetails.ItemName}}</strong></p>
                        <hr>
                    </div>
                    <div class="col-md-12 col-12">
                        <!-- <div class="row">
                            <div class="col-md-12 col-12">
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                        <div class="d-flex">
                            
                            <p class="ml-auto pr-3 pt-1"><strong>Price</strong></p>
                            <input type="text" class="form-control" v-model="bookingDetails.Price" required disabled style="width:150px" placeholder="8,500$">
                        </div>
                        
                        <textarea class="form-control mt-3" v-model="bookingDetails.Description" disabled placeholder="Description..." rows="6"></textarea>
                        
                    </div>
                    <div class="col-12 col-md-6 mt-5 pt-4">
                        <div class="row">
                            <div class="col-12 mt-2" v-for="(message, index) in updateBookingDetails.Messages" :key="index">
                                <span>{{getDate(message.Date)}}</span>
                                <div :class="message.From == 1 ? 'from px-3 py-2 message-box' : 'you pink text-right px-3 py-2 message-box'">
                                    <p>{{message.Text}}</p>
                                </div>
                            </div>
                            <!-- <div class="col-12 text-right">
                                <div class="you pink px-3 py-2 mt-1 message-box">
                                    <p>Message from you</p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-3">
                        <p><strong>Requested Date: </strong> {{getDate(bookingDetails.CreateDate)}}</p>
                        <p><strong>Quantity: </strong> {{bookingDetails.ItemQuantity}}</p>
                        <p><strong>Total: </strong> {{bookingDetails.Price ? bookingDetails.Price : 0}}$</p>
                        <strong>Completed: </strong> <a-switch :checked="bookingDetails.Completed == true" v-model="updateBookingDetails.Completed"/>
                    </div>
                    
                    <div class="col-3">
                        <button class="btn btn-block btn-secondary" @click="update">Save and Exit</button>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-block btn-secondary" @click="openServiceModal = !openServiceModal">Exit without save</button>
                    </div>
                    <div class="col-6">
                        <form @submit.prevent="addMessage">
                            <b-input-group>
                                <input type="text" class="form-control" v-model="newMessage" required placeholder="Enter Your Message">
                                <button class="btn btn-primary send"><i class="fa fa-send"></i></button>
                            </b-input-group>
                        </form>
                        
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal title="Delete Booking" :hide-footer="true" v-model="bookingDelModal">
            <div class="row" v-if="bookingToDelete">
                <div class="col-12 text-center">
                    <h5>Are you sure you want to delete <span class="text-orange">{{bookingToDelete.UserFirstname}}'s </span> Booking having Quantity <span class="text-orange">{{bookingToDelete.ItemQuantity}}</span> ?</h5>
                </div>
                <div class="col-6 mt-3">
                    <button class="btn btn-primary btn-block" @click="removeBooking">Yes, Delete Booking</button>
                </div>
                <div class="col-6 mt-3">
                    <button class="btn btn-secondary btn-block" @click="bookingDelModal = !bookingDelModal">No, Cancel</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: "bookings",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getBookings', 'getBookingDeleted', 'getBookingDetails', 'getBookingUpdated']),
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            loading: false,
            fetchedBookings: [],
            isOpen: true,
            bookingDelModal: false,
            openServiceModal: false,
            bookingToDelete: null,
            bookingDetails: null,
            updateBookingDetails: null,
            // updateBookingDetails: {
            //     Id: null,
            //     id: null,
            //     Completed: false,
            //     Messages: []
            // },
            newMessage: null,
            columns: [
                {
                    title: 'Service',
                    dataIndex: 'ItemName',
                    sorter: (a, b) => a.ItemName.length - b.ItemName.length,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Quantity',
                    dataIndex: 'ItemQuantity',
                    sorter: (a, b) => a.ItemQuantity - b.ItemQuantity,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Customer Name',
                    dataIndex: 'UserFirstname',
                    sorter: (a, b) => a.UserFirstname.length - b.UserFirstname.length,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Requested Date',
                    dataIndex: 'CreateDate',
                    scopedSlots: { customRender: 'date' },
                },
                {
                    title: 'Last Message',
                    dataIndex: 'Messages',
                    scopedSlots: { customRender: 'messages' },
                },
                {
                    title: 'Actions',
                    scopedSlots: { customRender: 'actions' },
                },
            ]
        }
    },
    methods: {
        ...mapActions(['fetchBookings', 'fetchBookingDetails', 'deleteBooking', 'updateBooking']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        getLastMessageDate(messages) {
            let date = messages[messages.length-1].Date
            let months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let getMonth = date.split('T')[0].split('-')[1]
            let getDay = date.split('T')[0].split('-')[2]
            let getYear = date.split('T')[0].split('-')[0]
            return getDay + " " + months[getMonth-1] + " " +getYear
        },
        getDate(date) {
            let months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let getMonth = date.split('T')[0].split('-')[1]
            let getDay = date.split('T')[0].split('-')[2]
            let getYear = date.split('T')[0].split('-')[0]
            return getDay + " " + months[getMonth-1] + " " +getYear
        },
        serviceModal(booking) {
            const payload = {
                id: this.getUser().id,
                Id: booking.Id
            }
            this.fetchBookingDetails(payload)
            this.openServiceModal = true
        },
        deleteModal(record) {
            this.bookingToDelete = record
            this.bookingDelModal = true
        },
        removeBooking() {
            const payload = {
                id: this.getUser().id,
                Id: this.bookingToDelete.Id
            }
            this.deleteBooking(payload)
        },

        addMessage() {
            const message = {
                Text: this.newMessage,
                From: 2,
                Date: new Date().toISOString()
            }
            this.updateBookingDetails.Messages.push(message)
        },

        update() {
            this.updateBookingDetails.id = this.getUser().id
            this.updateBooking(this.updateBookingDetails)
        }
        
    },

    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.fetchBookings(payload)
        }
    },
    watch: {
        getBookingDetails(val) {
            if(val) {
                console.log(val)
                this.bookingDetails = val
                this.updateBookingDetails = val
                // this.updateBookingDetails.Completed = val.Completed
                // this.updateBookingDetails.Messages = val.Messages
                // this.updateBookingDetails.Id = val.Id

                //console.log(this.bookingDetails)
            }
        },
        getBookings(val) {
            if(val) {
                
                this.fetchedBookings = val
                console.log(this.fetchedBookings)
                this.loading = false
            }
        },
        getBookingDeleted(val) {
            if(val && val == 'success') {
                this.notification('Booking Deleted Successfully', 'success')
                this.bookingDelModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
                
            }
        },

        getBookingUpdated(val) {
            if(val && val == 'success') {
                this.notification('Booking Updated Successfully', 'success')
                this.openServiceModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
                
            }
        }
    }
}
</script>

<style scoped>
.body-area {
    background: #f9f9f9;
}
i:hover {
    cursor: pointer
}
.image {
    background: url('../assets/service.jpg');
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid #eee;  
}
.image:first-child {
    margin-left: 0;
}
.from {
    background: orangered;
    color: #fff;
}
.message-box {
    border-radius: 5px;
}
.send {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>