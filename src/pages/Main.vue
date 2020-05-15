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
          :thumb-style="{opacity: 0.1,height:'4px'}"
        >
          <div style="display: flex;">
            <div class="q-mr-sm" v-for="type in types" :key="type">
              <p-type-btn @click="typeFilter" :types="type" :selected="filtersTypeOP[type]"></p-type-btn>
            </div>
          </div>
        </q-scroll-area>
        <p class="filter-title">Weakness</p>
        <q-scroll-area
          horizontal
          style="height: 50px; width: 100%;"
          class="q-mb-md"
          :thumb-style="{opacity: 0.1,height:'4px'}"
        >
          <div style="display: flex;">
            <div class="q-mr-sm" v-for="type in types" :key="type">
              <p-type-btn @click="weaknessFilter" :types="type" :selected="filtersWeaknessOP[type]"></p-type-btn>
            </div>
          </div>
        </q-scroll-area>
        <p class="filter-title">Heights</p>
        <div class="q-mb-md" style="display: flex;">
          <p-height-btn
            @click="heightFilter"
            class="q-mr-md"
            types="short"
            :selected="filtersHeightsOP.short"
          ></p-height-btn>
          <p-height-btn
            @click="heightFilter"
            class="q-mr-md"
            types="medium"
            :selected="filtersHeightsOP.medium"
          ></p-height-btn>
          <p-height-btn
            @click="heightFilter"
            class="q-mr-md"
            types="tall"
            :selected="filtersHeightsOP.tall"
          ></p-height-btn>
        </div>
        <p class="filter-title">Weights</p>
        <div class="q-mb-md" style="display: flex;">
          <p-weight-btn
            @click="weightFilter"
            class="q-mr-md"
            types="light"
            :selected="filtersWeightsOP.light"
          ></p-weight-btn>
          <p-weight-btn
            @click="weightFilter"
            class="q-mr-md"
            types="normal"
            :selected="filtersWeightsOP.normal"
          ></p-weight-btn>
          <p-weight-btn
            @click="weightFilter"
            class="q-mr-md"
            types="heavy"
            :selected="filtersWeightsOP.heavy"
          ></p-weight-btn>
        </div>

        <p class="filter-title">Number Range</p>
        <div class="q-mb-md">
          <p-range v-model="filters.range" :min="1" :max="maxRangeFIlter"></p-range>
        </div>
        <div class="row q-mt-lg">
          <div class="col">
            <p-btn class="q-ml-md" valueBtnDefaut="Reset" :selected="false"></p-btn>
          </div>
          <div class="col">
            <p-btn @click="applyFilter" class="q-ml-md" valueBtnDefaut="Apply" :selected="true"></p-btn>
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
      maxRangeFIlter: DB.length,
      filters: {
        types: [],
        weakness: [],
        height: '',
        weight: '',
        range: { min: 1, max: DB.length },
        value: []
      },
      filtersWeightsOP: {
        light: false,
        normal: false,
        heavy: false
      },
      filtersHeightsOP: {
        short: false,
        medium: false,
        tall: false
      },
      filtersTypeOP: {
        bug: false,
        dark: false,
        dragon: false,
        electric: false,
        fairy: false,
        fighting: false,
        fire: false,
        flying: false,
        ghost: false,
        grass: false,
        ground: false,
        ice: false,
        normal: false,
        poison: false,
        psychic: false,
        rock: false,
        steel: false,
        water: false
      },
      filtersWeaknessOP: {
        bug: false,
        dark: false,
        dragon: false,
        electric: false,
        fairy: false,
        fighting: false,
        fire: false,
        flying: false,
        ghost: false,
        grass: false,
        ground: false,
        ice: false,
        normal: false,
        poison: false,
        psychic: false,
        rock: false,
        steel: false,
        water: false
      },
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
      ],
      allPokemons: []
    }
  },
  methods: {
    typeFilter (type) {
      this.filtersTypeOP[type.type] = !type.selected
      if (!type.selected) {
        this.filters.types.push(type.type)
      } else {
        const index = this.filters.types.indexOf(type.type)
        if (index > -1) {
          this.filters.types.splice(index, 1)
        }
      }
    },
    weaknessFilter (type) {
      this.filtersWeaknessOP[type.type] = !type.selected
      if (!type.selected) {
        this.filters.weakness.push(type.type)
      } else {
        const index = this.filters.weakness.indexOf(type.type)
        if (index > -1) {
          this.filters.weakness.splice(index, 1)
        }
      }
    },
    heightFilter (type) {
      if (type.selected) {
        this.filtersHeightsOP[type.type] = false
        this.filters.height = ''
      } else {
        Object.keys(this.filtersHeightsOP).forEach(item => {
          if (type.type === item) {
            this.filtersHeightsOP[item] = true
            this.filters.height = type.type
          } else {
            this.filtersHeightsOP[item] = false
          }
        })
      }
    },
    weightFilter (type) {
      if (type.selected) {
        this.filtersWeightsOP[type.type] = false
        this.filters.weight = ''
      } else {
        Object.keys(this.filtersWeightsOP).forEach(item => {
          if (type.type === item) {
            this.filtersWeightsOP[item] = true
            this.filters.weight = type.type
          } else {
            this.filtersWeightsOP[item] = false
          }
        })
      }
    },
    applyFilter () {
      let value
      function arrayCompare (first, last) {
        return first.filter(item => last.indexOf(item) > -1).length > 0
      }

      value = DB.filter(result => result.id >= this.filters.range.min && result.id <= this.filters.range.max)
      if (this.filters.types.length > 0) {
        value = value.filter(poke => arrayCompare(poke.types, this.filters.types))
      }
      if (this.filters.weakness.length > 0) {
        value = value.filter(poke => arrayCompare(poke.weaknesses, this.filters.weakness))
      }
      if (this.filters.height !== '') {
        if (this.filters.height === 'short') {
          value = value.filter(result => result.height <= 10)
        } else if (this.filters.height === 'medium') {
          value = value.filter(result => result.height >= 11 && result.height <= 30)
        } else {
          value = value.filter(result => result.height >= 31)
        }
      }
      if (this.filters.weight !== '') {
        if (this.filters.weight === 'light') {
          value = value.filter(result => result.weight <= 500)
        } else if (this.filters.weight === 'normal') {
          value = value.filter(result => result.weight >= 501 && result.weight <= 1000)
        } else {
          value = value.filter(result => result.weight >= 1001)
        }
      }

      this.allPokemons = value
      this.allPokemons = this.sortSelect()
    },
    searchPokemons () {
      if (this.search === '') {
        this.generationHandler(1)
      } else {
        this.allPokemons = DB.filter(record => record.name.toLowerCase().includes(this.search.toLowerCase()))
      }
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
      this.allPokemons = this.sortSelect()
    },
    sortSelect () {
      if (this.SheetSortOP.smallNumber) {
        const smallNumbercomparator = (propName) => (a, b) => a[propName] - b[propName]
        return this.allPokemons.sort(smallNumbercomparator('id'))
      } else if (this.SheetSortOP.highNumber) {
        const highNumbercomparator = (propName) => (a, b) => b[propName] - a[propName]
        return this.allPokemons.sort(highNumbercomparator('id'))
      } else if (this.SheetSortOP.AZ) {
        const AZcomparator = (propName) => (a, b) => a[propName].toLowerCase() === b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() < b[propName].toLowerCase() ? -1 : 1
        return this.allPokemons.sort(AZcomparator('name'))
      } else if (this.SheetSortOP.ZA) {
        const AZcomparator = (propName) => (a, b) => a[propName].toLowerCase() === b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() > b[propName].toLowerCase() ? -1 : 1
        return this.allPokemons.sort(AZcomparator('name'))
      }
    },
    generationHandler (value) {
      this.generationSelected = value
      this.allPokemons = this.generationfilter()
      this.allPokemons = this.sortSelect()
    },
    generationfilter () {
      let pokemons
      if (this.generationSelected === 1) {
        pokemons = DB.filter(result => result.id <= 151)
      } else if (this.generationSelected === 2) {
        pokemons = DB.filter(result => result.id > 151 && result.id <= 251)
      } else if (this.generationSelected === 3) {
        pokemons = DB.filter(result => result.id > 251 && result.id <= 386)
      } else if (this.generationSelected === 4) {
        pokemons = DB.filter(result => result.id > 386 && result.id <= 493)
      } else if (this.generationSelected === 5) {
        pokemons = DB.filter(result => result.id > 493 && result.id <= 649)
      } else if (this.generationSelected === 6) {
        pokemons = DB.filter(result => result.id > 649 && result.id <= 721)
      } else if (this.generationSelected === 7) {
        pokemons = DB.filter(result => result.id > 721 && result.id <= 809)
      } else if (this.generationSelected === 8) {
        pokemons = DB.filter(result => result.id > 809 && result.id <= 890)
      }
      return pokemons
    }
  },
  created () {
    this.generationHandler(1)
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
