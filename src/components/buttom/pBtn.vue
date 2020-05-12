<template>
  <div>
    <q-btn
      @click="EmitClick"
      v-if="selected"
      flat
      class="btn-poke btn-primary custon-shadow full-width"
      no-caps
    >{{valueBtnDefaut}}</q-btn>
    <q-btn
      @click="EmitClick"
      v-else
      flat
      class="btn-poke btn-secondary full-width"
      no-caps
    >{{valueBtnDefaut}}</q-btn>
  </div>
</template>

<script>
export default {
  name: 'pBtn',
  props: {
    valueBtnDefaut: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    EmitClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
  .custon-shadow {
    box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
  }
  .btn-poke {
    border-radius: 10px;
    font-family: "SF Pro Display";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    height: 60px;
  }
  .btn-primary {
    background: #ea5d60;
    /* Text / White */
    color: #ffffff;
  }
  .btn-secondary {
    background: #f7f7f7;
    /* Text / White */
    color: #747476;
  }
</style>
