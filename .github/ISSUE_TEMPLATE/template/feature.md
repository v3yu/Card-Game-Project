---
name: Feature Tracker
about: Track the progress of a new or planned feature
title: "[Feature] "
labels: enhancement
assignees: ''
---

##  Feature Title  
Provide a clear, concise title for the feature.  
*Example: Implement User Authentication*

---

##  Description  
Describe what the feature does, its purpose, and why it is needed. Include any relevant context or background information.  
*Example: This feature allows users to log into the system using secure credentials and receive a JWT token for session management.*

---

##  Acceptance Criteria  
List measurable conditions that must be met for this feature to be considered complete:

- [ ] User can enter email and password to log in
- [ ] Valid credentials return a JWT token
- [ ] Invalid login attempts show appropriate error messages
- [ ] Token is stored securely on the client

---

##  Tasks / Subtasks  
Break the feature into actionable items:

- [ ] Design login API(@nameOfMember)
- [ ] Implement backend logic for authentication(@nameOfMember)
- [ ] Create frontend login form
- [ ] Connect frontend to backend API
- [ ] Write unit tests for login logic

---

##  Estimated Effort  
Rough time or story point estimate:  
> *Backend: 2 days*  
> *Frontend: 1.5 days*  
> *Testing & integration: 1 day*

---

##  Related Links / Assets  
Include links to designs, mockups, diagrams, or related issues/PRs:

- Miro wireframe: [insert link]
- Related issue: #123

---
## API DOC
- function login()  
comment:
---
##  Assignees  
@backend-dev @frontend-dev

