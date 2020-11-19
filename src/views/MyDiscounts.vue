<template>
    <div class="my-discounts">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h4 class="text-orange" v-if="getDiscounts"><strong>My discounts ({{countDiscounts.total}}/{{countDiscounts.limit}})</strong></h4>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="row">
                                <div class="col-12 col-md-6 mt-3">
                                    <select class="form-control" @change="filterDiscounts">
                                        <option :value="null">Sort By</option>
                                        <option value="Name">Name</option>
                                        <option value="type">Type of Discount</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-5 pt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Discounts...</p>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3" v-for="(discount, index) in myDiscounts" :key="index">
                            <div class="card" @click="move('/my-discount/'+discount.Id)">
                                <div class="card-body">
                                    <div v-if="discount.PhotoUrl" class="image-area" v-bind:style="{ 'background-image': 'url(' + discount.PhotoUrl + ')' }"></div>
                                    <div v-else class="image-area text-center text-orange pt-4"><strong>No Image Found</strong></div>
                                    <div class="pt-3 px-3">
                                        <p>{{discount.Title}}</p>
                                        <p>{{discount.DiscountRate}}%</p>
                                        <div class="row">
                                            <div class="col-6 pt-3">
                                                <b-badge variant="info" v-if="discount.Status == 1">Pending</b-badge>
                                                <b-badge variant="success" v-if="discount.Status == 2">Active</b-badge>
                                                <b-badge variant="secondary" v-if="discount.Status == 3">Inactive</b-badge>
                                            </div>
                                            <div class="col-6 text-right">
                                                <img v-if="discount.DiscountTargetType == 1" height="50" src="../assets/customer-search.png" width="50" alt="">
                                                <img v-else src="../assets/home.png" width="50" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger mt-2" @click="deleteModal(discount)">X</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        <b-modal title="Delete Discount" v-model="showModal" :hide-footer="true">
            <div class="row">
                <div class="col-12 text-center">
                    <h6>Are you sure you want to Delete Discount "<span class="text-orange" v-if="discountToDelete">{{discountToDelete.Title}}</span>" ?</h6>
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
    name: "MyDiscounts",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    data() {
        return {
            discounts: [],
            showModal: false,
            loading: false,
            isOpen: true,
            discountToDelete: null
        }
    },
    computed: {
        ...mapGetters(['getDiscounts', 'getDiscountDeleted']),
        myDiscounts() {
            if(this.getDiscounts && this.getDiscounts.length) {
                this.discounts = this.getDiscounts
                return this.discounts.filter(d => d.Status < 4)
            }
            return
        },
        countDiscounts() {
            if(this.getDiscounts) {
                const limit = this.getUserData().Contract.NbDiscounts
                const count = this.getDiscounts.filter(d => d.Status < 3)
                return {
                    total: count.length,
                    limit: limit
                }
            }
        }
    },
    methods: {
        ...mapActions(['fetchDiscounts', 'deleteDiscount']),
        filterDiscounts(e) {
            let type = e.target.selectedIndex
            if(e.target.selectedIndex > 0) {
                this.discounts = this.getDiscounts
                if(type == 1) {
                    this.discounts.sort(function(a, b){ return a.Title < b.Title ? -1 : 1});
                }
                if(type == 2) {
                    this.discounts.sort(function(a, b){ return a.DiscountTargetType < b.DiscountTargetType ? -1 : 1});
                }
            }
            else {
                this.discounts = this.getDiscounts
            }
        },
        move(link) {
            this.$router.push({path: link})
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        deleteModal(discount) {
            this.discountToDelete = discount
            this.showModal = true
        },
        cancel() {
            this.showModal = false
        },
        deleteNow() {
            const payload = {
                id: this.getUser().id,
                discountId: this.discountToDelete.Id
            }
            this.deleteDiscount(payload)
        },
        
    },
    async created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.loading = true
            await this.fetchDiscounts(payload)
            
        }
    },

    watch: {
        getDiscounts(val) {
            if(val) {
                this.discounts = val
                this.loading = false
            }
        },
        getDiscountDeleted(val) {
            if(val && val == 'success') {
                this.notification('Discount Deleted Successfully!', 'success')
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
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.card-body {
    margin: 0;
    padding: 0;
    padding-bottom: 15px;
}

.card-body p {
    margin: 0;
}
.card .btn-success {
    padding: 2px 30px;
    margin-top: 10px;
    background: green !important
}
.card .btn-secondary {
    padding: 2px 30px;
    margin-top: 10px;
    background: #ddd !important;
    border: 1px solid #ddd !important;
}
.card .btn-info {
    padding: 2px 30px;
    margin-top: 10px;
    background: #1291da !important;
    border: 1px solid #ddd !important;
}
</style>