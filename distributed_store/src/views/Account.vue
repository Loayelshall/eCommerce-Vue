<template>
  <div class="page-my-account">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">Account</h1>
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
  },
};
</script>
