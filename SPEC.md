# 0% Criminality — Game Spec

> Noir systems + narrative game. You build the profiling rules of a cyberpunk surveillance state — and those rules judge you too.

**Scope:** game jam. Engine not chosen.

---

## 1. Pitch

You are a Systems Architect at the Ministry of Civic Harmony. The state wants **0% criminality** within 12 months. Every month you write the profiling rules that decide who is cleared, watched or detained.

Your own citizen profile is pinned at the top of the database and evaluated by the same rules. You know you've done nothing wrong — but your job, your district, your sister and your personal choices make you match. You are a cog, and the machine doesn't care that you built it.

## 2. Touchstones

**Gameplay / narrative**
- *Papers, Please* — bureaucratic complicity, rule changes, family budget, recurring characters
- *Beholder* — surveillance as a job, alignment-driven endings
- *Orwell* — profiling through data
- *Minority Report* — pre-crime

**Visual**
- World: *Blade Runner* (1982), *Ghost in the Shell* (1995) — seen only through rain-smeared camera feeds
- UI: single diegetic desk terminal — *Papers, Please* × *Uplink* / *Hypnospace Outlaw*. CRT phosphor Ministry OS, red DETAIN stamps
- Faces: low-res dithered surveillance stills (*Return of the Obra Dinn*-style shading)
- Audio: synth-noir jazz, rain

---

## 3. Core Systems

### 3.1 Citizens

- **10,000 citizens** at start, **+1,000 refugees** arriving in month 5. Generated once from a fixed seed and **consistent across months**.
- Each citizen has a name, a portrait, a set of **fields** (§3.2), **contacts** (§3.3) and a hidden **guilty** flag.
- **Scripted citizens** carry the narrative: the player, the sister, the shopkeeper, the Commissioner's nephew, resistance members, etc. Their profiles and guilt are hand-authored and wired into the procedural population (§8).
- The **player** is a citizen, always pinned at the top of the DB, always innocent at the start of a month.
- **JAILED:** caught criminals **and DETAINED innocents** stay in the DB marked JAILED. Nobody is released. They are no longer evaluated by rules, but still count as contacts.

### 3.2 Fields

Name and portrait are displayed but are not rule fields. All data exists from the start; an unlock only reveals the column to the player.

| Field | Values | Unlock | Narrative use |
|---|---|---|---|
| Sex | M / F | Month 1 | |
| Age | 18–29 / 30–44 / 45–64 / 65+ | Month 1 | |
| District | Spire, Midtown, Docks, Old Town, Stack 4, Stack 9 | Month 1 | Class geography. |
| Occupation | Unemployed, Laborer, Service, Office, State employee, Executive | Month 1 | |
| Net worth | < 0 / 0–10k / 10k–100k / > 100k | Month 1 | |
| Prior record | Yes / No | Month 1 | |
| Contacts | Contact block (§3.3) | Month 3 | Reveals the player ↔ sister link. |
| Citizenship | Citizen / Corporate citizen / Refugee / Undocumented | Month 5 — climate refugees arrive from the drowned coast, the Immigration Office shares its registry | News blames refugees; corporate citizens are untouchable; the sister's status has lapsed. |
| Medical condition | None, Diabetes, Chronic pain, Depression, Schizophrenia, PTSD, Opioid dependency, Asthma, Smog lung, Heart disease, Kidney failure, Cancer, HIV, Epilepsy, Dementia, Amputee / prosthetic, Implant rejection, Pregnancy | Month 8 — the Health Ministry shares its database | Insulin crisis, addiction, the sister's illness. The most intimate data, unlocked last. |

- Start fields give **high signal**: blanket rules on poverty and district work — which is the uncomfortable point. Later fields and scripted citizens break these patterns.
- Each unlock comes with a reason in the news and forces the player to rethink comfortable rules.
- **Medical conditions** follow realistic frequencies (common conditions ~5–10%, rare ones ~1% or less).

### 3.3 Contacts

- Contacts are **close family and friends**: **4–8 contacts** per citizen on average.
- **Gang members** are all contacts of each other (§4.2), so they have many more.

### 3.4 Verdicts

| Verdict | Citizen is criminal | Citizen is innocent | Limit |
|---|---|---|---|
| **CLEAR** | Not caught | Nothing | — |
| **WATCH** | Caught → JAILED | Nothing | ≤ **3%** of the population (300 citizens) |
| **DETAIN** | Caught → JAILED | JAILED anyway, unrest +1 | — |

- A ruleset that WATCHes more than the cap **cannot be validated**.
- The WATCH cap changes only through narrative events (budget cut shrinks it, new surveillance contract grows it).
- WATCH is the scarce, safe resource; DETAIN is the risky overflow.
- **Guilt visibility:** guilt is revealed for every caught criminal and every DETAINED citizen (trial). Guilt stays hidden for CLEARed citizens and WATCHED innocents.
- **WATCH on the player:** costs nothing *unless* the player does something actually illegal during the personal phase (e.g. black-market meds) — then they are caught. Being watched restricts personal options.

### 3.5 Rules

- **Few rules, many blocks.** The number of rule slots grows over the months (§4.3). Each rule may contain many blocks.
- **A rule is one hypothesis:** an `AND` of conditions. `OR` is only allowed within a single field, via `in`.
- Each rule outputs a verdict. **Most severe verdict wins** (DETAIN > WATCH > CLEAR). Citizens matching no rule are CLEAR.
- **Blocks**
  - Field comparisons: `=`, `≠`, `in`, `>`, `<`
  - Logic: `AND`, `NOT`
  - Contact block: `has at least [n] contacts that are [CRIMINAL | INNOCENT]`
    - Direct contacts only. E.g. *"has at least 3 contacts that are CRIMINAL → DETAIN"*.
    - CRIMINAL = JAILED in any previous month — including wrongly DETAINED innocents: the system doesn't distinguish. INNOCENT = anyone not JAILED. These values exist only inside this block; verdicts (WATCH, DETAIN) cannot be used.
- Rules are edited freely during the month and **locked on validation**.

### 3.6 City Metrics

- **Criminality %** = criminals not in jail / **10,000** (population at start, fixed denominator).
  - Displayed as a **rounded integer**: fewer than **50** criminals at large reads 0%.
  - Must reach **0% at the end of month 12**.
- **Unrest** = +1 per innocent DETAINED, **decays 30% per month**. Failure at **100**.
- **Player risk** — the player's own verdict under the locked rules.

---

## 4. Generation

All criminality comes from **hidden crime rules** authored by the designer. Guilt is never random, and reaching 0% is **provably possible by construction** (§4.4) — no empirical balancing.

### 4.1 Hidden Crime Rules

- **Fixed at start:** every hidden rule and every criminal is generated at the start of the game. All hidden rules are active from month 1, except **event rules**, which are dormant until their news fires; their criminals are also predetermined.
- **Fixed pools:** a hidden rule holds a fixed set of criminals. Once the player's rules have caught them, the hidden rule is exhausted and the slot can be reused for the next hypothesis. Rule slots are *tries*.
- **Shape:** same shape as player rules (`AND` of conditions, `in` within a field), so every hidden rule is exactly expressible by the player with the fields unlocked at its activation.
- **Pairwise disjoint:** any two hidden rules share at least one field on which their values don't overlap. No citizen matches two hidden rules, so per-rule stats point to exactly one hidden rule and counts stay exact.
- **High precision:** ~85% of the citizens matching a hidden rule are guilty.
- **Core + tail:**
  - **Core:** large hidden rules the player must find.
  - **Tail:** small hidden rules whose combined size stays under the 0% threshold, so they are optional.
- **Crime type follows the rule:** low net worth + low-class district → shoplifting; high net worth + State employee → embezzlement; gangs → extortion, smuggling.

### 4.2 Gangs

The only hidden rules built on contacts. Active from month 1, catchable once Contacts unlocks.

- A gang is a group of criminals who are **all contacts of each other**.
- Members' fields match **no field-based hidden rule**, so fields alone cannot catch the gang.
- **Takedown in two steps:**
  1. **Tip:** a narrative character (informant, hacker cell, shopkeeper…) gives near-complete profiles of *k* = 3 members, often in exchange for something (ties into requests). Each narrow profile matches a handful of citizens → cheap WATCH.
  2. **Cascade:** once those 3 members are JAILED, every other member has ≥ 3 CRIMINAL contacts, so `has at least 3 contacts that are CRIMINAL` sweeps the rest.
- The cascade also catches innocents who have ≥ 3 jailed contacts. **Generation bound:** at most **100 innocents** have ≥ 3 criminal contacts (reference play only jails criminals; jailing innocents widens the cascade, at the player's own risk). A cascade therefore WATCHes at most 30 + 100 = 130 citizens, which fits the WATCH cap at no unrest cost.
- Gang blotter reports may reveal *"known associate of a convicted criminal"*.

### 4.3 Numbers

**Months and rule slots** — 12 months, 38 rule-months:

| Month | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Slots | 2 | 2 | 2 | 3 | 3 | 3 | 3 | 4 | 4 | 4 | 4 | 4 |

**Hidden rules**

| Type | Count | Criminals | Matching citizens | Rule-months needed |
|---|---|---|---|---|
| Core field rules | 8 | ~90 each = 720 | ~105 each | 8 |
| Gangs | 2 | 30 each = 60 | — | 4 (tip + cascade each) |
| Events | 3 | 200 total | ~235 total | 3 |
| Tail | 10 | 3 each = 30 | ~4 each | optional |
| **Total** | | **1,010** | | **15 mandatory** |

- **Core examples:** Stack 9 ∧ Unemployed ∧ Net worth < 0 ∧ Prior record → *shoplifting*; Spire ∧ State employee ∧ Net worth > 100k → *embezzlement*; Docks ∧ Laborer ∧ Male ∧ 18–29 → *cargo theft*.
- **Events:**
  - Month 4, factory closures: Stack 4 ∧ Laborer ∧ Net worth < 0 → 60 criminals
  - Month 5, refugee rations cut: Old Town ∧ Unemployed ∧ Refugee → 80 criminals
  - Month 8, insulin crisis: Stack 9 ∧ Service ∧ Diabetes → 60 criminals (includes the sister, §8.2)
- **Gang tips:** gang 1 in month 4, gang 2 in month 7.
- **Criminality at start:** 8% (810 at large before events).

### 4.4 Provability

| Constraint | Guarantee |
|---|---|
| Threshold | 30 tail + 19 slack = 49 < 50. The slack covers guilty request targets the player CLEARs, guilty scripted characters, and the sister's look-alikes (≤ 19 total, §8.9). |
| Tries | 38 rule-months vs 15 mandatory (2.5×). |
| WATCH cap | A core rule uses ~105 of the 300 cap, an event ~80, a tip ~5, a cascade ≤ 130. |
| Unrest | All 15 mandatory rule-months can run under WATCH → reference play generates **0 unrest**. The unrest budget only absorbs broader player guesses. |
| Event timing | Crimes in month *m*, blotter in *m + 1* → the last event fires at month ≤ 10 (insulin: month 8). |
| Field availability | Every hidden rule only uses fields unlocked at its activation. |
| Gang bound | ≤ 100 innocents with ≥ 3 criminal contacts (§4.2). |
| Player survival | The player's profile matches no hidden rule under at least one personal-choice path. |

---

## 5. Crime Blotter

The player discovers hidden rules through the **crime blotter** in the morning briefing.

- **Caught criminals:** full profile (caught & detained cards).
- **Uncaught criminals:** every criminal at large commits a crime each month and appears as a police report: crime type + **2 to 4 revealed fields** of the real criminal.
  - E.g. *"Burglary, Stack 9. Witness: male, 30s, shabby clothes"* → District, Sex, Age, a hint of Net worth.
  - **Obvious fields** (Sex, Age, District, apparent Net worth) are revealed with probability ≈ 0.7; **non-obvious fields** (Occupation, Prior record, Citizenship, Medical) ≈ 0.2.
  - Aggregating reports reveals the dominant values, which reveal the hidden rule. A core rule reveals its Occupation in ~18 reports per month; a tail rule in less than one — tail rules are hard by design.
- Month 1 includes the **previous administration's blotter**, so the player has data from the start.
- **Other channels:** news hints at event rules, informants give exact fields or gang tips, per-rule stats confirm or reject a hypothesis the following month.

---

## 6. Month Structure

Each month has four phases.

### 6.1 Morning Briefing
- **Report:** months left, criminality %, unrest, false positive rate.
- **Per-rule stats** (e.g. *Rule 2: 14 detained, 9 guilty; 22 watched, 5 caught*).
- **Caught & detained cards** for every caught criminal and every DETAINED citizen: dithered photo, full name, age, occupation, family, one human line (*"Survived by a daughter, 6"*), trial verdict (guilty / innocent). All DETAINED citizens are tried by the next briefing; innocents stay jailed anyway.
- **POI updates:** what happened to the player, the sister, and every POI met so far.
- **Crime blotter** (§5).
- **News:** activates dormant event rules and hints at them.
  - *Insulin prices spike 500% due to corporate greed* → insulin theft among diabetics.
  - *Refugee camp rations cut* → theft among refugees, while the news overstates it.
  - *Factory closures in Stack 4* → crime among laid-off laborers.
- **Interruptions:** the sister calls, a hacker cell takes over the terminal, a Ministry superior drops by.

### 6.2 Requests
Requests from state and non-state parties about specific named citizens (§7).

### 6.3 Rule Editing (the shift)
- Left: rules editor. Right: citizen DB with all unlocked fields and the **live verdict** under the current rules. No guilt status shown.
- The player's own profile is pinned at the top.
- Validation is refused if WATCH exceeds the cap.

### 6.4 Personal Life
- Limited budget. Monthly salary scales with the **number of citizens DETAINED**, guilty or not — an incentive for evil play.
- Choices change the player's profile and are evaluated by the **just-locked rules**. Examples:
  - Buy food on the black market (cheap, illegal)
  - Move to a cheaper apartment in Stack 9 (District)
  - Keep in touch with the sister (Contacts)
  - Pay to renew the sister's lapsed residency, or vouch for her as her sponsor (Citizenship, Contacts)

---

## 7. Requests & Alignment

Narrative is told through **many small beats**: news, interruptions, and requests asking for **specific outcomes for specific citizens**.

- Examples: *"DETAIN all politicians"*, *"Do not WATCH or DETAIN these 4 hackers"*, *"My son's been flagged, please"*.
- Satisfaction is checked against the locked rules' final verdict for the named citizens.
- **Every request is costly to satisfy:** targets share fields with real criminals, or with citizens the player's most effective rules depend on.

### 7.1 Optional requests
Can be ignored. They move the pin **within** a quadrant but never decide the quadrant.

### 7.2 Forced requests
- Two conflicting requests about the same target, written so that **every possible verdict satisfies exactly one side**. Doing nothing still yields a verdict.
- Each forced request has an integer weight per axis (±1 by default; bigger or multi-axis weights allowed).
- **No dead center:** for each axis, the sum of forced weights is **odd**, so the axis total is never 0. The quadrant is decided by forced requests only.

| Month | Target | Side A | Side B | Weights |
|---|---|---|---|---|
| 3 | Resistance courier | State: DETAIN | Resistance: anything but DETAIN | L/C ±1 |
| 4 | Shopkeeper's son | Shopkeeper: CLEAR | Gang: DETAIN | G/E ±1 |
| 6 | Commissioner's nephew | Commissioner: CLEAR | Victim's family: not CLEAR | G/E ±1 |
| 7 | Hacker cell leader | State: DETAIN | Hacker cell: CLEAR | L/C ±2 |
| 8 | Sister | State: not CLEAR | Sister: CLEAR | L/C ±1, G/E ±1 |
| 10 | Coworker | State: DETAIN | Coworker: CLEAR | L/C ±1 |

Sums of weights: Lawful ↔ Chaotic = 1 + 2 + 1 + 1 = **5**, Good ↔ Evil = 1 + 1 + 1 = **3** — both odd.

### 7.3 Alignment
- **Lawful ↔ Chaotic** — Lawful: obeyed the state, refused others. Chaotic: obeyed non-state parties over the state.
- **Good ↔ Evil** — Good: helped people in need (the sister despite her flaws), did not prosecute non-crimes. Evil: jailed as many as possible, helped bad actors.

---

## 8. Cast

Names are picked later by the procedural name generator.

**Cast design rules**
- **Bait:** some innocent characters sit *inside* a hidden rule, so the correct rule catches them. Under WATCH they are safe (innocents are never caught); under DETAIN they are jailed. WATCH vs DETAIN becomes a moral choice.
- **Guilty characters belong to no hidden rule** — except the sister, who belongs to the insulin event rule. All of them come out of the slack (§4.4).
- Scripted characters' fields can **change during the story** (job loss, move); the DB updates.
- **Senior state officials are exempt from the registry.** The exemption is visible in the DB (*"Registry exemption: Level 5 officials"*) — the Commissioner never appears.

### 8.1 The player
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| M | 30–44 | Old Town | State employee | 0–10k | No | Citizen | None |

- **Guilt:** never, unless he makes an illegal personal choice while WATCHED.
- **Contacts:** the sister, the coworker, the shopkeeper, 2 procedural friends.
- **Risk sources:** the sister or the coworker JAILED → CRIMINAL contacts; moving to Stack 9; black-market purchases.
- Old Town × State employee matches no hidden rule → at least one survival path.

### 8.2 The sister
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| F | 18–29 | Stack 9 | Service | < 0 | Yes (teen shoplifting) | Undocumented (lapsed) | Diabetes |

- **Month 5:** Citizenship unlock reveals she is Undocumented.
- **Month 8:** **always becomes guilty** — she is one of the insulin event's criminals (Stack 9 ∧ Service ∧ Diabetes). Right after the crisis she calls the player and confesses, so the player *knows*.
- **Forced request (month 8):** State: not CLEAR vs sister: CLEAR — the lawful choice against the ethical one. The player either:
  - writes the insulin rule and lets her get caught, or
  - **carves her out** by splitting the rule (e.g. `… ∧ Sex = M` plus `… ∧ Sex = F ∧ Age ≠ 18–29`). This costs an extra rule slot **and spares real criminals**: saving her means failing the job.
- **Look-alikes (generation constraint):** the insulin rule contains **6 other guilty citizens with exactly the sister's fields** (F, 18–29, Stack 9, Service, < 0, Prior record, Undocumented, Diabetes), and the same contact profile (same contact count, all contacts never guilty). No expressible rule separates her from them: sparing her spares all 6, forever. They stay at large and keep appearing in the blotter.

### 8.3 The shopkeeper
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| M | 45–64 | Old Town | Service | 10k–100k | No | Citizen | Heart disease |

- **Guilt:** never.
- Moral anchor and informant: gives the **gang 1 tip** (month 4) — the Docks extortion ring squeezing his shop — in exchange for protecting his son.

### 8.4 The shopkeeper's son
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| M | 18–29 | Docks | Laborer | 0–10k | No | Citizen | Asthma |

- **Guilt:** never. **Bait inside the cargo-theft core rule.**
- **Forced request (month 4):** shopkeeper: CLEAR vs gang (he refused to join and is a witness): DETAIN.

### 8.5 The coworker
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| F | 30–44 | Midtown | State employee | 10k–100k | No | Citizen | Depression |

- **Guilt:** from month 6 — resistance mole leaking Ministry data.
- The player's door to the resistance and the Chaotic endings. Contact of the player.
- **Forced request (month 10):** State: DETAIN vs coworker: CLEAR.

### 8.6 The Commissioner's nephew
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| M | 18–29 | Spire | Executive | > 100k | No (scrubbed) | Corporate citizen | Opioid dependency |

- **Guilt:** from month 1 — hit-and-run, dealing to Spire parties.
- **Forced request (month 6):** Commissioner: CLEAR vs victim's family: not CLEAR.

### 8.7 The hacker cell leader
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| F | 18–29 | Old Town | Unemployed | < 0 | Yes | Undocumented | Implant rejection |

- **Guilt:** from month 1 — hacking. Undocumented (not Refugee) → outside the refugee event rule.
- **Month 7:** takes over the terminal and trades the **gang 2 tip** for her safety.
- **Forced request (month 7):** State: DETAIN vs hacker cell: CLEAR (or they burn your profile).

### 8.8 The resistance courier
| Sex | Age | District | Occupation | Net worth | Prior | Citizenship | Medical |
|---|---|---|---|---|---|---|---|
| M | 30–44 | Stack 4 | Service | 0–10k | Yes | Citizen | PTSD |

- **Guilt:** from month 1 — smuggling for the resistance.
- **Forced request (month 3):** State: DETAIN vs resistance: anything but DETAIN.

### 8.9 Slack accounting

| Source | Max guilty left at large |
|---|---|
| Nephew, hacker leader, courier, coworker, sister | 5 |
| Sister's look-alikes | 6 |
| Optional request *"spare these 4 hackers"* | 4 |
| **Total** | **15 ≤ 19** |

---

## 9. Endings

### 9.1 Completion
The game ends on the **Good–Evil / Lawful–Chaotic chart** with the player as a pin. The quadrant selects the ending:

| | **Good** | **Evil** |
|---|---|---|
| **Lawful** | Player and sister stay alive; player keeps the job. | Player stays alive and ranks up in the state; sister is jailed. |
| **Chaotic** | Player and sister are exfiltrated to a safehouse by an anti-state group; player joins them, hacking the rules to save people in need. | Sister is jailed; player is exfiltrated by an anti-state group; together they try to topple the state whatever the cost. |

### 9.2 Failure (no chart shown)
- **Self-flagged** — the player is DETAINED by their own rules, or WATCHED while doing something illegal.
- **Missed deadline** — criminality above 0% at the end of month 12.
- **Unrest** — unrest reaches 100, riots.

---

## 10. Timeline

| Month | Systems | Narrative |
|---|---|---|
| 1 | Start fields, 2 slots, previous administration's blotter | Onboarding. Blanket rules work. First detainee cards. |
| 2 | | Sister calls. First optional requests. |
| 3 | Contacts unlock | The sister appears in your graph. Forced request: courier. |
| 4 | Event: factory closures. Gang 1 tip. 3 slots | Shopkeeper's tip. Forced request: shopkeeper's son. |
| 5 | Refugees arrive, Citizenship unlock | The sister turns out to be Undocumented. |
| 6 | | Coworker turns mole. Forced request: Commissioner's nephew. Families of wrongly jailed innocents start writing in. |
| 7 | Gang 2 tip | Hacker cell takes over the terminal and trades the tip. Forced request: hacker cell leader. |
| 8 | Event: insulin crisis, Medical unlock. 4 slots | The sister steals insulin and confesses to the player. Forced request: sister. |
| 9 | | |
| 10 | | Forced request: coworker. |
| 11 | | Resistance escalates. |
| 12 | Deadline | Ending. |

---

## 11. Jam Scope

- 1 terminal screen + briefing + personal life screens
- 12 months, 2 → 4 rule slots, 3 field unlocks after the start set
- Procedural generator: 10,000 citizens + 1,000 refugees, contact graph, 23 hidden rules (8 core, 2 gangs, 3 events, 10 tail)
- 8 scripted characters
- Forced requests with odd weight sum per axis, plus optional requests
- 4 completion endings + 3 failure endings
