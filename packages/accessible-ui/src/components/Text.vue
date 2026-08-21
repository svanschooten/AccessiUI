<script setup lang="ts">
/** Text — body copy at the profile's current scale. */
withDefaults(
  defineProps<{
    as?: string;
    tone?: 'default' | 'muted';
    size?: 'small' | 'normal' | 'large';
  }>(),
  { as: 'p', tone: 'default', size: 'normal' },
);
</script>

<template>
  <component :is="as" :class="['a-text', `a-text--${tone}`, `a-text--${size}`]">
    <slot />
  </component>
</template>

<style scoped>
.a-text {
  margin: 0;
  line-height: var(--a11y-line-height);
}
.a-text--default {
  color: var(--a11y-color-text);
}
.a-text--muted {
  color: var(--a11y-color-text-muted);
}
.a-text--small {
  font-size: calc(0.875rem * var(--a11y-font-scale));
}
.a-text--normal {
  font-size: calc(1rem * var(--a11y-font-scale));
}
.a-text--large {
  font-size: calc(1.25rem * var(--a11y-font-scale));
}
</style>
