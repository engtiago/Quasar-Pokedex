<template>
  <span
    ref="pokeball"
    :style="`font-size:100vw;position: absolute;top:-${topPokeball/2}px;`"
    class="pokeball-background icon-pokeball"
  ></span>
</template>

<script>
export default {
  data () {
    return {
      topPokeball: 0
    }
  },
  created () {
    window.addEventListener('resize', this.myEventHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  methods: {
    myEventHandler (e) {
      this.topPokeball = this.$refs.pokeball.offsetHeight
    }
  },
  mounted () {
    this.topPokeball = this.$refs.pokeball.offsetHeight
  }
}
</script>
<style scoped>
  .pokeball-background {
    background: var(--gradient-pokeball);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
