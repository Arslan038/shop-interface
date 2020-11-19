<template>
    <div class="online-services">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Service...</p>
                        </div>
                        <div class="col-12">
                            <form @submit.prevent="saveService">
                                <div class="row" v-if="serviceDetails">
                                    <div class="col-12">
                                        <label for="" class="text-orange pr-3 pt-2"><strong>Service Name:</strong></label>
                                        <input type="text" class="form-control" v-model="newService.Name" placeholder="Enter Service Name" style="width:350px" required>
                                            
                                        <hr>
                                    </div>
                                    <div class="col-md-12 col-12">
                                        <div class="row">
                                            <!-- <div class="col-md-12 col-12">
                                                <div class="image text-center text-uppercase"><strong>Image 1</strong></div>
                                            </div> -->
                                            <div class="col-md-12 col-12" v-if="defaultImages">
                                                <div v-for="(image, index) in defaultImages" :key="index">
                                                    <!-- <img :src="image" width="10" alt=""> -->
                                                    
                                                    <div @click="setSelected(image)" class="image text-center text-uppercase ml-1" v-bind:style="{ 'background-image': 'url(' + showImage(image) + ')' }">
                                                        <div v-if="findImage(image)" class="icon">
                                                            <i class="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="image text-center" @click="pickFile"><strong>Pick Photos</strong></div>
                                                <input type="file" style="display:none" accept="image/*" ref="filePick" multiple @change="onFileSelected">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="serviceDetails">
                                    <div class="col-12 col-md-6 mt-3">
                                        <div class="d-flex">
                                            <b-form-checkbox v-model="loyality" @change="getLoyality" value="yes" unchecked-value="no">Loyality</b-form-checkbox>
                                            
                                            <p class="ml-auto pr-3 pt-1"><strong>Price</strong></p>
                                            <input type="text" class="form-control" v-model="newService.PriceUnit" required style="width:150px" placeholder="8,500$">
                                        </div>

                                        <div class="d-flex mt-3">
                                            <p class="pr-3 pt-1"><strong>Category</strong></p>
                                            <select class="form-control" v-model="newService.CategoryId" @change="getDefaultImages" required>
                                                <option :value="null">--Select Category--</option>
                                                <option v-for="(cat, index) in categories" :key="index" :value="cat.Id">{{cat.Shortname.Strings.English}}</option>
                                            </select>
                                        
                                        </div>
                                        
                                        <textarea class="form-control mt-3" placeholder="Description..." v-model="newService.Description" rows="6" required></textarea>
                                        
                                    </div>
                                    <div class="col-12 col-md-6 mt-5 pt-4">
                                        <div class="row">
                                            <div class="col-12" v-if="loyality == 'yes'">
                                                <div class="reward" >
                                                        <h6 class="ml-auto pr-3 pt-1"><strong>Reward</strong></h6>
                                                        <textarea type="text" class="form-control" placeholder="Reward Description..." rows="4" required v-model="newService.RewardDescription"></textarea>
                                                    </div>
                                                    <p class=" mt-3">Number of Purchases Required</p>
                                                    <select class="form-control" style="" required v-model="newService.TotalTarget">
                                                        <option :value="null">--Select Number Of Purchases Required--</option>
                                                        <option value="0">0</option>
                                                        <option v-for="i in 10" :key="i" :value="i">{{i}}</option>
                                                    </select> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="serviceDetails">
                                    <div class="col-12 mb-3 mt-3">
                                        <p><strong>Total: </strong> {{this.newService.PriceUnit}}$</p>
                                        <b-form-checkbox v-model="agree" value="yes" unchecked-value="no">I accept conditions of use</b-form-checkbox>
                                    </div>
                                    
                                    <div class="col-3">
                                        <button class="btn btn-block btn-secondary">Save</button>
                                    </div>
                                    <div class="col-3">
                                        <a class="btn btn-block btn-secondary" @click="move('/online-services')">Exit</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
                
            </div>

        </div>
            
            <Footer />
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
    name: "MyServiceDetails",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getServiceDetails', 'getOnlineServices', 'getServiceUpdated', 'getDefaultPhotos']),
        services() {
            this.allServices = this.getOnlineServices
            return this.getOnlineServices
        }
    },
    data() {
        return {
            selectedImages: [],
            defaultImages: [],
            serviceDetails: null,
            deleteModal: false,
            serviceToDelete: null,
            categories: [],
            openServiceModal: false,
            loyality: 'no',
            agree: 'no',
            isOpen: true,
            loading: false,
            newService: {
                id: null,
                ShopId: null,
                CategoryId: null,
                Name: null,
                Description: null,
                TotalTarget: null,
                PriceUnit: null,
                ProductType: 1,
                Status: 2,
                RewardDescription: null,
                IsLoyaltyProduct: false,
                ShopName: null,
            }
        }
    },
    methods: {
        ...mapActions(['updateService', 'fetchServiceDetails', 'fetchDefaultImages']),
        showImage(image) {
            if(typeof image == 'object') {
                return image.url
            }
            return image
        },
        getDefaultImages(e) {
            const payload = {
                id: this.getUser().id,
                Id: this.newService.CategoryId
            }
            this.selectedImages = []
            this.fetchDefaultImages(payload)
        },
        setSelected(image) {
            var index = this.selectedImages.indexOf(image);
            if (index !== -1) {
                this.selectedImages.splice(index, 1);
            }
            else {
                this.selectedImages.push(image)
            }
        },
        findImage(image) {
            var index = this.selectedImages.indexOf(image);
            if (index !== -1) {
                return true
            }
            return false
        },
        pickFile() {
            this.$refs.filePick.click()
        },
        onFileSelected(e) {
            let file = e.target.files
            if(file) {
                this.pickedImages = []
                for (let index = 0; index < file.length; index++) {
                    let fileType = file[index].type.split('/')
                    const picked = {
                        File: file[index],
                        url: URL.createObjectURL(file[index]),
                        name: file[index].name,
                    }
                    this.defaultImages.push(picked);
                }
            }
        },
        move(link) {
            this.$router.push({path: link})
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        createNew() {
            if(this.services.length >= 10) {
                this.notification('Maximum Limit Reached. You cannot add new service', 'warning')
                return
            }
            this.openServiceModal = true
        },
        getLoyality(e) {
            if(e == 'yes') {
                this.newService.IsLoyaltyProduct = true
            }
            else {
                this.newService.IsLoyaltyProduct = false
            }
        },
        async saveService() {
            if(this.agree != 'yes') {
                this.notification('Please agree to conditions of use.', 'warning')
                return
            }
            if(this.selectedImages.length < 1) {
                this.notification('Please Select atleast 1 image.', 'warning')
                return
            }
            if(this.selectedImages.length > 8) {
                this.notification('Maximum 8 images allowed', 'warning')
                return
            }

            let newImgs = this.selectedImages.filter(img => typeof img == 'object')
           

            let defImgs = this.selectedImages.filter(img => typeof img != 'object')
           
            if(newImgs.length > 0) {
                let uploaded = []
                for(var i = 0; i < newImgs.length; i++) {
                    const data = {
                        id: this.getUser().id,
                        File: newImgs[i].File
                    }
                    let url = await this.uploadImage(data)
                    if(url) {
                        uploaded.push(url)
                    }
                }

                defImgs = defImgs.concat(uploaded)
            }

            this.newService.Photos = []
            // Set Photos with Object
            defImgs.forEach(img => {
                const obj = {
                    PhotoUrl: img
                }
                this.newService.Photos.push(obj)
            });

            this.newService.id = this.getUser().id
            this.updateService(this.newService)
            // this.createService(this.newService)
        },

    },

    created() {
        if(this.getUser()) {
            this.newService.ShopId = Number(this.getUser().shop)
            this.newService.id = this.getUser().id

            const payload = {
                id: this.getUser().id,
                productId: this.$route.params.id
            }
            this.loading = true
            this.fetchServiceDetails(payload)
        }
        if(this.getUserData()) {
            this.categories = this.getUserData().ProductCategories
        }
    },

    watch: {
        getDefaultPhotos(val) {
            if(val) {
                this.defaultImages = val
            }
        },
        getServiceDetails(val) {
            if(val) {
                this.loading = false
                this.newService = val
                this.serviceDetails = val
                if(this.newService && this.newService.IsLoyaltyProduct) {
                    this.loyality = 'yes'
                }
                if(this.newService.Photos.length) {
                    this.defaultImages = []
                    this.selectedImages = []
                    this.newService.Photos.forEach(photo => {
                        this.defaultImages.push(photo.PhotoUrl)
                        this.selectedImages.push(photo.PhotoUrl)
                    })
                }
            }
            
        },
        getServiceUpdated(val) {
            if(val && val == 'success') {
                this.notification('Service Created Successfully.', 'success')
                this.$router.push({path: '/online-services'})
            }
            if(val && val != 'success') {
                this.notification('Something went wrong.', 'error')
            }
        },
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
    padding: 0;
    border: 1px solid black;
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
.inactif.btn-secondary {
    padding: 2px 30px;
    margin-top: 10px;
    background: #ddd !important;
    border: 1px solid #ddd !important;
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
.icon {
    background: #000;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.image:first-child {
    margin-left: 0;
}
</style>