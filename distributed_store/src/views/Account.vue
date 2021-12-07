<template>
  <div class="page-my-account">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">Account</h1>
      </div>

      <hr />
      <div class="column is-12">
        <h2 class="title">Information</h2>
        <div class="box mb-4">
          <h3 class="is-size-4 mb-6">Username: {{ username }}</h3>
          <h3 class="is-size-4 mb-6">Cash: ${{ cash }}</h3>
          <form @submit.prevent="submitForm">
            <h4 class="subtitle">Add Cash</h4>
            <div class="field">
              <label>Cash Amount</label>
              <div class="control">
                <input type="text" class="input" v-model="cash" />
              </div>
            </div>
            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-dark">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My Orders</h2>

        <OrderSummary
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:order="order"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "../components/OrderSummary.vue";
export default {
  name: "Account",
  components: {
    OrderSummary,
  },
  data() {
    return {
      orders: [],
      cash: 0,
      username: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Account | E-Commerce";
    this.getOrders();
  },
  methods: {
    getOrders() {
      axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      if (this.cash > 0) {
        axios
          .post("/api/v1/account/add-cash", {
            cash: this.cash,
          })
          .then((response) => {
            this.cash = 0;
            console.log(response);
            this.getOrders();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errors = ["Please enter a valid amount"];
      }
    },
  },
};
</script>
