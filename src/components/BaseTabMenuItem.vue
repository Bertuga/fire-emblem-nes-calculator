<template>
  <li>
    <button @click="$emit('changeTo', tab.id);">
      {{ tab.title }}
    </button>
  </li>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      required: true
    }
  }
}
</script>
