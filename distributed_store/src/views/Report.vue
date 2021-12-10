<template>
  <div class="wrapper m-5">
    <div class="page-header">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand has-text-centered">
            <h1 class="title">Reports</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="columns is-12">
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Total Price of Inventory</h2>
            <h1 class="title">{{ this.totalPrices }}$</h1>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Total Sold Prices</h2>
            <h1 class="title">{{ this.totalSoldPrices }}$</h1>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Total Money Sent</h2>
            <h1 class="title">{{ this.totalMoneySent }}$</h1>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Total Money Received</h2>
            <h1 class="title">{{ this.totalMoneyRec }}$</h1>
          </div>
        </div>
        <div class="columns is-12">
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Product Quantities</h2>
            <canvas id="quantitiesChart" width="400" height="400"></canvas>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Product Prices $</h2>
            <canvas id="pricesChart" width="400" height="400"></canvas>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Sold Products Quantities</h2>
            <canvas id="soldQuantitiesChart" width="400" height="400"></canvas>
          </div>
          <div class="box column is-3 m-1 has-text-centered">
            <h2 class="subtitle">Sold Products Prices $</h2>
            <canvas id="soldPricesChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        <h1 class="title">Tables</h1>
      </div>
      <div class="section section-basic">
        <div class="box">
          <h2 class="subtitle">Sent Transactions</h2>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Received By</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currProduct in sentTransactions"
                v-bind:key="currProduct.id"
              >
                <td>{{ currProduct.id }}</td>
                <td>{{ currProduct.receiver_name }}</td>
                <td>${{ currProduct.transaction_size }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box">
          <h2 class="subtitle">Received Transactions</h2>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Received From</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currProduct in recTransactions"
                v-bind:key="currProduct.id"
              >
                <td>{{ currProduct.id }}</td>
                <td>{{ currProduct.receiver_name }}</td>
                <td>${{ currProduct.transaction_size }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box">
          <h2 class="subtitle">Sold Transactions</h2>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Location</th>
                <th>Ordered By</th>
                <th>Product Name</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currProduct in soldProducts"
                v-bind:key="currProduct.id"
              >
                <td>{{ currProduct.id }}</td>
                <td>{{ currProduct.date_added }}</td>
                <td>{{ currProduct.location }}</td>
                <td>{{ currProduct.maker_name }}</td>
                <td>{{ currProduct.product.name }}</td>
                <td>{{ currProduct.product.no_of_pieces }}</td>
                <td>
                  ${{
                    currProduct.product.price * currProduct.product.no_of_pieces
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="box">
          <h2 class="subtitle">Shared Products</h2>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Owned By</th>
                <th>Product Name</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="currProduct in sharedProducts"
                v-bind:key="currProduct.id"
              >
                <td>{{ currProduct.id }}</td>
                <td>{{ currProduct.product.date_added }}</td>
                <td>{{ currProduct.product.owner_name }}</td>
                <td>{{ currProduct.product.name }}</td>
                <td>{{ currProduct.product.no_of_pieces }}</td>
                <td>
                  ${{
                    currProduct.product.price * currProduct.product.no_of_pieces
                  }}
                </td>
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
import Chart from "../../node_modules/chart.js/dist/chart.min.js";
export default {
  name: "Report",
  data() {
    return {
      totalPrices: 0,
      totalSoldPrices: 0,
      totalMoneySent: 0,
      totalMoneyRec: 0,
      products: [],
      sentTransactions: [],
      recTransactions: [],
      soldProducts: [],
      sharedProducts: [],
    };
  },

  mounted() {
    document.title = "Report | E-Commerce";
    this.setupQuantitiesChart();
    this.setupPricesChart();
    this.setupSoldQuantitiesChart();
    this.setupSoldPricesChart();
    this.getTotalMoney();
    this.getSharedProducts();
  },
  methods: {
    setupQuantitiesChart() {
      let quantity = [];
      let names = [];
      axios.get(`api/v1/products`).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          quantity.push(response.data[i].no_of_pieces);
          names.push(response.data[i].name);
        }

        const ctx = document.getElementById("quantitiesChart").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: names,
            datasets: [
              {
                label: "# of Votes",
                data: quantity,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    },
    setupPricesChart() {
      let prices = [];
      let names = [];
      axios.get(`api/v1/products`).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          prices.push(response.data[i].price);
          names.push(response.data[i].name);
        }
        this.totalPrices = prices.reduce((a, b) => a + b, 0);
        const ctx = document.getElementById("pricesChart").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: names,
            datasets: [
              {
                data: prices,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    },
    setupSoldQuantitiesChart() {
      let names = [];
      let soldProducts = {};
      let quantities = [];
      axios.get(`/api/v1/orders/sold`).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (!soldProducts[response.data[i].product.id]) {
            response.data[i].product.no_of_pieces = response.data[i].amount;
            soldProducts[response.data[i].product.id] =
              response.data[i].product;
            this.totalSoldPrices +=
              response.data[i].amount * response.data[i].product.price;
          } else {
            soldProducts[response.data[i].product.id].no_of_pieces +=
              response.data[i].amount;
            this.totalSoldPrices +=
              response.data[i].amount * response.data[i].product.price;
          }
        }
        for (let product in soldProducts) {
          names.push(soldProducts[product].name);
          quantities.push(soldProducts[product].no_of_pieces);
        }
        const ctx = document
          .getElementById("soldQuantitiesChart")
          .getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: names,
            datasets: [
              {
                data: quantities,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    },
    setupSoldPricesChart() {
      let names = [];
      let soldProducts = {};
      let prices = [];
      axios.get(`/api/v1/orders/sold`).then((response) => {
        this.soldProducts = response.data;
        for (let i = 0; i < response.data.length; i++) {
          if (!soldProducts[response.data[i].product.id]) {
            response.data[i].product.no_of_pieces = response.data[i].amount;
            soldProducts[response.data[i].product.id] =
              response.data[i].product;
          }
        }
        for (let product in soldProducts) {
          names.push(soldProducts[product].name);
          prices.push(soldProducts[product].price);
        }

        const ctx = document.getElementById("soldPricesChart").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: names,
            datasets: [
              {
                data: prices,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    },
    getTotalMoney() {
      axios
        .get(`/api/v1/transactions`, {
          params: {
            type: "sent",
          },
        })
        .then((response) => {
          this.sentTransactions = response.data;
          this.totalMoneySent = response.data.reduce(
            (a, b) => a + b.transaction_size,
            0
          );
        });
      axios
        .get(`/api/v1/transactions`, {
          params: {
            type: "received",
          },
        })
        .then((response) => {
          this.recTransactions = response.data;
          this.totalMoneyRec = response.data.reduce(
            (a, b) => a + b.transaction_size,
            0
          );
        });
    },

    getSharedProducts() {
      axios
        .get(`/api/v1/shares/`)
        .then((response) => {
          this.sharedProducts = response.data;
          console.log(this.sharedProducts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
