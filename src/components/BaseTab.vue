<template>
  <div
    v-if="tabs.length"
    id="tabs"
  >
    <ul id="tabs__tabs_menu">
      <BaseTabMenuItem
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
        @changeTo="changeTo"
      />
    </ul>
    <div id="tabs__tabs_body">
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
