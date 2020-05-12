<template>
  <div class="q-pa-md">
    <q-dialog class="col" v-model="dataControl" position="bottom">
      <div class="bar"></div>
      <q-card @click="cardFandleClick" class="card" :style="`width: 100%;height:${height}px;`">
        <q-scroll-area @scroll="handleScroll" style="height: 100%;">
          <slot></slot>
        </q-scroll-area>
      </q-card>
      <div v-touch-pan.prevent.mouse="handlePan" class="shadow-0 toucharea"></div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'pSheet',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataControl: this.value,
      height: (window.innerHeight * 0.5),
      panning: false,
      scroll: 0,
      timeout: 0
    }
  },
  methods: {
    cardFandleClick () {
      if (this.height <= window.innerHeight * 0.5) {
        this.height = window.innerHeight * 0.95
      }
    },
    handleScroll (info) {
      this.scroll = info.verticalPercentage
    },
    updateValue (value) {
      this.$emit('input', this.dataControl)
    },
    handlePan ({ evt, ...info }) {
      this.info = info
      if (info.direction === 'down') {
        this.dataControl = false
      }
      if (info.direction === 'up') {
        this.height = window.innerHeight * 0.95
      }
    }
  },
  watch: {
    scroll () {
      if (this.scroll > 0) {
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout)
          this.height = window.innerHeight * 0.95
        }, 500)
      }
    },
    dataControl () {
      // this.value = this.dataControl
      this.updateValue(this.dataControl)
    },
    value () {
      this.dataControl = this.value
      if (this.dataControl === false) {
        this.height = window.innerHeight * 0.5
      }
    }
  }
}
</script>

<style scoped>
  .card {
    transition: height 0.4s;
    border-radius: 30px 30px 0px 0px !important;
  }
  .bar {
    width: 80px !important;
    height: 6px;
    background: #fff;
    border-radius: 3px !important;
    position: absolute;
    top: -15px;
  }
  .toucharea {
    /* background: rgba(0, 0, 255, 0.25); */
    height: 130px;
    position: absolute;
    top: -30px;
  }
</style>
