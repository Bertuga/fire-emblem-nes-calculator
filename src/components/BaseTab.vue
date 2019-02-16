<template>
  <div
    v-if="tabs.length"
    id="tabs"
  >
    <ul id="tabs__menu">
      <BaseTabMenuItem
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
        :active-tab="activeTab"
        @changeTo="changeTo"
      />
    </ul>
    <div id="tabs__body">
      <BaseTabContent
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
        :active-tab="activeTab"
      />
    </div>
  </div>
</template>

<script>
import BaseTabMenuItem from './BaseTabMenuItem'
import BaseTabContent from './BaseTabContent'
import TheCalculator from './TheCalculator'
import TheArena from './TheArena'

let tabCount = 0
const active = 1

export default {
  components: {
    BaseTabContent,
    BaseTabMenuItem
  },
  data () {
    const tabsArr = []
    tabsArr.push(
      {
        id: tabCount += 1,
        title: 'Calculator',
        content: TheCalculator
      },
      {
        id: tabCount += 1,
        title: 'Arena',
        content: TheArena
      }
    )
    return {
      activeTab: active,
      tabs: tabsArr
    }
  },
  methods: {
    changeTo (id) {
      this.activeTab = id
    }
  }
}
</script>

<style>
  ul { list-style: none; padding: 0; margin: 0; }
  #tabs__body {
    border: 4px solid #fff;
    border-radius: 4px;
    padding: 10px;
  }
</style>
