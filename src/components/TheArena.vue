<template>
  <div id="arena">
    Class:
    <select
      v-model="job"
    >
      <option
        v-for="jobItem in classList"
        :key="jobItem.id"
        :value="jobItem.id"
        @change="getArenaData"
      >
        {{ jobItem.name }}
      </option>
    </select><br>
    Level: <input
      v-model="level"
      type="number"
      class="input"
      min="1"
      max="20"
      @input="maxMinLevel"
    ><br>
    Bet: <input
      v-model="bet"
      type="number"
      class="input"
      min="0"
      max="999"
      @input="maxMin"
    ><br>
    <div v-if="enemyWeapon != ''">
      <p>Enemy: {{ enemyClass }}</p>
      <p>Weapon: {{ enemyWeapon }}</p>
    </div>
    <p v-if="error === true">
      Data not found
    </p>
  </div>
</template>

<script>
import classData from '../assets/data/class.json'
import arenaData from '../assets/data/arena.json'

export default {
  data () {
    return {
      classList: classData,
      arenaList: arenaData,
      job: 1,
      bet: 0,
      level: 1,
      enemyClass: '',
      enemyWeapon: '',
      error: false
    }
  },
  methods: {
    maxMin: function maxMin () {
      if (this.bet > 999) {
        this.bet = 999
      }
      if (this.bet < 0) {
        this.bet = 0
      }
      this.getArenaData()
    },
    maxMinLevel: function maxMinLevel () {
      if (this.level > 20) {
        this.level = 20
      }
      if (this.level < 1) {
        this.level = 1
      }
      this.getArenaData()
    },
    getArenaData: function getArenaData () {
      const arenaIndex = (this.bet * 10) - (40 * (this.level - 1))
      const job = this.getJob(this.job)
      if (this.arenaList[job.name][arenaIndex] !== undefined) {
        const arenaEnemy = this.arenaList[job.name][arenaIndex]
        this.enemyClass = arenaEnemy.class
        this.enemyWeapon = arenaEnemy.weapon
        this.error = false
      } else {
        this.enemyClass = ''
        this.enemyWeapon = ''
        this.error = true
      }
    },
    getJob: function getJob (jobId) {
      const job = this.classList.find(jobItem => jobItem.id === jobId)
      if (job !== undefined) {
        return job
      }
      return this.getJob(1)
    }
  }
}
</script>

<style>
 #arena {
  border: 4px solid #fff;
  border-radius: 5px;
  line-height: 1.6em;
  margin: 0 auto;
  padding: 10px;
  max-width: 450px;
  min-height: 200px;
 }
 input {
  border: 1px solid #000;
  border-radius: 2px;
  padding: 2px 5px;
  text-align: center;
 }
 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
 }
</style>
