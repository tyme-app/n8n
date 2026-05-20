import type {INodeProperties} from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['task']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a task',
                action: 'Create a task',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a task',
                action: 'Delete a task',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search tasks',
                action: 'Search tasks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a task',
                action: 'Update a task',
            },
        ],
        default: 'search',
    },
];

export const taskFields: INodeProperties[] = [
    // ── Search ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['search']}},
        description: 'Filter tasks by name',
    },
    {
        displayName: 'Project ID',
        name: 'parentId',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['search']}},
        description: 'Filter by parent project ID',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['create']}},
        description: 'Name of the task',
    },
    {
        displayName: 'Project ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['create']}},
        description: 'ID of the parent project',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['task'], operation: ['create']}},
        options: [
            {
                displayName: 'Billable',
                name: 'billable',
                type: 'boolean',
                default: true,
            },
            {
                displayName: 'Due Date',
                name: 'due_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Hourly Rate',
                name: 'hourly_rate',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the task. Auto-generated if omitted. Cannot be changed after creation.',
            },
            {
                displayName: 'Planned Duration (Seconds)',
                name: 'planned_duration',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
            },
        ],
    },

    // ── Update ──────────────────────────────────────────────────────────────
    {
        displayName: 'Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['update']}},
        description: 'ID of the task to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['task'], operation: ['update']}},
        options: [
            {
                displayName: 'Archived',
                name: 'archived',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Billable',
                name: 'billable',
                type: 'boolean',
                default: true,
            },
            {
                displayName: 'Due Date',
                name: 'due_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Hourly Rate',
                name: 'hourly_rate',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Planned Duration (Seconds)',
                name: 'planned_duration',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Project ID',
                name: 'related_id',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
            },
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['task'], operation: ['delete']}},
        description: 'ID of the task to delete',
    },
];
