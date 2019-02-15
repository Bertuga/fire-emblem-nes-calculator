<template>
  <div v-if="activeTab == tab.id">
    {{ tab.title }} <component :is="tab.content" />
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
