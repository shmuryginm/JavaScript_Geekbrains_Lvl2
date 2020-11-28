<template>
    <div>{{ id }}. {{ name }} - {{ price }}</div>
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

<style >

</style>