<template>
    <div class="company-account-creation">
        <div class="row mt-5">
            <div class="col-12 text-center">
                <img src="../assets/logo.png" width="130px" />
            </div>
        </div>
        <div class="row mb-5 mx-3">
            <div class="col-xl-8 col-lg-8 col-md-12 col-12 offset-xl-2 offset-lg-2">
                <div class="card mt-5 shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="text-orange">Company Account</h4>
                            </div>
                            <div class="col-2 text-right">
                                <i class="fa fa-times fa-2x" @click="move('/')"></i>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12" v-if="company">
                                <form @submit.prevent="send">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="image-upload" @click="pickFile" v-bind:style="{ 'background-image': 'url(' + company.PhotoUrl + ')' }"><span v-if="!company.PhotoUrl">Logo or Image</span></div>
                                            <input type="file" style="display:none" ref="filePick" @change="onFileSelected">

                                            <p class="mt-3">Company Type: <strong>{{company.ShopType}}</strong></p>

                                            <div class="row">
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-3">
                                                    <input type="text" class="form-control" v-model="company.Name" placeholder="Company Name" required>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-3">
                                                    <input type="tel" class="form-control" v-model="company.Phone" placeholder="Phone Number">
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-2">
                                                    <textarea class="form-control" rows="5" v-model="company.Description" placeholder="Description..." required></textarea>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                                    <select class="form-control mt-2" required v-model="company.CategoryId">
                                                        <option :value="null">Select Category</option>
                                                        <option v-for="(cat, index) in categories" :key="index" :value="cat.Id">{{cat.Shortname.Strings.English}}</option>
                                                    </select>
                                                    <input type="text" class="form-control mt-2" v-model="company.Address" placeholder="Address" required>
                                                    <input type="text" class="form-control mt-2" v-model="company.DoorNumber" placeholder="Door Number">
                                                    
                                                    
                                                </div>
                                                
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                                    <select v-model="company.City" required class="form-control mt-2">
                                                        <option :value="null">Select City</option>
                                                        <option v-for="(city, index) in getCities" :value="city.Shortname.Strings.English" :key="index">{{city.Shortname.Strings.English}}</option>
                                                    </select>
                                                    <select v-model="company.Region" required class="form-control mt-2">
                                                        <option :value="null">Select Province</option>
                                                        <option v-for="(province, index) in getProvinces" :value="province.Shortname.Strings.English" :key="index">{{province.Shortname.Strings.English}}</option>
                                                    </select>
                                                    <div class="row">
                                                        <div class="col-4">
                                                            <img src="../assets/www.png" width="25px" alt=""> or <img src="../assets/facebook.png" class="mt-2" width="35px" alt="">
                                                        </div>
                                                        <div class="col-8">
                                                            <input type="text" class="form-control mt-2" v-model="company.WebSite" placeholder="Website">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                                    <select v-model="company.Country" required class="form-control mt-2">
                                                        <option :value="null">Select Zone</option>
                                                        <option v-for="(country, index) in getCountries" :value="country.Shortname.Strings.English" :key="index">{{country.Shortname.Strings.English}}</option>
                                                    </select>
                                                    <input type="text" class="form-control mt-2" v-model="company.Country" placeholder="Country" required>
                                                    <input type="text" class="form-control mt-2" v-model="company.PostalCode" placeholder="Zip code" required>
                                                    <select v-model="company.Region" required class="form-control mt-2">
                                                        <option :value="null">Select Zone</option>
                                                        <option v-for="(zone, index) in getZones" :value="zone.Shortname.Strings.English" :key="index">{{zone.Shortname.Strings.English}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-3">
                                                    <p><strong>Standard Opening Hours</strong></p>
                                                    <div class="row no-gutters" v-for="(hours, index) in company.OpeningHours" :key="index">
                                                        <div class="col-4 mt-1">
                                                            <p><strong>{{getDay(hours.Day)}}</strong></p>
                                                        </div>
                                                        <div class="col-4 pr-1">
                                                            <input type="time" min="00:00:00" max="23:59:59" :value="getTime(hours.From)" @change="setTime($event,'from',index)" placeholder="Opening" class="form-control">
                                                        </div>
                                                        <div class="col-4">
                                                            <input type="time" min="00:00:00" max="23:59:59" :value="getTime(hours.To)" @change="setTime($event,'to',index)" placeholder="Closing" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                    <div class="col-6">
                                        <button class="btn btn-secondary mt-3 confirm-btn">Confirm</button>
                                    </div>
                                    <div class="col-6 text-right">
                                        <a class="btn btn-secondary mt-3 confirm-btn" @click="exit">Exit</a>
                                    </div>
                                </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
//import StaticHeader from '@/components/StaticHeader.vue'
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: 'CompanyAccountCreation',
    mixins: [mixin],
    components: {
        //StaticHeader
    },
    computed: {
        ...mapGetters(['getCompanyProfile', 'getCompanyProfileUpdated']),
        getCities() {
            if(this.getUserData()) {
                let cityArray = this.getUserData().Cities
                return cityArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        },
        getProvinces() {
            if(this.getUserData()) {
                let provinceArray = this.getUserData().Provinces
                return provinceArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        },
        getZones() {
            if(this.getUserData()) {
                let regionArray = this.getUserData().Regions
                return regionArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        },
        getCountries() {
            if(this.getUserData()) {
                let countryArray = this.getUserData().Countries
                return countryArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        }
    },
    data() {
        return {
            image: null,
            company: null,
            categories: []
        }
    },
    methods: {
        ...mapActions(['fetchCompanyProfile', 'updateCompanyProfile']),
        getTime(time) {
            if(time.includes('T')) {
                let check = time.split('T')[1].split('.')[0].split(':')
                let t = check[0]+':'+check[1]
                return t
            }
            //console.log(time)
            
            //console.log(check.length)
            // if(check.length == 3) {
            //     check.pop()
            // } 
            //let t = check.split('T')[1].split('.')[0]
            return time
        },
        pickFile() {
            this.$refs.filePick.click()
        },
        async onFileSelected(e) {
            let file = e.target.files[0]
            if(file) {
                //this.company.PhotoUrl = URL.createObjectURL(file)
                const payload = {
                    id: this.getUser().id,
                    File: file
                }
                this.company.PhotoUrl = await this.uploadImage(payload)
            }
        },
        setTime(e, type, i) {
            if(type == 'from') {
                this.company.OpeningHours[i].From = e.target.value
            }
            if(type == 'to') {
                this.company.OpeningHours[i].To = e.target.value
            }
            
            //console.log(e.target.value)
        },
        send() {
            this.company.id = this.getUser().id
            // if(this.image) {
            //     this.compnay.PhotoUrl = this.image
            // }
            console.log(this.company.PhotoUrl)
            this.updateCompanyProfile(this.company)
        },
        exit() {
            this.$router.push({path: '/current-actions'})
        },
        getDay(day) {
            if(day == 1) {
                return "Monday"
            }
            if(day == 2) {
                return "Tuesday"
            }
            if(day == 3) {
                return "Wednesday"
            }
            if(day == 4) {
                return "Thursday"
            }
            if(day == 5) {
                return "Friday"
            }
            if(day == 6) {
                return "Saturday"
            }
            if(day == 7) {
                return "Sunday"
            }
        },
        move(to) {
            this.$router.push(to)
        }
    },

    watch: {
        getCompanyProfileUpdated(val) {
            if(val && val == 'success') {
                this.notification('Company Profile Updated Successfully', 'success')
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
            }
        },
        getCompanyProfile(val) {
            if(val) {
                this.company = val
                console.log(val)
            }
        }
    },

    created() {
        if(this.getUser()) {
            const payload = {
                id: this.getUser().id,
                company: this.getUser().shop
            }
            this.fetchCompanyProfile(payload)
        }

        if(this.getUserData()) {
            this.categories = this.getUserData().ShopCategories
        }
    }
}
</script>

<style scoped>
.company-account-creation {
    background: #f9f9f9;
    height: 100vh;
    overflow-x: hidden !important;
}
hr {
    border: 0.5px solid #E96928 !important;
}
.use {
    border-bottom: 1px solid black;
    color: black;
}
.image-upload {
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-position: center;
    border: 1px solid black;
    color: black;
    text-align: center;
    font-size: 16px;
}

.image-upload:hover {
    cursor: pointer;
}

.btn-primary {
    color: #fff !important;
}

.space {
    padding-left: 10px !important;
}

.confirm-btn {
    padding: 4px 40px;
}

i:hover {
    cursor: pointer;
}
</style>