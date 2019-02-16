<template>
  <input
    type="number"
    class="input"
    :value="valor"
    min="0"
    max="99"
    v-on="listeners"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return { valor: this.value }
  },
  computed: {
    listeners () {
      return {
        input: (event) => {
          this.maxMin(event)
          this.$emit('input', event.target.value)
        }
      }
    }
  },
  methods: {
    maxMin: function maxMin (e) {
      if (e.target.value > 99) {
        e.target.value = 99
      }
      if (e.target.value < 0) {
        e.target.value = 0
      }
      this.valor = e.target.value
    }
  }
}
</script>

<style>
  input {
    border: 1px solid #000;
    border-radius: 2px;
    padding: 2px 5px;
    text-align: center;
    width: 50px
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance:textfield;
  }
</style>
