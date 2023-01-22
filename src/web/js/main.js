const { createApp } = Vue;

createApp({
  data() {
    return {
      dragPayload: null,
      items: [],
      shoppingList: [],
      weeklySchedule: [],
      defaultSchedule: [
        {
          day: "Sunday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Monday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Tuesday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Wednesday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Thursday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Friday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
        {
          day: "Saturday",
          meals: [
            { mealTime: "Breakfast", items: [] },
            { mealTime: "Lunch", items: [] },
            { mealTime: "Dinner", items: [] },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    dragStart: function (event, payload) {
      this.dragPayload = JSON.stringify(payload);
    },
    dragDrop: function (event, meal) {
      //event.target.innerHTML += `<div>${JSON.parse(this.dragPayload).name} <button v-on:click="clearCell">X</button></div>`;
      meal.items.push(JSON.parse(this.dragPayload));
      this.dragPayload = null;
      this.saveSchedule();
    },
    removeFood: function (meal, index) {
      meal.items.splice(index, 1);
      this.saveSchedule();
    },
    saveSchedule: function () {
      localStorage.setItem("menu", JSON.stringify(this.weeklySchedule));
    },
    clearMenu: function () {
      localStorage.removeItem("menu");
      this.weeklySchedule = this.defaultSchedule;
    },
    generateShoppingList: function () {
      var shoppingList = [];
      this.weeklySchedule.forEach((day) => {
        day.meals.forEach((meal) => {
          meal.items.forEach((item) => {
            var found = shoppingList.find((x) => x.name == item.name);
            if (found) {
              found.quantity += item.quantity;
            } else {
              shoppingList.push(item);
            }
          });
        });
      });
      this.shoppingList = shoppingList;
    },
  },
  mounted: function () {
    var data = JSON.parse(localStorage.getItem("menu"));
    if (data) {
      this.weeklySchedule = data;
    } else {
      this.weeklySchedule = this.defaultSchedule;
    }
    fetch("/api/meals?limit=100")
      .then((x) => x.json())
      .then((data) => {
        this.items = data.docs.map((x) => new MealCell(x));
      });
  },
}).mount("#app");

class MealCell {
  constructor(meal) {
    this.meal = meal;
    this.createdAt = meal.createdAt;
    this.id = meal.id;
    this.ingredients = meal.ingredients;
    this.name = meal.name;
  }
}
