<template>
  <q-page-container v-scroll="scrolled">
    <div class="header q-pt-xl" :style="`background: var(--background-type-grass);`">
      <q-btn @click="$router.push({ path: '/' })" class="btn-back q-ml-lg" flat round>
        <span style class="icon icon-back"></span>
      </q-btn>
      <transition name="list">
        <h1 v-show="!expanded" class="pokemon-name text-center">Bulbasaur</h1>
      </transition>
      <!-- pura gambiarra -->
      <p>.</p>
      <!-- pura gambiarra -->

      <q-card
        class="cardTop flex flex-center"
        :style="`height:${expanded ? '150px' : '0px'};opacity :${expanded ? '1' : '0'};background: var(--background-type-grass);`"
        flat
      >
        <q-card-section>
          <div class="row">
            <div class="col q-pr-lg">
              <q-img
                :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`"
                spinner-color="grey-4"
                spinner-size="65px"
                class="img-card"
              />
              <div class="icon-circle iconCircle"></div>
            </div>
            <div class="col">
              <p class="filter-title">#001</p>
              <h2 class="application-title">Bulbasaur</h2>
              <p-badge class="q-mr-xs" types="grass"></p-badge>
              <p-badge class="q-mr-xs" types="poison"></p-badge>
            </div>
          </div>
        </q-card-section>
        <h1 class="title-poke">BULBASAUR</h1>
      </q-card>

      <div :style="`${expanded ? 'top: 170px;': 'top: 31px;'}`" class="icon-x5 iconX5 text-right"></div>

      <p-tab v-model="aba"></p-tab>
      <div class="border"></div>
    </div>
    <div class="content-page">
      <q-tab-panels v-model="aba" animated>
        <q-tab-panel name="about">
          <div class="text-h6">Mails</div>
          <div v-for="n in 300" :key="n">Lorem ipsum dolor sit amet consectetur adipisicin.</div>
        </q-tab-panel>
        <q-tab-panel name="stats">
          <div class="text-h6">Alarms</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <p-badge types="grass"></p-badge>
        </q-tab-panel>
        <q-tab-panel name="evolution">
          <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <p-badge-mini types="grass"></p-badge-mini>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page-container>
</template>

<script>
import pTab from '../components/tab/pTab'
import pBadge from '../components/badge/pBadge'
import pBadgeMini from '../components/badge/pBadgeMini'
export default {
  components: {
    pTab,
    pBadge,
    pBadgeMini
  },
  data () {
    return {
      expanded: true,
      tab: 'mails',
      aba: 'about'
    }
  },
  methods: {
    scrolled (position) {
      this.expanded = position < 100
      console.log(position)
    }
  }
}
</script>

<style scoped>
  .img-card {
    width: 125px;
    height: 125px;
    z-index: 1;
  }
  .content-page {
    padding-top: 305px;
  }
  .header {
    z-index: 999;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .cardTop {
    transition: height 0.5s, opacity 0.5s;
  }
  .list-enter,
  .list-leave-to {
    visibility: hidden;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s;
  }
  .border {
    border-radius: 30px 30px 0px 0px;
    background: var(--background-white);
    height: 30px;
  }
  .btn-back {
    color: var(--text-white);
    position: absolute;
    z-index: 1;
  }
  .icon {
    font-size: 22px;
  }
  .iconCircle {
    background: var(--gradient-pokemon-circle);
    font-size: 125px;
    position: absolute;
    top: 19px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
  }
  .iconX5 {
    background: var(--gradient-vector-white);
    font-size: 65px;
    position: inherit;
    /* top: 31px; */
    right: -73px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
    transition: top 0.5s;
  }
  .pokemon-name {
    color: var(--text-white);
    margin: 0px;
  }
  .filter-title {
    color: var(--text-white);
    margin: 0px;
  }
  .application-title {
    color: var(--text-white);
    margin: 0px;
  }
  .title-poke {
    margin: 0px;
    text-align: center;
    position: absolute;
    width: 585px;
    height: 119px;
    top: -55px;
    background: var(--gradient-vector);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
