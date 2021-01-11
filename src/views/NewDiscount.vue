<template>
    <div class="new-discount">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class=" mt-1 pb-2 mx-2 mx-md-5">
                    <h4 class="text-orange pt-1"><strong>New discount</strong></h4>
                    <p class="">Create a maximum of discounts to permanently attract your customers. Define your own discount policy in description.</p>
                    <p class=""><strong>KEEP YOUR BEST CUSTOMERS ALWAYS CLOSE TO YOU !!!</strong></p>
                </div>
                <div class="body-area mt-1 mx-2 mx-md-5">
                    <form @submit.prevent>
                        <div class="row">
                            <div class="col-12 col-md-6 pt-2">
                                <div class="row">
                                    <div class="col-md-3 col-6">
                                        <div class="image text-center text-uppercase" v-bind:style="{ 'background-image': 'url(' + newDiscount.PhotoUrl + ')' }" @click="pickFile"><strong v-if="!newDiscount.PhotoUrl">Pick Image</strong></div>
                                        <input type="file" style="display:none" accept="image/*" ref="filePick" @change="onFileSelected">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form mt-3">
                                        <input type="text" class="form-control" placeholder="Add a name" v-model="newDiscount.Title">
                                        <div class="type d-flex mt-2">
                                            <label for=""><strong>Type:</strong></label>
                                            <select class="select form-control ml-2" v-model="newDiscount.DiscountTargetType" @change="getDiscount" required>
                                                <option v-for="(discount, index) in discountTypes" :key="index" :value="discount.Value">{{discount.Shortname.Strings.English}}</option>
                                            </select>
                                        </div>
                                        <div class="discount mt-2">
                                            <div class="row">
                                                <div class="col-6 mt-2">
                                                    <span><strong>Discount Rate:</strong></span>
                                                    <b-input-group append="%">
                                                        <b-form-input type="number" step="0.01" v-model="newDiscount.DiscountRate" required></b-form-input>
                                                    </b-input-group>
                                                </div>
                                                <div class="col-6 mt-2" v-if="newDiscount.DiscountTargetType != 1">
                                                    <span><strong>Quantity:</strong></span>
                                                    <select class="form-control" @change="getQuantity" v-model="quantity" required>
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

                                            <textarea class="form-control mt-2" v-model="newDiscount.Description" rows="8" placeholder="Description..."></textarea>
                                            
                                    </div>

                                    <div class="form mt-3">
                                        <h5 class="text-orange">Validity Period</h5>
                                        <label for=""><strong class="text-orange pr-2 mt-2">Duration:</strong></label>
                                        <div v-if="newDiscount.DiscountTargetType != 1">
                                            <select v-model="duration" class="form-control">
                                                <option v-for="day in 90" :key="day" :value="day">{{day}} Days</option>
                                            </select>
                                        </div>
                                        <div v-else>
                                            <strong>{{duration}} Days</strong>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 mt-2">
                                                <span><strong class="text-orange">Begining:</strong></span>
                                                <input type="date" :min="today" class="form-control" @change="setDate" v-model="startDate" required>
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
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="col-12 col-md-6 mt-3" v-if="newDiscount.DiscountTargetType == 1">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <h6 class="text-orange">List of groups</h6>
                                            <a class="btn btn-primary btn-sm" @click="updateCost">Confirm Group(s)</a>
                                        </div>
                                        
                                        <hr>
                                        <div class="row align-items-center group-list mt-3" v-for="(group, index) in groupList" :key="index">
                                            <div class="col-1">
                                                <b-form-checkbox @change="selectGroup($event, group.Id)"></b-form-checkbox>
                                            </div>
                                            <div class="col-2">
                                                <img :src="getGroupIcon(group.Id)" width="100%" alt="">
                                            </div>
                                            <div class="col-9">
                                                <p>{{group.UserGroupName}}</p>
                                                <p class="text-orange">{{group.ShopName}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 mt-3">
                                <div class="form mt-3">
                                    <div class="cost mt-3">
                                        <p><strong class="pr-3">Cost: </strong> {{newDiscount.Cost}} $</p>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6 mt-3">
                                            <button class="btn btn-secondary btn-block" @click="addToCart" :disabled="newDiscount.Cost < 1 || limitReached">
                                                Add to cart
                                            </button>
                                        </div>
                                        <div class="col-12 col-md-6 mt-3" @click="save">
                                            <button class="btn btn-secondary  btn-block">
                                                Save
                                            </button>
                                        </div>
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
import axios from 'axios'
export default {
    name: "NewDiscount",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getListOfGroups', 'getDiscountCreated', 'getDiscounts']),
        groupList() {
            return this.getListOfGroups
        }
    },
    data() {
        return {
            limitReached: false,
            updatedCost: false,
            today: null,
            newDiscount: {
                id: null,
                ShopId: null,
                ShopName: null,
                Title: null,
                Description: null,
                DiscountTargetType: 1,
                DiscountRate: 10,
                Status: null,
                NbTotal: 50,
                FromDate: null,
                ToDate: null,
                ValidDays: [1,2,3,4,5,6,7],
                Cost: 0,
                PhotoUrl: null,
                Groups: []
            },
            agree: 'no',
            discountCost: null,
            quantity: 50,
            image: null,
            endDate: null,
            startDate: null,
            duration: 365,
            discountTypes: [],
            isOpen: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: true
        }
    },
    methods: {
        ...mapActions(['fetchDiscountTypes', 'fetchDiscounts', 'fetchListOfCustomerGroups', 'createDiscount']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        pickFile() {
            this.$refs.filePick.click()
        },
        getGroupIcon(id) {
            const group = this.getUserData().GroupTypes.find(g => g.Id == id)
            if(group) {
                return group.Parameter
            }
        },
        async onFileSelected(e) {
            let file = e.target.files[0]
            if(file) {
                const payload = {
                    id: this.getUser().id,
                    File: file
                }
                this.newDiscount.PhotoUrl = await this.uploadImage(payload)
                //console.log(this.newDiscount.PhotoUrl)
                
            }
        },
        
        getQuantity(e) {
            let selected = e.target.value
            this.newDiscount.NbTotal = selected
            this.updateCost();
        },
        getDiscount(e) {
            this.newDiscount.Groups = []
            this.newDiscount.FromDate = null
            this.newDiscount.ToDate = null
            this.startDate = null
            this.endDate = null
            if(this.newDiscount.DiscountTargetType == 1) {
                this.duration = 365
            }
            else {
                this.duration = 30
            }

            this.updateCost()
            
        },
        setDate(e) {
            let date = e.target.value
            if(!this.duration) {
                this.notification('Please Select Duration First', 'warning');
                this.newDiscount.FromDate = null
            }
            else {
                var start = new Date(date)
                var end = new Date(start.getFullYear(), start.getMonth(), start.getDate()+this.duration)
                
                this.endDate = moment(end).format('YYYY-MM-DD')
                this.startDate = moment(date).format('YYYY-MM-DD')

                this.newDiscount.FromDate = moment(start).format('YYYY-MM-DD hh:mm:ssZ')
                this.newDiscount.ToDate = moment(end).format('YYYY-MM-DD hh:mm:ssZ')
            }
        },
        checkTag(e, value) {
            if(e) {
                this.newDiscount.ValidDays.push(value)
            }
            else {
                this.newDiscount.ValidDays = this.newDiscount.ValidDays.filter(item => {
                    return item !== value
                })
            }
            //console.log(this.newDiscount.ValidDays)
        },
        selectGroup(e, id) {
            if(e) {
                const obj = {
                    Id: id
                }
                this.newDiscount.Groups.push(obj)
            }
            else {
                this.newDiscount.Groups = this.newDiscount.Groups.filter(item => {
                    return item.Id !== id
                })
            }
            this.updatedCost = false
        },

        updateCost() {
            const targetType = this.getUserData().DiscountTargetTypes.find(d => d.Id == this.newDiscount.DiscountTargetType)
            if(targetType) {
                if(this.newDiscount.DiscountTargetType == 1) {
                    if(this.newDiscount.Groups.length) {
                        this.newDiscount.Cost = targetType.Parameter * this.newDiscount.Groups.length    
                    }
                    else {
                        this.newDiscount.Cost = targetType.Parameter;
                    }
                }
                else {
                    this.newDiscount.Cost = (targetType.Parameter * this.newDiscount.NbTotal) / 50;
                }    
            }
            this.updatedCost = true
        },

        addToCart() {
            if(this.limitReached) {
                this.notification('Max Limit Reached. You cannot add more discounts in cart.', 'warning')
                return
            }
            this.newDiscount.Status = 1
            if(this.newDiscount.DiscountTargetType !== 1) {
                this.newDiscount.Groups = []
            }
            if(this.validateData()) {
                console.log(this.newDiscount)
                this.createDiscount(this.newDiscount)
            }
        },
        save() {
            this.newDiscount.Status = 3
            if(this.newDiscount.DiscountTargetType !== 1) {
                this.newDiscount.Groups = []
            }
            if(this.validateData()) {
                console.log(this.newDiscount)
                this.createDiscount(this.newDiscount)
            }  
        },

        validateData() {
            if(!this.newDiscount.Title || this.newDiscount.Title == '') {
                this.notification('Please Enter Discount Title', 'warning')
                return false
            }
            if(!this.newDiscount.Description || this.newDiscount.Description == '') {
                this.notification('Please Enter Discount Description', 'warning')
                return false
            }
            if(this.newDiscount.ValidDays.length <= 0) {
                this.notification('Please Select Valid Days', 'warning')
                return false
            }
            if(!this.newDiscount.FromDate) {
                this.notification('Please Select Discount Date', 'warning')
                return false
            }
            if(this.newDiscount.DiscountTargetType == 1 && this.newDiscount.Groups.length < 1) {
                this.notification('Please Select atleast 1 Group', 'warning')
                return false
            }
            if(this.newDiscount.DiscountTargetType == 1 && !this.updatedCost) {
                this.notification('Please Click on Add Groups to update Cost.', 'warning')
                return false
            }
            return true
        },

        countDiscounts() {
            if(this.getDiscounts) {
                const limit = this.getUserData().Contract.NbDiscounts
                const count = this.getDiscounts.filter(d => d.Status != 3)
                if(count.length >= limit) {
                    this.limitReached = true
                }
            }
        }
    },

    async created()  {
        if(!this.getDiscounts || !this.getDiscounts.length) {
            const payload = {
                id: this.getUser().id
            }
            await this.fetchDiscounts(payload)
        }
        else {
            await this.countDiscounts()
        }

        this.today = new Date().toISOString().slice(0,10);
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id
            }
            this.fetchListOfCustomerGroups(payload)

            this.newDiscount.id = this.getUser().id
            this.newDiscount.ShopId = this.getUser().shop
        }
        if(this.getUserData()) {
            let user = this.getUserData()
            this.newDiscount.ShopName = user.Shop.Name
            if(user.DiscountTargetTypes) {
                this.discountTypes = user.DiscountTargetTypes
                //console.log(this.discountTypes)
            }
        }

        this.updateCost()

        
    },

    watch: {
        getDiscounts(val) {
            if(val && typeof val == 'object') {
                this.countDiscounts()
                this.updateCost()
            }
        },
        getDiscountCreated(val) {
            if(val && val == 'success') {
                this.notification('Discount Created Successfully', 'success')
                this.$router.push({path: '/my-discounts'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
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
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-position: center;
    border: 1px solid #ddd;
    padding-top: 30%;
    font-size: 12px;
    color: black;
    text-align: center;
}
.image:hover {
    cursor: pointer;
}
.group-list p {
    margin: 0;
}
hr {
    border: .5px solid #E96928 !important;;
}
a {
    color: #fff !important;
}
</style>