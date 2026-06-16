import type {INodeProperties} from 'n8n-workflow';

export const subTaskOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['timedSubTask']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a timed sub-task',
                action: 'Create a timed sub task',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a timed sub-task',
                action: 'Delete a timed sub task',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search timed sub-tasks',
                action: 'Search timed sub tasks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a timed sub-task',
                action: 'Update a timed sub task',
            },
        ],
        default: 'search',
    },
];

export const subTaskFields: INodeProperties[] = [
    // ── Search ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['search']}},
        description: 'Filter timed sub-tasks by name',
    },
    {
        displayName: 'Timed Task ID',
        name: 'parentId',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['search']}},
        description: 'Filter by parent timed task ID',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['create']}},
        description: 'Name of the timed sub-task',
    },
    {
        displayName: 'Timed Task ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['create']}},
        description: 'ID of the parent timed task',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['create']}},
        options: [
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
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
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the timed sub-task. Auto-generated if omitted. Cannot be changed after creation.',
            },
            {
                displayName: 'Planned Duration (Seconds)',
                name: 'planned_duration',
                type: 'number',
                default: 0,
            },
        ],
    },

    // ── Update ──────────────────────────────────────────────────────────────
    {
        displayName: 'Timed Sub-Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['update']}},
        description: 'ID of the timed sub-task to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['update']}},
        options: [
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
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
                displayName: 'Timed Task ID',
                name: 'related_id',
                type: 'string',
                default: '',
            },
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Timed Sub-Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timedSubTask'], operation: ['delete']}},
        description: 'ID of the timed sub-task to delete',
    },
];
