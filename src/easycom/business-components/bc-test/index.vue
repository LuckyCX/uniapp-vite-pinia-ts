<script setup>
const props = defineProps({
  todo: String
})
</script>

<template>
  <li class="test-li">{{ todo }}</li>
</template>

<style lang="scss" scoped>
.test-li {
  color: blue;
}
</style>