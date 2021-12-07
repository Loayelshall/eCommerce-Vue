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
              <td>{{ getItemTotal(item).toFixed(2) }}</td>
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
                <input type="text" class="input" v-model="email" />
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

          <div class="notification is-danger mt-4" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <template v-if="cartTotalLength">
            <hr />

            <button class="button is-dark">Pay</button>
          </template>
        </div>
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
      card: {},
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
    if (this.toCartTotalLength() > 0) {
      // add card
    }
  },
  methods: {
    getItemTotal(item) {
      return item.product.price * item.quantity;
    },
    submitForm() {
      this.errors = [];
      if (this.name.length === "") {
        this.errors.push("Name is required");
      }
      if (this.email.length === "") {
        this.errors.push("Email is required");
      }
      if (this.phone.length === "") {
        this.errors.push("Phone is required");
      }
      if (this.address.length === "") {
        this.errors.push("Address is required");
      }
      if (this.city.length === "") {
        this.errors.push("City is required");
      }
      if (this.zipcode.length === "") {
        this.errors.push("Zipcode is required");
      }
      if (!this.errors.length) {
        // stripe
      }
    },
    purchase() {
      const items = [];
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
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
