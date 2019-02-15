import Vue from 'vue';
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import jsdom from 'jsdom';
import TheArena from '../../src/components/TheArena';

const renderer = require('vue-server-renderer').createRenderer();

describe('Test suite for TheArena', () => {

  test('bet cannot be more than 999 and less than 0 after maxMin', () => {
    const wrapper = mount(TheArena)
    wrapper.setData({bet:999999999});
    wrapper.vm.maxMin();
    expect(wrapper.vm.bet).toBe(999);
    wrapper.setData({bet:-1});
    wrapper.vm.maxMin();
    expect(wrapper.vm.bet).toBe(0);
  });

  test('level cannot be more than 999 and less than 0 after maxMinLevel', () => {
    const wrapper = mount(TheArena)
    wrapper.setData({level:999999999});
    wrapper.vm.maxMinLevel();
    expect(wrapper.vm.level).toBe(20);
    wrapper.setData({level:-1});
    wrapper.vm.maxMinLevel();
    expect(wrapper.vm.level).toBe(1);
  });

  test('get Hero class object', () => {
    const wrapper = mount(TheArena);
    const job = wrapper.vm.getJob(7);
    expect(job.name).toBe('Hero');
  });

  test('get Lord class object when the id doesn\'t exists', () => {
    const wrapper = mount(TheArena);
    const job = wrapper.vm.getJob(666);
    expect(job.name).toBe('Lord');
  });

  test('getArenaData should return with Mage with Thunder when bet is 153, class is Lord and level is 6', () => {
    const wrapper = mount(TheArena);
    wrapper.setData({bet: 153, job: 1, level: 6});
    wrapper.vm.getArenaData();
    expect(wrapper.vm.enemyClass).toBe('Mage');
    expect(wrapper.vm.enemyWeapon).toBe('Thunder');
    expect(wrapper.vm.error).toBeFalsy();
  });

  test('getArenaData should show error  when bet is 178, class is Lord and level is 11', () => {
    const wrapper = mount(TheArena);
    wrapper.setData({bet: 179, job: 1, level: 11});
    wrapper.vm.getArenaData();
    expect(wrapper.vm.error).toBeTruthy();
  });
});

