# Current phase: Phase 1

*What is built, what is left, and how to run the session that ends this phase.*

[← Documentation index](../README.md)

---

## Where we are

Phase 1 is the vertical slice: hit points and one skill roll, on a phone, persisted locally. See [Roadmap](roadmap.md) for why the phases run in this order.

**Built and verified:**

- hit points with steppers, textual change feedback, and undo
- one skill row that rolls a d20 and shows a readable result beside the button
- local persistence
- `Button`, `NumberField`, `Stack`, `Heading`, `Text`
- 111 automated tests — 67 unit, 44 browser across a phone viewport and desktop

**Not built, and deliberately so:** profiles, calibration, the settings panel, the rest of the sheet. Those are Phases 2 through 5, and they are shaped by what this phase learns.

## What is actually left

Exactly two things, and neither is code.

### 1. One assistive-technology pass

Automated tests prove the semantics are present. They cannot tell you whether the experience is usable. Someone needs to work through the sheet with a real screen reader — TalkBack or VoiceOver, since this is a phone-first app — and note where it becomes confusing.

Specifically worth checking:

- Is the roll result announced once, or repeatedly?
- Does the HP change line announce, and is it too chatty after several taps?
- Can the steppers be found and operated with swipe navigation?
- Does anything announce as "button button" or read its label twice?

### 2. One session at a real table

This is the exit criterion. Not "the code works" — **a player used this during an actual game and told us what was wrong with it.**

---

## Running the field test

### Before the session

Have it running on the actual device the player will use, not a simulator. Set their text size and any OS accessibility settings the way *they* normally have them, before they touch it — do not start from defaults and adjust later, because that tells you about your defaults rather than about their setup.

Set expectations out loud: this is two features out of a character sheet, it will be missing things, and the missing things are not the interesting part. You are not demoing. You are watching.

### During the session

**Watch, do not help.** The strongest signal in the whole exercise is the moment someone hesitates, and it disappears the instant you say "it's the button on the left". Sit on your hands and write down what happened.

Write down, in the moment:

- every hesitation longer than about two seconds, and what they were looking at
- every mistap, and which control they hit instead
- every time they asked a question
- every time they reached for something that was not there
- every time they gave up and used paper or asked someone else

Timestamps are not necessary. Sequence is.

**Do not fix anything mid-session.** A change halfway through invalidates everything after it and costs you the rest of the session.

### After the session

Ask these four, in this order, and let silence do the work:

1. What did you have to think about that you did not want to think about?
2. Was there anything you wanted to do that you could not?
3. Would you use this again next session, honestly?
4. What would you change first?

Question 3 is the real one. "It was nice" and "yes, I'd use it again next week" are very different answers, and only the second one means the phase succeeded.

---

## How to organise the feedback

The failure mode here is a long undifferentiated list of complaints that nobody can act on. Sort every observation into one of four buckets, because each has a different destination.

### Bucket 1 — The interface got in the way

Something about the toolkit is wrong: a target is too small, contrast is insufficient, feedback was not noticed, an interaction needed precision they do not have.

**These are the point of the whole exercise.** They go straight into the toolkit as issues, and they take priority over everything else in Phases 2 and 3.

### Bucket 2 — A missing feature

They wanted to roll a different skill, track a spell slot, edit their max HP. Expected — the slice is two features wide.

**Log it and move on.** Do not let it crowd out bucket 1. A missing feature is not evidence the design is wrong; it is evidence the scope was small, which was intentional.

### Bucket 3 — A value that should be adjustable

They wanted bigger text, more spacing, larger buttons, a different colour treatment.

**These become tokens and profile settings.** This bucket is the direct input to [Design tokens](../toolkit/design-tokens.md) and [Profiles](../profiles/README.md). Record the *specific* value they wanted, not the direction — "about a third bigger" is usable, "bigger" is not.

### Bucket 4 — A D&D workflow thing

The sheet does not match how their table actually plays: they roll with advantage constantly, the DM asks for passive perception, they track conditions on paper.

**Log it for Phase 3.** It shapes [Application scope](../application/scope.md), not the toolkit.

---

## What "done" looks like

Phase 1 ends when:

- [ ] one screen-reader pass has been done on a phone, and what was tested is written down
- [ ] one real session has happened
- [ ] observations are sorted into the four buckets above
- [ ] every bucket 1 item is an issue
- [ ] every bucket 3 item names a specific value

Note what is *not* on that list: fixing everything. Phase 1 ends when we know what is wrong, not when nothing is wrong. Bucket 1 items become Phase 2 and 3 work, and some of them will change the token list — which is exactly what Phase 2 is for.

## A note on who to test with

One session with the person this project was built for beats five sessions with people who do not need it. Their difficulty is signal; a sighted developer finding the buttons "a bit large" is not.

If they find something frustrating, that is the finding. Resist the urge to explain why it works the way it does — the explanation is not available to them during a game.
