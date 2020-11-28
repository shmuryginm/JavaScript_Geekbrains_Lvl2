<template>
    <div>
        <header :class="[$style.header]">
            <h2>МАГАЗИН</h2>
        </header>

        <div>
            <h3>ТОВАРЫ МАГАЗИНА</h3>
            <Item 
                v-for="(product, index) in products"
                    :key="index"

                    :id="product.id"
                    :name="product.name"
                    :price="product.price"
            />
        </div>

        <!--    
        <div class="productsList"></div>

        <br>
        <button type="button" name="btnAddNextChunk">Добавить ещё</button>
        <br>

        <br>
        <p><b>ТОВАРЫ В КОРЗИНЕ</b></p>
        <br>
        <div class="basketList"></div>

        <br>
        <p><b>КОРЗИНА</b></p>
        <br>
        <div class="basket"></div>

        <br>
        <button name="ClearBasket">Очистить корзину</button>
        -->
    </div>

</template>


<script>
    import Item from './Item.vue'

    export default {
        components: {
            Item
        },

    data() {
        return {
            products: [
                { id: 10,  name: "Shirt",     price:  1500 },
                { id: 20,  name: "Socks",     price:   100 },
                { id: 30,  name: "Jacket",    price:  5000 },
                { id: 40,  name: "Shoes",     price:  7000 },
                { id: 50,  name: "Wooly hat", price:   700 },
                { id: 60,  name: "Glows",     price:   650 },
                { id: 70,  name: "Scarf",     price:   300 },
                { id: 80,  name: "T-shirt",   price:  1200 },
                { id: 90,  name: "Backpack",  price:  9999 },
                { id: 100, name: "Crampon",   price: 11000 }
            ]
        }
    }
}

</script>

<style module>
.header {
    color: white;
    background: yellowgreen;
}
</style>