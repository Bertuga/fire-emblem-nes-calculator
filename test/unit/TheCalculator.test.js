import Vue from 'vue';
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import jsdom from 'jsdom';
import TheCalculator from '../../src/components/TheCalculator';

const renderer = require('vue-server-renderer').createRenderer();

describe('Test suite for TheCalculator', () => {

  test('is a Vue instance', () => {
    const wrapper = mount(TheCalculator)
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  test('get Skl_1 value of 10', () => {
    const wrapper = mount(TheCalculator)
    wrapper.setData({skl_1:10});
    expect(wrapper.vm.skl_1).toBe(10);
  });

  test('get Iron Sword weapon object', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 1});
    const ironSword = wrapper.vm.getWeapon(wrapper.vm.wpn_1);
    expect(ironSword.name).toBe('Iron Sword');
    expect(ironSword.mt).toBe(5);
    expect(ironSword.wt).toBe(2);
    expect(ironSword.hit).toBe(100);
  });

  test('get Iron Sword weapon object when id doesn\'t exists', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 666});
    const ironSword = wrapper.vm.getWeapon(wrapper.vm.wpn_1);
    expect(ironSword.name).toBe('Iron Sword');
    expect(ironSword.mt).toBe(5);
    expect(ironSword.wt).toBe(2);
    expect(ironSword.hit).toBe(100);
  });

  test('get Excalibur weapon object', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 44});
    const excalibur = wrapper.vm.getWeapon(wrapper.vm.wpn_1);
    expect(excalibur.name).toBe('Excalibur');
    expect(excalibur.mt).toBe(13);
    expect(excalibur.wt).toBe(3);
    expect(excalibur.hit).toBe(100);
  });

  test('power of unit 1 with strength 5 using Silver Lance should be 17', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 13, str_1: 5});
    const power = wrapper.vm.getPower(1);
    expect(power).toBe(17);
  });

  test('power of unit 2 with strength 11 using Steel Axe should be 20', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 18, str_2: 11});
    const power = wrapper.vm.getPower(2);
    expect(power).toBe(20);
  });

  test('power of unit 1 using Starlight should be 13', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 46});
    const power = wrapper.vm.getPower(1);
    expect(power).toBe(13);
  });

  test('power of unit 2 using Aura should be 20', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 43});
    const power = wrapper.vm.getPower(2);
    expect(power).toBe(20);
  });

  test('get enemy must return 2 when the unit is 1 and return 1 when the unit is 2', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getEnemy(1)).toBe(2);
    expect(wrapper.vm.getEnemy(2)).toBe(1);
  });

  test('get Lord class object', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(1);
    expect(job.name).toBe('Lord');
    expect(job.type).toBe("normal");
  });

  test('get Lord class object when id doesn\'t exists', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(666);
    expect(job.name).toBe('Lord');
    expect(job.type).toBe("normal");
  });

  test('get Dragon Knight class object and his types (flying and dragon)', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(5);
    expect(job.name).toBe('Dragon Knight');
    expect(job.type[0]).toBe("flying");
    expect(job.type[1]).toBe("dragon");
  });

  test('damage coefficient of Bow against Mercenary (normal-type unit) should be 1', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(6);
    const weapon = wrapper.vm.getWeapon(22);
    const coefficient = wrapper.vm.getEffectiveCoefficient(weapon, job);
    expect(coefficient).toBe(1);
  });

  test('damage coefficient of Armour Killer against armor-type unit should be 3', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(13);
    const weapon = wrapper.vm.getWeapon(8);
    const coefficient = wrapper.vm.getEffectiveCoefficient(weapon, job);
    expect(job.name).toBe("Armour Knight");
    expect(weapon.name).toBe("Armour Killer");
    expect(coefficient).toBe(3);
  });

  test('damage coefficient of Bow against armor-type unit should be 1', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(13);
    const weapon = wrapper.vm.getWeapon(22);
    const coefficient = wrapper.vm.getEffectiveCoefficient(weapon, job);
    expect(job.name).toBe("Armour Knight");
    expect(weapon.name).toBe("Bow");
    expect(coefficient).toBe(1);
  });

  test('damage coefficient of Bow against flying-type unit should be 3', () => {
    const wrapper = mount(TheCalculator);
    const job = wrapper.vm.getJob(4);
    const weapon = wrapper.vm.getWeapon(22);
    const coefficient = wrapper.vm.getEffectiveCoefficient(weapon, job);
    expect(job.name).toBe("Pegasus Knight");
    expect(weapon.name).toBe("Bow");
    expect(coefficient).toBe(3);
  });

  test('power of unit 1 with strength 10 using Bow against an Pegasus Knight should be 22', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 22, str_1: 10, class_2: 4});
    const power = wrapper.vm.getPower(1);
    expect(power).toBe(22);
  });

  test('self-damage % of unit 1 using silver bow with lck 7 should be 0', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 25, lck_1: 7});
    const selfDamageRate = wrapper.vm.getSelfDamageRate(1);
    expect(selfDamageRate).toBe(0);
  });

  test('self-damage % of unit 1 using devil axe with lck 3 should be 18', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 20, lck_1: 3});
    const selfDamageRate = wrapper.vm.getSelfDamageRate(1);
    expect(selfDamageRate).toBe(18);
  });

  test('self-damage % of unit 2 using devil sword with lck 11 should be 10', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 6, lck_2: 11});
    const selfDamageRate = wrapper.vm.getSelfDamageRate(2);
    expect(selfDamageRate).toBe(10);
  });

  test('self-damage % of unit 2 using devil sword with lck 22 should be 0', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 6, lck_2: 22});
    const selfDamageRate = wrapper.vm.getSelfDamageRate(2);
    expect(selfDamageRate).toBe(0);
  });

  test('attack speed of unit 1 with steel sword and spd 12 should be 8', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 2, spd_1: 12});
    const attackSpeed = wrapper.vm.getAttackSpeed(1);
    expect(attackSpeed).toBe(8);
  });

  test('attack speed of unit 2 with elephant and spd 7 should be -5', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 31, spd_2: 7});
    const attackSpeed = wrapper.vm.getAttackSpeed(2);
    expect(attackSpeed).toBe(-5);
  });

  test('critical % of unit 1 with bowgun, skl 7 and lck 6 should be 26', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 24, skl_1: 7, lck_1: 6});
    const criticalRate = wrapper.vm.getCriticalRate(1);
    expect(criticalRate).toBe(26);
  });

  test('critical % of unit 2 with kill sword, skl 17 and lck 14 should be 35', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 4, skl_2: 17, lck_2: 14});
    const criticalRate = wrapper.vm.getCriticalRate(2);
    expect(criticalRate).toBe(35);
  });

  test('critical % of unit 1 with fire dragonstone, skl 4 and lck 2 should be 3', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 32, skl_1: 4, lck_1: 2});
    const criticalRate = wrapper.vm.getCriticalRate(1);
    expect(criticalRate).toBe(3);
  });

  test('accuracy of unit 1 using axe with 9 skl should be 89', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 17, skl_1: 9});
    const accuracy = wrapper.vm.getAccuracy(1);
    expect(accuracy).toBe(89);
  });

  test('accuracy of unit 2 using elfire should be 80', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_2: 39});
    const accuracy = wrapper.vm.getAccuracy(2);
    expect(accuracy).toBe(80);
  });

  test('get Forest terrain object', () => {
    const wrapper = mount(TheCalculator);
    const terrain = wrapper.vm.getTerrain(3);
    expect(terrain.name).toBe('Forest');
  });

  test('get Default terrain object when the id doens\'t exists', () => {
    const wrapper = mount(TheCalculator);
    const terrain = wrapper.vm.getTerrain(666);
    expect(terrain.name).toBe('Default');
  });

  test('avoid value of unit 1, using knight killer with spd 8 on the castle terrain should be 33', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 14, spd_1: 8, terrain_1: 7});
    const avoid = wrapper.vm.getAvoid(1);
    expect(avoid).toBe(33);
  });

  test('avoid value of unit 2 with lck 12 on the fort terrain against an unit using Thunder', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({wpn_1: 37, lck_2: 12, terrain_2: 6});
    const avoid = wrapper.vm.getAvoid(2);
    expect(avoid).toBe(12);
  });

  test('defense value of unit 1 with def 9 against unit using rapier should be 9', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({def_1: 9, wpn_2: 9});
    const defense = wrapper.vm.getDefense(1);
    expect(defense).toBe(9);
  });

  test('defense value of unit 1 with def 7 using divine dragonstone against unit using iron sword should be 22', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({def_1: 7, wpn_1: 33, wpn_2: 1});
    const defense = wrapper.vm.getDefense(1);
    expect(defense).toBe(22);
  });

  test('defense value of unit 2 with res 2 against unit using thoron should be 2', () => {
    const wrapper = mount(TheCalculator);
    wrapper.setData({res_2: 2, wpn_1: 41});
    const defense = wrapper.vm.getDefense(2);
    expect(defense).toBe(2);
  });

  test('number of attacks of unit 1 with attack speed 2 against unit with attack speed 5 should be 1', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getNumberOfAttacks(2, 5)).toBe(1);
  });

  test('number of attacks of unit 1 with attack speed 4 against unit with attack speed 3 should be 2', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getNumberOfAttacks(4, 2)).toBe(2);
  });

  test('number of attacks of unit 1 with attack speed 7 against unit with attack speed 7 should be 1', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getNumberOfAttacks(7, 7)).toBe(1);
  });

  test('hit rate of accuracy 100 against avoid 30 should be 70', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getHitRate(100, 30)).toBe(70);
  });

  test('hit rate of accuracy 10 against avoid 50 should be 0', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getHitRate(10, 50)).toBe(0);
  });

  test('hit rate of accuracy 120 against avoid 10 should be 100', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getHitRate(120, 10)).toBe(100);
  });

  test('damage of power 20 against defense 10 should be 10', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getDamage(20, 10)).toBe(10);
  });

  test('damage of power 5 against defense 20 should be 0', () => {
    const wrapper = mount(TheCalculator);
    expect(wrapper.vm.getDamage(5, 20)).toBe(0);
  });
});

