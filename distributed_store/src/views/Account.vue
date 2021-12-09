<template>
  <div class="page-my-account">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">Account</h1>
      </div>

      <hr />
      <div class="column is-12">
        <h2 class="subtitle">Information</h2>
        <div class="box mb-4">
          <h3 class="is-size-4 mb-6">Username: {{ username }}</h3>
          <h3 class="is-size-4 mb-6">Email: {{ email }}</h3>
          <h3 class="is-size-4 mb-6">Cash: ${{ cash }}</h3>
          <h3 class="is-size-4 mb-6">Phone: {{ phone }}</h3>

          <div class="field has-addons">
            <p class="control">
              <button
                class="button is-dark"
                @click="displayModal('editModal', 1)"
              >
                Edit Profile
              </button>
            </p>
          </div>
          <div id="editModal" class="modal">
            <div
              class="modal-background"
              @click="displayModal('editModal', 0)"
            ></div>
            <div class="modal-content">
              <div class="box">
                <h4 class="title">Edit Profile</h4>
                <form>
                  <div class="column is-12 field">
                    <label>Username</label>
                    <div class="control">
                      <input
                        type="text"
                        class="input"
                        v-model="editedItemName"
                      />
                    </div>
                  </div>
                  <div class="column is-12 field">
                    <label>Email</label>
                    <div class="control">
                      <input
                        type="text"
                        class="input"
                        v-model="editedItemName"
                      />
                    </div>
                  </div>
                  <hr />
                  <button class="button is-success">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
                <div class="box">
          <button class="button is-dark" @click="toggle('addCash', 'sendCash')">
            Add Cash
          </button>
          <button
            class="button is-dark ml-4"
            @click="toggle('sendCash', 'addCash')"
          >
            Send Cash
          </button>

          <form id="addCash" hidden @submit.prevent="submitForm">
            <div class="field">
              <label>Cash Amount</label>
              <div class="control">
                <input type="number " min="0" class="input" v-model="addCash"/>
              </div>
            </div>
            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-success">Add</button>
              </div>
            </div>
          </form>

          <form id="sendCash" hidden @submit.prevent="submitForm">
            <div class="field">
              <label>E-mail</label>
              <div class="control">
                <input type="email" class="input" v-model="emailCash"/>
              </div>
            </div>

            <div class="field">
              <label>Cash Amount</label>
              <div class="control">
                <input type="text" class="input" v-model="sendCash"/>
              </div>
            </div>

            <div class="notification is-danger" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-success" @click="sendcash">Send</button>
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
      info:[],
      cash: 0,
      addCash:0,
      username: "",
      errors: [],
      phone:'',
      emailCash:"",
      sendCash:0,
    };
  },
  mounted() {
    document.title = "Account | E-Commerce";
    this.getOrders();
    this.getInfo();
  },
  methods: {
    toggle(id, id2) {
      let temp = document.getElementById(id);
      if (temp.hidden == true) {
        document.getElementById(id).hidden = false;
        document.getElementById(id2).hidden = true;
      } else {
        document.getElementById(id).hidden = true;
        document.getElementById(id2).hidden = false;
      }
    },
    getInfo(){
      axios
        .get("/api/v1/profile/")
        .then((response) => {
          this.info = response.data;
          this.cash = this.info.cash;
          this.email = this.info.user.email;
          this.phone = this.info.phone;
          this.username = this.info.user.username;
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      
    },
    getOrders() {
      axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      this.errors=[]
      if (this.addCash > 0) {
        axios
          .post("/api/v1/profile/deposit/", {
            value: this.addCash,
          })
          .then((response) => {
            this.addCash = 0;
            console.log(response);
            this.getInfo();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errors = ["Please enter a valid amount"];
      }
    },
    sendcash(){
      this.errors=[]
      if (this.sendCash > 0) {
      axios
      .post("/api/v1/profile/deposit/", {
            value: this.sendCash,
          })
          .then((response) => {
            this.sendCash = 0;
            console.log(response);
            this.getInfo();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errors = ["Please enter a valid amount"];
      }
    },
    displayModal(id, toggle) {
      this.editedErrorsItem = [];
      if (toggle) {
        document.getElementById(id).classList.add("is-active");
        // this.editedItemName = product.name;
        // this.editedItemPrice = product.price;
        // this.editedItemCategory = product.category;
        // this.editedItemDescription = product.description;
        // this.editedItemAmount = product.no_of_pieces;
        // this.editedItemOnSale = product.on_sale;
        // this.editingId = id;
      } else {
        document.getElementById(id).classList.remove("is-active");
      }
    },
  },
};
</script>
<script></script>
