<template>
  <q-page class="q-mx-xl">
    <p class="title-poke">Title</p>
    <button-defaut class="q-mb-md" valueBtnDefaut="Teste" :selected="false"></button-defaut>
    <range-defaut v-model="standard" :min="0" :max="50"></range-defaut>
    {{standard}}
    <InputDefaut v-model="teste" placeholder="Meu input"></InputDefaut>
    <q-separator class="q-my-lg" />
    <div class="row">
      <p-badge :types="t" v-for="t in types" :key="t"></p-badge>
    </div>
    <q-separator class="q-my-lg" />
    <div class="row">
      <div class="col" v-for="t in types" :key="t">
        <p-type-btn class="q-mb-md" :types="t" :selected="true"></p-type-btn>
        <p-type-btn class="q-mb-md" :types="t" :selected="false"></p-type-btn>
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <div class="row">
      <div class="col">
        <p-height-btn class="q-mb-md" types="short" :selected="true"></p-height-btn>
        <p-height-btn class="q-mb-md" types="short" :selected="false"></p-height-btn>
      </div>
      <div class="col">
        <p-height-btn class="q-mb-md" types="medium" :selected="true"></p-height-btn>
        <p-height-btn class="q-mb-md" types="medium" :selected="false"></p-height-btn>
      </div>
      <div class="col">
        <p-height-btn class="q-mb-md" types="tall" :selected="true"></p-height-btn>
        <p-height-btn class="q-mb-md" types="tall" :selected="false"></p-height-btn>
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <div class="row">
      <div class="col">
        <p-weight-btn class="q-mb-md" types="light" :selected="true"></p-weight-btn>
        <p-weight-btn class="q-mb-md" types="light" :selected="false"></p-weight-btn>
      </div>
      <div class="col">
        <p-weight-btn class="q-mb-md" types="normal" :selected="true"></p-weight-btn>
        <p-weight-btn class="q-mb-md" types="normal" :selected="false"></p-weight-btn>
      </div>
      <div class="col">
        <p-weight-btn class="q-mb-md" types="heavy" :selected="true"></p-weight-btn>
        <p-weight-btn class="q-mb-md" types="heavy" :selected="false"></p-weight-btn>
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <div class="row">
      <div class="col-3" v-for="i in 8" :key="i">
        <pGenerationsBtn class="q-ma-lg" :generation="i" :selected="true"></pGenerationsBtn>
        <pGenerationsBtn class="q-ma-lg" :generation="i" :selected="false"></pGenerationsBtn>
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <q-btn color="primary" icon="check" label="OK" @click="dialog = true" />
    <p-sheet v-model="dialog"></p-sheet>
  </q-page>
</template>

<script>
import ButtonDefaut from '../components/buttom/pBtn'
import pTypeBtn from '../components/buttom/pTypeBtn'
import pHeightBtn from '../components/buttom/pHeightBtn'
import pWeightBtn from '../components/buttom/pWeightBtn'
import pGenerationsBtn from '../components/buttom/pGenerationsBtn'
import InputDefaut from '../components/input/pInput'
import RangeDefaut from '../components/input/pRange'
import pBadge from '../components/badge/pBadge'
import pSheet from '../components/sheetBottom/pSheet'
export default {
  name: 'PageIndex',
  components: {
    ButtonDefaut,
    InputDefaut,
    RangeDefaut,
    pBadge,
    pTypeBtn,
    pHeightBtn,
    pWeightBtn,
    pGenerationsBtn,
    pSheet
  },
  data () {
    return {
      teste: '',
      standard: {},
      dialog: false,
      types: [
        'bug',
        'dark',
        'dragon',
        'electric',
        'fairy',
        'fighting',
        'fire',
        'flying',
        'ghost',
        'grass',
        'ground',
        'ice',
        'normal',
        'poison',
        'psychic',
        'rock',
        'steel',
        'water'
      ]

    }
  }
}

</script>
