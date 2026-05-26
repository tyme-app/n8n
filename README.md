# n8n-nodes-tyme

This is an n8n community node for [Tyme](https://www.tyme-app.com/), a time tracking app for Mac and iOS.

Tyme lets individuals and teams track time against projects and tasks, manage absences, and generate reports. This node connects your n8n workflows to the Tyme API so you can automate time tracking, sync data with other tools, and build custom reporting pipelines.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Trigger Events](#trigger-events)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Trigger Events

The **Tyme Trigger** node starts a workflow automatically when something happens in Tyme. Activate the workflow and it registers a webhook with the Tyme API; deactivating it unregisters automatically.

Supported events:

- **Category Created** — a new project category is created
- **Project Created** — a new project is created
- **Sub-Task Created** — a new sub-task is created
- **Task Created** — a new task is created
- **Time Entry Created** — a new time entry is started
- **Time Entry Stopped** — a running time entry is stopped

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

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/installation/)
- [Tyme Website](https://tyme-app.com/)
- [Tyme API Documentation](https://www.tyme-app.com/en/api-doc/)
- [Tyme n8n Community Node](https://creators.n8n.io/nodes/n8n-nodes-tyme/integration)
- [Tyme n8n npm Package](https://www.npmjs.com/package/n8n-nodes-tyme)
