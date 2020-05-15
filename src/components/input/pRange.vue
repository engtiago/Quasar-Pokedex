<template>
  <div>
    <q-range
      label
      class="custom-colored-range"
      v-model="rangeValue"
      :min="this.min"
      :max="this.max"
      color="poke-primary"
    />
  </div>
</template>

<script>
export default {
  name: 'pRange',
  props: {
    value: {
      type: Object
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      rangeValue: {
        min: this.min,
        max: this.max
      }
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  },
  watch: {
    rangeValue () {
      this.updateValue(this.rangeValue)
    }
  }
}
</script>

<style lang="stylus">
  .custom-colored-range {
    margin-bottom: 20px;

    .q-slider__track-container {
      height: 4px;
    }

    .q-slider__thumb path {
      stroke: currentColor;
      fill: #fff;
    }

    .q-slider__arrow {
      display: none;
    }

    .q-slider__pin {
      top: 46px;
      left: -10px;
    }

    .q-slider__pin-text {
      color: var(--text-gray);
      font-family: 'SF Pro Display';
      font-style: medium;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
    }

    .q-slider__pin-text-container {
      color: transparent;
    }
  }

  .custom-colored-range {
  }
</style>
