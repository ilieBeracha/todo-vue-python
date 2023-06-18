<template>
    <div class="feature">
        <p>{{ featureText }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    featureText: "",
})

</script>

<style scoped>
.feature {
    width: 80%;
    min-height: 25%;
    /* border: 1px solid #ccc; */
    border-radius: 10px;
    font-size: 15px;
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
}
</style>