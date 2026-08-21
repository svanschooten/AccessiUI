import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from '../src/components/Button.vue';

describe('Button', () => {
  it('renders a native button element', () => {
    const wrapper = mount(Button, { slots: { default: 'Roll' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    const wrapper = mount(Button, { slots: { default: 'Roll' } });
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('takes its accessible name from slot content', () => {
    const wrapper = mount(Button, { slots: { default: 'Roll Perception' } });
    expect(wrapper.text()).toBe('Roll Perception');
    expect(wrapper.attributes('aria-label')).toBeUndefined();
  });

  it('accepts an explicit label for non-text content', () => {
    const wrapper = mount(Button, {
      props: { label: 'Increase hit points' },
      slots: { default: '+' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Increase hit points');
  });

  it('exposes disabled state natively rather than via aria-disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true }, slots: { default: 'Roll' } });
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.attributes('aria-disabled')).toBeUndefined();
  });

  it('does not emit click while disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true }, slots: { default: 'Roll' } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
