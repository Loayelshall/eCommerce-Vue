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
        <form @submit.prevent="purchase">
          <p class="has-text-grey mb-4">* All fields are required</p>
          <div class="column is-multiline">
            <div class="column is-6">
              <div class="field">
                <label>Name *</label>
                <div class="control">
                  <input type="text" class="input" v-model="name" />
                </div>
              </div>
              <div class="field">
                <label>Email *</label>
                <div class="control">
                  <input type="email" class="input" v-model="email" />
                </div>
              </div>
              <div class="field">
                <label>Phone *</label>
                <div class="control">
                  <input type="text" class="input" v-model="phone" />
                </div>
              </div>
              <div class="field">
                <label>Address *</label>
                <div class="control">
                  <input type="text" class="input" v-model="address" />
                </div>
              </div>
              <div class="field">
                <label>City *</label>
                <div class="control">
                  <input type="text" class="input" v-model="city" />
                </div>
              </div>
              <div class="field">
                <label>Zip Code *</label>
                <div class="control">
                  <input type="text" class="input" v-model="zipcode" />
                </div>
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

export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipcode: "",
      errors: [],
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
    purchase() {
      const items = [];
      this.errors = [];
      if (this.name === "") {
        this.errors.push("Name is required");
      }
      if (this.email === "") {
        this.errors.push("Email is required");
      }
      if (this.phone === "") {
        this.errors.push("Phone is required");
      }
      if (this.address === "") {
        this.errors.push("Address is required");
      }
      if (this.city === "") {
        this.errors.push("City is required");
      }
      if (this.zipcode === "") {
        this.errors.push("Zipcode is required");
      }
      if (!this.errors.length) {
        console.log("purchasing");
        const data = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          city: this.city,
          zipcode: this.zipcode,
          items: items,
        };
        axios
          .post("/api/v1/checkout/", data)
          .then((response) => {
            console.log(response);
            this.$store.commit("clearCart");
            this.$router.push("/cart/success");
          })
          .catch((error) => {
            console.log(error);
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
