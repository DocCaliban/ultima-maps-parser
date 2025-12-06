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
