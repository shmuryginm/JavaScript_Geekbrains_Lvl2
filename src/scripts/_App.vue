<template>
  <div>
    <header :class="[$style.header]">
      My Awesome Shop
      <!-- <Cart /> -->
    </header>
    <div>
      <h1>Список товаров:</h1>
      <Item
        v-for="(good, index) in items"
        :key="index"
        :name="good.name"
        :price="good.price"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  components: {
    Item,
  },
  data () {
    return {
      items: [
        { name: 'title1', price: 1 },
        { name: 'title2', price: 2 },
        { name: 'title3', price: 3 },
        { name: 'title4', price: 4 },
        { name: 'title5', price: 5 },
        { name: 'title6', price: 6 },
      ]
    }
  },
  methods: {
  }
}
</script>

<style module>
.header {
  color: red;
}
</style>