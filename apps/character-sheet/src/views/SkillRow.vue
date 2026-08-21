<script setup lang="ts">
/**
 * A skill with a roll action — plan sections 26.1, 26.2, 8.8.
 *
 * The result renders next to the button that produced it. A live region
 * announces it in addition, for screen-reader users, but is never the only
 * place the information appears.
 */
import { ref } from 'vue';
import { Button, Text } from '@accessible-dnd/accessible-ui';
import { roll, type RollResult, type RollFn } from '../dnd/dice';

const props = defineProps<{
  name: string;
  modifier: number;
  /** Injectable for deterministic tests. */
  rollSource?: RollFn;
}>();

const result = ref<RollResult | null>(null);

const formatModifier = (value: number): string => (value >= 0 ? `+${value}` : `${value}`);

function rollSkill(): void {
  result.value = roll(`${props.name} check`, 20, props.modifier, props.rollSource);
}
</script>

<template>
  <div class="skill">
    <div class="skill__row">
      <span class="skill__name">{{ name }}</span>
      <span class="skill__modifier">{{ formatModifier(modifier) }}</span>
      <Button variant="primary" :label="`Roll ${name} check`" @click="rollSkill"> Roll </Button>
    </div>

    <!-- Adjacent to the control, per section 8.8. -->
    <p v-if="result" class="skill__result">
      <Text as="span">
        {{ result.text }}
      </Text>
      <!--
        Critical state carries a text label, not only a colour
        (plan sections 5.3, 26.3).
      -->
      <span v-if="result.critical" class="skill__critical">
        {{ result.critical === 'hit' ? 'Critical hit' : 'Critical miss' }}
      </span>
    </p>

    <!-- Intentional, not chatty: one announcement per roll (section 15.6). -->
    <p class="a-visually-hidden" role="status">
      {{ result?.text ?? '' }}
    </p>
  </div>
</template>

<style scoped>
.skill__row {
  display: flex;
  align-items: center;
  gap: var(--a11y-target-spacing);
  flex-wrap: wrap;
}
.skill__name {
  flex: 1 1 auto;
  font-weight: var(--a11y-font-weight-emphasis);
  font-size: calc(1rem * var(--a11y-font-scale));
}
.skill__modifier {
  font-variant-numeric: tabular-nums;
  font-size: calc(1.25rem * var(--a11y-font-scale));
  min-inline-size: 3ch;
  text-align: right;
}
.skill__result {
  margin: calc(0.5rem * var(--a11y-spacing-scale)) 0 0;
  padding: calc(0.5rem * var(--a11y-spacing-scale)) var(--a11y-control-padding-inline);
  background: var(--a11y-color-surface-sunken);
  border: var(--a11y-border-width) solid var(--a11y-color-border);
  border-radius: var(--a11y-radius);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75ch;
}
.skill__critical {
  font-weight: var(--a11y-font-weight-emphasis);
  text-transform: uppercase;
  font-size: calc(0.8125rem * var(--a11y-font-scale));
  letter-spacing: 0.06em;
  padding: 0.15em 0.5em;
  border: var(--a11y-border-width) solid currentColor;
  border-radius: var(--a11y-radius);
}

.a-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
