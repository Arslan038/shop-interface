<template>
    <div class="my-team">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">

                <div class="body-area mt-1">
                    <div class="row mx-5 pt-3">
                        <div class="col-12">
                            <h5 class="text-orange"><strong>My Team</strong></h5>
                            <button class="btn btn-secondary mt-3" @click="openTeamModal = !openTeamModal">Add a team member</button>

                            <div class="table-responsive mt-5">
                                <a-table
                                    class="table"
                                    :columns="columns"
                                    :dataSource="teams"
                                    rowKey="Id"
                                    :scroll="{ x: 900 }"
                                    :loading="loading">
                                    <span slot="role" slot-scope="id, record">
                                        <span v-if="record.ManagerId">Manager</span>
                                        <span v-else>Team Member</span>
                                    </span>
                                    <span slot="actions" slot-scope="id, record">
                                       
                                        <i class="fa fa-pencil text-orange" @click="edit(record)"></i>
                                        <i class="fa fa-trash text-orange ml-2" @click="remove(record)"></i>
                                    </span>
                                </a-table>
                            </div>
                        </div>
                    </div>
                </div>

                      
                
                <Footer />
            </div>
        </div>

        <b-modal title="Delete Member" :hide-footer="true" v-model="deleteModal">
            <div class="row">
                <div class="col-12 text-center" v-if="member">
                    <h5>Are you sure you want to Delete "<span class="text-orange">{{member.Firstname}}</span>"</h5>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <button class="btn btn-primary btn-block" @click="removeNow(member.Id)">Yes, Delete</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-secondary btn-block" @click="deleteModal = !deleteModal">No, Cancel</button>
                </div>
            </div>
        </b-modal>

        <b-modal title="Team member details" v-model="openTeamModal" :hide-footer="true">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="addMember">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <label><strong>First Name</strong></label>
                                <input type="text" class="form-control" v-model="team.Firstname" placeholder="Enter First Name" required>
                            </div>
                            <div class="col-12 mt-3">
                                <label><strong>Phone</strong></label>
                                <input type="text" class="form-control" placeholder="Enter Phone" v-model="team.Phone" required>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-secondary mt-3">Save and Exit</button>
                            </div>
                            <div class="col-6 text-right">
                                <a class="btn btn-secondary mt-3" @click="openTeamModal = !openTeamModal">Exit without save</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </b-modal>

        <b-modal title="Team member details" v-model="openTeamEditModal" :hide-footer="true">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="editMember">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <label><strong>Code</strong></label>
                                <input type="text" class="form-control" v-model="editTeam.Code" disabled placeholder="Enter Code" required>
                            </div>
                            <div class="col-12 mt-3">
                                <label><strong>Password</strong></label>
                                <input type="password" class="form-control" v-model="editTeam.Password" placeholder="Enter Password" required>
                            </div>
                            <div class="col-12 mt-3">
                                <label><strong>First Name</strong></label>
                                <input type="text" class="form-control" v-model="editTeam.Firstname" placeholder="Enter First Name" required>
                            </div>
                            <div class="col-12 mt-3">
                                <label><strong>Phone</strong></label>
                                <input type="text" class="form-control" placeholder="Enter Phone" v-model="editTeam.Phone" required>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-secondary mt-3">Save and Exit</button>
                            </div>
                            <div class="col-6 text-right">
                                <a class="btn btn-secondary mt-3" @click="openTeamEditModal = !openTeamEditModal">Exit without save</a>
                            </div>
                        </div>
                    </form>
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
    name: "MyTeam",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getTeam', 'getMemberDeleted', 'getMemberAdded', 'getMemberUpdated']),
        teams() {
            return this.getTeam
        },
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            loading: false,
            isOpen: true,
            openTeamModal: false,
            openTeamEditModal: false,
            deleteModal: false,
            member: null,
            team: {
                id: null,
                Firstname: null,
                Phone: null,
                ShopId: null
            },
            editTeam: {
                id: null,
                Id: null,
                ShopId: null,
                Password: null,
                Firstname: null,
                Phone: null,
                Code: null
            },
            columns: [
                {
                    title: 'Code',
                    dataIndex: 'Code',
                    sorter: (a, b) => a.Code - b.Code,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'First Name',
                    dataIndex: 'Firstname',
                    sorter: (a, b) => a.Firstname.length - b.Firstname.length,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Phone',
                    dataIndex: 'Phone',
                },
                {
                    title: 'Role',
                    dataIndex: 'ManagerId',
                    
                    scopedSlots: { customRender: 'role' },
                    sorter: (a, b) => a.ManagerId - b.ManagerId,
                    sortDirections: ['descend', 'ascend'],

                },
                {
                    title: 'Actions',
                    scopedSlots: { customRender: 'actions' },
                },
            ]
        }
    },
    methods: {
        ...mapActions(['fetchTeam', 'deleteTeamMember', 'addTeamMember', 'updateTeamMember']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        edit(record) {
            this.editTeam.id = this.getUser().id
            this.editTeam.ShopId = this.getUser().shop
            this.editTeam.Id = record.Id
            this.editTeam.Code = record.Code
            this.editTeam.Password = record.Password
            this.editTeam.Phone = record.Phone
            this.editTeam.Firstname = record.Firstname
            this.openTeamEditModal = true
        },
        remove(record) {
            this.member = record
            this.deleteModal = true
        },
        removeNow(memberId) {
            const payload = {
                id: this.getUser().id,
                Id: memberId
            }
            this.deleteTeamMember(payload)
        },
        addMember() {
            this.addTeamMember(this.team)
        },
        editMember() {
            this.updateTeamMember(this.editTeam)
        }
    },
    created() {
        if(this.getUser()) {
            this.team.ShopId = this.getUser().shop
            this.team.id = this.getUser().id
            const payload = {
                id: this.getUser().id
            }
            this.fetchTeam(payload)
        }
    },

    watch: {
        getMemberDeleted(val) {
            if(val && val == 'success') {
                this.notification('Member Deleted Successfully', 'success')
                this.deleteModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
                
            }
        },
        getMemberAdded(val) {
            if(val && val == 'success') {
                this.notification('Member Added Successfully', 'success')
                this.openTeamModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
                
            }
        },
        getMemberUpdated(val) {
            if(val && val == 'success') {
                this.notification('Member Updated Successfully', 'success')
                this.openTeamEditModal = false
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
                
            }
        }
    }
}
</script>

<style scoped>
.title-area {
    border: 1px solid #E96928;
}
.body-area {
    background: #f9f9f9;
    min-height: 355px;
}
.image {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    display: inline-block;
    margin-top: 10px;
}
i:hover {
    cursor: pointer;
}
</style>