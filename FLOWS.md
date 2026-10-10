# Flows

**Boot** → title screen (Continue · New shift · Language · Sound · Credits).

**New shift** → ID card (player names themself) → Month 1 briefing.

**Month loop**
1. **Briefing** — report, per-rule stats, caught & detained cards, POI updates, letters, news, interruptions.
2. **Inbox** — requests about named citizens, tips, calls.
3. **Shift** — rules editor + live citizen database + blotter. Validate locks the rules (refused over the WATCH cap).
4. **Home** — budget and personal choices, previewed against the locked rules.
5. **End month** — verdicts resolve, failures are checked, the next month opens on its briefing.

**Ending** → alignment chart animates the pin month by month → epilogue → share GIF → title.
**Failure** → self-flagged, missed deadline or riots → restart any month from the timeline.

**State** — the whole game is a pure function of the committed month log plus the current month draft. Every action saves; undo/redo walks the draft history; the timeline truncates the log.
