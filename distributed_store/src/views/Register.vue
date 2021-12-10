<template>
  <div class="page-sign-up">
    <div class="columns is-centered">
      <div class="column is-4">
        <h1 class="title">Register</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="Email" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>
          <div class="field">
            <label>Confirm Password</label>
            <div class="control">
              <input
                type="password"
                class="input"
                v-model="password_confirmation"
              />
            </div>
          </div>
          <div class="field">
            <label>Gender</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="Sex">
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Register</button>
            </div>
          </div>

          <hr />

          <router-link to="/login">Already have an account?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      Email: "",
      Sex: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Register | E-Commerce";
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.username === "") {
        this.errors.push("Username is missing");
      }
      if (this.Email === "") {
        this.errors.push("Email is missing");
      }
      if (this.password === "") {
        this.errors.push("Password is missing");
      }
      if (this.password !== this.password_confirmation) {
        this.errors.push("Passwords do not match");
      }
      if (this.Sex === "") {
        this.errors.push("Gender is missing");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          email: this.Email,
          password: this.password,
          sex: this.Sex,
        };
        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "Successfully registered!",
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            console.log(response);
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong");
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>
