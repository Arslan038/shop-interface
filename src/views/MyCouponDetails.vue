<template>
    <div class="new-coupon">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-3 px-5" v-if="newCoupon">
                    <div class="row">
                        <div class="col-12">
                            <h5><strong>Coupon: </strong><span class="text-orange">{{newCoupon.Title}}</span></h5>
                            <hr>
                        </div>
                        <div class="col-12 col-md-6 pt-2">
                            <div v-for="(image, index) in couponImages" :key="index">
           
                                <div class="image text-center text-uppercase ml-1" v-bind:style="{ 'background-image': 'url(' + showImage(image) + ')' }">
                                    <div class="icon" @click="removeImage(image)" v-if="!isDisabled">
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
                                <input type="text" class="form-control" :disabled="isDisabled" v-model="newCoupon.Title" required placeholder="Add a name">
                                
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
                                    <textarea class="form-control" rows="8" :disabled="isDisabled" placeholder="Description..." v-model="newCoupon.Description" required></textarea>
                                    
                                </div>
                                <h5 class="text-orange">Validity Period</h5>
                                <div class="form mt-3">
                                    <div class="type d-flex mt-2">
                                        <label for=""><strong class="text-orange">Duration:</strong></label>
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
                                        <div class="col-8">
                                            <div class="d-flex">
                                                <h6 class="text-orange mt-1">List of related services <span v-if="serviceList">({{serviceList.length}})</span></h6>
                                                <a class="btn btn-primary btn-sm text-white ml-2" @click="calculateCost">Add Service(s)</a>
                                            </div>
                                        </div>
                                        <div class="col-2 text-right">
                                            <h6 class="text-orange">Qty</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6 class="text-orange">%</h6>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row align-items-center group-list pr-4 mt-1" v-for="(service, index) in serviceList" :key="index">
                                        <div class="col-1">
                                            <b-form-checkbox :disabled="isDisabled" :checked="!findService(service)" @change="selectService($event, service)"></b-form-checkbox>
                                        </div>
                                        <div class="col-2">
                                            <img :src="service.PhotoUrl" width="100%" alt="">
                                        </div>
                                        <div class="col-6">
                                            <p><strong class="text-orange">{{service.Name}}</strong></p>
                                            <p><strong>{{service.PriceUnit}}</strong></p>
                                        </div>
                                        <div class="col-1">
                                            <select class="" :id="service.Id+'s'" :disabled="findService(service) || isDisabled" v-model="service.quantity" required>
                                                <option value="0">0</option>
                                                <option v-for="i in 10" :key="i" :value="i">{{i}}</option>
                                            </select>
                                        </div>
                                        <div class="col-1 ml-2">
                                            <input type="text" :id="service.Id" value="50" required placeholder="20%" :disabled="findService(service) || isDisabled" v-model="service.discountRate">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" v-if="!this.isDisabled">
                        <div class="col-md-6 col-12 mt-3">
                            <div class="row">
                                <div class="col-12 col-md-6 mt-3">
                                    <button class="btn btn-secondary btn-block" :disabled="isPressed" @click="addToCart">
                                        {{cartText}}
                                    </button>
                                </div>
                                <div class="col-12 col-md-6 mt-3">
                                    <button class="btn btn-secondary btn-block" :disabled="isPressed" @click="save">
                                        {{saveText}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="this.isDisabled">
                        <div class="col-md-6 col-12 mt-3">
                            <div class="row">
                                <div class="col-12 col-md-6 mt-3">
                                    <button class="btn btn-secondary btn-block" @click="copy">
                                        Copy Coupon
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
            today: null,
            isPressed: false,
            saveText: 'Save',
            cartText: 'Add To Cart',
            agree: 'no',
            isDisabled: false,
            isOpen: true,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
            duration: 30,
            startDate: null,
            endDate: null,
            quantity: 1,
            discountRate: 50,
            couponImages: [],
            limitReached: false,
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
                ValidDays: [],
                Cost: 50,
                Products: [],
                Photos: null
            },
            serviceList: []
        }
    },
    computed: {
        ...mapGetters(['getServices', 'getCouponDetails', 'getCouponUpdated', 'getCouponCreated', 'getCoupons']),
    },
    methods: {
        ...mapActions(['fetchListOfExistingServices', 'updateCoupon', 'couponDetails', 'createCoupon', 'fetchCoupons']),
        showImage(image) {
            if(image.PhotoUrl) {
                return image.PhotoUrl
            }
            if(image.url) {
                return image.url
            }
        },
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
            if(this.newCoupon.Status == 2) {
                this.notification("Days will not be modified at this stage.", 'warning')
                return
            }
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
                    this.notification('You select maximum 2 Services', 'warning')
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
                // console.log("Values")
                // console.log(document.getElementById(service.Id).value)
                // console.log(document.getElementById(service.Id+'s').value)
                
            }
            else {
                this.newCoupon.Products = this.newCoupon.Products.filter(item => {
                    return item.ProductId !== service.Id
                })
            }
        },

        async addToCart() {
            this.newCoupon.Status = 1
            if(this.limitReached) {
                this.notification('Max Limit Reached. You cannot add more coupons in cart.', 'warning')
                return
            }
            if(this.validateData()) {
                if(this.couponImages) {
                    let old = []
                    this.couponImages.filter(img => {
                        if(img.PhotoUrl) {
                            old.push(img)
                        }
                    })
                    let newImgs = []
                    this.couponImages.filter(img => {
                        if(img.url) {
                            newImgs.push(img)
                        }
                    })
                    let uploaded = []
                    for(var i = 0; i < newImgs.length; i++) {
                        const data = {
                            id: this.getUser().id,
                            File: newImgs[i].File
                        }
                        let url = await this.uploadImage(data)
                        if(url) {
                            const obj = {
                                PhotoUrl: url
                            }
                            uploaded.push(obj)
                        }
                    }

                    this.newCoupon.Photos = old.concat(uploaded)
                }
                //console.log(this.newCoupon)
                const payload = {
                    id: this.getUser().id,
                    couponId: this.$route.params.id,
                    data: this.newCoupon
                }
                this.cartText = 'Please wait...'
                this.isPressed = true
                this.updateCoupon(payload)
            }
            
        },
        async save() {
            this.newCoupon.Status = 3
            if(this.validateData()) {
                if(this.couponImages) {
                    let old = []
                    this.couponImages.filter(img => {
                        if(img.PhotoUrl) {
                            old.push(img)
                        }
                    })
                    let newImgs = []
                    this.couponImages.filter(img => {
                        if(img.url) {
                            newImgs.push(img)
                        }
                    })
                    let uploaded = []
                    
                    for(var i = 0; i < newImgs.length; i++) {
                        const data = {
                            id: this.getUser().id,
                            File: newImgs[i].File
                        }
                        let url = await this.uploadImage(data)
                        if(url) {
                            const obj = {
                                PhotoUrl: url
                            }
                            uploaded.push(obj)
                        }
                    }

                    this.newCoupon.Photos = old.concat(uploaded)
                }

                //console.log(this.newCoupon)
                const payload = {
                    id: this.getUser().id,
                    couponId: this.$route.params.id,
                    data: this.newCoupon
                }
                this.saveText = 'Please wait...'
                this.isPressed = true
                this.updateCoupon(payload)
            }
            
        },

        copy() {
            this.newCoupon.Status = 3
            const payload = {
                id: this.getUser().id,
                data: this.newCoupon
            }
            this.createCoupon(payload)
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
                id: this.getUser().id,
                couponId: this.$route.params.id
            }
            this.fetchListOfExistingServices(payload)
            this.couponDetails(payload)
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
        serviceList(val) {
            if(val) {
                console.log(val)
                if(this.newCoupon.Products.length > 0) {
                    this.newCoupon.Products.forEach(product => {
                        if(this.serviceList.length > 0) {
                            let service = this.serviceList.find(s => s.Id == product.ProductId)
                            if(service) {
                                service.quantity = product.Quantity
                                //service.discountRate = product.DiscountRate*100
                            }
                        }
                    })
                }
            }
            
        },
        getCouponUpdated(val) {
            if(val && val == 'success') {
                this.notification('Coupon Updated Successfully.', 'success')
                this.$router.push({path: '/my-coupons'})
                this.cartText = 'Add To Cart'
                this.saveText = "Save"
                this.isPressed = false
            }
            if(val && val != 'success') {
                this.cartText = 'Add To Cart'
                this.saveText = "Save"
                this.isPressed = false
                this.notification('Something went wrong!', 'failed')
            }
        },
        getCouponCreated(val) {
            if(val && val == 'success') {
                this.isDisabled = false
                this.notification('Coupon Copied Successfully.', 'success')
                this.$router.push({path: '/my-coupons'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'failed')
            }
        },
        getServices(val) {
            if(val) {
                this.serviceList = val
                this.serviceList.forEach(item => {
                    item.quantity = 0
                    item.discountRate = 50
                })
                this.setServiceDetails
            }
        },
        getCouponDetails(val) {
            if(val) {
                this.newCoupon = val
                this.newCoupon.Cost = 50
                if(this.newCoupon.Status == 2) {
                    this.isDisabled = true
                    this.agree = 'yes'
                }
                if(this.newCoupon.Photos.length) {
                    this.couponImages = this.newCoupon.Photos
                }
                this.startDate = moment(val.FromDate).format('YYYY-MM-DD')
                this.endDate = moment(val.ToDate).format('YYYY-MM-DD')

                var a = moment(val.FromDate)
                var b = moment(val.ToDate)
                var diff = moment.duration(b.diff(a)).asDays()
                this.duration = diff.toFixed(0)

                if(this.newCoupon.ValidDays.length) {
                    this.newCoupon.ValidDays.forEach(item => {
                        if(item == 1) {
                            this.mon = true
                        }
                        if(item == 2) {
                            this.tue = true
                        }
                        if(item == 3) {
                            this.tue = true
                        }
                        if(item == 4) {
                            this.wed = true
                        }
                        if(item == 5) {
                            this.thu = true
                        }
                        if(item == 5) {
                            this.fri = true
                        }
                        if(item == 6) {
                            this.sat = true
                        }
                        if(item == 7) {
                            this.sun = true
                        }
                    })
                }
                console.log(this.newCoupon.Products)
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