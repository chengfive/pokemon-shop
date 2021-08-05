import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isLoading: false,
    isLogining: false,
    lists: ["所有商品", "精靈球", "回復藥品", "道具", "招式學習器"],
    products: [],
    user: {},
    cart: [],
    temporaryCart: [],
    token: "",
    coupons: [],
    discount: 1,
    temporaryDiscount: 1,
    orders: [],
  },
  mutations: {
    addProducts(state, data) {
      state.products = data;
    },
    addUser(state, data) {
      state.user = data;
    },
    pushCart(state, data) {
      state.user.cart.push(data);
    },
    pushOrder(state, data) {
      state.user.orders.push(data);
    },
    addCart(state, data) {
      state.cart = data;
    },
    addTemporaryCart(state, data) {
      state.temporaryCart = data;
    },
    deleteCart(state, data) {
      state.cart.splice(data, 1);
    },
    clearCart(state) {
      state.user.cart = [];
    },
    loading(state, status) {
      state.isLoading = status;
    },
    logining(state, status) {
      state.isLogining = status;
    },
    addToken(state, data) {
      state.token = data;
    },
    addCoupons(state, data) {
      state.coupons = data;
    },
    addDiscount(state, data) {
      state.discount = data;
    },
    addTemporaryDiscount(state, data) {
      state.temporaryDiscount = data;
    },
  },
  actions: {
    getProducts({ commit }) {
      commit("loading", true);
      axios
        .get("https://pokemon-shop-server.herokuapp.com/products")
        .then((response) => {
          commit("addProducts", response.data);
          commit("loading", false);
        });
    },
    getToken({ commit }) {
      if (localStorage.token) {
        commit("addToken", JSON.parse(localStorage.getItem("token")));
        axios
          .get("https://pokemon-shop-server.herokuapp.com/users")
          .then((response) => {
            let user = response.data.find(
              (item) => item.token === this.state.token
            );
            commit("addUser", user);
            commit("addCart", user.cart);
            commit("addTemporaryCart", user.cart);
            commit("logining", true);
          });
      } else {
        commit("logining", false);
      }
    },
    getUser({ commit }) {
      axios
        .get("https://pokemon-shop-server.herokuapp.com/users")
        .then((response) => {
          let user = response.data.find(
            (item) => item.token === this.state.token
          );
          commit("addUser", user);
          commit("addCart", user.cart);
        });
    },
    getCoupons({ commit }) {
      axios
        .get("https://pokemon-shop-server.herokuapp.com/coupons")
        .then((response) => {
          commit("addCoupons", response.data);
        });
    },
  },
  modules: {},
});
