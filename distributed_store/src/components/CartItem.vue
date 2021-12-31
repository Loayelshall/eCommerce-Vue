<template>
  <tr>
    <td>
      <router-link :to="item.product.url">{{ item.product.name }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <h4>{{ item.quantity }}</h4>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td>
      <div class="field has-addons">
        <p class="control">
          <button class="button is-info" @click="incrementQuantity(item)">
            +
          </button>
        </p>
        <p class="control">
          <button class="button is-dark" @click="decrementQuantity(item)">
            -
          </button>
        </p>
      </div>
    </td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }

      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;

      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);

      this.updateCart();
    },
  },
};
</script>
