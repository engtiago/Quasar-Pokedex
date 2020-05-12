<template>
  <div>
    <q-btn
      v-if="selected"
      rounded
      flat
      class="btn-poke custon-shadow"
      no-caps
      :style="`background: var(--type-${types}); color: var(--text-white)`"
    >
      <!-- box-shadow: 0px 10px 20px var(--type-${types}); tentar ver como fazer depois -->
      <span :class="`icon-size icon-${types}`"></span>
    </q-btn>
    <q-btn :style="`color: var(--type-${types})`" v-else flat rounded class="btn-poke" no-caps>
      <span :class="`icon-size icon-${types}`"></span>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'pTypeBtn',
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    types: {
      type: String,
      required: true
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
