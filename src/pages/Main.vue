<template>
  <q-page-container>
    <poke-ball></poke-ball>
    <q-page padding>
      <div class="q-mx-md">
        <div class="text-right q-mt-lg">
          <q-btn @click="SheetGeneration = true" class="btn-filters" flat round>
            <span style class="icon icon-generation"></span>
          </q-btn>
          <q-btn @click="SheetSort = true" class="btn-filters" flat round>
            <span style class="icon icon-sort"></span>
          </q-btn>
          <q-btn @click="SheetFilter = true" class="btn-filters" flat round>
            <span style class="icon icon-filter"></span>
          </q-btn>
        </div>

        <h2 class="application-title">Pokédex</h2>
        <p class="description-poke">Search for Pokémon by name or using the National Pokédex number.</p>
        <p-input
          @stopWrite="searchPokemons"
          v-model="search"
          placeholder="What Pokémon are you looking for?"
        ></p-input>
        <div class="row q-pt-sm">
          <div
            v-for="i in allPokemons"
            :key="i.id"
            class="col-12 col-md-6 col-lg-4 q-px-xs q-pt-sm"
          >
            <card-pokemon :IDPoke="i.id" class="q-mt-md"></card-pokemon>
          </div>
        </div>
      </div>
    </q-page>
    <!-- ################ TODAS AS SHEETS DE FILTROS ################ -->
    <p-sheet v-model="SheetGeneration">
      <div class="q-ma-lg">
        <h1 class="pokemon-name">Generations</h1>
        <p class="description-poke">Use search for generations to explore your Pokémon!</p>
        <div class="row">
          <div class="col-6 col-sm-6 q-py-sm" v-for="i in 8" :key="i">
            <p-generations-btn
              @click="generationHandler(i)"
              class="q-px-xs"
              :generation="i"
              :selected="generationSelected === i"
            ></p-generations-btn>
          </div>
        </div>
      </div>
    </p-sheet>
    <p-sheet v-model="SheetSort">
      <div class="q-ma-lg">
        <h1 class="pokemon-name">Sort</h1>
        <p class="description-poke">Sort Pokémons alphabetically or by National Pokédex Number</p>
        <p-btn
          class="q-mb-md"
          valueBtnDefaut="Smallest Number first"
          :selected="SheetSortOP.smallNumber"
          @click="sortHandler('smallNumber')"
        ></p-btn>
        <p-btn
          class="q-mb-md"
          valueBtnDefaut="Highest number fist"
          :selected="SheetSortOP.highNumber"
          @click="sortHandler('highNumber')"
        ></p-btn>
        <p-btn
          class="q-mb-md"
          valueBtnDefaut="A-Z"
          :selected="SheetSortOP.AZ"
          @click="sortHandler('AZ')"
        ></p-btn>
        <p-btn
          class="q-mb-md"
          valueBtnDefaut="Z-A"
          :selected="SheetSortOP.ZA"
          @click="sortHandler('ZA')"
        ></p-btn>
      </div>
    </p-sheet>
    <p-sheet v-model="SheetFilter">
      <div class="q-ma-lg">
        <h1 class="pokemon-name">Filters</h1>
        <p
          class="description-poke"
        >Use advanced search to explore Pokémon by type, weakness, height, and more!</p>
        <p class="filter-title">Types</p>
        <q-scroll-area
          horizontal
          style="height: 50px; width: 100%;"
          class="q-mb-md"
          :thumb-style="{opacity: 0}"
        >
          <div style="display: flex;">
            <div class="q-mr-sm" v-for="type in types" :key="type">
              <p-type-btn :types="type" :selected="false"></p-type-btn>
            </div>
          </div>
        </q-scroll-area>
        <p class="filter-title">Weakness</p>
        <q-scroll-area
          horizontal
          style="height: 50px; width: 100%;"
          class="q-mb-md"
          :thumb-style="{opacity: 0}"
        >
          <div style="display: flex;">
            <div class="q-mr-sm" v-for="type in types" :key="type">
              <p-type-btn :types="type" :selected="false"></p-type-btn>
            </div>
          </div>
        </q-scroll-area>
        <p class="filter-title">Heights</p>
        <div class="q-mb-md" style="display: flex;">
          <p-height-btn class="q-mr-md" types="short" :selected="false"></p-height-btn>
          <p-height-btn class="q-mr-md" types="medium" :selected="false"></p-height-btn>
          <p-height-btn class="q-mr-md" types="tall" :selected="true"></p-height-btn>
        </div>
        <p class="filter-title">Weights</p>
        <div class="q-mb-md" style="display: flex;">
          <p-weight-btn class="q-mr-md" types="light" :selected="false"></p-weight-btn>
          <p-weight-btn class="q-mr-md" types="normal" :selected="true"></p-weight-btn>
          <p-weight-btn class="q-mr-md" types="heavy" :selected="false"></p-weight-btn>
        </div>

        <p class="filter-title">Number Range</p>
        <div class="q-mb-md">
          <p-range v-model="numRangeFilter" :min="0" :max="50"></p-range>
        </div>

        <div class="row q-mt-lg">
          <div class="col">
            <p-btn class="q-ml-md" valueBtnDefaut="Reset" :selected="false"></p-btn>
          </div>
          <div class="col">
            <p-btn class="q-ml-md" valueBtnDefaut="Apply" :selected="true"></p-btn>
          </div>
        </div>
      </div>
    </p-sheet>
  </q-page-container>
</template>

<script>
import DB from '../assets/database.json'
import PokeBall from '../components/PokeBall'
import pInput from '../components/input/pInput'
import cardPokemon from '../components/card/cardPokemon'
import pSheet from '../components/sheetBottom/pSheet'
import pBtn from '../components/buttom/pBtn'
import pTypeBtn from '../components/buttom/pTypeBtn'
import pHeightBtn from '../components/buttom/pHeightBtn'
import pWeightBtn from '../components/buttom/pWeightBtn'
import pGenerationsBtn from '../components/buttom/pGenerationsBtn'
import pRange from '../components/input/pRange'
export default {
  components: {
    PokeBall,
    pInput,
    cardPokemon,
    pSheet,
    pBtn,
    pGenerationsBtn,
    pTypeBtn,
    pHeightBtn,
    pWeightBtn,
    pRange
  },
  data () {
    return {
      SheetGeneration: false,
      generationSelected: 1,
      SheetSort: false,
      SheetSortOP: {
        smallNumber: true,
        highNumber: false,
        AZ: false,
        ZA: false
      },
      SheetFilter: false,
      search: '',
      pRange: {},
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
  },
  methods: {
    searchPokemons () {
      // console.log(this.search)
      var teste = DB.filter(record => record.name.toLowerCase().includes(this.search.toLowerCase()))
      console.log(teste)
    },
    myEventHandler (e) {
      this.topPokeball = this.$refs.pokeball.offsetHeight
    },
    sortHandler (sort) {
      Object.keys(this.SheetSortOP).forEach(item => {
        if (sort === item) {
          this.SheetSortOP[item] = true
        } else {
          this.SheetSortOP[item] = false
        }
      })
    },
    generationHandler (value) {
      this.generationSelected = value
    }
  },
  computed: {
    allPokemons () {
      if (this.generationSelected === 1) {

      }
      return DB.filter(result => result.id <= 151)
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
  .btn-filters {
    color: var(--text-black);
  }
  .icon {
    font-size: 22px;
  }
  .application-title {
    margin-top: 37.5px;
    margin-bottom: 10px;
  }

  .pokemon-name {
    color: var(--text-black);
    margin: 0px 0px 0px;
  }
  .description-poke {
    color: var(--text-black);
    margin: 5px 0px 35px;
  }
  .filter-title {
    margin-bottom: 5px;
  }
</style>
