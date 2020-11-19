<template>
    <div class="coupon-validity">
        <div class="row no-gutters">
            <div class="col-md-2">
                <Sidebar />
            </div>
            <div class="col-md-10">
                <Navbar />

                <div class="title-area mt-1 px-3 pb-2">
                    <h4 class="text-orange pt-1"><strong>New coupon</strong></h4>
                    <p class="">Create a coupon helps you to sell services in advance in order to build up a reserve of future customers.</p>
                    <p class=""><strong>BUILD YOUR FUTURE REVENUES !!!</strong></p>
                </div>

                <div class="body-area mt-1 px-5">
                    
                    <div class="row">
                        <div class="col-md-6 col-12 mt-3">
                            <h5 class="text-orange">Validity Period</h5>
                            <div class="form mt-3">
                                <form @submit.prevent>
                                    <div class="type d-flex mt-2">
                                        <label for=""><strong class="text-orange">Duration:</strong></label>
                                        <b-form-group class="ml-3"> 
                                        <b-form-radio-group id="radio-group-2">
                                            <b-form-radio value="first">1 mois</b-form-radio>
                                            <b-form-radio value="second">2 semaines</b-form-radio>
                                            <b-form-radio value="third">1 Semaine</b-form-radio>
                                        </b-form-radio-group>
                                        </b-form-group>
                                    </div>
                                        <div class="row">
                                            <div class="col-6 mt-2">
                                                <span><strong class="text-orange">Begining:</strong></span>
                                                <select class="form-control">
                                                    <option value="01 Jul 2020">01 Jul 2020</option>
                                                    <option value="02 Jul 2020" selected>02 Jul 2020</option>
                                                </select>
                                            </div>
                                            <div class="col-6 mt-2">
                                                <span><strong class="text-orange">End:</strong></span>
                                                <select class="form-control">
                                                    <option value="01 Jul 2020">01 Jul 2020</option>
                                                    <option value="02 Jul 2020" selected>02 Jul 2020</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <a-checkable-tag v-model="mon">Mon</a-checkable-tag>
                                            <a-checkable-tag v-model="tue">Tue</a-checkable-tag>
                                            <a-checkable-tag v-model="wed">Wed</a-checkable-tag>
                                            <a-checkable-tag v-model="thu">Thu</a-checkable-tag>
                                            <a-checkable-tag v-model="fri">Fri</a-checkable-tag>
                                            <a-checkable-tag v-model="sat">Sat</a-checkable-tag>
                                            <a-checkable-tag v-model="sun">Sun</a-checkable-tag>
                                        </div>

                                        <div class="value d-flex justify-content-between center mt-3">
                                            <div>Total value per coupon:</div>
                                            <div><strong>200,00$</strong></div>
                                        </div>
                                        <div class="value d-flex justify-content-between center mt-3">
                                            <div>Price:</div>
                                            <div><strong>155,00$</strong></div>
                                        </div>
                                        <div class="value d-flex justify-content-between center mt-3">
                                            <div>Discount rate:</div>
                                            <div><strong>23%</strong></div>
                                        </div>
                                        <button class="btn btn-primary mt-5">Update</button>
                                        
                                        <div class="cost mt-3">
                                            <p><strong class="pr-3">Cost: </strong> 24.95$</p>
                                            <b-form-checkbox> I accept the conditions of use</b-form-checkbox>
                                        </div>

                                        <div class="row">
                                            <div class="col-12 col-md-6 mt-3">
                                                <button class="btn btn-secondary btn-block">
                                                    Add to cart
                                                </button>
                                            </div>
                                            <div class="col-12 col-md-6 mt-3">
                                                <button class="btn btn-secondary  btn-block">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                </form>
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
export default {
    name: "CouponValidity",
    components: {
        Navbar,
        Sidebar,
        Footer
    },

    data() {
        return {
            mon: false,
            tue: true,
            wed: true,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        }
    }
}
</script>

<style scoped>
.title-area {
    border: 1px solid #E96928;
    
}
.title-area  p {
    margin: 0;
}
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