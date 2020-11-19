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
                            <h5 class="text-orange"><strong>Help and Contact</strong></h5>
                            <p>Intro text :</p>
                        </div>
                    </div>
                    <form @submit.prevent="send">
                        <div class="row mx-5">
                            <div class="col-md-6 col-12 mt-3">
                                <input type="text" v-model="contact.Title" class="form-control" required placeholder="subject">
                            </div>
                            <div class="col-md-6 col-12">
                            </div>
                            <div class="col-md-6 col-12 mt-3">
                                <textarea class="form-control" v-model="contact.Message" required placeholder="Message..." rows="4"></textarea>
                            </div>
                        </div>
                        <div class="row mx-5 pb-5 mt-3">
                            <div class="col-12">
                                <button class="btn btn-secondary px-5 py-2">Send</button>
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
import { mapGetters, mapActions } from 'vuex'
import mixin from '../mixins/global'
export default {
    name: "Contact",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        ...mapGetters(['getRequestStatus']),
        getClass() {
            console.log(this.isOpen)
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            isOpen: true,
            openTeamModal: false,
            contact: {
                id: null,
                RequestType: 0,
                FromType: 2,
                FromName: null,
                FromSystem: false,
                FromId: null,
                Title: null,
                Message: null,
                MustMakeDecision: true
            }
        }
    },
    methods: {
        ...mapActions(['sendRequest']),
        sideBar(value) {
            this.isOpen = !this.isOpen
        },
        send() {
            this.contact.id = this.getUser().id
            this.contact.FromId = this.getUser().shop
            this.contact.FromName = this.getUserData().Shop.Name
            //console.log(this.contact)
            this.sendRequest(this.contact)
        }
    },

    watch: {
        getRequestStatus(val) {
            if(val && val == 'success') {
                this.notification('Message Sent Successfully', 'success')
                this.contact.Title = null
                this.contact.Message = null
            }
            if(val && val != 'success') {
                this.notification('Something went wrong', 'error')
            }
        }
    }
}
</script>

<style scoped>
.body-area {
    background: #f9f9f9;
    min-height: 355px;
}
.image {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    display: inline-block;
    margin-top: 10px;
}
</style>