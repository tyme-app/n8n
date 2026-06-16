import type {INodeProperties} from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['project']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a project',
                action: 'Create a project',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a project',
                action: 'Delete a project',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search projects',
                action: 'Search projects',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a project',
                action: 'Update a project',
            },
        ],
        default: 'search',
    },
];

export const projectFields: INodeProperties[] = [
    // ── Search ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['project'], operation: ['search']}},
        description: 'Filter projects by name',
    },
    {
        displayName: 'Category ID',
        name: 'parentId',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['project'], operation: ['search']}},
        description: 'Filter by parent category ID',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['project'], operation: ['create']}},
        description: 'Name of the project',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['project'], operation: ['create']}},
        options: [
            {
                displayName: 'Category ID',
                name: 'related_id',
                type: 'string',
                default: '',
                description: 'Parent project category ID',
            },
            {
                displayName: 'Color',
                name: 'color',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Default Hourly Rate',
                name: 'default_hourly_rate',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Due Date',
                name: 'due_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the project. Auto-generated if omitted. Cannot be changed after creation.',
            },
            {
                displayName: 'Planned Budget',
                name: 'planned_budget',
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
                displayName: 'Rounding Method',
                name: 'rounding_method',
                type: 'options',
                options: [
                    {name: 'Down', value: 'DOWN'},
                    {name: 'Nearest', value: 'NEAREST'},
                    {name: 'Up', value: 'UP'},
                ],
                default: 'NEAREST',
            },
            {
                displayName: 'Rounding Minutes',
                name: 'rounding_minutes',
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
        displayName: 'Project ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['project'], operation: ['update']}},
        description: 'ID of the project to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['project'], operation: ['update']}},
        options: [
            {
                displayName: 'Category ID',
                name: 'related_id',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Color',
                name: 'color',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Completed Date',
                name: 'completed_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Default Hourly Rate',
                name: 'default_hourly_rate',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Due Date',
                name: 'due_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Planned Budget',
                name: 'planned_budget',
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
                displayName: 'Rounding Method',
                name: 'rounding_method',
                type: 'options',
                options: [
                    {name: 'Down', value: 'DOWN'},
                    {name: 'Nearest', value: 'NEAREST'},
                    {name: 'Up', value: 'UP'},
                ],
                default: 'NEAREST',
            },
            {
                displayName: 'Rounding Minutes',
                name: 'rounding_minutes',
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

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Project ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['project'], operation: ['delete']}},
        description: 'ID of the project to delete',
    },
];
