<template>
  <div class="page-my-account m-5">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">Account</h1>
      </div>
      <hr />
      <div class="column is-12">
        <h2 class="subtitle">Information</h2>
        <div class="box mb-4">
          <h3 class="is-size-4 mb-6">Cash: ${{ cash }}</h3>
          <h3 class="is-size-4 mb-6">Username: {{ username }}</h3>
          <h3 class="is-size-4 mb-6">Email: {{ email }}</h3>
          <h3 class="is-size-4 mb-6">Phone: {{ phone }}</h3>
          <h3 class="is-size-4 mb-6">Location: {{ location }}</h3>
          <h3 class="is-size-4 mb-6">Gender: {{ sex }}</h3>

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
                <form @submit.prevent="editProfile">
                  <div class="column is-12 field">
                    <label>Location</label>
                    <div class="control">
                      <input
                        type="text"
                        class="input"
                        v-model="editedLocation"
                      />
                    </div>
                  </div>
                  <div class="column is-12 field">
                    <label>Birth Date</label>
                    <div class="control">
                      <input type="date" class="input" v-model="editedBirth" />
                    </div>
                  </div>
                  <div class="column is-12 field">
                    <label>Phone</label>
                    <div class="control">
                      <input type="text" class="input" v-model="editedPhone" />
                    </div>
                  </div>
                  <div class="column is-12 field">
                    <label>Gender</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="editedSex">
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    class="notification is-danger"
                    v-if="editedErrors.length"
                  >
                    <p v-for="error in editedErrors" v-bind:key="error">
                      {{ error }}
                    </p>
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
          <div class="field has-addons">
            <p class="control">
              <button class="button" @click="toggle('addCash', 'sendCash')">
                Add Cash
              </button>
            </p>
            <p class="control">
              <button class="button" @click="toggle('sendCash', 'addCash')">
                Send Cash
              </button>
            </p>
          </div>

          <div id="addCash" hidden>
            <div>
              <div class="m-4" id="card-element"></div>
              <label>Cash Amount</label>
              <input type="text" class="input w-50 m-1" v-model="cashDeposit" />
              <button class="button is-dark" @click="checkout()">
                Pay With Stripe
              </button>
            </div>
          </div>

          <form id="sendCash" hidden @submit.prevent="transactionCash">
            <div class="field">
              <label>E-mail</label>
              <div class="control">
                <input type="email" class="input" v-model="emailCash" />
              </div>
            </div>

            <div class="field">
              <label>Cash Amount</label>
              <div class="control">
                <input type="text" class="input" v-model="sendCash" />
              </div>
            </div>

            <div class="notification is-danger" v-if="transErrors.length">
              <p v-for="error in transErrors" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-info">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My Orders</h2>
        <!-- 
        <OrderSummary
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:order="order"
        /> -->

        <div class="box mb-4" v-for="order in orders" v-bind:key="order.id">
          <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>
          <h4 class="is-size-5">Products</h4>
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
              <tr>
                <td>{{ order.product.name }}</td>
                <td>${{ order.product.price }}</td>
                <td>{{ order.amount }}</td>
                <td>${{ order.amount * order.product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
// import OrderSummary from "../components/OrderSummary.vue";
export default {
  name: "Account",
  // components: {
  //   OrderSummary,
  // },
  data() {
    return {
      orders: [],
      info: [],
      cash: 0,
      addCash: 0,
      username: "",
      errors: [],
      phone: "",
      location: "",
      sex: "",
      emailCash: "",
      sendCash: 0,
      transErrors: [],
      editedLocation: "",
      editedBirth: "0000-00-00",
      editedPhone: "",
      editedSex: "",
      editedErrors: [],
      user_id: 0,
      stripe: {},
      cashDeposit: 0,
    };
  },
  mounted() {
    document.title = "Account | E-Commerce";
    this.getOrders();
    this.getInfo();
    this.stripe = window.Stripe(
      "pk_test_51HxF4XH3rrorsYDEJ0qATqlQHhCuKnKwUdJ9yYAFkr9KduzIiFQXW8PXoWGeqqyRZU7ESBrtCJuTvscRFfSl0llK00b0rpjnAS"
    );
    const elements = this.stripe.elements();
    this.card = elements.create("card", { hidePostalCode: true });
    this.card.mount("#card-element");
  },
  methods: {
    checkout() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          this.errors.push(
            "Something went wrong with Stripe. Please try again"
          );
          console.log(result.error.message);
        } else {
          this.stripeTokenHandler(result.token);
        }
      });
    },
    async stripeTokenHandler(token) {
      const data = {
        value: this.cashDeposit,
        stripe_token: token.id,
      };
      await axios
        .post("/api/v1/profile/deposit/", data)
        .then((response) => {
          console.log(response);
          toast({
            message: "Balance charged Successfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 4000,
            position: "top-center",
            fullWidth: true,
            fitToScreen: true,
          });
          this.addCash = 0;
          this.getInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    transactionCash() {
      this.transErrors = [];
      if (this.sendCash > 0 && this.emailCash.length > 0) {
        axios
          .post("/api/v1/transactions/", {
            receiver: this.emailCash,
            transaction_size: this.sendCash,
          })
          .then((response) => {
            console.log(response);
            this.getInfo();
            toast({
              message: `$${this.sendCash} sent to ${this.emailCash}`,
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            this.sendCash = 0;
            this.emailCash = "";
          })
          .catch((error) => {
            console.log(error.response.data);
            toast({
              message: `${error.response.data.response}`,
              type: "is-danger",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
          });
      } else {
        this.transErrors = ["Please enter a valid amount and email"];
      }
    },
    toggle(id, id2) {
      let temp = document.getElementById(id);
      let temp2 = document.getElementById(id2);
      if (temp.hidden == true && temp2.hidden == true) {
        document.getElementById(id).hidden = false;
        document.getElementById(id2).hidden = true;
      } else if (temp2.hidden == false) {
        document.getElementById(id).hidden = false;
        document.getElementById(id2).hidden = true;
      } else {
        document.getElementById(id).hidden = true;
        document.getElementById(id2).hidden = true;
      }
    },
    getInfo() {
      axios
        .get("/api/v1/profile/")
        .then((response) => {
          this.info = response.data;
          this.cash = this.info.cash;
          this.email = this.info.user.email;
          this.phone = this.info.phone;
          this.username = this.info.user.username;
          this.location = this.info.location;
          this.sex = this.info.sex;
          this.user_id = this.info.id;
          console.log(response.data);
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
    getOrders() {
      axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
          console.log(response.data);
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
    submitForm() {
      this.errors = [];
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
            toast({
              message: `${error.response.data}`,
              type: "is-danger",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
          });
      } else {
        this.errors = ["Please enter a valid amount"];
      }
    },
    editProfile() {
      this.editedErrors = [];
      if (this.editedErrors.length == 0) {
        axios
          .put(`/api/v1/profile/${this.user_id}/`, {
            cash: this.cash,
            location: this.editedLocation,
            phone: this.editedPhone,
            birth_date: this.editedBirth,
            sex: this.editedSex,
          })
          .then((response) => {
            console.log(response);
            this.getInfo();
            this.displayModal("editModal", 0);
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
    displayModal(id, toggle) {
      this.editedErrors = [];
      if (toggle) {
        document.getElementById(id).classList.add("is-active");
        this.editedLocation = this.info.location;
        this.editedPhone = this.info.phone;
        this.editedBirth = this.info.birth;
        this.editedSex = this.info.sex;
      } else {
        document.getElementById(id).classList.remove("is-active");
      }
    },
  },
};
</script>
<script></script>
