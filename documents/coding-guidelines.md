# Coding Guidelines

## Branch Naming & Workflow

Our goal is to maintain a clean, predictable, and searchable Git history. To accomplish this, we use standardized branch name prefixes. These prefixes describe the purpose of the branch and make it easier to understand the context of changes at a glance.

**Important:**
We do **not** use slash-separated prefixes (e.g., `feature/my-branch`).
Instead, all prefixes use **underscores**, like:

```
feature_my-new-awesome-thing
```

---

## Branch Prefix Standards

Below is the complete list of common branch prefixes we ask that you use.

### Universal Prefixes (Required)

* **feature_*** – New features, enhancements, additions to functionality.
* **bugfix_*** – Standard bug fixes.
* **fix_*** – Minor or isolated fixes (when "bugfix" feels too large).
* **hotfix_*** – Critical fixes that must go out immediately.
* **release_*** – Preparing a release, finalizing deployment builds.
* **chore_*** – Routine work (cleanup, build system changes, config updates).
* **docs_*** – Documentation-only changes.
* **test_*** – New tests, updated tests, or test-related infrastructure.

### Additional Prefixes

* **refactor_*** – Code restructuring with no behavior change.
* **perf_*** – Performance-related improvements or optimizations.

---

## Branch Naming Format

All branches must follow this pattern:

```
prefix_short-description
```

Guidelines for the description:

* Use lowercase words separated by hyphens.
* Keep it short but clear.
* Avoid special characters.

**Examples:**

```
feature_tile-decoder
bugfix_map-index-error
hotfix_crash-on-startup
refactor_ai-pathing-module
perf_png-write-speed
```

---

## Prefix Selection Rules

Even if a task spans multiple possible categories (for example, a change that is partly a chore and partly a refactor), **choose only one prefix**. Use the prefix that best represents the primary purpose of the branch.

This keeps branch names clean, readable, and consistent. Avoid combining prefixes such as `chore_refactor_...` or `feature_perf_...`.

## General Workflow Recommendations

* Choose the prefix that best represents the intent of the branch.
* Keep branches focused on one clear purpose.
* Delete branches after merging to reduce clutter.
* Write meaningful commit messages that complement the branch name.

---

If additional prefixes become necessary over time, they should be proposed and added to this document for consistency.

## Explicit & Readable Code

**Guideline:** All code should prioritize explicitness and readability over brevity or cleverness. Code should be self-explanatory such that an entry-level developer or a new team member can understand it without guessing or deciphering shorthand.

Key Points:
1. Avoid implicit logic or hidden behavior.
  - Prefer clear variable names and descriptive function names.
  - Avoid chaining multiple operations in a single line if it sacrifices clarity.
2. Declare types and return values explicitly.
  - Always annotate functions with parameter and return types (TypeScript) or document types (JS).
  - Avoid relying on type inference for understanding the code’s intent.
3. Use intermediate variables for clarity.
  - Even if a one-liner could achieve the same result, a named variable helps explain the purpose of the value.
4. Avoid “clever” or terse shortcuts.
  - Examples: overly compressed map/reduce chains, implicit coercions, or hard-to-read ternary operations.
5. Comment and document intent, not implementation.
  - Explain why the code does something if it’s not immediately obvious.
  - Implementation comments should be minimal if the code is self-explanatory.

# AI Coding Agent Guidelines: Explicit & Readable Code

1. Always write code that is **explicit and self-explanatory**.
2. Avoid implicit logic or shorthand that makes the code hard to read.
3. Use **descriptive variable and function names**.
4. Always include **explicit type annotations** where possible.
5. Prefer **intermediate variables** for clarity, even if the result could be expressed as a one-liner.
6. Avoid clever shortcuts, compressed operations, or implicit coercions.
7. Add comments to explain intent when the purpose is not obvious.
8. Prioritize human readability over code golf or minimal character count.
