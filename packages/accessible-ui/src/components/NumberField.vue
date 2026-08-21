<script setup lang="ts">
/**
 * NumberField — plan section 5.1.
 *
 * Deliberately NOT <input type="number">. That control's spinner buttons are
 * roughly 10x10 CSS pixels and are not author-resizable, making it exactly the
 * "tiny +/- control" section 24.6 tells us to avoid — in the app's single most
 * frequent interaction. It also changes value on stray scroll-wheel and
 * trackpad gestures, which is a data-loss bug for our users.
 *
 * Instead: text input with inputmode="numeric" (still raises the numeric
 * keypad on phones) plus explicit stepper buttons at full target size.
 */
import { computed, useId } from 'vue';
import Button from './Button.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    /** Allow fractional values; switches the on-screen keypad accordingly. */
    decimal?: boolean;
    disabled?: boolean;
    /** Hint text, associated via aria-describedby. */
    description?: string;
  }>(),
  {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
    step: 1,
    decimal: false,
    disabled: false,
    description: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: number] }>();

const inputId = useId();
const descriptionId = useId();

const clamp = (value: number): number => Math.min(props.max, Math.max(props.min, value));

const atMin = computed(() => props.modelValue <= props.min);
const atMax = computed(() => props.modelValue >= props.max);

function commit(raw: string): void {
  // An empty or unparseable field is left to the user to correct rather than
  // being silently coerced to zero, which would destroy the previous value.
  const parsed = props.decimal ? Number.parseFloat(raw) : Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return;
  emit('update:modelValue', clamp(parsed));
}

function nudge(direction: 1 | -1): void {
  emit('update:modelValue', clamp(props.modelValue + direction * props.step));
}
</script>

<template>
  <div class="a-number-field">
    <label :for="inputId" class="a-number-field__label">{{ label }}</label>

    <p v-if="description" :id="descriptionId" class="a-number-field__description">
      {{ description }}
    </p>

    <div class="a-number-field__controls">
      <Button
        variant="secondary"
        :disabled="disabled || atMin"
        :label="`Decrease ${label}`"
        @click="nudge(-1)"
      >
        &minus;
      </Button>

      <input
        :id="inputId"
        class="a-number-field__input"
        type="text"
        :inputmode="decimal ? 'decimal' : 'numeric'"
        enterkeyhint="done"
        autocomplete="off"
        :value="modelValue"
        :disabled="disabled"
        :aria-describedby="description ? descriptionId : undefined"
        @change="commit(($event.target as HTMLInputElement).value)"
      />

      <Button
        variant="secondary"
        :disabled="disabled || atMax"
        :label="`Increase ${label}`"
        @click="nudge(1)"
      >
        +
      </Button>
    </div>
  </div>
</template>

<style scoped>
.a-number-field {
  display: flex;
  flex-direction: column;
  gap: calc(0.25rem * var(--a11y-spacing-scale));
}

.a-number-field__label {
  font-weight: var(--a11y-font-weight-emphasis);
  font-size: calc(1rem * var(--a11y-font-scale));
}

.a-number-field__description {
  margin: 0;
  color: var(--a11y-color-text-muted);
  font-size: calc(0.875rem * var(--a11y-font-scale));
}

.a-number-field__controls {
  display: flex;
  align-items: stretch;
  gap: var(--a11y-target-spacing);
}

.a-number-field__input {
  /* Wide enough for four digits at any scale, and it grows with the tokens
   * rather than being pinned to a pixel width. */
  inline-size: 5ch;
  min-height: var(--a11y-target-size);
  padding-inline: var(--a11y-control-padding-inline);
  text-align: center;

  font-family: inherit;
  font-size: calc(1.125rem * var(--a11y-font-scale));
  font-variant-numeric: tabular-nums;

  color: var(--a11y-color-control-text);
  background: var(--a11y-color-control-surface);
  border: var(--a11y-border-width) solid var(--a11y-color-border);
  border-radius: var(--a11y-radius);
}

.a-number-field__input:disabled {
  opacity: 0.55;
}
</style>
