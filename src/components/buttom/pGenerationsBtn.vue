<template>
  <div>
    <q-card
      @click="EmitClick"
      v-if="selected"
      clickable
      v-ripple
      flat
      class="text-center btn-generations btn-primary"
    >
      <div class="img-div-card">
        <img
          v-for="img in 3"
          :key="img"
          class="img-card"
          :src="`statics/generations/generation${generation}/${img}.png`"
        />
      </div>
      <span class="text-card description-poke">Generation {{dataGeneration[generation]}}</span>
      <div class="icon-x3 iconx3-primary iconx3"></div>
      <div class="icon-pokeball iconPokeball-primary iconPokeball"></div>
    </q-card>
    <q-card
      @click="EmitClick"
      v-else
      clickable
      v-ripple
      flat
      class="text-center btn-generations btn-secondary"
    >
      <div class="img-div-card">
        <img
          v-for="img in 3"
          :key="img"
          class="img-card"
          :src="`statics/generations/generation${generation}/${img}.png`"
        />
      </div>
      <p class="text-card description-poke">Generation {{dataGeneration[generation]}}</p>
      <div class="icon-x3 iconx3-secondary iconx3"></div>
      <div class="icon-pokeball iconPokeball-secondary iconPokeball"></div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'pGenerationBtn',
  props: {
    generation: {
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataGeneration: {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII'
      }
    }
  },
  methods: {
    EmitClick () {
      this.$emit('click')
      console.log('teste')
    }
  }
}
</script>

<style scoped>
  .custon-shadow {
    box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
  }

  .iconx3-primary {
    background: var(--gradient-vector-white);
  }
  .iconx3-secondary {
    background: var(--gradient-vector-grey);
  }
  .iconx3 {
    font-size: 35px;
    position: absolute;
    left: 15px;
    top: 10px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;
  }
  .iconPokeball-primary {
    background: var(--gradient-pokeball-white);
  }
  .iconPokeball-secondary {
    background: var(--gradient-pokeball-grey);
  }
  .iconPokeball {
    font-size: 110px;
    position: absolute;
    right: 9px;
    top: 70px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;
  }
  .img-card {
    margin-top: 27px;
    width: 45px;
    height: 45px;
  }
  .img-div-card {
    position: relative;
    z-index: 100;
  }
  .text-card {
    position: relative;
    z-index: 100;
  }
  .btn-generations {
    overflow: hidden;
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    border-radius: 10px;
    width: auto;
    height: 129px;
  }

  .btn-primary {
    background: var(--type-psychic);
    color: var(--text-white);
  }
  .btn-secondary {
    background: var(--background-default-input);
    color: var(--text-gray);
  }
</style>
