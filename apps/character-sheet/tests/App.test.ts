import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App.vue';

describe('character sheet (Phase 1 slice)', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders hit points and the skill row', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Hit points');
    expect(wrapper.text()).toContain('34');
    expect(wrapper.text()).toContain('42');
    expect(wrapper.text()).toContain('Perception');
  });

  it('names the current state in text, not by colour alone', () => {
    expect(mount(App).text()).toContain('Wounded');
  });

  it('applies damage and shows what changed', async () => {
    const wrapper = mount(App);
    const damage5 = wrapper
      .findAll('button')
      .find((b) => b.attributes('aria-label') === 'Damage 5 hit points');
    expect(damage5).toBeDefined();

    await damage5!.trigger('click');
    expect(wrapper.text()).toContain('29');
    expect(wrapper.text()).toContain('−5 → 29 HP');
  });

  it('offers undo after a change and restores the previous value', async () => {
    const wrapper = mount(App);
    const damage10 = wrapper
      .findAll('button')
      .find((b) => b.attributes('aria-label') === 'Damage 10 hit points');
    await damage10!.trigger('click');
    expect(wrapper.text()).toContain('24');

    const undo = wrapper.findAll('button').find((b) => b.text() === 'Undo');
    expect(undo, 'an undo control must be present after a change').toBeDefined();
    await undo!.trigger('click');
    expect(wrapper.text()).toContain('34');
  });

  it('does not offer undo before anything has changed', () => {
    const wrapper = mount(App);
    expect(wrapper.findAll('button').find((b) => b.text() === 'Undo')).toBeUndefined();
  });

  it('clamps hit points at zero rather than going negative', async () => {
    const wrapper = mount(App);
    const damage10 = wrapper
      .findAll('button')
      .find((b) => b.attributes('aria-label') === 'Damage 10 hit points');
    for (let i = 0; i < 5; i++) await damage10!.trigger('click');
    expect(wrapper.text()).toContain('Unconscious');
    expect(wrapper.text()).not.toContain('-');
  });

  it('renders a readable roll result next to the button that produced it', async () => {
    const wrapper = mount(App);
    const rollButton = wrapper
      .findAll('button')
      .find((b) => b.attributes('aria-label') === 'Roll Perception check');
    expect(rollButton).toBeDefined();

    await rollButton!.trigger('click');
    expect(wrapper.text()).toMatch(/Perception check: d20 \d+ \+ 5 = \d+/);
  });

  it('persists hit points across a remount', async () => {
    const first = mount(App);
    const damage5 = first
      .findAll('button')
      .find((b) => b.attributes('aria-label') === 'Damage 5 hit points');
    await damage5!.trigger('click');

    const second = mount(App);
    expect(second.text()).toContain('29');
  });
});
