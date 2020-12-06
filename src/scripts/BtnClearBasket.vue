<template>
    <div>
        <p><button @click="OnClick" name="BtnClearBasket" :class="[$style.p]">Очистить корзину</button></p>
    </div>
</template>


<script>
import Basket from "./Basket.vue"

export default {
    props: {
    },

    methods: {
        OnClick: () => {
            console.log("Clicked!")
        }
    }
}
</script>


<style module>
.p {
    font-family:Courier, Courier New, Andele Mono;
    font-size:100%;
}
</style>


