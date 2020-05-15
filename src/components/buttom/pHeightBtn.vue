<template>
  <div>
    <q-btn
      @click="handlerClick"
      v-if="selected"
      rounded
      flat
      class="btn-poke custon-shadow"
      no-caps
      :style="`background: var(--height-${types}); color: var(--text-white)`"
    >
      <!-- box-shadow: 0px 10px 20px var(--type-${types}); tentar ver como fazer depois -->
      <span :class="`icon-size icon--${types}`"></span>
    </q-btn>
    <q-btn
      @click="handlerClick"
      v-else
      :style="`color: var(--height-${types})`"
      flat
      rounded
      class="btn-poke"
      no-caps
    >
      <span :class="`icon-size icon--${types}`"></span>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'pHeightBtn',
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    types: {
      type: String,
      required: true
    }
  },
  methods: {
    handlerClick () {
      this.$emit('click', { type: this.types, selected: this.selected })
    }
  }
}
</script>

<style scoped>
  .btn-poke {
    width: 50px;
    height: 50px;
  }

  .icon-size {
    font-size: 25px;
  }
</style>
