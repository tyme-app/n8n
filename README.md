# n8n-nodes-tyme

This is an n8n community node for [Tyme](https://www.tyme-app.com/), a time tracking app for Mac and iOS.

Tyme lets individuals and teams track time against projects and tasks, manage absences, and generate reports. This node connects your n8n workflows to the Tyme API so you can automate time tracking, sync data with other tools, and build custom reporting pipelines.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Time Entry
- **Create** — log a new time entry against a task
- **Update** — modify an existing time entry
- **Delete** — remove a time entry

### Times
- **Get Many** — retrieve time entries for a date range, with optional filters

### Summary
- **Get** — fetch a summarised time report for a date range

### Absence
- **Create** — record an absence (vacation, sick leave, etc.)
- **Update** — update an existing absence record
- **Delete** — remove an absence record

### Project
- **Create** — create a new project
- **Update** — update project details
- **Delete** — delete a project
- **Search** — find projects by name

### Task
- **Create** — create a task inside a project
- **Update** — update task details
- **Delete** — delete a task
- **Search** — find tasks by name or parent project

### Sub-Task
- **Create** — create a sub-task inside a task
- **Update** — update sub-task details
- **Delete** — delete a sub-task
- **Search** — find sub-tasks by name

### Project Category
- **Create** — create a project category
- **Update** — update a project category
- **Delete** — delete a project category
- **Search** — find categories by name

### Team Member
- **Get** — retrieve a single team member
- **Get Many** — list all team members

## Credentials

This node uses **OAuth 2.0 with PKCE** to authenticate with the Tyme API. No Client ID or Client Secret is required — the node comes pre-configured.

To connect:
1. Create a new **Tyme OAuth2 API** credential in n8n.
2. Click **Connect** and sign in with your Tyme account.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Tyme website](https://tyme-app.com/)
- [Tyme API documentation](https://api.tyme-app.com/)
