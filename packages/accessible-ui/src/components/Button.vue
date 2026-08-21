<script setup lang="ts">
/**
 * Button — plan sections 5.1, 8.1-8.4.
 *
 * A native <button>. There is no reason to build this from a div, and the
 * browser gives us role, keyboard behaviour, and focus for free.
 */
withDefaults(
  defineProps<{
    /** Visual weight. Never the sole carrier of meaning (section 5.3). */
    variant?: 'primary' | 'secondary' | 'quiet';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    /**
     * Accessible name, required when the button's visible content is not text
     * (an icon, a bare symbol). Section 8.1.
     */
    label?: string;
  }>(),
  { variant: 'secondary', type: 'button', disabled: false, label: undefined },
);
</script>

<template>
  <button
    :type="type"
    :class="['a-button', `a-button--${variant}`]"
    :disabled="disabled"
    :aria-label="label"
  >
    <slot />
  </button>
</template>

<style scoped>
.a-button {
  /* Target size is a token so profiles can raise it without a second component. */
  min-height: var(--a11y-target-size);
  min-width: var(--a11y-target-size);
  padding-inline: var(--a11y-control-padding-inline);
  padding-block: var(--a11y-control-padding-block);

  font-family: inherit;
  font-size: calc(1rem * var(--a11y-font-scale));
  font-weight: var(--a11y-font-weight-emphasis);
  line-height: var(--a11y-line-height);

  border: var(--a11y-border-width) solid var(--a11y-color-border);
  border-radius: var(--a11y-radius);
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5ch;

  transition: background-color var(--a11y-transition-duration) ease-out;
}

.a-button--primary {
  background: var(--a11y-color-primary);
  color: var(--a11y-color-primary-text);
  border-color: var(--a11y-color-primary);
}

.a-button--secondary {
  background: var(--a11y-color-control-surface);
  color: var(--a11y-color-control-text);
}

.a-button--quiet {
  background: transparent;
  color: var(--a11y-color-control-text);
  border-color: transparent;
}

/* Disabled state carries a non-colour signal too (section 8.6): the cursor
 * changes and the control stops responding. Screen readers get it from the
 * native disabled attribute. */
.a-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

@media (forced-colors: active) {
  .a-button {
    border-color: ButtonText;
  }
  .a-button:disabled {
    /* opacity is ignored in forced colours; GrayText is the supported signal */
    color: GrayText;
    border-color: GrayText;
    opacity: 1;
  }
}
</style>
