# Prioritization & Scope Management Guide

This reference provides rigorous frameworks for scoping initial releases (MVP), prioritizing backlog features, and preventing scope creep during software development.

---

## 1. The MoSCoW Prioritization Framework

MoSCoW is the primary prioritization framework used in our PRD specifications. Every requirement must be categorized into one of the four buckets:

```
+------------------------------------------------------------------------+
|                                  MoSCoW                                |
+------------------------------------------------------------------------+
|  MUST HAVE   | Guaranteed for initial release; non-negotiable core.   |
|  SHOULD HAVE | Critical for full value; acceptable workaround exists. |
|  COULD HAVE  | Enhancements / delighters; dropped if time runs short. |
|  WON'T HAVE  | Explicitly excluded for now; prevents scope creep.     |
+------------------------------------------------------------------------+
```

### 1.1 Must Have (Non-Negotiable MVP)
- **Definition:** Without these capabilities, the product cannot launch, cannot function, or provides zero viable utility.
- **Criteria for inclusion:**
  - Is there a legal, security, or foundational technical dependency?
  - Can the core user persona complete the fundamental primary workflow without this? If no &rarr; **Must Have**.
- **Rule of Thumb:** Must-Haves should comprise no more than **50-60%** of total planned engineering effort for an initial release.

### 1.2 Should Have (High Value / v1.1)
- **Definition:** Highly important features that significantly improve user experience or business value, but an acceptable workaround exists for Day 1 launch.
- **Example:** A portfolio must display projects (Must Have). An interactive category filter for projects is a **Should Have** (users can still scroll without it).

### 1.3 Could Have (Desirable / Low Risk)
- **Definition:** Nice-to-have features or small delighters that can be implemented if primary work finishes ahead of schedule.
- **Rule:** The first items cut when deadlines tighten.

### 1.4 Won't Have (Explicit Out-of-Scope)
- **Definition:** Capabilities deliberately excluded from the current milestone.
- **Critical Role:** Explicitly writing down what will *not* be built protects the project from insidious scope creep and sets clear stakeholder expectations.

---

## 2. RICE Scoring for Objective Trade-Offs

When debating whether a feature belongs in MVP or a later release, apply the RICE formula:

$$\text{RICE Score} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$$

| Factor | Scale / Measurement | Description |
| :--- | :--- | :--- |
| **Reach (R)** | Estimated users impacted over a defined period (e.g., per 100 visitors) | How many target users will actually touch this feature? |
| **Impact (I)** | 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal | How much will this move the core conversion or satisfaction goal? |
| **Confidence (C)**| 100% = High confidence (data-backed), 80% = Medium, 50% = Speculative | How confident are we in our reach and impact estimates? |
| **Effort (E)** | Person-days or story points (e.g., 0.5 to 5 days) | Total engineering, design, and testing time required. |

---

## 3. Defining the True MVP (Minimum Viable Product)

A common failure mode is building a "Minimum Bloated Product". An effective MVP satisfies three criteria simultaneously:

```
   [ Feasible ]  <--- Can we build it cleanly within the timeframe?
        /\
       /  \
      / MVP\
     /______\
[ Valuable ]  [ Usable ]
  ^             ^
  |             |-- Is it intuitive, polished, and free of broken states?
  |-- Does it solve the real user problem?
```

- **Not MVP:** A half-built product with 10 broken features.
- **True MVP:** A tightly focused product with 2-3 exceptionally polished, fully functional features that solve the core problem end-to-end.

---

## 4. Scope Management Rules During PRD Execution

1. **The "One In, One Out" Rule:** If a stakeholder adds a new Must-Have requirement during planning or mid-cycle, an equivalent Must-Have requirement must be demoted to Should-Have or Won't-Have to preserve timeline integrity.
2. **Documenting Deferrals:** Never erase a feature request silently. Record it under Section 8 (Prioritization & Non-Goals) or mark the ID as `[DEPRECATED]` or `[POST-MVP]` with a brief rationale.
3. **Smart Defaults Boundary:** When "smart defaults" are invoked, the agent must default to the leanest viable architecture rather than introducing heavy third-party dependencies or multi-tier infrastructure prematurely.
