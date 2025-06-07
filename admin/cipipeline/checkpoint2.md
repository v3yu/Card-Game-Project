Last time ([Checkpoint 1](https://github.com/Team-Black-Hat-White-Hat/cse110-sp25-group02/tree/main/admin/cipipeline))
Since we have done a few sprints we are now using the branch structure that we proposed in the last checkpoint.
# What is currently functional, in addition to what was functional from checkpoint 1:
1. main Branch (Production Branch)
- This is the production branch that contains tested and deployable code.
- No one should develop directly on main or push to it without a proper review.
- We only merge into main when a release is ready to go live.

2. dev Branch (Development Mainline)
- This is the integration branch where all feature development is merged.
- Every developer's work (from feature branches) is pulled into dev.
- Testing and integration happen here.
- main is updated by merging code from dev.

3.feature/xxx Branches (Feature Branches)
- Every new feature, module, or page should be developed in its own feature/xxx branch from dev.
- Developers work independently in these branches.
- Once completed, the feature branch is merged back into dev via a Pull Request.

# What is planned

4.bugfix/xxx or hotfix/xxx Branches (Fix Branches)
- bugfix/xxx: For fixing issues during development (branched from dev).
- hotfix/xxx: For urgent production bugs (branched from main).
- After fixing, merge back into the source branch (dev or main) and also sync to the other if needed.
- We have not yet encountered any bugs in dev or main that require bugfix or hotfixes.

# Demonstration of how it is implemented in GitHub Actions
![https://github.com/Team-Black-Hat-White-Hat/Card-Game-Project/blob/main/admin/cipipeline/passunittest.jpg](Screenshot showing a pull request that passed unit tests)
Screenshot showing a pull request that passed automatic unit tests, but requires a review to be able to merge.

![https://github.com/Team-Black-Hat-White-Hat/Card-Game-Project/blob/main/admin/cipipeline/failunittest.jpg](Screenshot showing a pull request that failed unit tests)
Screenshot showing a pull request that failed automatic unit tests, and so cannot merge (and also requires a review)
