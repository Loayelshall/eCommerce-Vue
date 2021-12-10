<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>${{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Shipping Details</h2>
        <div class="m-3">
          <div class="field has-addons">
            <p class="control">
              <button class="button is-success" @click="showBuy(1)">
                Buy it
              </button>
            </p>
            <p class="control">
              <button class="button is-link" @click="showBuy(0)">
                Gift it
              </button>
            </p>
          </div>
        </div>
        <form id="gift" hidden @submit.prevent="gift">
          <p class="has-text-grey mb-4">* All fields are required</p>
          <div class="column is-multiline">
            <div class="field">
              <label>Email *</label>
              <div class="control">
                <input type="email" class="input" v-model="Giftname" />
              </div>
            </div>
          </div>
          <div class="notification is-danger mt-4" v-if="Gifterrors.length">
            <p v-for="error in Gifterrors" v-bind:key="error">{{ error }}</p>
          </div>
          <template v-if="cartTotalLength">
            <hr />
            <button class="button is-link">Gift</button>
          </template>
        </form>

        <form id="buy" hidden @submit.prevent="purchase">
          <div class="column is-multiline">
            <div class="field">
              <label>Address *</label>
              <div class="control">
                <input type="text" class="input" v-model="address" />
              </div>
            </div>
          </div>
          <div class="notification is-danger mt-4" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <template v-if="cartTotalLength">
            <hr />

            <button class="button is-success">Place Order</button>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      Giftname: "",
      errors: [],
      Gifterrors: [],
      address: "",
    };
  },
  mounted() {
    document.title = "Checkout | E-Commerce";
    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item) {
      return item.product.price * item.quantity;
    },
    showBuy(x) {
      if (x) {
        document.getElementById("buy").hidden = false;
        document.getElementById("gift").hidden = true;
      } else {
        document.getElementById("buy").hidden = true;
        document.getElementById("gift").hidden = false;
      }
    },
    purchase() {
      this.errors = [];
      let allPurchased = true;
      if (this.address.length < 1) {
        this.errors.push("Address is required");
        allPurchased = false;
      }
      if (allPurchased) {
        for (let i = 0; i < this.cart.items.length; i++) {
          let cust = {
            product: this.cart.items[i].product.id,
            amount: this.cart.items[i].quantity,
            location: this.address,
          };
          axios
            .post("/api/v1/orders/", cust)
            .then((response) => {
              console.log(response);
              this.$store.commit("clearCart");
              toast({
                message: `${this.cart.items[i].product.name} purchased successfully`,
                type: "is-success",
                duration: 5000,
                position: "top-center",
                dissmissable: true,
                pauseOnHover: true,
              });
              let cart = this.$store.state.cart;
              cart.items.splice(i, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
            })
            .catch((error) => {
              allPurchased = false;
              console.log(this.cart.items[i].product.name);
              toast({
                message: `${this.cart.items[i].product.name} ${error.response.data.response}`,
                type: "is-danger",
                duration: 5000,
                position: "top-center",
                dissmissable: true,
                pauseOnHover: true,
              });
            });
        }
        if (allPurchased) {
          // this.$router.push("/cart");
          this.$router.push("/");
        }
      }
    },
    gift() {
      this.Gifterrors = [];
      if (this.Giftname === "") {
        this.Gifterrors.push("E-mail is required");
      }
      if (!this.Gifterrors.length) {
        const data = {
          email: this.Giftname,
          items: this.cart.items,
        };
        axios
          .post("/api/v1/gifts/", data)
          .then((response) => {
            console.log(response);
            this.$store.commit("clearCart");
            for (let res in response.data) {
              console.log(response.data[res])
              console.log(Object.prototype.hasOwnProperty.call(response.data[res], "response"))
              if (Object.prototype.hasOwnProperty.call(response.data[res], "response")) {
                toast({
                  message: `${response.data[res].response}`,
                  type: "is-danger",
                  duration: 5000,
                  position: "top-center",
                  dissmissable: true,
                  pauseOnHover: true,
                });
              } else {
                toast({
                  message: "Gifted!",
                  type: "is-success",
                  duration: 5000,
                  position: "top-center",
                  dissmissable: true,
                  pauseOnHover: true,
                });
              }
            }

            this.$router.push("/cart");
          })
          .catch((error) => {
            console.log(error);
            toast({
              message: `${error.response.data}`,
              type: "is-danger",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
          });
      }
    },
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += this.getItemTotal(curVal));
      }, 0);
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>
