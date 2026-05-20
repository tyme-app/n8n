import type {INodeProperties} from 'n8n-workflow';

export const timeEntryOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['timeEntry']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a time entry',
                action: 'Create a time entry',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a time entry',
                action: 'Delete a time entry',
            },
{
                name: 'Update',
                value: 'update',
                description: 'Update a time entry',
                action: 'Update a time entry',
            },
        ],
        default: 'create',
    },
];

export const timeEntryFields: INodeProperties[] = [
    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Task ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['create']}},
        description: 'ID of the task this entry belongs to',
    },
    {
        displayName: 'User ID',
        name: 'user_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['create']}},
        description: 'ID of the user who logged the time',
    },
    {
        displayName: 'Start Time',
        name: 'time_start',
        type: 'dateTime',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['create']}},
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timeEntry'], operation: ['create']}},
        options: [
            {
                displayName: 'Billing State',
                name: 'billing_state',
                type: 'options',
                options: [
                    {name: 'Unbilled', value: 0},
                    {name: 'Billed', value: 1},
                    {name: 'Paid', value: 2},
                ],
                default: 0,
            },
            {
                displayName: 'Note',
                name: 'note',
                type: 'string',
                default: '',
                typeOptions: {rows: 3},
            },
            {
                displayName: 'End Time',
                name: 'time_end',
                type: 'dateTime',
                default: '',
                description: 'Leave empty for a running entry',
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the time entry. Auto-generated if omitted. Cannot be changed after creation.',
            },
        ],
    },

    // ── Update ──────────────────────────────────────────────────────────────
    {
        displayName: 'Time Entry ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['update']}},
        description: 'ID of the time entry to update',
    },
    {
        displayName: 'Task ID',
        name: 'related_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['update']}},
        description: 'ID of the task this entry belongs to',
    },
    {
        displayName: 'User ID',
        name: 'user_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['update']}},
        description: 'ID of the user who logged the time',
    },
    {
        displayName: 'Start Time',
        name: 'time_start',
        type: 'dateTime',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['update']}},
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['timeEntry'], operation: ['update']}},
        options: [
            {
                displayName: 'Billing State',
                name: 'billing_state',
                type: 'options',
                options: [
                    {name: 'Unbilled', value: 0},
                    {name: 'Billed', value: 1},
                    {name: 'Paid', value: 2},
                ],
                default: 0,
            },
            {
                displayName: 'End Time',
                name: 'time_end',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Note',
                name: 'note',
                type: 'string',
                default: '',
                typeOptions: {rows: 3},
            },
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Time Entry ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['timeEntry'], operation: ['delete']}},
        description: 'ID of the time entry to delete',
    },
];
