<template>
    <div class="my-discounts-validity">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h5><strong>Discount: </strong><span class="text-orange">{{newDiscount.Title}}</span></h5>
                            <hr>
                        </div>
                    </div>
                    <form @submit.prevent>
                        <div class="row mx-5">
                            <div class="col-12 col-md-6 pt-2">
                                <div class="row">
                                    <div class="col-md-3 col-6">
                                        <div class="image text-center text-uppercase" v-bind:style="{ 'background-image': 'url(' + newDiscount.PhotoUrl + ')' }" @click="pickFile"><strong v-if="!newDiscount.PhotoUrl">Pick Image</strong></div>
                                        <input type="file" style="display:none" accept="image/*" ref="filePick" @change="onFileSelected">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mx-5">
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
                                                <input type="date" class="form-control" @change="setDate" v-model="startDate" required>
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
                                                <b-form-checkbox @change="selectGroup($event, group.Id)" :checked="findDiscount(group.Id)"></b-form-checkbox>
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
                        <div class="row mx-5">
                            <div class="col-md-6 col-12 mt-3">
                                <div class="form mt-3">
                                    <div class="cost mt-3">
                                        <p><strong class="pr-3">Cost: </strong> {{newDiscount.Cost}} $</p>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6 mt-3">
                                            <button class="btn btn-secondary btn-block" @click="addToCart" :disabled="newDiscount.Cost < 1">
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
export default {
    name: "MyDiscountDetails",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getListOfGroups', 'getDiscountUpdated', 'getDiscountDetails', 'getDiscountCreated']),
        groupList() {
            return this.getListOfGroups
        }
    },
    data() {
        return {
            updatedCost: false,
            today: null,
            isDisabled: false,
            newDiscount: {
                id: null,
                ShopId: null,
                ShopName: null,
                Title: null,
                Description: null,
                DiscountTargetType: null,
                DiscountRate: null,
                Status: null,
                NbTotal: null,
                FromDate: null,
                ToDate: null,
                ValidDays: [],
                Cost: null,
                PhotoUrl: null,
                Groups: []
            },
            agree: 'no',
            discountCost: null,
            quantity: null,
            image: null,
            endDate: null,
            startDate: null,
            duration: null,
            discountTypes: [],
            isOpen: true,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        }
    },
    methods: {
        ...mapActions(['fetchDiscountTypes', 'fetchDiscountDetails', 'fetchListOfCustomerGroups', 'updateDiscount', 'createDiscount']),
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
            if(this.newDiscount.Status == 2) {
                this.notification("Days will not be modified at this stage.", 'warning')
                return
            }
            if(e) {
                this.newDiscount.ValidDays.push(value)
            }
            else {
                this.newDiscount.ValidDays = this.newDiscount.ValidDays.filter(item => {
                    return item !== value
                })
            }
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
        },

        findDiscount(group) {
            let d = this.newDiscount.Groups.find(g => g.Id == group)
            if(d) {
                console.log("Exists Group....")
                return true
            }
            console.log("Group Not Exists")
            return false
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
            //this.notification('Cost Updated.', 'success')

        },

        addToCart() {
            this.newDiscount.Status = 1
            if(this.newDiscount.DiscountTargetType !== 1) {
                this.newDiscount.Groups = []
            }
            if(this.validateData()) {
                console.log(this.newDiscount.PhotoUrl)
                this.updateDiscount(this.newDiscount)
            }
        },
        save() {
            
            this.newDiscount.Status = 3
            if(this.newDiscount.ValidDays.length <= 0) {
                this.notification('Please Select Valid Days', 'warning')
                return
            }
            
            if(this.newDiscount.DiscountTargetType !== 1) {
                this.newDiscount.Groups = []
            }
            
            if(this.validateData()) {
                console.log(this.newDiscount.PhotoUrl)
                this.updateDiscount(this.newDiscount)
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

        copy() {
            this.newDiscount.Status = 3
            if(this.validateData()) {
                console.log(this.newDiscount.PhotoUrl)
                this.createDiscount(this.newDiscount)
            }
            
        }
    },

    created()  {
        this.today = new Date().toISOString().slice(0,10);
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id,
                discountId: this.$route.params.id
            }
            this.fetchListOfCustomerGroups(payload)
            this.fetchDiscountDetails(payload)

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
            else {
                console.log("No Type")
            }
        }
    },

    watch: {
        getDiscountUpdated(val) {
            if(val && val == 'success') {
                this.notification('Discount Updated Successfully', 'success')
                this.$router.push({path: '/my-discounts'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
            }
        },
        getDiscountCreated(val) {
            if(val && val == 'success') {
                this.notification('Discount Copied Successfully', 'success')
                this.$router.push({path: '/my-discounts'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
            }
        },
        getDiscountDetails(val) {
            if(val) {
                console.log(val)
                this.newDiscount = val
                this.newDiscount.Id = this.$route.params.id
                this.newDiscount.discountId = this.$route.params.id
                this.newDiscount.id = this.getUser().id
                this.newDiscount.ShopId = this.getUser().shop
                this.quantity = this.newDiscount.NbTotal
                //this.newDiscount.DiscountRate = this.newDiscount.DiscountRate*100
                if(this.newDiscount.Status == 2) {
                    this.isDisabled = true
                    this.agree = 'yes'
                }
                console.log("Groups...")
                 console.log(this.newDiscount.Groups)
                
                if(this.newDiscount.PhotoUrl) {
                    this.image = this.newDiscount.PhotoUrl
                }
                this.startDate = moment(val.FromDate).format('YYYY-MM-DD')
                this.endDate = moment(val.ToDate).format('YYYY-MM-DD')

                var a = moment(val.FromDate)
                var b = moment(val.ToDate)
                var diff = moment.duration(b.diff(a)).asDays()
                this.duration = diff.toFixed(0)

                if(this.newDiscount.ValidDays.length) {
                    this.newDiscount.ValidDays.forEach(item => {
                        if(item == 1) {
                            this.mon = true
                        }
                        if(item == 2) {
                            this.tue = true
                        }
                        if(item == 3) {
                            this.wed = true
                        }
                        if(item == 4) {
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
    background: url('../assets/service.jpg');
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
}
.card-body {
    margin: 0;
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
hr {
    border: .5px solid #E96928 !important;
}
.image {
    background: url('../assets/service.jpg');
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100%;
    
}
.groups {
    border: 1px solid black;
    padding: 15px;
}
.group-list p {
    margin: 0;
}
.align-bottom {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>