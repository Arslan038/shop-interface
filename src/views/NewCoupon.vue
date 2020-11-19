<template>
    <div class="new-coupon">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                <div class=" mt-1 px-3 pb-2">
                    <h4 class="text-orange pt-1"><strong>New coupon</strong></h4>
                    <p class="">Create a coupon helps you to sell services in advance in order to build up a reserve of future customers.</p>
                    <p class=""><strong>BUILD YOUR FUTURE REVENUES !!!</strong></p>
                </div>

                <div class="body-area mt-1 px-5">
                    <div class="row">
                        <div class="col-12 col-md-6 pt-2">
                            <div v-for="(image, index) in couponImages" :key="index">
           
                                <div class="image text-center text-uppercase ml-1" v-bind:style="{ 'background-image': 'url(' + image.url + ')' }">
                                    <div class="icon" @click="removeImage(image)">
                                        <i class="fa fa-times"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="image text-center" v-if="couponImages.length < 2" @click="pickFile"><strong>Pick Photos</strong></div>
                            <input type="file" style="display:none" accept="image/*" ref="filePick" multiple @change="onFileSelected">
                        </div>
                    </div>
                    <form @submit.prevent>
                    <div class="row">
                        <div class="col-md-12 col-12 col-lg-6">
                            <div class="form mt-3">
                                <span><strong>Name:</strong></span>
                                <input type="text" class="form-control" v-model="newCoupon.Title" required placeholder="Add a name">
                                
                                <div class="discount mt-2">
                                    <div class="row">
                                        <div class="col-12 offset-12 mt-2">
                                            <span><strong>Quantity:</strong></span>
                                            <select v-model="newCoupon.NbTotalCoupon" class="form-control">
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="150">150</option>
                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="1000">1000</option>
                                                <option value="2000">2000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <span><strong>Description:</strong></span>
                                    <textarea class="form-control" rows="8" placeholder="Description..." v-model="newCoupon.Description" required></textarea>
                                    
                                </div>
                                <h5 class="text-orange my-3">Validity Period</h5>
                                <div class="form">
                                    <div class="type d-flex mt-2">
                                        <label for=""><strong class="text-orange">Duration:</strong></label>
                                        <select v-model="duration" class="form-control">
                                            <option v-for="day in 90" :key="day" :value="day">{{day}} Days</option>
                                        </select>
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
                                    <div class="mt-3">
                                        <a-checkable-tag @change="checkTag($event, 1)" v-model="mon">Mon</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 2)" v-model="tue">Tue</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 3)" v-model="wed">Wed</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 4)" v-model="thu">Thu</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 5)" v-model="fri">Fri</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 6)" v-model="sat">Sat</a-checkable-tag>
                                        <a-checkable-tag @change="checkTag($event, 7)" v-model="sun">Sun</a-checkable-tag>
                                    </div>

                                    <div class="value d-flex justify-content-between center mt-3">
                                        <div>Selling Price per coupon:</div>
                                        <div>
                                            <strong>{{newCoupon.SellingPrice}}</strong>
                                            <strike class="ml-2">{{newCoupon.Value}}</strike>
                                        </div>
                                    </div>
                                    <div class="value d-flex justify-content-between center mt-3">
                                        <div>Discount:</div>
                                        <div><strong>{{newCoupon.DiscountRate}}</strong></div>
                                    </div>                                    
                                    <div class="cost mt-3 d-flex justify-content-between">
                                        <p><strong class="pr-3">Cost: </strong></p>
                                        <strong>{{newCoupon.Cost}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6 mt-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-9">
                                            <div class="d-flex">
                                                <h6 class="text-orange mt-1">List of related services <span v-if="serviceList">({{serviceList.length}})</span></h6>
                                                <a class="btn btn-primary btn-sm text-white ml-2" @click="calculateCost">Add Service(s)</a>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <p><strong>Qty</strong> <strong class="pl-3">%</strong></p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row align-items-center group-list pr-4 mt-1" v-for="(service, index) in serviceList" :key="index">
                                        <div class="col-1">
                                            <b-form-checkbox @change="selectService($event, service)"></b-form-checkbox>
                                        </div>
                                        <div class="col-2">
                                            <img :src="service.PhotoUrl" width="100%" alt="">
                                        </div>
                                        <div class="col-6">
                                            <p><strong class="text-orange">{{service.Name}}</strong></p>
                                            <p><strong>{{service.PriceUnit}}</strong></p>
                                        </div>
                                        <div class="col-1">
                                            <select class="" :id="service.Id+'s'" :disabled="findService(service)" v-model="service.quantity" required>
                                                <option value="0">0</option>
                                                <option v-for="i in 10" :key="i" :value="i">{{i}}</option>
                                            </select>
                                        </div>
                                        <div class="col-1 ml-2">
                                            <input type="number" :id="service.Id" min="0" max="100" value="50" required placeholder="20%" :disabled="findService(service)" v-model="service.discountRate">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 col-12 mt-3">
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
    name: "NewCoupon",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    data() {
        return {
            updatedCost: false,
            today: null,
            agree: 'no',
            isOpen: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: true,
            duration: 30,
            startDate: null,
            endDate: null,
            quantity: 1,
            discountRate: 50,
            limitReached: false,
            couponImages: [],
            newCoupon: {
                ShopId: null,
                ShopName: null,
                Title: null,
                Description: null,
                Value: 0,
                DiscountRate: 0,
                Status: null,
                SellingPrice: 0,
                NbTotalCoupon: 50,
                FromDate: null,
                ToDate: null,
                ValidDays: [1,2,3,4,5,6,7],
                Cost: 50,
                Products: [],
                Photos: null
            },
            serviceList: []
        }
    },
    computed: {
        ...mapGetters(['getServices', 'getCouponCreated', 'getCoupons']),
    },
    methods: {
        ...mapActions(['fetchListOfExistingServices', 'createCoupon', 'fetchCoupons']),
        pickFile() {
            this.$refs.filePick.click()
        },
        onFileSelected(e) {
            let file = e.target.files
            if(file) {
                if(file.length > 2) {
                    this.notification('You can only Pick 2 images', 'warning')
                    return
                }
                for (let index = 0; index < file.length; index++) {
                    let fileType = file[index].type.split('/')
                    const picked = {
                        File: file[index],
                        url: URL.createObjectURL(file[index]),
                        name: file[index].name,
                    }
                    this.couponImages.push(picked);
                }
            }
        },
        removeImage(image) {
            var index = this.couponImages.indexOf(image);
            if (index !== -1) {
                this.couponImages.splice(index, 1);
            }
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        findService(service) {
            let product = this.newCoupon.Products.find(p => p.ProductId == service.Id)
            if(product) {
                return false
            }
            return true
        },
        calculateCost() {
            this.newCoupon.Value = 0;
            this.newCoupon.SellingPrice = 0;
            let discount_rate = 0
            this.newCoupon.Cost = 0
            if(this.newCoupon.Products.length > 0) {
                this.newCoupon.Products.forEach(product => {
                    let service = this.serviceList.find(s => s.Id == product.ProductId)
                    if(service) {
                        this.newCoupon.Value += service.quantity * service.PriceUnit
                        this.newCoupon.SellingPrice += (service.PriceUnit * service.quantity) * (1 - service.discountRate/100)
                        //this.newCoupon.SellingPrice += service.PriceUnit * ((1 - service.discountRate/100) * service.quantity).toFixed(2)
                        //product.DiscountRate = service.discountRate/100
                        
                        product.Quantity = service.quantity
                        this.newCoupon.Cost += (10 * service.quantity)/50
                    } 
                })
                discount_rate = (this.newCoupon.SellingPrice / this.newCoupon.Value) * 100
                this.newCoupon.Cost = this.newCoupon.Cost.toFixed(2)
                this.newCoupon.DiscountRate = discount_rate.toFixed(2)
                this.updatedCost = true
            }
        },
        setDate(e) {
            let date = e.target.value
            if(!this.duration) {
                this.notification('Please Select Duration First', 'warning');
                this.newCoupon.FromDate = null
            }
            else {
                var start = new Date(date)
                var end = new Date(start.getFullYear(), start.getMonth(), start.getDate()+this.duration)
                
                this.endDate = moment(end).format('YYYY-MM-DD')
                this.startDate = moment(date).format('YYYY-MM-DD')

                this.newCoupon.FromDate = moment(start).format('YYYY-MM-DD hh:mm:ssZ')
                this.newCoupon.ToDate = moment(end).format('YYYY-MM-DD hh:mm:ssZ')
            }
        },
        checkTag(e, value) {
            if(e) {
                this.newCoupon.ValidDays.push(value)
            }
            else {
                this.newCoupon.ValidDays = this.newCoupon.ValidDays.filter(item => {
                    return item !== value
                })
            }
            console.log(this.newCoupon.ValidDays)
        },

        selectService(e, service) {
            if(e) {
                if(this.newCoupon.Products.length == 2) {
                    this.notification('You can select maximum 2 Services', 'warning')
                    return
                }
                else {
                    const obj = {
                        ProductId: service.Id,
                        Quantity: 1,
                        DiscountRate: 50
                    }
                    this.newCoupon.Products.push(obj)
                }
            }
            else {
                this.newCoupon.Products = this.newCoupon.Products.filter(item => {
                    return item.ProductId !== service.Id
                })
            }
            this.updatedCost = false
        },

        async addToCart() {
            this.newCoupon.Status = 1
            if(this.limitReached) {
                this.notification('Max Limit Reached. You cannot add more coupons in cart.', 'warning')
                return
            }
            
            if(this.validateData()) {
                if(this.couponImages) {
                    this.newCoupon.Photos = []
                    for(var i = 0; i < this.couponImages.length; i++) {
                        const data = {
                            id: this.getUser().id,
                            File: this.couponImages[i].File
                        }
                        let url = await this.uploadImage(data)
                        if(url) {
                            const obj = {
                                PhotoUrl: url
                            }
                            this.newCoupon.Photos.push(obj)
                        }
                    }
                }
                const payload = {
                    id: this.getUser().id,
                    data: this.newCoupon
                }
                console.log(payload.data)
                this.createCoupon(payload)
            }
        },
        async save() {
            this.newCoupon.Status = 3
            
            if(this.validateData()) {
                if(this.couponImages) {
                    this.newCoupon.Photos = []
                    for(var i = 0; i < this.couponImages.length; i++) {
                        const data = {
                            id: this.getUser().id,
                            File: this.couponImages[i].File
                        }
                        let url = await this.uploadImage(data)
                        if(url) {
                            const obj = {
                                PhotoUrl: url
                            }
                            this.newCoupon.Photos.push(obj)
                        }
                    }
                }

                const payload = {
                    id: this.getUser().id,
                    data: this.newCoupon
                }
                console.log(payload.data)
                this.createCoupon(payload)
            }
            
        },

        validateData() {
            if(this.newCoupon.Title == '' || !this.newCoupon.Title) {
                this.notification('Please Enter Coupon Title.', 'warning')
                return false
            }
            if(this.newCoupon.Description == '' || !this.newCoupon.Description) {
                this.notification('Please Enter Coupon Description.', 'warning')
                return false
            }
            if(!this.startDate) {
                this.notification('Please Select Date.', 'warning')
                return false
            }
            if(this.newCoupon.Products.length < 1) {
                this.notification('Please select atleast 1 service', 'error')
                return false
            }
            if(this.newCoupon.ValidDays.length < 1) {
                this.notification('Please select atleast 1 Day', 'error')
                return false
            }
            if(this.couponImages.length > 2) {
                this.notification('You can only Pick 2 images', 'warning')
                return false
            }
            if(!this.updatedCost) {
                this.notification('Please Click on Add Services to proceed.', 'warning')
                return false
            }
            return true
        },

        countCoupons() {
            if(this.getCoupons) {
                const limit = this.getUserData().Contract.NbCoupons
                const count = this.getCoupons.filter(d => d.Status != 3)
                if(count.length >= limit) {
                    this.limitReached = true
                }
            }
        }
    },

    async created() {
        if(!this.getCoupons || !this.getCoupons.length) {
            const payload = {
                id: this.getUser().id
            }
            await this.fetchCoupons(payload)
        }
        else {
            await this.countCoupons()
        }
        this.today = new Date().toISOString().slice(0,10);
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.fetchListOfExistingServices(payload)
            this.newCoupon.ShopId = this.getUser().shop
            this.newCoupon.ShopName = this.getUserData().Shop.Name
        }
    },

    watch: {
        getCoupons(val) {
            if(val && typeof val == 'object') {
                this.countCoupons()
                //this.updateCost()
            }
        },
        getCouponCreated(val) {
            if(val && val == 'success') {
                this.notification('Coupon Created Successfully.', 'success')
                this.$router.push({path: '/my-coupons'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'failed')
            }
        },
        getServices(val) {
            if(val) {
                let activeServices  = []
                val.forEach(item => {
                    if(item.Status == 2) {
                        activeServices.push(item)
                    }
                })

                this.serviceList = activeServices
                this.serviceList.forEach(item => {
                    item.quantity = 0
                    item.discountRate = 50
                })
                console.log(this.serviceList)
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
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid black;  
}
.group-list p {
    margin: 0;
}
.group-list input {
    border: 1px solid #000 !important;
    box-shadow: none !important;
    padding-left: 5px;
    height: 20px;
    width:50px;
}
.icon {
    background: #000;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
hr {
    border: .5px solid #E96928 !important;;
}
</style>