<template>
    <div class="sidebar">
        <div class="logo-area pink text-center">
            <i class="fa fa-bars fa-2x" v-b-toggle.sidebar-1></i>
        </div>
        <b-sidebar id="sidebar-1" title="Sidebar">
            <div class="options pink text-center pb-3">
                <p class="text-dark pt-3"><strong class="text-uppercase">GARAGE L’EXPERT</strong></p>
                <a-radio-group defaultValue="a" buttonStyle="solid">
                    <a-radio-button value="a">Open</a-radio-button>
                    <a-radio-button value="b">Close</a-radio-button>
                </a-radio-group>
        
            </div>
            <div class="menu py-3 pink mt-1 px-3">
                <button class="btn btn-secondary btn-block text-left" @click="move('/new-discount')"><img src="../assets/discount.png" width="12%" alt=""> <span class="pl-5">New Discount</span></button>
                <button class="btn btn-secondary btn-block text-left" @click="move('/new-coupon')"><img src="../assets/coupon.png" width="12%" alt=""> <span class="pl-5">New Coupon</span></button>
                <button class="btn btn-secondary btn-block text-left" @click="move('/new-notification')"><img src="../assets/notification.png" width="12%" alt=""> <span class="pl-5">New Notification</span></button>
                <button class="btn btn-secondary btn-block text-left" @click="move('/customer-group')"><img src="../assets/customer-search.png" width="12%" alt=""> <span class="pl-5">Customer Search</span></button>
            </div>

            <div class="menu py-3 pink mt-1 px-3">
                <p class="text-uppercase">Home ></p>
                <p class="text-uppercase">marketing ></p>
                <p class="text-uppercase">my services</p>
                <p class="text-uppercase">bills and payments</p>
                <p class="text-uppercase">my team</p>
            </div>
            <div class="special-offers py-3 pink mt-1 text-right pr-3">
                <p>Special Offers</p>
                <p>Contact</p>
            </div>
        </b-sidebar>
    </div>
</template>
<script>
import globalMixin from '../mixins/global'
export default {
    name: "Sidebar",
    mixins: [globalMixin],
    methods: {
        move(link) {
            this.$router.push({path: link})
        }
    }
}
</script>
<style scoped>
.logo-area {
    border: 1px solid #E96928;
}
.text-dark {
  color: #ac4816 !important;
}
.menu p {
    margin: 0;
    font-weight: bold;
}
.special-offers p {
    margin: 0;
    font-weight: bold;
}
</style>