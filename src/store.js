import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const slugify = str => {
  str = str || "";
  const a =
    "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ";
  const b =
    "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/ου/g, "ou")
    .replace(/ευ/g, "eu")
    .replace(/θ/g, "th")
    .replace(/ψ/g, "ps")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    addProduct(state, product) {
      product.slug = slugify(product.name);
      state.products.push(product);
    },
    deleteProduct(state, i) {
      state.products = state.products
        .slice(0, i)
        .concat(state.products.slice(i + 1, state.products.length));
    }
  },
  actions: {},
  getters: {
    products: state => state.products
  }
});
