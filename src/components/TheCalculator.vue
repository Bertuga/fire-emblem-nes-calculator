<template>
  <div id="calculator">
    <div id="unit1">
      Unit 1<br>

      Class
      <select
        v-model="class_1"
        @change="refresh"
      >
        <option
          v-for="job in classList"
          :key="job.id"
          :value="job.id"
        >
          {{ job.name }}
        </option>
      </select>
      <br>
      Weapon
      <select
        v-model="wpn_1"
        @change="refresh"
      >
        <option
          v-for="weapon in weaponList"
          :key="weapon.id"
          :disabled="weapon.id === null"
          :value="weapon.id"
        >
          {{ weapon.name }}
        </option>
      </select>
      <br>
      Terrain
      <select
        v-model="terrain_1"
        @change="refresh"
      >
        <option
          v-for="terrain in terrainList"
          :key="terrain.id"
          :value="terrain.id"
        >
          {{ terrain.name }}
        </option>
      </select>
      <br>
      Str: <TheCalculatorInputNumber
        v-model.number="str_1"
        @input="refresh"
      />
      <br>
      Skl: <TheCalculatorInputNumber
        v-model.number="skl_1"
        @input="refresh"
      />
      <br>
      Spd: <TheCalculatorInputNumber
        v-model.number="spd_1"
        @input="refresh"
      />
      <br>
      Lck: <TheCalculatorInputNumber
        v-model.number="lck_1"
        @input="refresh"
      />
      <br>
      Def: <TheCalculatorInputNumber
        v-model.number="def_1"
        @input="refresh"
      /> + {{ bonus_1 }}
      <br>
      Res: <TheCalculatorInputNumber
        v-model.number="res_1"
        @input="refresh"
      />
      <br>

      Damage: {{ damage_1 }}<br>
      Hit%: {{ hit_1 }}<br>
      Crit%: {{ crit_1 }}<br>
      No. Atks: {{ atk_no_1 }}<br>
      Self Damage%: {{ self_damage_1 }}<br>
    </div>
    <div id="unit2">
      Unit 2<br>

      Class
      <select
        v-model="class_2"
        @change="refresh"
      >
        <option
          v-for="job in classList"
          :key="job.id"
          :value="job.id"
        >
          {{ job.name }}
        </option>
      </select>
      <br>
      Weapon
      <select
        v-model="wpn_2"
        @change="refresh"
      >
        <option
          v-for="weapon in weaponList"
          :key="weapon.id"
          :disabled="weapon.id === null"
          :value="weapon.id"
        >
          {{ weapon.name }}
        </option>
      </select>
      <br>
      Terrain
      <select
        v-model="terrain_2"
        @change="refresh"
      >
        <option
          v-for="terrain in terrainList"
          :key="terrain.id"
          :value="terrain.id"
        >
          {{ terrain.name }}
        </option>
      </select>
      <br>
      Str: <TheCalculatorInputNumber
        v-model.number="str_2"
        @input="refresh"
      />
      <br>
      Skl: <TheCalculatorInputNumber
        v-model.number="skl_2"
        @input="refresh"
      />
      <br>
      Spd: <TheCalculatorInputNumber
        v-model.number="spd_2"
        @input="refresh"
      />
      <br>
      Lck: <TheCalculatorInputNumber
        v-model.number="lck_2"
        @input="refresh"
      />
      <br>
      Def: <TheCalculatorInputNumber
        v-model.number="def_2"
        @input="refresh"
      /> + {{ bonus_2 }}
      <br>
      Res: <TheCalculatorInputNumber
        v-model.number="res_2"
        @input="refresh"
      />
      <br>

      Damage: {{ damage_2 }}<br>
      Hit%: {{ hit_2 }}<br>
      Crit%: {{ crit_2 }}<br>
      No. Atks: {{ atk_no_2 }}<br>
      Self Damage%: {{ self_damage_2 }}<br>
    </div>
  </div>
</template>

<script>
import TheCalculatorInputNumber from './TheCalculatorInputNumber'
import classData from '../assets/data/class.json'
import weaponData from '../assets/data/weapon.json'
import terrainData from '../assets/data/terrain.json'

export default {
  components: {
    TheCalculatorInputNumber
  },
  data: function () {
    return {
      classList: classData,
      weaponList: weaponData,
      terrainList: terrainData,
      class_1: 1,
      wpn_1: 1,
      terrain_1: 1,
      str_1: 0,
      skl_1: 0,
      spd_1: 0,
      lck_1: 0,
      def_1: 0,
      res_1: 0,
      bonus_1: 0,
      damage_1: '',
      hit_1: '',
      crit_1: '',
      atk_no_1: '',
      self_damage_1: '',
      class_2: 1,
      wpn_2: 1,
      terrain_2: 1,
      str_2: 0,
      skl_2: 0,
      spd_2: 0,
      lck_2: 0,
      def_2: 0,
      res_2: 0,
      bonus_2: 0,
      damage_2: '',
      hit_2: '',
      crit_2: '',
      atk_no_2: '',
      self_damage_2: ''
    }
  },
  mounted () {
    this.$nextTick(function callRefresh () {
      this.refresh()
    })
  },
  methods: {
    refresh: function refresh () {
      const atkSpd1 = this.getAttackSpeed(1)
      const atkSpd2 = this.getAttackSpeed(2)
      const wpn1 = this.getWeapon(this.wpn_1)
      const wpn2 = this.getWeapon(this.wpn_2)

      this.bonus_1 = wpn1.bonusDef
      this.bonus_2 = wpn2.bonusDef

      this.damage_1 = this.getDamage(this.getPower(1), this.getDefense(2))
      this.damage_2 = this.getDamage(this.getPower(2), this.getDefense(1))

      this.hit_1 = this.getHitRate(this.getAccuracy(1), this.getAvoid(2))
      this.hit_2 = this.getHitRate(this.getAccuracy(2), this.getAvoid(1))

      this.atk_no_1 = this.getNumberOfAttacks(atkSpd1, atkSpd2)
      this.atk_no_2 = this.getNumberOfAttacks(atkSpd2, atkSpd1)

      this.crit_1 = this.getCriticalRate(1)
      this.crit_2 = this.getCriticalRate(2)

      this.self_damage_1 = this.getSelfDamageRate(1)
      this.self_damage_2 = this.getSelfDamageRate(2)
    },
    getWeapon: function getWeapon (wpnId) {
      const weapon = this.weaponList.find(weaponItem => weaponItem.id === wpnId)
      if (weapon !== undefined) {
        return weapon
      }
      return this.getWeapon(1)
    },
    getJob: function getJob (jobId) {
      const job = this.classList.find(jobItem => jobItem.id === jobId)
      if (job !== undefined) {
        return job
      }
      return this.getJob(1)
    },
    getPower: function getPower (unit) {
      const wpnField = `wpn_${unit}`
      const strField = `str_${unit}`
      const weapon = this.getWeapon(this[wpnField])
      const enemyClass = `class_${this.getEnemy(unit)}`
      const weaponPower = weapon.mt *
        this.getEffectiveCoefficient(weapon, this.getJob(this[enemyClass]))
      if (!weapon.magic) {
        return this[strField] + weaponPower
      }
      return weaponPower
    },
    getEnemy: function getEnemy (unit) {
      return unit === 1 ? 2 : 1
    },
    getEffectiveCoefficient: function getEffectiveCoefficient (weapon, job) {
      if (weapon.effective == null || job.type === 'normal') {
        return 1
      }

      const effective = weapon.effective.find(wpnEffective =>
        job.type.find(jobVulnerable => jobVulnerable === wpnEffective))
      if (effective !== undefined) {
        return 3
      }
      return 1
    },
    getSelfDamageRate: function getSelfDamageRate (unit) {
      const wpnField = `wpn_${unit}`
      const lckField = `lck_${unit}`
      const weapon = this.getWeapon(this[wpnField])
      const selfDamageRate = weapon.selfDamage > 0 ? weapon.selfDamage - this[lckField] : 0
      return selfDamageRate >= 0 ? selfDamageRate : 0
    },
    getAttackSpeed: function getAttackSpeed (unit) {
      const wpnField = `wpn_${unit}`
      const spdField = `spd_${unit}`
      const weapon = this.getWeapon(this[wpnField])
      return this[spdField] - weapon.wt
    },
    getCriticalRate: function getCriticalRate (unit) {
      const wpnField = `wpn_${unit}`
      const sklField = `skl_${unit}`
      const lckField = `lck_${unit}`
      const weapon = this.getWeapon(this[wpnField])
      return parseInt(((this[sklField] + this[lckField]) / 2) + weapon.crt, 10)
    },
    getAccuracy: function getAccuracy (unit) {
      const wpnField = `wpn_${unit}`
      const sklField = `skl_${unit}`
      const weapon = this.getWeapon(this[wpnField])
      return weapon.magic ? weapon.hit : weapon.hit + this[sklField]
    },
    getTerrain: function getTerrain (terrainId) {
      const terrain = this.terrainList.find(terrainItem => terrainItem.id === terrainId)
      if (terrain !== undefined) {
        return terrain
      }
      return this.getTerrain(1)
    },
    getAvoid: function getAvoid (unit) {
      const wpnField = `wpn_${this.getEnemy(unit)}`
      const terrainField = `terrain_${unit}`
      const lckField = `lck_${unit}`
      const enemyWeapon = this.getWeapon(this[wpnField])
      const terrain = this.getTerrain(this[terrainField])
      return enemyWeapon.magic ? this[lckField] : this.getAttackSpeed(unit) + terrain.bonus
    },
    getDefense: function getDefense (unit) {
      const enemyWpnField = `wpn_${this.getEnemy(unit)}`
      const unitWpnField = `wpn_${unit}`
      const unitRes = `res_${unit}`
      const unitDef = `def_${unit}`
      const enemyWeapon = this.getWeapon(this[enemyWpnField])
      const unitWeapon = this.getWeapon(this[unitWpnField])
      return enemyWeapon.magic ? this[unitRes] : this[unitDef] + unitWeapon.bonusDef
    },
    getNumberOfAttacks: function getNumberOfAttacks (attackingSpeed, defendingSpeed) {
      return attackingSpeed > defendingSpeed ? 2 : 1
    },
    getHitRate: function getHitRate (accuracy, avoid) {
      const hitRate = accuracy - avoid
      if (hitRate > 100) {
        return 100
      }
      return hitRate < 0 ? 0 : hitRate
    },
    getDamage: function getDamage (power, defense) {
      const damage = power - defense
      return damage > 0 ? damage : 0
    }
  }
}
</script>

<style>
  #calculator { display:flex; flex-wrap: wrap }
  #calculator > div {
    border: 4px solid #fff;
    border-radius: 5px;
    line-height: 1.6em;
    margin: 0 auto;
    padding: 10px;
    max-width: 330px;
    margin-bottom: 10px;
  }
  select  { width: 100% }

</style>
