<script setup lang="ts">
/**
 * Hit points — plan sections 26.4, 8.7, 8.8.
 *
 * Optimised for repeated use during combat: large targets, no dragging, no
 * typing required for the common case, and a visible route back from a mistap.
 */
import { computed } from 'vue';
import { Button, Heading, Stack, Text, useUpdatable } from '@accessible-dnd/accessible-ui';

const props = defineProps<{ maxHp: number }>();

// defineModel gives us a writable ref that stays bound to the parent. Passing
// a Ref through props would not work: Vue unwraps refs in props.
const currentHp = defineModel<number>({ required: true });

const describe = (from: number, to: number): string => {
  const delta = to - from;
  return `${delta >= 0 ? '+' : '−'}${Math.abs(delta)} → ${to} HP`;
};

const { set, undo, canUndo, lastChange } = useUpdatable(currentHp, { describe });

const adjust = (delta: number): void =>
  set(Math.min(props.maxHp, Math.max(0, currentHp.value + delta)));

// State is named in text, not signalled by colour alone (plan section 5.3).
const status = computed(() => {
  const hp = currentHp.value;
  if (hp <= 0) return 'Unconscious';
  if (hp <= props.maxHp / 4) return 'Badly hurt';
  if (hp < props.maxHp) return 'Wounded';
  return 'Unharmed';
});

const STEPS = [-10, -5, -1, 1, 5, 10];
</script>

<template>
  <Stack gap="tight" as="section" class="hp">
    <Heading :level="2"> Hit points </Heading>

    <p class="hp__value">
      <span class="hp__current">{{ currentHp }}</span>
      <span class="hp__separator">/</span>
      <span class="hp__max">{{ maxHp }}</span>
    </p>

    <Text tone="muted" size="small">
      {{ status }}
    </Text>

    <div class="hp__steps">
      <Button
        v-for="delta in STEPS"
        :key="delta"
        :variant="delta > 0 ? 'primary' : 'secondary'"
        :label="`${delta > 0 ? 'Heal' : 'Damage'} ${Math.abs(delta)} hit points`"
        @click="adjust(delta)"
      >
        {{ delta > 0 ? `+${delta}` : `−${Math.abs(delta)}` }}
      </Button>
    </div>

    <!--
      Change feedback sits directly under the buttons that caused it, so a
      magnifier user panning a small viewport sees it without moving
      (plan section 8.8). It is also the undo affordance.
    -->
    <p v-if="lastChange" class="hp__change">
      <span class="hp__change-label">{{ lastChange.label }}</span>
      <Button v-if="canUndo" variant="quiet" @click="undo"> Undo </Button>
    </p>
  </Stack>
</template>

<style scoped>
.hp__value {
  margin: 0;
  font-size: calc(2.5rem * var(--a11y-font-scale));
  font-weight: var(--a11y-font-weight-emphasis);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}
.hp__separator,
.hp__max {
  color: var(--a11y-color-text-muted);
  font-size: calc(1.5rem * var(--a11y-font-scale));
}

.hp__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--a11y-target-spacing);
}

.hp__change {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--a11y-target-spacing);
  margin: 0;
  padding: calc(0.5rem * var(--a11y-spacing-scale)) var(--a11y-control-padding-inline);
  background: var(--a11y-color-surface-sunken);
  border: var(--a11y-border-width) solid var(--a11y-color-border);
  border-radius: var(--a11y-radius);
}
.hp__change-label {
  font-variant-numeric: tabular-nums;
  font-weight: var(--a11y-font-weight-emphasis);
}
</style>
