<template>
    <div class="reset-password">
        <div class="row mt-5">
            <div class="col-12 text-center">
                <img src="../assets/logo.png" width="130px" />
            </div>
        </div>
        <div class="row mb-5 mx-3">
            <div class="col-xl-4 col-lg-4 col-md-12 col-12 offset-xl-4 offset-lg-4">
                <div class="card mt-5 shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="text-orange">Reset My Password</h4>
                            </div>
                            <div class="col-2 text-right">
                                <i class="fa fa-times fa-2x" @click="move('/manager-account')"></i>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <p><strong>Enter the temporary password that was sent to you, followed by your new password twice.</strong></p>
                                <form @submit.prevent="reset">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="password" class="form-control mt-3" placeholder="Enter your temporary password">
                                            <input type="password" class="form-control mt-3" placeholder="New Password">
                                            <input type="password" class="form-control mt-3" placeholder="New Password">
                                            <p class="text-danger mt-3">The two passwords do not match.</p>
                                            <button class="btn btn-secondary btn-block mt-3">Confirm</button>
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
export default {
    name: 'ResetPassword',
    components: {
        //StaticHeader
    },
    methods: {
        move(to) {
            this.$router.push(to)
        }
    }
}
</script>

<style scoped>
.reset-password {
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
i:hover {
    cursor: pointer;
}
</style>