# Team Rules
- **About stand-up meeting**:The stand-up meeting will be hosted by the subgroup leader, and the frequency depends on the subgroup. 
We will talk about:
1. What did I do Yesterday? Describe the work you completed yesterday.
2. What do I plan to do today? Briefly state your work plan or tasks for today.
3. What obstacles am I facing? Report any current difficulties or blockers; the team or Scrum Master may assist.
The subgroup leader should document the meeting content and, if necessary, schedule a follow-up meeting to resolve any issues. If the problem remains unresolved, they may consult with members of other subgroups for support.
- **About code style**:
1. Use camelCase for variable and function names
    ```
    let userName = 'Alice';
    function getUserData() {}
    ```

2. Use SCREAMING_SNAKE_CASE for constants
    ```
    const API_KEY = 'your-key-here';
    ```

3. Use 2 spaces for indentation (the JavaScript community standard)

4. Use const and let, avoid var

5. Use single quotes ' for strings, unless double quotes are needed inside

6. Please feel free to use VSCode’s auto format command, which is Shift + Alt + F or Shift + Option + F, to fix nesting and line spacing.

7. Please add comments before functions and variables whose names do not clearly indicate their purpose.  
   example:  
    ```
    /**
    * 
    * @param {type} name 
    * @returns {type}
    */
    function greet(name) {
    return `Hello, ${name}!`;
    }
    ```
    Guide:  
    1. Write your function first.  
    ```
    function greet(name) {  
    return `Hello, ${name}!`;
    }
    ```   
    2. Go to the line directly above the function and type:
    ```
    /**
    ``` 
    3. Press Enter
    ```
    /**
    * 
    * @param {type} name 
    * @returns {type}
    */
    function greet(name) {
    return `Hello, ${name}!`;
    }

    ```

  - **About dev tools**:
    1. Vscode
    2. Github
    3. Chrome
    4. Jest
    5. Miro white board
- **About Branch strategy**:
  1. main Branch (Production Branch)
This is the production branch that contains tested and deployable code.
No one should develop directly on main or push to it without a proper review.
We only merge into main when a release is ready to go live.

  1. dev Branch (Development Mainline)
This is the integration branch where all feature development is merged.
Every developer's work (from feature branches) is pulled into dev.
Testing and integration happen here.
main is updated by merging code from dev.

  1. feature/xxx Branches (Feature Branches)
Every new feature, module, or page should be developed in its own feature/xxx branch from dev.
Developers work independently in these branches.
Once completed, the feature branch is merged back into dev via a Pull Request.

  1. bugfix/xxx or hotfix/xxx Branches (Fix Branches)
bugfix/xxx: For fixing issues during development (branched from dev).
hotfix/xxx: For urgent production bugs (branched from main).
After fixing, merge back into the source branch (dev or main) and also sync to the other if needed.

-  **Merge rules**
   1. The code can be merged after all unit tests pass and a code review has been completed by a teammate from another group.
   2. Always fetch/pull the latest code before starting new development
- **About GitHub Issues and Documentation**
    1. We use it to report and track bug
    2. We use it to request new features
    3. We use it to write user’s story
    4. We use it to write API docs
   
- **The definition of done**
  1. Complete the task on time
  2. Write clean, readable, and maintainable code, and refactor when necessary
  3. Good API documentation.
  4. Unit test
  5. Meeting minutes

- **Some tips:**
  1. Write some demo programs before starting formal development.
  2. Spend some time on design, including creating wireframes, before starting actual coding.
  3. Build user-friendly APIs to facilitate collaboration across separate groups.







