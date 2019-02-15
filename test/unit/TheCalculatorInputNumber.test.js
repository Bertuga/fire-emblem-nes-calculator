import Vue from 'vue';
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import jsdom from 'jsdom';
import TheCalculatorInputNumber from '../../src/components/TheCalculatorInputNumber';

const renderer = require('vue-server-renderer').createRenderer();

describe('Test suite for TheCalculatorInputNumber', () => {

  test('the input value cannot be more than 99 or less than 0 after input event', () => {
    const wrapper = mount(TheCalculatorInputNumber)
    wrapper.setData({valor: 9999999});
    wrapper.trigger('input');
    expect(wrapper.vm.valor).toBe('99');
    wrapper.setData({valor: -1});
    wrapper.trigger('input');
    expect(wrapper.vm.valor).toBe('0');
  });

});

