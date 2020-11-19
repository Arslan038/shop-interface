<template>
    <div class="customer-group">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
               
                <div class="body-area mt-1 pb-5">
                    <div class="row mx-5 pt-3">
                        <div class="col-12 py-3">
                            <h5 class="text-orange" v-if="getCustomerGroupList"><strong>Customer Groups ({{countGroups.total}}/{{countGroups.limit}})</strong></h5>
                        </div>
                        <div class="col-md-6 col-6">
                            <div class="row">
                                <div class="col-6">
                                    <select class="form-control" @change="sortGroups">
                                        <option :value="null">Sort By</option>
                                        <option value="name">Name</option>
                                        <option value="group">Type of group</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row mx-5 mt-3">
                        <div class="col-12 text-center" v-if="loading">
                            <b-spinner type="grow" label="Spinning"></b-spinner>
                            <p class="text-orange">Loading Groups...</p>
                        </div>
                        <div class="col-6 col-md-2" v-for="(customerGroup, index) in groups" :key="index">
                            <div class="card" @click="view(customerGroup)">
                                <div class="card-body text-center">
                                    <div class="image-area border">
                                        <img :src="findType(customerGroup.UserGroupType).Parameter" width="100" alt="">
                                    </div>
                                    <div class="text-left px-3 pb-4 pt-3 border">
                                        <p><strong>{{customerGroup.UserGroupName}} </strong></p>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger" @click="deleteDialog(customerGroup)">X</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

        <!-- Delete Modal -->

        <b-modal title="Delete Customer Group" v-model="deleteModal" hide-footer>
            <div v-if="groupToDelete">
                <div class="row">
                    <div class="col-12 text-center">
                        <h6>Are you sure you want to delete <span class="text-orange">{{groupToDelete.UserGroupName}}</span> ?</h6>
                    </div>
                    <div class="col-6 mt-3">
                        <button class="btn btn-danger btn-block" @click="deleteNow">Yes, Delete</button>
                    </div>
                    <div class="col-6 mt-3">
                        <button class="btn btn-secondary btn-block" @click="cancel">No, Cancel</button>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- Details Modal -->

        <b-modal :title="selectedGroup ? 'Group: '+ selectedGroup.UserGroupName : 'Group '" size="lg" :hide-footer="true" v-model="group">
            <div class="row">
                <div class="col-12 text-center" v-if="loading">
                    <b-spinner type="grow" label="Spinning"></b-spinner>
                    <p class="text-orange">Loading Group Details...</p>
                </div>
            </div>
            <div class="row" v-if="groupDetails">
                <div class="col-md-6 col-12 mt-3">
                    <p>Quantity of members: <strong>{{groupDetails.Members && groupDetails.Members.length}}</strong></p>
                    
                </div>
                <div class="col-md-6 col-12 mt-3">
                    {{groupDetails.UserGroupType}}
                    <p>Type of group: <strong v-if="selectedGroup">{{findType(selectedGroup.UserGroupType).Description.Strings.English}}</strong></p>
                    <p>City: <strong>{{groupDetails.City}}</strong></p>
                </div>

                <div class="col-4 mt-3" v-for="(category, index) in cats" :key="index">
                    <strong>{{index+1}}. {{category.Description.Strings.English != "" ? category.Description.Strings.English : category.Description.Strings.French}}</strong>
                </div>
                <div class="col-12 mt-3">
                    <textarea placeholder="Description..." v-model="groupDetails.Description" disabled class="form-control"></textarea>
                </div>
                <div class="col-6 mt-3">
                    <button class="btn btn-secondary" @click="group = !group">Exit</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: "CustomerGroup",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getCustomerGroupList', 'getGroupDetails', 'getGroupDeleted']),
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
                return this.getUserData().Cities
            }
            return
        },
        shopCategories() {
            if(this.getUserData()) {
                return this.getUserData().ShopCategories
            }
            return
        },
        groupTypes() {
            if(this.getUserData()) {
                return this.getUserData().GroupTypes
            }
            return
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
    data() {
        return {
            isOpen: true,
            group: false,
            search: false,
            range: null,
            groups: null,
            cats: [],
            loading: false,
            selectedGroup: null,
            deleteModal: false,
            groupToDelete: null,
            limitReached: false,
        }
    },
    methods: {
        ...mapActions(['fetchListOfCustomerGroups', 'customerGroupDetails', 'deleteCustomerGroup']),
        findType(id) {
            let g = this.getUserData().GroupTypes.find(i => i.Id == id)
            if(g) {
                return g
            }
        },
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        view(group) {
            this.selectedGroup = group
            const payload = {
                id: this.getUser().id,
                groupId: group.Id
            }
            this.loading = true
            this.group = true
            //console.log(payload)
            this.customerGroupDetails(payload)
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
                this.groups = this.getCustomerGroupList
            }
        },

        deleteDialog(group) {
            this.groupToDelete = group
            this.deleteModal = true
        },
        cancel() {
            this.deleteModal = false
        },
        deleteNow() {
            const payload = {
                id: this.getUser().id,
                groupId: this.groupToDelete.Id
            }
            this.deleteCustomerGroup(payload)
        }
    },

    created() {
        const payload = {
            id: this.getUser().id
        }
        this.loading = true
        this.fetchListOfCustomerGroups(payload)
    },

    watch: {
        getCustomerGroupList(val) {
            if(val) {
                this.loading = false
                this.groups = val
            }
        },
        getGroupDetails(val) {
            if(val && val != 'failed') {
                this.groupCategories(val.FavoriteCategoryIds)
                this.loading = false
            }
            if(val && val == 'failed') {
                this.notification('Group Details Not Found', 'error')
                this.loading = false
            }
        },
        getGroupDeleted(val) {
            if(val && val == 'success') {
                this.notification('Customer Group Deleted Successfully.', 'success')
                this.deleteModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong!', 'error')
                this.deleteModal = false
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
.group-list p {
    margin: 0;
}
</style>