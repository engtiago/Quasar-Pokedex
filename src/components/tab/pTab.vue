<template>
  <div class="row">
    <div v-for="item in ['about' ,'stats','evolution' ]" :key="item" class="col-4 tab">
      <q-item
        @click.native="click(item)"
        :class="`${value === item ? 'filter-title' : 'description-poke' }`"
      >
        <q-item-section class="text-center">
          {{firstLetterUperCase(item)}}
          <div
            :style="`opacity: ${value === item  ? '1;' :'0' }`"
            class="icon-pokeball iconPokeball"
          ></div>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true,
      default: 'about',
      type: String
    }
  },
  methods: {
    click (aba) {
      this.$emit('input', aba)
    },
    firstLetterUperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<style scoped>
  .tab {
    height: 49px !important;
    overflow: hidden;
    padding: 12px 0px 39px;
  }
  .filter-title {
    color: #ffffff;
  }
  .description-poke {
    color: #ffffff;
    opacity: 0.5;
  }
  .iconPokeball {
    background: var(--gradient-vector-white);
    font-size: 100px;
    position: relative;
    top: -38px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.7s;
  }
</style>
