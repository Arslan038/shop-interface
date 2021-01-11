<template>
    <div class="customer-search">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                <div class=" mt-1 px-3">
                    <h4 class="text-orange"><strong>Add a new customer group</strong></h4>
                    <p class="">Adding a customer group will help you to expand your potential customer base. Choose groups that are most likely to buy your services. Thereafter, you might associate a discount to them or send them a notification.</p>
                    <p class=""><strong>BUILD YOUR FUTURE CUSTOMER BASE !!!</strong></p>
                </div>

                <div class="body-area mt-1 pb-5">
                    <div class="row mx-5 pt-3">
                        <div class="col-md-6 col-6">
                            <div class="row">
                                <div class="col-6">
                                    <select class="form-control" @change="sortGroups">
                                        <option :value="null">Sort By</option>
                                        <option value="name">Name</option>
                                        <option value="group">Type of group</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <button @click="search = !search" class="btn btn-primary">Advanvce Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-5 mt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Groups...</p>
                        </div>
                        <div class="col-12" v-if="groups">
                            <p>List of recommended groups or groups matching your search : {{groups.length}} groups</p>
                        </div>
                        <div class="col-6 col-md-2 mt-3" v-for="(group, index) in groups" :key="index">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="image-area border">
                                        <img v-if="group.GroupeType != 5" :src="findType(group.GroupeType).Parameter" width="100%" alt="">
                                    </div>
                                    <div class="text-left px-3 pb-4 pt-3 border">
                                        <p><strong>{{group.Name}} </strong></p>
                                        <!-- <p><i>26 members</i></p> -->
                                    </div>
                                    <div class="row mx-1 my-1">
                                        <div class="col-12">
                                            <button class="btn btn-secondary btn-sm btn-block" @click="viewGroup(group)">View</button>
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

        <b-modal :title="selectedGroup ? 'Group '+ selectedGroup.Name : 'Group '" size="lg" :hide-footer="true" v-model="view">
            <div class="row">
                <div class="col-12 text-center" v-if="loading">
                    <b-spinner type="grow" label="Spinning"></b-spinner>
                    <p class="text-orange">Loading Group Details...</p>
                </div>
            </div>
            <div class="row" v-if="groupDetails">
                <div class="col-md-6 col-12 mt-3">
                    <p>Quantity of members: <strong>{{groupDetails.Members.length}}</strong></p>
                    
                </div>
                <div class="col-md-6 col-12 mt-3">
                    <p>Type of group: <strong v-if="selectedGroup">{{selectedGroup.Name}}</strong></p>
                    <p>City: <strong>{{groupDetails.City}}</strong></p>
                </div>

                <div class="col-4 mt-3" v-for="(category, index) in cats" :key="index">
                    <strong>{{index+1}}. {{category.Description.Strings.English != "" ? category.Description.Strings.English : category.Description.Strings.French}}</strong>
                </div>
                <div class="col-12 mt-3">
                    <textarea placeholder="Description..." v-model="groupDetails.Description" disabled class="form-control"></textarea>
                </div>
                <div class="col-12 mt-3">
                    <textarea placeholder="Reasons..." v-model="newRequest.Message" class="form-control"></textarea>
                </div>
                <div class="col-6 mt-3">
                    <button class="btn btn-secondary" @click="addGroup">Add the group</button>
                </div>
                <div class="col-6 text-right mt-3">
                    <button class="btn btn-secondary" @click="view = !view">Cancel</button>
                </div>


            </div>
        </b-modal>

        <b-modal title="Advance Search" v-model="search" :hide-footer="true">
            <form @submit.prevent="advanceSearch">
                <div class="row">
                    <div class="col-12 mt-3">
                        <select class="form-control" v-model="advance.City">
                            <option :value="null">Select City</option>
                            <option v-for="(city, index) in cities" :key="index" :value="city.Value">{{city.Description.Strings.English}}</option>
                        </select>
                    </div>
                    <div class="col-12 mt-3">
                        <input type="text" class="form-control" v-model="advance.Pattern" placeholder="Name">
                    </div>
                    <div class="col-12 mt-3">
                        <select class="form-control" v-model="advance.UserGroupType">
                            <option :value="null">Select Group Type</option>
                            <option v-for="(group, index) in groupTypes" :key="index" :value="group.Value">{{group.Shortname.Strings.English}}</option>
                        </select>
                    </div>
                    <div class="col-12 mt-3">
                        <button class="btn btn-block btn-primary" type="submit">Search</button>
                    </div>
                    <div class="col-12 mt-3">
                        <a class="btn btn-block btn-primary" @click="resetSearch">Reset Search</a>
                    </div>
                </div>
            </form>
            
        </b-modal>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import mixin from '../mixins/global'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "CustomerSearch",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    data() {
        return {
            view: false,
            search: false,
            isOpen: true,
            loading: false,
            selectedGroup: null,
            groups: null,
            cats: [],
            limitReached: false,
            advance: {
                ObjectType: 20,
                Pattern: null,
                City: null,
                UserGroupType: null
            },
            newRequest: {
                id: null,
                RequestType: 6,
                FromType: 2,
                FromId: null,
                FromName: null,
                FromSystem: false,
                ToType: 20,
                ToId: 2,
                OnType: null,
                OnId: null,
                Title: "Partenariat d'affaires / Business Partnership",
                Message: null,
                MustMakeDecision: true
            }
        }
    },
    computed: {
        ...mapGetters(['getGroupDetails', 'getCustomerSearched', 'getNewGroupRequest', 'getCustomerGroupList']),
        groupDetails() {
            return this.getGroupDetails
        },
        customerGroups() {
            if(this.getUserData()) {
                return this.getUserData().GroupTypes
            }
            return
        },
        cities() {
            if(this.getUserData()) {
                let cityArray = this.getUserData().Cities
                return cityArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        },
        shopCategories() {
            if(this.getUserData()) {
                let catArray = this.getUserData().ShopCategories
                return catArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        },
        groupTypes() {
            if(this.getUserData()) {
                let groupArray = this.getUserData().GroupTypes
                return groupArray.sort((a,b) => a.Shortname.Strings.English > b.Shortname.Strings.English ? 1 : -1)
            }
            return
        }
    },
    methods: {
        ...mapActions(['customerSearch', 'customerGroupDetails', 'sendNewGroupRequest', 'fetchListOfCustomerGroups']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        resetSearch() {
            this.advance.Pattern = null
            this.advance.City = null,
            this.advance.UserGroupType = null,
            this.advance.CategoryId = null

        },
        sortGroups(e) {
            let searchBy = e.target.value
            if(searchBy) {
                if(searchBy == 'name') {
                    this.groups.sort(function(a, b){ return a.Name < b.Name ? -1 : 1});
                }
                if(searchBy == 'group') {
                    this.groups.sort(function(a, b){ return a.GroupeType < b.GroupeType ? -1 : 1});
                }
            }
            else {
                this.groups = this.getCustomerSearched
            }
        },
        findType(id) {
            let g = this.getUserData().GroupTypes.find(i => i.Id == id)
            if(g) {
               // console.log(g)
                return g
            }
        },
        advanceSearch() {
            
            const payload = {
                id: this.getUser().id,
                data: this.advance
            }
            this.customerSearch(payload)
        },
        viewGroup(group) {
            this.selectedGroup = group
            const payload = {
                id: this.getUser().id,
                groupId: group.Id
            }
            this.view = true
            this.loading = true
            console.log(this.view)
            this.customerGroupDetails(payload)
            console.log(group)
        },

        groupCategories(categories) {
            let catArray = []
            if(this.getUserData()) {
                
                categories.forEach(category => {
                    let cat = this.getUserData().ShopCategories.find(c => c.Id == category)
                    if(cat) {
                        catArray.push(cat)
                    }
                })
                
            }
            this.cats = catArray
            return catArray
        },

        addGroup() {
            if(this.limitReached) {
                this.notification('Maximum Limit Reached. You cannot add more groups.', 'error')
                return
            }
            if(this.newRequest.Message == null || this.newRequest.Message == '') {
                this.notification('Please Enter Message', 'warning')
                return
            }
            this.newRequest.id = this.getUser().id
            this.newRequest.FromId = this.getUser().shop
            this.newRequest.FromName = this.getUserData().Shop.Name

            this.sendNewGroupRequest(this.newRequest)
        },
        countGroups() {
            if(this.getCustomerGroupList) {
                const limit = this.getUserData().Contract.NbUserGroups
                const count = this.getCustomerGroupList.filter(d => d.Status == 2)
                if(count.length >= limit) {
                    this.limitReached = true
                }
                return {
                    total: count.length,
                    limit: limit
                }
            }
        }
    },
    async created() {
        if(this.getCustomerGroupList && this.getCustomerGroupList.length) {
            this.countGroups()
        }
        else {
            const payload = {
                id: this.getUser().id
            }
            await this.fetchListOfCustomerGroups(payload)
        }
        if(this.getUser() && this.getUserData()) {
            const payload = {
                id: this.getUser().id,
                data: {
                    ObjectType: 20
                }
            }
            this.loading = true
            this.customerSearch(payload)
        }
    },

    watch: {
        getCustomerGroupList(val) {
            if(val) {
                this.countGroups()
            }
        },
        getCustomerSearched(val) {
            if(val && val != 0) {
                this.search = false
                this.loading = false
                this.groups = val
            }
            if(val && val == 0) {
                this.notification('No Group Found', 'warning')
                this.loading = false
                
            }
        },
        getGroupDetails(val) {
            if(val && val != 'failed') {
                this.loading = false
                this.groupCategories(val.FavoriteCategoryIds)
            }
            if(val && val == 'failed') {
                this.notification('Group Details Not Found', 'error')
                this.loading = false
                this.view = false
            }
        },
        getNewGroupRequest(val) {
            if(val && val == 'success') {
                this.notification('New Group Request Sent.', 'success')
                this.view = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong.', 'error')
            }
        }
    }
}
</script>

<style scoped>

.card-body {
    padding: 0;
    margin: 0;
}
.image-area, .border {
    border: 1px solid #eee;
}
.card-body p {
    margin: 0;
}
.body-area {
    background: #f9f9f9;
}
.btn-success {
    padding: 2px 30px;
    margin-top: 10px;
    background: green !important
}
.card:hover {
    cursor: pointer;
}
a {
    color: #fff !important;
}
</style>