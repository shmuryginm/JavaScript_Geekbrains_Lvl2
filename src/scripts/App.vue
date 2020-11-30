<template>
    <div>
        <header :class="[$style.header]">
            <h2>МАГАЗИН</h2>
        </header>

        <div>
            <h3 :class="[$style.h3]">ТОВАРЫ МАГАЗИНА</h3>
            <Product
                v-for="(product, index) in products"
                    :key="index"

                    :id="product.id"
                    :name="product.name"
                    :price="product.price"
            />            
        </div>

        <!--
        <br>
        <button type="button" name="btnAddNextChunk">Добавить ещё</button>
        <br>
        -->

        <div>
            <h3 :class="[$style.h3]">ТОВАРЫ В КОРЗИНЕ</h3>
            <BasketProduct 
                v-for="(product, index) in basketProducts"
                    :key="index"

                    :id="basketProducts.id"
                    :name="basketProducts.name"
                    :price="basketProducts.price"
                    :count="basketProducts.count"
            />
        </div>

        <div>
            <h3 :class="[$style.h3]">КОРЗИНА</h3>
            <Basket
                :countTotal = 0
                :priceTotal = 0
            />
        </div>

        <div>
            <BtnClearBasket
            />
        </div>
    </div>

</template>


<script>
import Basket from './Basket.vue'
import Product from './Product.vue'
import BtnClearBasket from "./BtnClearBasket.vue"

    export default {
        components: {
            Product,
            Basket,
            BtnClearBasket
        },

    data() {
        return {
            products: [
                { id: 10,  name: "Shirt",     price:  1500, description: "", pathToImage: "" },
                { id: 20,  name: "Socks",     price:   100, description: "", pathToImage: "" },
                { id: 30,  name: "Jacket",    price:  5000, description: "", pathToImage: "" },
                { id: 40,  name: "Shoes",     price:  7000, description: "", pathToImage: "" },
                { id: 50,  name: "Wooly hat", price:   700, description: "", pathToImage: "" },
                { id: 60,  name: "Glows",     price:   650, description: "", pathToImage: "" },
                { id: 70,  name: "Scarf",     price:   300, description: "", pathToImage: "" },
                { id: 80,  name: "T-shirt",   price:  1200, description: "", pathToImage: "" },
                { id: 90,  name: "Backpack",  price:  9999, description: "", pathToImage: "" },
                { id: 100, name: "Crampon",   price: 11000, description: "", pathToImage: "" }
            ]
        }
    }
}

</script>

<style module>
.header {
    font-family:Courier, Courier New, Andele Mono;
    color: white;
    background: yellowgreen;
}
.h3 {
    font-family:Courier, Courier New, Andele Mono;
}
</style>
