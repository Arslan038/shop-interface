<template>
    <div class="notification-validity">
        <div class="row no-gutters">
            <div class="col-md-10 offset-md-2">
              

                <div class="title-area mt-1 px-3 pb-2">
                    <h4 class="text-orange"><strong>New notification</strong></h4>
                    <p class="">Send notifications to your customers to inform them about an opportunity or just to incite them to come in your shop. You can send a notification to all your cutomers or to one or many groups of clients  among the ones chosen before. </p>
                    <p class=""><strong>BRING THE CUSTOMER TO YOUR SHOP !!!</strong></p>
                </div>

                <div class="body-area mt-1 px-5">
                    
                    <div class="row">
                        <div class="col-md-6 col-12 mt-3">
                            <h5 class="text-orange">Validity Period</h5>
                            <div class="form mt-3">
                                <form @submit.prevent>
                                    
                                        <div class="row">
                                            <div class="col-6 mt-2">
                                                <span><strong class="text-orange">Start:</strong></span>
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

                                        <button class="btn btn-primary mt-5">Update</button>
                                            
                                        <div class="cost mt-3">
                                            <p><strong class="pr-3">Cost: </strong> 9.90$</p>
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
                        <div class="col-12 col-md-6 mt-3">
                            
                            <div class="row align-items-center group-list">
                                <div class="col-1">
                                    <b-form-checkbox></b-form-checkbox>
                                </div>
                                <div class="col-2">
                                    <img src="../assets/customer-search.png" width="100%" alt="">
                                </div>
                                <div class="col-9">
                                    <p>Association des Camerounais de Montréal</p>
                                </div>
                            </div>
                            <div class="row align-items-center group-list">
                                <div class="col-1">
                                    <b-form-checkbox></b-form-checkbox>
                                </div>
                                <div class="col-2">
                                    <img src="../assets/customer-search.png" width="100%" alt="">
                                </div>
                                <div class="col-9">
                                    <p>Étudiants de Commerce HEC (325)</p>
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
export default {
    name: "NotificationValidity",
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