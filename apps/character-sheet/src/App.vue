<script setup lang="ts">
/**
 * Phase 1 vertical slice — plan section 36.
 *
 * Deliberately narrow: hit points and one skill roll, persisted locally. The
 * point is a session at a real table, not a complete sheet. Everything else
 * arrives once this has told us what is actually wrong with it.
 */
import { onMounted } from 'vue';
import {
  Heading,
  Stack,
  Text,
  createLocalStorageBackend,
  requestPersistentStorage,
  usePersistentRef,
} from '@accessible-dnd/accessible-ui';
import HitPoints from './views/HitPoints.vue';
import SkillRow from './views/SkillRow.vue';
import { defaultCharacter, type Character } from './dnd/character';

const backend = createLocalStorageBackend();
const { value: character, failed } = usePersistentRef<Character>(
  'character',
  defaultCharacter,
  backend,
);

onMounted(() => {
  // Reduces the chance the browser evicts a calibrated setup (plan 17.1).
  void requestPersistentStorage();
});
</script>

<template>
  <main class="sheet">
    <Stack gap="loose">
      <header>
        <Heading :level="1">
          {{ character.name }}
        </Heading>
        <Text tone="muted" size="small"> Phase 1 prototype — hit points and one skill </Text>
      </header>

      <!-- A failed save must be visible, not silent. -->
      <p v-if="failed" role="alert" class="sheet__warning">
        Changes are not being saved. Your browser may be blocking storage for this site.
      </p>

      <HitPoints v-model="character.currentHp" :max-hp="character.maxHp" />

      <Stack gap="tight" as="section">
        <Heading :level="2"> Skills </Heading>
        <SkillRow name="Perception" :modifier="character.perceptionModifier" />
      </Stack>
    </Stack>
  </main>
</template>

<style scoped>
.sheet {
  max-inline-size: 34rem;
  margin-inline: auto;
  padding: var(--a11y-section-gap) var(--a11y-control-padding-inline) 4rem;
}

.sheet__warning {
  margin: 0;
  padding: calc(0.75rem * var(--a11y-spacing-scale)) var(--a11y-control-padding-inline);
  color: var(--a11y-color-error);
  border: 2px solid var(--a11y-color-error);
  border-radius: var(--a11y-radius);
  font-weight: var(--a11y-font-weight-emphasis);
}
</style>
