<template>
    <div class="dashboard">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                <div class="title-area mt-1 px-3">
                    <h4 class="text-orange text-uppercase pt-1">title</h4>
                    <p class="pb-3"><strong>Description:</strong> This is Description Text</p>
                </div>

                <div class="body-area mt-1">
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
export default {
    name: "Dashboard",
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
        getClass() {
            return this.isOpen ? 'col-md-12' : 'col-md-12'
        }
    },
    data() {
        return {
            isOpen: true,
        }
    },
    methods: {
        sideBar(value) {
            this.isOpen = !this.isOpen
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
    height: 355px;
}
</style>