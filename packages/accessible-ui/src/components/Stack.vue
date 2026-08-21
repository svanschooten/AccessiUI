<script setup lang="ts">
/**
 * Stack — vertical layout primitive.
 *
 * Spacing comes from the token scale rather than per-element margins, so a
 * profile that increases spacing moves everything consistently and nothing
 * collapses or doubles (plan section 9).
 */
withDefaults(
  defineProps<{
    gap?: 'none' | 'tight' | 'normal' | 'loose';
    as?: string;
  }>(),
  { gap: 'normal', as: 'div' },
);
</script>

<template>
  <component :is="as" :class="['a-stack', `a-stack--${gap}`]">
    <slot />
  </component>
</template>

<style scoped>
.a-stack {
  display: flex;
  flex-direction: column;
}
.a-stack--none {
  gap: 0;
}
.a-stack--tight {
  gap: calc(0.5rem * var(--a11y-spacing-scale));
}
.a-stack--normal {
  gap: calc(1rem * var(--a11y-spacing-scale));
}
.a-stack--loose {
  gap: calc(var(--a11y-section-gap) * var(--a11y-spacing-scale));
}
</style>
