<script setup lang="ts">
/**
 * Heading — renders a real h1-h6.
 *
 * Level is explicit rather than inferred, so document structure stays
 * inspectable and cannot drift from what assistive technology announces
 * (plan section 6.1, SC 1.3.1).
 */
withDefaults(defineProps<{ level?: 1 | 2 | 3 | 4 | 5 | 6 }>(), { level: 2 });
</script>

<template>
  <component :is="`h${level}`" class="a-heading">
    <slot />
  </component>
</template>

<style scoped>
.a-heading {
  margin: 0;
  font-weight: var(--a11y-font-weight-emphasis);
  line-height: 1.25;
  text-wrap: balance;
}
h1.a-heading {
  font-size: calc(1.75rem * var(--a11y-font-scale));
}
h2.a-heading {
  font-size: calc(1.375rem * var(--a11y-font-scale));
}
h3.a-heading {
  font-size: calc(1.125rem * var(--a11y-font-scale));
}
h4.a-heading,
h5.a-heading,
h6.a-heading {
  font-size: calc(1rem * var(--a11y-font-scale));
}
</style>
