<template>
  <q-card
    @click="goToRoute"
    :style="`background:var(--background-type-${types[0]});`"
    clickable
    v-ripple
    flat
    class="my-card"
  >
    <q-card-section class="q-ml-sm">
      <p class="pokemon-number">#{{imgPoke}}</p>
      <h2 class="pokemon-name">{{name}}</h2>
      <p-badge class="q-mr-xs" :types="type" v-for="type in types" :key="type"></p-badge>
      <q-img
        :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgPoke}.png`"
        spinner-color="grey-4"
        spinner-size="65px"
        class="img-card"
      />
    </q-card-section>
    <div class="icon-x3 iconx3-primary iconx3"></div>
    <div class="icon-pokeball iconPokeball-primary iconPokeball"></div>
  </q-card>
</template>

<script>
import pBadge from '../badge/pBadge'
import PokeService from '../../services/PokeService'
export default {
  name: 'cardPokemon',
  components: {
    pBadge
  },
  props: {
    IDPoke: {
      required: true
    }
  },
  data () {
    return {
      PokeService: new PokeService(),
      types: [''],
      name: ''
    }
  },
  methods: {
    goToRoute () {
      this.$router.push({ path: `pokemon/${this.IDPoke}` })
    },
    getPokemon () {
      this.PokeService.show(this.IDPoke)
        .then(res => {
          this.name = this.firstLetterUperCase(res.forms[0].name)

          this.types = []
          res.types.forEach(el => {
            this.types[el.slot - 1] = el.type.name
            // console.log(el.type.name)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    firstLetterUperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
  computed: {
    imgPoke () {
      return ('000' + this.IDPoke).slice(-3)
    }
  },
  created () {
    this.getPokemon()
  }

}
</script>
<style scoped>
  .my-card {
    /* overflow: hidden; */
    height: 115px;
    width: 100%;
    border-radius: 10px;
  }
  .img-card {
    z-index: 1;
    position: absolute;
    top: -25px;
    right: 3px;
    width: 130px;
    height: 130px;
  }
  .iconx3 {
    font-size: 32px;
    position: absolute;
    left: 68px;
    top: 6px;
    background: var(--gradient-vector);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
  }
  .iconPokeball {
    font-size: 145px;
    position: absolute;
    right: -6px;
    top: -12px;
    background: var(--gradient-vector);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
  }
  .pokemon-number {
    color: var(--text-number);
    margin: 10px 0px 0px;
  }
  .pokemon-name {
    color: var(--text-white);
    margin: 0px 0px 0px;
  }
</style>
