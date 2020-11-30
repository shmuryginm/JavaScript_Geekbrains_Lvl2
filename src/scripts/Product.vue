<template>
    <div>
        <p :class="[$style.p]">{{ id }}. {{ name }} - {{ price }}</p>
    </div>
</template>


<script>
export default {
    props: {
        id: Number,
        name: String,
        price: Number
    }
}
</script>


<style module>
.p {
    font-family:Courier, Courier New, Andele Mono;
    font-size:100%;
}
</style>