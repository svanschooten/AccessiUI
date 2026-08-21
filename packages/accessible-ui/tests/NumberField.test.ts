import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NumberField from '../src/components/NumberField.vue';

const mountField = (props: Record<string, unknown> = {}) =>
  mount(NumberField, { props: { label: 'Current hit points', modelValue: 34, ...props } });

describe('NumberField', () => {
  it('does not use input type="number" (plan section 5.1)', () => {
    const input = mountField().get('input');
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('type')).not.toBe('number');
  });

  it('raises the numeric keypad on phones', () => {
    expect(mountField().get('input').attributes('inputmode')).toBe('numeric');
  });

  it('switches to the decimal keypad when fractions are allowed', () => {
    expect(mountField({ decimal: true }).get('input').attributes('inputmode')).toBe('decimal');
  });

  it('associates its label with the input', () => {
    const wrapper = mountField();
    const inputId = wrapper.get('input').attributes('id');
    expect(inputId).toBeTruthy();
    expect(wrapper.get('label').attributes('for')).toBe(inputId);
  });

  it('associates a description via aria-describedby', () => {
    const wrapper = mountField({ description: 'Changes during combat' });
    const describedBy = wrapper.get('input').attributes('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(wrapper.get(`#${describedBy}`).text()).toBe('Changes during combat');
  });

  it('gives both steppers an accessible name', () => {
    const buttons = mountField().findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.attributes('aria-label')).toBe('Decrease Current hit points');
    expect(buttons[1]?.attributes('aria-label')).toBe('Increase Current hit points');
  });

  it('steps by the configured amount', async () => {
    const wrapper = mountField({ step: 5 });
    await wrapper.findAll('button')[1]?.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([39]);
  });

  it('clamps to min and max', async () => {
    const wrapper = mountField({ modelValue: 0, min: 0, max: 10 });
    await wrapper.findAll('button')[0]?.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.findAll('button')[0]?.attributes('disabled')).toBeDefined();
  });

  it('ignores unparseable input rather than coercing it to zero', async () => {
    const wrapper = mountField();
    const input = wrapper.get('input');
    await input.setValue('not a number');
    await input.trigger('change');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
