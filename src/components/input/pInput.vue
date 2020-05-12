<template>
  <q-card
    @focusin="focus(true)"
    @focusout="focus(false)"
    class="card-custon-input shadow-0 flex flex-left"
    :class="{ 'background-focus': hasfocus }"
  >
    <q-input
      v-model="inputValue"
      class="q-ml-lg input-custon"
      borderless
      :placeholder="placeholder"
    >
      <template v-slot:prepend>
        <q-icon class="text-p-black" name="search" />
      </template>
    </q-input>
  </q-card>
</template>

<script>
export default {
  name: 'pInput',
  props: {
    teste: {
      type: String
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      inputValue: '',
      hasfocus: false,
      timeout: null
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    focus (value) {
      this.hasfocus = value
    },
    stopWrite () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('stopWrite')
      }, 2500)
    }
  },
  watch: {
    inputValue () {
      this.updateValue(this.inputValue)
      this.stopWrite()
    }
  }
}
</script>

<style scoped>
  .card-custon-input {
    caret-color: var(--type-psychic);
    height: 60px;
    border-radius: 10px;
    background: var(--background-default-input);
    transition: all 400ms ease;
  }
  .input-custon {
    height: 100%;
    width: 100%;
  }
  .background-focus {
    background: var(--background-pressed-input);
  }
</style>
