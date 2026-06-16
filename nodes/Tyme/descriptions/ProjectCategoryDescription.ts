import type {INodeProperties} from 'n8n-workflow';

export const projectCategoryOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['projectCategory']}},
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a project category',
                action: 'Create a project category',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a project category',
                action: 'Delete a project category',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search project categories',
                action: 'Search project categories',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a project category',
                action: 'Update a project category',
            },
        ],
        default: 'search',
    },
];

export const projectCategoryFields: INodeProperties[] = [
    // ── Search ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        displayOptions: {show: {resource: ['projectCategory'], operation: ['search']}},
        description: 'Filter categories by name',
    },

    // ── Create ──────────────────────────────────────────────────────────────
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['projectCategory'], operation: ['create']}},
        description: 'Name of the project category',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['projectCategory'], operation: ['create']}},
        options: [
            {
                displayName: 'Color',
                name: 'color',
                type: 'number',
                default: 0,
                description: 'Color as an integer (e.g. 0xFF9900)',
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                description: 'Custom ID for the category. Auto-generated if omitted. Cannot be changed after creation.',
            },
        ],
    },

    // ── Update ──────────────────────────────────────────────────────────────
    {
        displayName: 'Category ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['projectCategory'], operation: ['update']}},
        description: 'ID of the category to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {show: {resource: ['projectCategory'], operation: ['update']}},
        options: [
            {
                displayName: 'Name',
                name: 'name',
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
        ],
    },

    // ── Delete ──────────────────────────────────────────────────────────────
    {
        displayName: 'Category ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['projectCategory'], operation: ['delete']}},
        description: 'ID of the category to delete',
    },
];
