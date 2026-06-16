import type {INodeProperties} from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['timedTask']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a timed task',
                action: 'Create a timed task',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a timed task',
                action: 'Delete a timed task',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search timed tasks',
                action: 'Search timed tasks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a timed task',
                action: 'Update a timed task',
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
        displayOptions: {show: {resource: ['timedTask'], operation: ['search']}},
        description: 'Filter timed tasks by name',
    },
    {
        displayName: 'Project ID',
        name: 'parentId',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['timedTask'], operation: ['search']}},
        description: 'Filter by parent project ID',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedTask'], operation: ['create']}},
        description: 'Name of the timed task',
    },
    {
        displayName: 'Project ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedTask'], operation: ['create']}},
        description: 'ID of the parent project',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timedTask'], operation: ['create']}},
        options: [
            {
                displayName: 'Billable',
                name: 'billable',
                type: 'boolean',
                default: true,
            },
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
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
                description: 'Custom ID for the timed task. Auto-generated if omitted. Cannot be changed after creation.',
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
        displayName: 'Timed Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedTask'], operation: ['update']}},
        description: 'ID of the timed task to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timedTask'], operation: ['update']}},
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Billable',
                name: 'billable',
                type: 'boolean',
                default: true,
            },
            {
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
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
            }
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Timed Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedTask'], operation: ['delete']}},
        description: 'ID of the timed task to delete',
    },
];
