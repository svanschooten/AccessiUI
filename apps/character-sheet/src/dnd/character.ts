/** The minimum character model Phase 1 needs. Deliberately not generalised. */
export interface Character {
  name: string;
  currentHp: number;
  maxHp: number;
  /** Phase 1 carries one skill. The rest arrive in Phase 3, on demand. */
  perceptionModifier: number;
}

export const defaultCharacter: Character = {
  name: 'New character',
  currentHp: 34,
  maxHp: 42,
  perceptionModifier: 5,
};
