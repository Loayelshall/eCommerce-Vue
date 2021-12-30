<template>
  <div class="page-my-account m-5">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">My Store</h1>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">Add New Products:</h2>
        <div class="box mb-4">
          <form enctype="multipart/form-data" @submit.prevent="submitNewItem">
            <div class="column is-6 field">
              <label>Category</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="itemCategory" required>
                    <option value="" disabled>Select Category</option>
                    <option
                      v-for="category in categories"
                      :value="category.id"
                      v-bind:key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Name</label>
              <div class="control">
                <input type="text" class="input" v-model="itemName" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Description</label>
              <div class="control">
                <input type="text" class="input" v-model="itemDescription" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Price</label>
              <div class="control">
                <input type="number" class="input" v-model="itemPrice" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Amount</label>
              <div class="control">
                <input type="number" class="input" v-model="itemAmount" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>For Sale</label>
              <div class="control">
                <input type="radio" value="1" v-model="itemOnSale" />
                <label> Yes</label>
                <br />
                <input type="radio" value="0" v-model="itemOnSale" />
                <label> No</label>
              </div>
            </div>

            <div class="notification is-danger" v-if="errorsItem.length">
              <p v-for="error in errorsItem" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="column is-6 field">
              <div class="control">
                <button class="button is-dark">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My Products</h2>
        <div class="box mb-4">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
                <th>For Sale</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product.id">
                <td>{{ product.name }}</td>
                <td>${{ product.price }}</td>
                <td>{{ product.no_of_pieces }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category_name }}</td>
                <td>{{ product.on_sale }}</td>
                <td>
                  <div class="field has-addons">
                    <p class="control">
                      <button
                        class="button is-dark"
                        @click="displayModal(product.id, 1, product)"
                      >
                        Edit
                      </button>
                    </p>
                    <p class="control">
                      <button
                        class="button is-danger"
                        @click="deleteProduct(product.id)"
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                  <div :id="product.id" class="modal">
                    <div
                      class="modal-background"
                      @click="displayModal(product.id, 0, '')"
                    ></div>
                    <div class="modal-content">
                      <div class="box">
                        <h4 class="title">Edit Product</h4>
                        <form
                          enctype="multipart/form-data"
                          @submit.prevent="editItem"
                        >
                          <div class="column is-6 field">
                            <label>Category</label>
                            <div class="control">
                              <div class="select is-fullwidth">
                                <select v-model="editedItemCategory" required>
                                  <option value="" disabled>
                                    Select Category
                                  </option>
                                  <option
                                    v-for="category in categories"
                                    :value="category.id"
                                    v-bind:key="category.id"
                                  >
                                    {{ category.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Name</label>
                            <div class="control">
                              <input
                                type="text"
                                class="input"
                                v-model="editedItemName"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Description</label>
                            <div class="control">
                              <input
                                type="text"
                                class="input"
                                v-model="editedItemDescription"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Price</label>
                            <div class="control">
                              <input
                                type="number"
                                class="input"
                                v-model="editedItemPrice"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Amount</label>
                            <div class="control">
                              <input
                                type="number"
                                class="input"
                                v-model="editedItemAmount"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>For Sale</label>
                            <div class="control">
                              <input
                                type="radio"
                                value="1"
                                v-model="editedItemOnSale"
                              />
                              <label> Yes</label>
                              <br />
                              <input
                                type="radio"
                                value="0"
                                v-model="editedItemOnSale"
                              />
                              <label> No</label>
                            </div>
                          </div>
                          <div
                            class="notification is-danger"
                            v-if="editedErrorsItem.length"
                          >
                            <p
                              v-for="error in editedErrorsItem"
                              v-bind:key="error"
                            >
                              {{ error }}
                            </p>
                          </div>
                          <div class="column is-6 field">
                            <div class="control">
                              <button class="button is-success">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Sold Products</h2>
        <div class="box mb-4">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in soldProducts" v-bind:key="product.id">
                  <td>{{ product.name }}</td>
                  <td>${{ product.price }}</td>
                  <td>{{ product.no_of_pieces }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.category_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Shared Products</h2>
        <div class="box mb-4">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>For Sale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="currProduct in sharedProducts"
                  v-bind:key="currProduct.id"
                >
                  <td>{{ currProduct.product.name }}</td>
                  <td>{{ currProduct.product.price }}</td>
                  <td>{{ currProduct.product.no_of_pieces }}</td>
                  <td>{{ currProduct.product.description }}</td>
                  <td>{{ currProduct.product.category_name }}</td>
                  <td>{{ currProduct.product.on_sale }}</td>
                  <td>
                    <div class="field has-addons">
                      <p class="control">
                        <button
                          class="button is-danger"
                          @click="deleteShare(currProduct.id)"
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "PersonalStore",
  data() {
    return {
      editedItemName: "",
      editedItemPrice: 0,
      editedItemCategory: 0,
      editedItemDescription: "",
      editedItemAmount: 0,
      editedItemOnSale: 0,
      editedErrorsItem: [],
      editingId: 0,
      itemName: "",
      itemPrice: 0,
      itemCategory: 0,
      itemDescription: "",
      itemAmount: 0,
      itemOnSale: 0,
      errorsItem: [],
      errorCat: [],
      categories: [],
      products: [],
      soldProducts: [],
      sharedProducts: [],
    };
  },
  mounted() {
    document.title = "My Store | E-Commerce";
    this.getCategories();
    this.getProducts();
    this.getSoldProducts();
    this.getSharedProducts();
  },
  methods: {
    submitNewItem() {
      this.errorsItem = [];
      if (this.itemName.length < 3) {
        this.errorsItem.push("Item name must be at least 3 characters long");
      }
      if (this.itemPrice < 1) {
        this.errorsItem.push("Item price must be at least 1");
      }
      if (this.itemCategory === 0) {
        this.errorsItem.push("Item category must be selected");
      }
      if (this.itemDescription.length < 5) {
        this.errorsItem.push(
          "Item description must be at least 5 characters long"
        );
      }
      if (this.itemAmount < 0) {
        this.errorsItem.push("Item amount must be at least 0");
      }
      if (this.errorsItem.length == 0) {
        axios
          .post(`/api/v1/products/`, {
            name: this.itemName,
            price: this.itemPrice,
            category: this.itemCategory,
            description: this.itemDescription,
            no_of_pieces: this.itemAmount,
            on_sale: this.itemOnSale,
            image_main: "http://127.0.0.1:8000/media/uploads/download.jpg",
            image_thumbnail: "http://127.0.0.1:8000/media/uploads/download.jpg",
          })
          .then((response) => {
            console.log(this.itemOnSale);
            console.log(response.data);
            toast({
              message: "Successfully added!",
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            this.getProducts();
            this.itemName = "";
            this.itemPrice = 0;
            this.itemCategory = 0;
            this.itemDescription = "";
            this.itemAmount = 0;
            this.itemOnSale = 0;
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data);
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
    editItem() {
      this.editedErrorsItem = [];
      if (this.editedItemName.length < 3) {
        this.editedErrorsItem.push(
          "Item name must be at least 3 characters long"
        );
      }
      if (this.editedItemPrice < 1) {
        this.editedErrorsItem.push("Item price must be at least 1");
      }
      if (this.editedItemCategory === 0) {
        this.editedErrorsItem.push("Item category must be selected");
      }
      if (this.editedItemDescription.length < 5) {
        this.editedErrorsItem.push(
          "Item description must be at least 5 characters long"
        );
      }
      if (this.editedItemAmount < 0) {
        this.editedErrorsItem.push("Item amount must be at least 0");
      }
      if (this.editedErrorsItem.length == 0) {
        axios
          .put(`/api/v1/products/${this.editingId}/`, {
            name: this.editedItemName,
            price: this.editedItemPrice,
            category: this.editedItemCategory,
            description: this.editedItemDescription,
            no_of_pieces: this.editedItemAmount,
            on_sale: this.editedItemOnSale,
          })
          .then((response) => {
            console.log(response.data);
            toast({
              message: "Successfully Edited!",
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            this.displayModal(this.editingId, 0, "");
            this.getProducts();
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data);
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
    getCategories() {
      axios
        .get(`/api/v1/latest-categories`)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          toast({
            message: `${error.response.data}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
    },
    getProducts() {
      axios
        .get(`/api/v1/products/`)
        .then((response) => {
          this.products = response.data;
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
    },
    getSoldProducts() {
      axios
        .get(`/api/v1/orders/sold`)
        .then((response) => {
          this.soldProducts = {};
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if (!this.soldProducts[response.data[i].product.id]) {
              response.data[i].product.no_of_pieces = response.data[i].amount;
              this.soldProducts[response.data[i].product.id] =
                response.data[i].product;
            } else {
              this.soldProducts[response.data[i].product.id].no_of_pieces +=
                response.data[i].amount;
            }
          }
        })
        .catch((error) => {
          console.log(error.response.data.response);
          toast({
            message: `${error.response.data.response}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
    },
    getSharedProducts() {
      axios
        .get(`/api/v1/shares/`)
        .then((response) => {
          this.sharedProducts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          this.sharedProducts = "";
        });
    },
    changeName(id) {
      let x = document.getElementById(id).value;
      let y = x.split("\\")[2];
      document.getElementById(id + "label").innerHTML = y;
    },
    deleteProduct(id) {
      console.log(id);
      axios
        .delete(`/api/v1/products/${id}`)
        .then((response) => {
          console.log(response);
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          toast({
            message: `${error.response.data}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
    },
    displayModal(id, toggle, product) {
      this.editedErrorsItem = [];
      if (toggle) {
        document.getElementById(id).classList.add("is-active");
        this.editedItemName = product.name;
        this.editedItemPrice = product.price;
        this.editedItemCategory = product.category;
        this.editedItemDescription = product.description;
        this.editedItemAmount = product.no_of_pieces;
        this.editedItemOnSale = product.on_sale;
        this.editingId = id;
      } else {
        document.getElementById(id).classList.remove("is-active");
      }
    },
    deleteShare(id) {
      axios
        .delete(`/api/v1/shares/${id}/`)
        .then((response) => {
          console.log(response);
          this.getSharedProducts();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.detail);
          toast({
            message: `${error.response.data.detail}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
    },
  },
};
</script>
