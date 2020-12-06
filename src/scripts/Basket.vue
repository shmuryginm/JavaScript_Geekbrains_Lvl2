<template>
    <div>
        <p :class="[$style.p]">{{ countTotal }} - {{ priceTotal }}</p>
    </div>
</template>


<script>
export default {
    props: {
        countTotal: Number = 0,
        priceTotal: Number = 0
    }
}
</script>


<style module>
.p {
    font-family:Courier, Courier New, Andele Mono;
    font-size:100%;
}
</style>