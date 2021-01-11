<template>
    <div class="my-coupons">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h4 class="text-orange" v-if="getCoupons"><strong>My Coupons ({{countCoupons.total}}/{{countCoupons.limit}})</strong></h4>
                        </div>
                    </div>
                    <div class="row mx-5 pt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Coupons...</p>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3" v-for="(coupon, index) in allCoupons" :key="index">
                            <div class="card" @click="move('/my-coupon/'+coupon.Id)">
                                <div class="card-body">
                                    <div class="image-area" v-bind:style="{ 'background-image': 'url(' + coupon.PhotoUrl + ')' }"></div>
                                    <div class="pt-3 px-3">
                                        <p>{{coupon.Title}}</p>
                                        <div class="row">
                                            <div class="col-6">
                                                <p>{{coupon.Cost}}</p>
                                            </div>
                                            <div class="col-6 text-right">
                                                <p>{{coupon.DiscountRate}}%</p>
                                            </div>
                                        </div>
                                        <b-badge variant="success" v-if="coupon.Status == 2">Active</b-badge>
                                        <b-badge variant="secondary" v-if="coupon.Status == 1">Pending</b-badge>
                                        <b-badge variant="info" v-if="coupon.Status == 3">Inactive</b-badge>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger mt-2" @click="deleteModal(coupon)">X</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        <b-modal title="Delete Coupon" v-model="showModal" :hide-footer="true">
            <div class="row">
                <div class="col-12 text-center">
                    <h6>Are you sure you want to Delete Coupon "<span class="text-orange" v-if="couponToDelete">{{couponToDelete.Title}}</span>" ?</h6>
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
import moment from 'moment'
export default {
    name: "MyCoupons",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    data() {
        return {
            showModal: false,
            couponToDelete: null,
            isOpen: true,
            loading: false,
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
        ...mapGetters(['getCoupons', 'getCouponDeleted']),
        allCoupons() {
            if(this.getCoupons && this.getCoupons.length) {
                return this.getCoupons.filter(c => c.Status < 4)
            }
            return
        },
        countCoupons() {
            if(this.getCoupons) {
                const limit = this.getUserData().Contract.NbCoupons
                const count = this.getCoupons.filter(d => d.Status < 3)
                return {
                    total: count.length,
                    limit: limit
                }
            }
        }
    },
    methods: {
        ...mapActions(['fetchCoupons', 'deleteCoupon']),
        move(link) {
            this.$router.push({path: link})
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        deleteModal(coupon) {
            this.couponToDelete = coupon
            this.showModal = true
        },
        cancel() {
            this.showModal = false
        },
        deleteNow() {
            const payload = {
                id: this.getUser().id,
                couponId: this.couponToDelete.Id
            }
            this.deleteCoupon(payload)
        }
    },
    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.loading = true
            this.fetchCoupons(payload)
        }
    },
    watch: {
        getCoupons(val) {
            if(val) {
                this.loading = false
            }
        },
        getCouponDeleted(val) {
            if(val && val == 'success') {
                this.notification('Coupon Deleted Successfully.', 'success')
                this.showModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
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
}
.card-body {
    margin: 0;
    padding: 0;
    padding-bottom: 15px;
}

.card-body p {
    margin: 0;
}
.btn-success {
    padding: 2px 30px;
    margin-top: 10px;
    background: green !important
}
.inactif.btn-secondary {
    padding: 2px 30px;
    margin-top: 10px;
    background: #ddd !important;
    border: 1px solid #ddd !important;
}
.image {
    background: url('../assets/service.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100px;
    width: 100%;
    display: inline-block;
    margin-top: 10px;
}
.groups {
    padding: 15px;
}
.align-bottom {
    position: absolute;
    bottom: 0;
    right: 10px;
}
</style>