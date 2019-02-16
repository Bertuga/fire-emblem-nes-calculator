<template>
  <li
    :class="isActive"
  >
    <a
      @click="$emit('changeTo', tab.id);"
    >
      {{ tab.title }}
    </a>
  </li>
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
  },
  computed: {
    isActive: function () {
      return this.tab.id === this.activeTab ? 'active' : ''
    }
  }
}
</script>

<style>
  li {
    display: inline-block;
    border: 4px solid #fff;
    padding: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-bottom: -4px;
    margin-left: 15px;
    cursor: pointer;
  }
  li.active {
    border-bottom: 4px solid #000;
  }
</style>
