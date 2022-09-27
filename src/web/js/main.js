const { createApp } = Vue;

createApp({
  data() {
    return {
      dragPayload: null,
      items: [],
      mealTimes :["Breakfast", "Lunch", "Dinner"],
    };
  },
  computed: {},
  methods: {
    dragStart: function (event, payload) {
      this.dragPayload = JSON.stringify(payload);
    },
    dragDrop: function (event) {
      event.target.innerHTML = JSON.parse(this.dragPayload).name;
      this.dragPayload = null;
    },
  },
  mounted: function () {
    fetch("http://localhost:3000/api/meals?limit=100")
      .then((x) => x.json())
      .then((data) => {
        this.items = data.docs;
      });
  },
}).mount("#app");
