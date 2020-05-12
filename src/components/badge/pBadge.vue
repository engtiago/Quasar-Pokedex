<template>
  <q-badge :style="`background: var(--type-${types})`" class="custom-badge">
    <span :class="`badge-text icon-${types}`"></span>
    <span class="badge-text q-ml-xs">{{firstLetterUperCase(types)}}</span>
  </q-badge>
</template>

<script>
export default {
  name: 'pBadge',
  props: {
    types: {
      type: String,
      required: true
    }
  },
  methods: {
    firstLetterUperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<style scoped lang="stylus">
  .custom-badge {
    height: 25px;
    text-align: center;
  }

  .badge-text {
    color: var(--text-white);
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
  }
</style>
