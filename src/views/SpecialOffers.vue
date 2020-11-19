<template>
    <div class="my-team">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">

                <div class="body-area mt-1 pb-5">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h5 class="text-orange"><strong>Special Offers</strong></h5>
                            <p>Take advantage of our special offers.</p>
                        </div>
                    </div>
                    <div class="row mx-5">
                        <div class="col-md-3 col-12 mt-3 offer" v-for="(offer, index) in offers" :key="index">
                            <div class="card">
                                <div class="card-body">
                                    <h6><strong class="text-orange">{{offer.Description}}</strong></h6>
                                    <div class="row mt-3">
                                        <div class="col-4">
                                            <h5>$ CAD</h5>
                                        </div>
                                        <div class="col-8 text-right">
                                            <h5>{{offer.Price}}</h5>
                                            <p><strike>{{offer.Amount}}</strike></p>
                                        </div>
                                        <div class="col-8">
                                            <h5>Discount</h5>
                                        </div>
                                        <div class="col-4 text-right">
                                            <h5>{{offer.DiscountRate*100}} %</h5>
                                        </div>
                                        <div class="col-12 mt-3">
                                            <button class="btn btn-secondary btn-block" @click="send(offer)">Add to Cart</button>
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
export default {
    name: "SpecialOffers",
    mixins: [globalMixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getSpecialOffers', 'getOfferAddedToCart']),
        offers() {
            return this.getSpecialOffers
        },
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            isOpen: true,
            openTeamModal: false,
            cart: {
                id: null,
                UserId: null,
                CreditId: null,
                Cost: null,
                Description: null
            }
        }
    },
    methods: {
        ...mapActions(['fetchSpecialOffers', 'addOfferToCart']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        send(offer) {
            if(this.getUserData()) {
                this.cart.UserId = this.getUserData().User.Id
                this.cart.CreditId = offer.Id
                this.cart.Cost = offer.Price
                this.cart.Description = this.getUserData().Shop.Name
                this.cart.id = this.getUser().id
            }
            this.addOfferToCart(this.cart)
            //this.fetchSpecialOffers()
        },
        
    },
    created() {
        this.fetchSpecialOffers();
    },

    watch: {
        getOfferAddedToCart(val) {
            if(val && val == 'success') {
                this.notification('Offer Added To Cart Successfully', 'success')
            }
            if(val && val != 'success') {
                this.notification('Sometihng went wrong!', 'error')
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
.image {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    display: inline-block;
    margin-top: 10px;
}
</style>