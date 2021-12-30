<template>
  <div class="m-5">
    <div class="columns is-multiline m-5">
      <div class="column is-12">
        <h1 class="title">Gifts</h1>
      </div>
      <div class="column is-6" v-for="item in gifts" v-bind:key="item.order.id">
        <div class="box">
          <h3 class="is-size-4">
            From: <b>{{ item.order.maker_name }}</b>
          </h3>
          <h3 class="is-size-4">
            To: <b>{{ item.receiver.username }}</b>
          </h3>
          <h3 class="is-size-4">
            Date Gifted: <b>{{ item.order.date_added }}</b>
          </h3>
          <h3 class="is-size-4">
            Amount: <b>{{ item.order.amount }}</b>
          </h3>
          <router-link
            v-bind:to="item.order.product"
            class="button is-dark mt-4"
          >
            View
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gift",
  data() {
    return {
      gifts: [],
    };
  },
  mounted() {
    document.title = "Gift | E-Commerce";
    this.getGifts();
  },
  methods: {
    getGifts() {
      axios
        .get("/api/v1/gifts/",{params:{type :"sent"}})
        .then((response) => {
          console.log(response);
          this.gifts = response.data;
          for (var i = 0; i < this.gifts.length; i++) {
            this.gifts[i].order.product =
              "/products/" + this.gifts[i].order.product;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
