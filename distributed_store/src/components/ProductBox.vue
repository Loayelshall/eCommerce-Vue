<template>
  <div class="column is-4 has-text-centered">
    <div class="box">
      <figure class="image mb-4">
        <img v-bind:src="product.image_thumbnail" />
      </figure>
      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>
      <router-link v-bind:to="product.url" class="button is-dark mt-4">
        View
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: Object,
  },
};
</script>
