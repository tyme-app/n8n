import type {INodeProperties} from 'n8n-workflow';

export const subTaskOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['subTask']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a sub-task',
                action: 'Create a sub-task',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a sub-task',
                action: 'Delete a sub-task',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search sub-tasks',
                action: 'Search sub-tasks',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a sub-task',
                action: 'Update a sub-task',
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
        displayOptions: {show: {resource: ['subTask'], operation: ['search']}},
        description: 'Filter sub-tasks by name',
    },
    {
        displayName: 'Task ID',
        name: 'parentId',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['subTask'], operation: ['search']}},
        description: 'Filter by parent task ID',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['subTask'], operation: ['create']}},
        description: 'Name of the sub-task',
    },
    {
        displayName: 'Task ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['subTask'], operation: ['create']}},
        description: 'ID of the parent task',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['subTask'], operation: ['create']}},
        options: [
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
                description: 'Hourly rate',
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the sub-task. Auto-generated if omitted. Cannot be changed after creation.',
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
        displayName: 'Sub-Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['subTask'], operation: ['update']}},
        description: 'ID of the sub-task to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['subTask'], operation: ['update']}},
        options: [
            {
                displayName: 'Archived',
                name: 'archived',
                type: 'boolean',
                default: false,
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
                displayName: 'Start Date',
                name: 'start_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Task ID',
                name: 'related_id',
                type: 'string',
                default: '',
            },
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Sub-Task ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['subTask'], operation: ['delete']}},
        description: 'ID of the sub-task to delete',
    },
];
