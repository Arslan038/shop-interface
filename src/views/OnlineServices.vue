<template>
    <div class="online-services">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h4 class="text-orange" v-if="getOnlineServices"><strong>Online Services ({{countServices.total}}/{{countServices.limit}})</strong></h4>
                            <h5 class="text-orange" v-if="getOnlineServices">Loyality Cards ({{countLoyalityServices}}/{{getUserData().Contract.NbLoyaltyProducts}})</h5>
                            <p>Create and post your main services / products on our platform manicards.com . Be active in your environment using the visibiility of our platform manicards.com.  Add one or two loyalty cards to attract your. customers</p>
                            <p><strong>BE ONLINE!!!</strong></p>
                            <button class="btn btn-secondary" @click="createNew">New Service</button>
                        </div>
                    </div>
                    <div class="row mx-5 pt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Services...</p>
                        </div>
                        <div class="col-12 col-md-3 mt-3" v-for="(service, index) in services" :key="index">
                            <div class="card" @click="move('service/'+service.Id)">
                                <div class="card-body">
                                    <div class="image-area" v-bind:style="{ 'background-image': 'url(' + service.PhotoUrl + ')' }"></div>
                                    <div class="pt-3 px-3">
                                        <p><strong>{{service.Name}}</strong></p>
                                        <p><strong>{{service.PriceUnit}}$</strong></p>
                                        <div class="row">
                                            <div class="col-6">
                                                <b-badge variant="info" v-if="service.Status == 1">Pending</b-badge>
                                                <b-badge variant="success" v-if="service.Status == 2">Active</b-badge>
                                                <b-badge variant="secondary" v-if="service.Status == 3">Inactive</b-badge>
                                            </div>
                                            <div class="col-6 text-right" v-if="service.IsLoyaltyProduct">
                                                <img src="../assets/loyality.png" alt="" width="30" height="30">
                                            </div>
                                        </div>
                                        
                                        <!-- <button class="btn inactif btn-secondary">inactif</button> -->
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger mt-2" @click="remove(service)">X</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

        <b-modal :hide-footer="true" size="xl" title="New Service" v-model="openServiceModal">
            <form @submit.prevent="saveService">
                <div class="row">
                    <div class="col-12">
                        <label for="" class="text-orange pr-3 pt-2"><strong>Service Name:</strong></label>
                        <input type="text" class="form-control" v-model="newService.Name" placeholder="Enter Service Name" style="width:350px" required>
                            
                        <hr>
                    </div>
                    <div class="col-md-12 col-12">
                        <div class="row">
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
                            <!-- <div class="col-md-12 col-12 mt-3">
                                <strong>Pick From Computer</strong>
                                <div>
                                    <div class="image text-center" @click="pickFile"><strong>Pick Photos</strong></div>
                                    <input type="file" style="display:none" accept="image/*" ref="filePick" multiple @change="onFileSelected">
                                </div>
                                <div v-if="pickedImages.length">
                                    <div class="image text-center ml-1" v-for="(image, index) in pickedImages" :key="index" v-bind:style="{ 'background-image': 'url(' + image.url + ')' }"></div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="row">
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
                <div class="row">
                    <div class="col-12 mb-3 mt-3">
                        <p><strong>Total: </strong> {{this.newService.PriceUnit}}$</p>
                    </div>
                    
                    <div class="col-3">
                        <button class="btn btn-block btn-secondary" :disabled="isPressed">{{saveText}}</button>
                    </div>
                    <div class="col-3">
                        <a class="btn btn-block btn-secondary" @click="openServiceModal = !openServiceModal">Exit</a>
                    </div>
                </div>
            </form>
        </b-modal>

        <!-- Delete Service -->
        <b-modal title="Delete Service" :hide-footer="true" v-model="deleteModal">
            <div class="row">
                <div class="col-12 text-center" v-if="serviceToDelete">
                    <h5>Are you sure you want to delete service <strong class="text-orange">"{{serviceToDelete.Name}}"</strong></h5>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <button class="btn btn-primary btn-block" @click="deleteNow">Yes, Delete</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-secondary btn-block" @click="deleteModal = !deleteModal">No, Cancel</button>
                </div>
            </div>
        </b-modal>
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
    name: "OnlineServices",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getServiceCreated', 'getOnlineServices', 'getServiceDeleted', 'getDefaultPhotos']),
        services() {
            if(this.getOnlineServices) {
                this.allServices = this.getOnlineServices
                return this.getOnlineServices.filter(s => s.Status < 4)
            }
            return
        },
        countServices() {
            if(this.getOnlineServices) {
                const limit = this.getUserData().Contract.NbProducts
                const count = this.getOnlineServices.filter(d => d.Status < 3)
                return {
                    total: count.length,
                    limit: limit
                }
            }
        },
        countLoyalityServices() {
            if(this.getOnlineServices) {
                const services = this.services.filter(s => s.IsLoyaltyProduct == true)
                return services.length
            }
            return
        },
    },
    data() {
        return {
            isPressed: false,
            saveText: 'Save',
            selectedImages: [],
            pickedImages: [],
            defaultImages: [],
            allServices: [],
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
                Photos: [
                    {
                        "PhotoUrl": "http://www.api.manicards.com/data1012074.jpg"
                    },
                    {
                        "PhotoUrl": "http://www.api.manicards.com/data/de52736.jpg"
                    },
                    {
                        "PhotoUrl": "http://www.api.manicards.com/data/defvraison.jpg"
                    }
                ]
            }
        }
    },
    methods: {
        ...mapActions(['createService', 'fetchServices', 'deleteService', 'fetchDefaultImages']),
        showImage(image) {
            if(typeof image == 'object') {
                return image.url
            }
            return image
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
            this.saveText = 'Please wait...'
            this.isPressed = true
            this.createService(this.newService)
        },

        remove(service) {
            this.serviceToDelete = service
            this.deleteModal = true
        },
        deleteNow() {
            const payload = {
                id: this.getUser().id,
                Id: this.serviceToDelete.Id
            }
            this.deleteService(payload)
        }
    },

    created() {
        if(this.getUser()) {
            this.newService.ShopId = Number(this.getUser().shop)
            this.newService.id = this.getUser().id

            const payload = {
                id: this.getUser().id
            }
            this.loading = true
            this.fetchServices(payload)
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
        getOnlineServices(val ) {
            if(val) {
                this.loading = false
            }
        },
        getServiceCreated(val) {
            if(val && val == 'success') {
                this.notification('Service Created Successfully.', 'success')
                this.openServiceModal = false
                this.saveText = 'Save'
                this.isPressed = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong.', 'error')
            }
        },
        getServiceDeleted(val) {
            if(val && val == 'success') {
                this.notification('Service Deleted Successfully.', 'success')
                this.deleteModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong.', 'error')
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
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
}
.card-body {
    margin: 0;
    padding: 0;
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
.image:first-child {
    margin-left: 0;
}
.image:hover {
    cursor: pointer;
}
.icon {
    background: #000;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>