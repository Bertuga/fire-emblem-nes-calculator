<template>
  <div v-if="activeTab == tab.id">
    <h2>{{ tab.title }}</h2>
    <component :is="tab.content" />
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      required: true
    },
    activeTab: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
  h2 { text-align: center; }
</style>
