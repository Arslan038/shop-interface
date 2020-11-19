<template>
    <div>
        <b-navbar toggleable="lg" id="navbar" type="light">
            <div class="">
                <div id="control">
                    <i class="fa fa-bars fa-2x" @click="clickSidebar" v-b-toggle.sidebar-1></i> <b-avatar :src="getShopPhoto" size="100"></b-avatar>
                </div>
                    
                    <div class="sidebar">
                        
                        <b-sidebar id="sidebar-1" title="Sidebar" visible>
                            <div class="logo-area pink mx-3">
                            <i class="fa fa-bars fa-2x" @click="clickSidebar" v-b-toggle.sidebar-1></i> <b-avatar class="ml-3 mt-1" :src="getShopPhoto" size="80"></b-avatar>
                        </div>
                        
                            <div class="mt-1 options pink text-center pb-3">
                                <p class="text-dark pt-3"><strong class="text-uppercase">{{this.getUserData().Shop.Name}}</strong></p>
                                <a-radio-group defaultValue="a" buttonStyle="solid" v-model="status" @change="update">
                                    <a-radio-button :value="false">Open</a-radio-button>
                                    <a-radio-button :value="true">Close</a-radio-button>
                                </a-radio-group>
                        
                            </div>
                            <div class="menu py-3 pink mt-1 px-3">
                                <button class="btn btn-secondary btn-block text-left" @click="move('/new-discount')"><img src="../assets/discount.png" width="12%" alt=""> <span class="pl-4">New Discount</span></button>
                                <button class="btn btn-secondary btn-block text-left" @click="move('/new-coupon')"><img src="../assets/coupon.png" width="12%" alt=""> <span class="pl-4">New Coupon</span></button>
                                <button class="btn btn-secondary btn-block text-left" @click="move('/new-notification')"><img src="../assets/notification.png" width="12%" alt=""> <span class="pl-4">New Notification</span></button>
                                <button class="btn btn-secondary btn-block text-left" @click="move('/customer-search')"><img src="../assets/customer-search.png" width="12%" alt=""> <span class="pl-4">Customer Search</span></button>
                            </div>

                            <hr>
                            <p v-if="checkPath"></p>
                            <div class="menu py-3 pink mt-1 px-3">
                                <p class="text-uppercase" @click="home = !home">Home ></p>
                                    <b-collapse id="collapse-2" v-model="home">
                                        <div class="inner-links">
                                            <p @click="move('/current-actions')">Current actions</p>
                                            <!-- <p>Shop summary</p>
                                            <p>Customers summary</p>
                                            <p>Products summary</p>
                                            <p>Team summary</p> -->
                                        </div>
                                    </b-collapse>
                                <p class="text-uppercase" @click="marketing = !marketing">marketing ></p>
                                    <b-collapse id="collapse-3" v-model="marketing">
                                        <div class="inner-links">
                                            <p @click="move('/my-discounts')">My Discounts</p>
                                            <p @click="move('/my-coupons')">My Coupons</p>
                                            <p @click="move('/my-notifications')">My Notifications</p>
                                            <p @click="move('/customer-group')">My Customer Groups</p>
                                        </div>
                                    </b-collapse>
                                <p class="text-uppercase" @click="services = !services">my services ></p>
                                    <b-collapse id="collapse-4" v-model="services">
                                        <div class="inner-links">
                                            <p @click="move('/online-services')">Online Services</p>
                                            <p @click="move('/bookings')">Booking Services</p>
                                        </div>
                                    </b-collapse>
                                <p class="text-uppercase" @click="bills = !bills">bills and payments ></p>
                                    <b-collapse id="collapse-5" v-model="bills">
                                        <div class="inner-links">
                                            <p @click="move('/history')">My History</p>
                                            <p @click="move('/membership')">My Membership</p>
                                        </div>
                                    </b-collapse>
                                <p class="text-uppercase" @click="move('/team')">my team</p>
                            </div>

                            <hr>
                            <div class="special-offers menu py-3 pink mt-1 text-right pr-3">
                                <p @click="move('/special-offers')">Special Offers</p>
                                <p @click="move('/contact')">Contact</p>
                            </div>
                        </b-sidebar>
                    </div>
                </div>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-item>
                    <div class="user-icon"></div>
                </b-nav-item> -->
                <!-- <b-nav-item>
                    <div class="cart-icon"></div>
                </b-nav-item> -->
                <b-nav-item class="nav-link"><i class="fa fa-shopping-cart cart-icon fa-3x icons" @click="move('/cart')"></i> <b-badge class="cart-items" variant="warning" pill>{{cartItems.length}}</b-badge></b-nav-item>
                <b-nav-item><i class="fa fa-home fa-3x icons" @click="move('/company-account-creation')"></i></b-nav-item>
                <b-nav-item><i class="fa fa-user-circle fa-3x icons" @click="move('/manager-account')"></i></b-nav-item>
                <b-nav-item><i class="fa fa-sign-out fa-3x icons" @click="logout"></i></b-nav-item>
                <!-- <b-nav-item><img src="../assets/user.png" @click="move('/company-account-creation')" class="mt-2" alt=""></b-nav-item>
                <b-nav-item><img src="../assets/logout.png" @click="move('/')" class="mt-2" alt=""></b-nav-item> -->
                <!-- <b-nav-item><img src="../assets/company_account.png" @click="move('/company-account-creation')" alt=""></b-nav-item>
                <b-nav-item><img src="../assets/user.png" @click="move('/company-account-creation')" class="mt-2" alt=""></b-nav-item>
                <b-nav-item><img src="../assets/logout.png" @click="move('/')" class="mt-2" alt=""></b-nav-item> -->
                
                
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
            
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: "Navbar",
    mixins: [mixin],
    computed: {
        ...mapGetters(['getShopStatus', 'getCompanyProfile', 'getCart']),
        getShopPhoto() {
            if(this.getUserData()) {
                return this.getUserData().Shop.PhotoUrl
            }
            return
        },
        checkPath() {
            const path = this.$route.path
            if(path.startsWith('/current-actions')) {
                this.home = true
            }
            if(path.startsWith('/my-discounts') || path.startsWith('/my-discount')) {
                this.marketing = true
            }
            if(path.startsWith('/my-discounts') || path.startsWith('/my-discount')) {
                this.marketing = true
            }
            if(path.startsWith('/my-coupons') || path.startsWith('/my-coupon')) {
                this.marketing = true
            }
            if(path.startsWith('/my-notifications') || path.startsWith('/my-notification')) {
                this.marketing = true
            }
            if(path.startsWith('/customer-group')) {
                this.marketing = true
            }
            if(path.startsWith('/online-services')) {
                this.services = true
            }
            if(path.startsWith('/bookings')) {
                this.services = true
            }
            if(path.startsWith('/history')) {
                this.bills = true
            }
            if(path.startsWith('/membership')) {
                this.bills = true
            }
            return
        }
    },
    data() {
        return {
            openSidebar: true,
            home: false,
            marketing: false,
            services: false,
            bills: false,
            status: false,
            cartItems: []
        }
    },
    methods: {
        ...mapActions(['updateShopStatus', 'fetchCompanyProfile', 'fetchCart']),
        update() {
            const payload = {
                id: this.getUser().id,
                shop: this.getUser().shop
            }
            this.updateShopStatus(payload)
        },
        move(link) {
            this.$router.push({path: link})
        },
        clickSidebar() {
            this.openSidebar = !this.openSidebar
            this.$emit('clicked', this.openSidebar)  
        },
        logout() {
            localStorage.removeItem('manicardsShop');
            localStorage.removeItem('manicardsShopData');
            this.$router.push({path: '/'})
        }
    },
    created() {
        if(this.getCompanyProfile) {
            this.status = this.getCompanyProfile.Closed
        }
        else {
            const payload = {
                id: this.getUser().id,
                company: this.getUser().shop
            }
            this.fetchCompanyProfile(payload)
        }

        if(this.getUser() && this.getCart) {
            const cart = this.getCart
            let coupons = cart.Coupons
            let discounts = cart.Discounts
            let notifications = cart.Notifications


            this.cartItems = coupons.concat(discounts, notifications)
        }
        else {
            const payload = {
                id: this.getUser().id
            }
            this.fetchCart(payload)
        }
    },
    watch: {
        getCart(val) {
            if(val) {
                const cart = this.getCart
                let coupons = cart.Coupons
                let discounts = cart.Discounts
                let notifications = cart.Notifications

                this.cartItems = coupons.concat(discounts, notifications)
            }
        },
        getCompanyProfile(val) {
            if(val) {
                this.status = val.Closed
            }
        },
        getShopStatus(val) {
            if(val && val == 'success') {
                this.notification('Shop Status Updated Successfully', 'success')
                let route = this.$route.path
                window.location.href = route
                //this.status = !this.status
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')

            }
            
        }
    }
}
</script>
<style scoped>
#navbar {
    border-radius: 4px;   
}
.nav-link {
    position: relative;
    margin-top: -5px;
}
.nav-link .cart-items {
    position: absolute;
    left: 25px;
    top: 15px;
}
.logo-area {
    padding: 0 !important;
}
.icons:hover {
    color: #E96928;
}
/* .cart-icon {
    background: url('../assets/cart.png');
    height: 80px;
    width: 80px;
    background-size: cover;
    background-position: center; 
} */
.text-dark {
  color: #ac4816 !important;
}
.menu p {
    margin: 0;
    font-weight: bold;
}
.menu p:hover {
    cursor: pointer;
    color: black;
}
.special-offers p {
    margin: 0;
    font-weight: bold;
}
.inner-links {
    padding-left: 25px !important;
}
hr {
    border: 1px solid #fff
}
@media screen and (max-width: 600px) {
    #control {
        max-width: 300px !important;
    }
}
</style>

