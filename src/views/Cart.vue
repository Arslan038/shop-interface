<template>
    <div class="cart">
        <div class="row no-gutters">
            <div class="col-12">
                <Navbar @clicked="sideBar"/>
            </div>
            <div :class="isOpen ? 'col-md-10 offset-md-2' : 'col-md-12'">
                <div class=" mt-1 px-3">
                    <h4 class="text-orange text-uppercase pt-1">Cart</h4>
                    <p class="pb-3">List of items</p>
                </div>
                
                <div class="body-area">
                  <div class="row mx-2 pb-5 mt-3" v-if="cart">
                    <div class="col-md-8 col-12 mt-3">
                      <div class="row" v-if="!cart.Coupons || !cart.Coupons.length">
                        <div class="item-area col-10 offset-2">
                          <h6 class="text-orange"><strong>No Coupons Found</strong></h6>
                        </div>
                      </div>
                      <div class="row mt-3" v-for="item in cart.Coupons" :key="'coupon'+item.Id">
                        <div class="col-2">
                          <img :src="item.PhotoUrl" width="100%" alt="">
                        </div>
                        <div class="col-10 item-area">
                          <div class="row">
                            <div class="col-7">
                              <h6><strong>{{item.Title}}</strong></h6>
                              <img src="../assets/coupon.png" width="12%" alt="">
                            </div>
                            <div class="col-5 text-right">
                              <p><strong>{{item.Cost}}</strong></p>
                              <i class="fa fa-trash text-orange" @click="deleteItem('Coupons', item.Title, 7, item.Id)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="!cart.Credits || !cart.Credits.length">
                        <div class="item-area col-10 offset-2">
                          <h6 class="text-orange"><strong>No Credits Found</strong></h6>
                        </div>
                      </div>

                      <!-- <div class="row mt-3" v-for="item in cart.Credits" :key="'credit'+item.Id">
                        <div class="col-2">
                          <img v-if="item.PhotoUrl" :src="item.PhotoUrl" width="100%" alt="">
                        </div>
                        <div class="col-10 item-area">
                          <div class="row">
                            <div class="col-7">
                              <h6><strong>{{item.Description}}</strong></h6>
                              <img src="../assets/credit.png" width="12%" alt="">
                            </div>
                            <div class="col-5 text-right">
                              <p><strong>{{item.Cost}}</strong></p>
                              <i class="fa fa-trash text-orange" @click="deleteItem('Credits', item.Description, 18, item.Id)"></i>
                            </div>
                          </div>
                        </div>
                      </div> -->
                      <div class="row" v-if="!cart.Discounts || !cart.Discounts.length">
                        <div class="item-area col-10 offset-2">
                          <h6 class="text-orange"><strong>No Discount Found</strong></h6>
                        </div>
                      </div>
                      <div class="row mt-3" v-for="item in cart.Discounts" :key="'discount'+item.Id">
                        <div class="col-2">
                          <img :src="item.PhotoUrl" width="100%" alt="">
                        </div>
                        <div class="col-10 item-area">
                          <div class="row">
                            <div class="col-7">
                              <h6><strong>{{item.Title}}</strong></h6>
                              <img src="../assets/discount.png" width="12%" alt="">
                            </div>
                            <div class="col-5 text-right">
                              <p><strong>{{item.Cost}}</strong></p>
                              <i class="fa fa-trash text-orange" @click="deleteItem('Discounts', item.Title, 11, item.Id)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="!cart.Notifications || !cart.Notifications.length">
                        <div class="item-area col-10 offset-2">
                          <h6 class="text-orange"><strong>No Notification Found</strong></h6>
                        </div>
                      </div>

                      <div class="row mt-3" v-for="item in cart.Notifications" :key="'notification'+item.Id">
                        <div class="col-2">
                          <img v-if="item.PhotoUrl" :src="item.PhotoUrl" width="100%" alt="">
                        </div>
                        <div class="col-10 item-area">
                          <div class="row">
                            <div class="col-7">
                              <h6><strong>{{item.Title}}</strong></h6>
                              <img src="../assets/notification.png" width="12%" alt="">
                            </div>
                            <div class="col-5 text-right">
                              <p><strong>{{item.Cost}}</strong></p>
                              <i class="fa fa-trash text-orange" @click="deleteItem('Notifications', item.Title, 5, item.Id)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 col-12 mt-4" v-if="cart">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-6">
                              <h4>Total</h4>
                            </div>
                            <div class="col-6 text-right">
                              <h4><strong>{{cart.Cost}}</strong></h4>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-5">
                              <h6><strong>Sub-total:</strong></h6>
                            </div>
                            <div class="col-7 text-right">
                              <h6><strong>{{cart.TotalCost.toFixed(2)}}</strong></h6>
                            </div>
                            <div class="col-5">
                              <h6><strong>TPS:</strong></h6>
                            </div>
                            <div class="col-7 text-right">
                              <h6><strong>{{cart.Taxe1.toFixed(2)}}</strong></h6>
                            </div>
                            <div class="col-5">
                              <h6><strong>TVQ:</strong></h6>
                            </div>
                            <div class="col-7 text-right">
                              <h6><strong>{{cart.Taxe2.toFixed(2)}}</strong></h6>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-12 text-center">
                              <img src="../assets/visa.svg" width="23%" alt="">
                              <img src="../assets/mastercard.svg" width="33%" alt="">
                              <img src="../assets/paypal.png" width="33%" alt="">

                              <button class="btn btn-primary btn-block mt-4 text-uppercase">Checkout</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <b-modal title="Delete Item" :hide-footer="true" v-model="deleteModal">
                  <div class="row">
                    <div class="col-12 text-center" v-if="itemToDelete">
                      <h5>Are you sure you want to delete <span class="text-orange">{{itemToDelete.Title}}</span> from <span class="text-orange">{{itemToDelete.from}}</span></h5>
                    </div>
                    <div class="col-6 mt-3">
                      <button class="btn btn-primary btn-block" @click="removeItem">Yes, Delete</button>
                    </div>
                    <div class="col-6 mt-3">
                      <button class="btn btn-secondary btn-block" @click="deleteModal = !deleteModal">No, Cancel</button>
                    </div>
                  </div>
                </b-modal>
                
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
    name: "Cart",
    mixins: [mixin],
    components: {
        Navbar,
        Sidebar,
        Footer
    },
    computed: {
      ...mapGetters(['getCart', 'getItemDeleted']),
      getClass() {
          console.log(this.isOpen)
          return this.isOpen ? 'col-md-12' : 'col-md-12'
      }
    },
    data() {
        return {
          isOpen: true,
          deleteModal: false,
          cart: null,
          itemToDelete: {
            type: null,
            from: null,
            Id: null,
            id: null,
            Title: null,
          }
        }
    },
    methods: {
      ...mapActions(['fetchCart', 'deleteCartItem']),
        sideBar(value) {
            this.isOpen = !this.isOpen
            console.log(value)
        },
        deleteItem(from, title, type, id) {
          this.itemToDelete.from = from
          this.itemToDelete.type = type
          this.itemToDelete.Id = id
          this.itemToDelete.id = this.getUser().id
          this.itemToDelete.Title = title

          this.deleteModal = true
        },
        removeItem() {
          this.deleteCartItem(this.itemToDelete)
        }
    },

    created() {
      if(this.getUser()) {
        const payload = {
          id: this.getUser().id
        }
        this.fetchCart(payload)
      }
    },

    watch: {
      getCart(val) {
        if(val) {
          this.cart = val
        }
      },
      getItemDeleted(val) {
        if(val && val == 'success') {
            this.notification('Item Deleted Successfully', 'success')
            this.deleteModal = false
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
.item-area {
  padding: 10px;
  border: 1px solid #eee;
} 
i:hover {
  cursor: pointer;
}
</style>
