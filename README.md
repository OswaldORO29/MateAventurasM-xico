# MateAventuras Mexico

MateAventuras Mexico is a playful web platform that helps children in Mexico learn and practice basic mathematics. Children can solve addition and subtraction problems, earn points, and build a streak while learning with Loti the Axolotl.

The project provides a colorful, child-friendly experience and currently runs directly in a web browser.

## Team

| Team member | Role |
|---|---|
| Daniel | Front-End |
| Dana | Back-End |
| Oswaldo | Back-End |

## GitHub workflow and contribution rules

To protect the stability of the project and make collaboration consistent, every contribution must follow these rules:

1. **Direct pushes to `main` are prohibited.** Changes must reach `main` through an approved Pull Request (PR).
2. **All development must take place on a separate branch** created from the latest `main`. Use descriptive branch names, such as:
   - `feature/addition-game`
   - `backend/user-api`
   - `fix/score-calculation`
3. **Open a Pull Request to merge changes into `main`.** Describe the change and request a review from another team member.
4. **The PR author cannot approve their own PR.** At least one other team member must review and approve it.
5. **The PR author must not merge their own PR.** After approval, another team member must merge it. Address requested changes before merging.
6. **Do not bypass the `main` branch protection rules**, including by using an administrator or ruleset bypass.

### Configure `main` branch protection on GitHub

A repository administrator should configure a branch ruleset before the team begins merging PRs:

1. Open the repository on GitHub and go to **Settings > Rules > Rulesets**.
2. Select **New ruleset > New branch ruleset**.
3. Name the ruleset (for example, `Protect main`), set enforcement status to **Active**, and target the branch `main`.
4. Leave the bypass list empty so collaborators cannot bypass the rules.
5. Enable **Require a pull request before merging** and require **1 approval**.
6. Enable **Require approval of the most recent reviewable push** so a reviewer must approve the latest changes.
7. Enable **Block force pushes** and **Restrict deletions** for `main`, if those options are available.
8. Save the ruleset. Do not grant bypass permissions that would allow direct updates to `main`.

Requiring a PR prevents direct updates to `main`, and the approval requirement ensures that someone other than the PR author reviews the change. GitHub's standard branch rules do **not** independently guarantee that the PR author cannot perform the merge after receiving another person's approval. The team must therefore ensure that a different member merges each approved PR. If this must be technically enforced, use an appropriately configured GitHub App or other repository automation; do not claim the branch rules alone enforce it.

### Contribution steps

```bash
# Update your local main branch
git switch main
git pull origin main

# Create a branch for your work
git switch -c feature/describe-your-change

# Commit and publish your branch
git add .
git commit -m "Describe your change"
git push -u origin feature/describe-your-change
```

Then open a PR on GitHub targeting `main`, request a review from another team member, address any requested changes, and have a team member other than the PR author merge it after approval.
