import type { INodeProperties } from 'n8n-workflow';

export const absenceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['absence'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an absence entry',
				action: 'Create an absence',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an absence entry',
				action: 'Delete an absence',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an absence entry',
				action: 'Update an absence',
			},
		],
		default: 'create',
	},
];

const SUBTYPE_OPTIONS = [
	{ name: 'Vacation', value: 0 },
	{ name: 'Sick', value: 1 },
	{ name: 'Other', value: 2 },
	{ name: 'Public Holiday', value: 3 },
	{ name: 'Overtime Compensation', value: 4 },
	{ name: 'Special Leave', value: 5 },
];

export const absenceFields: INodeProperties[] = [
	// ── Create ──────────────────────────────────────────────────────────────
	{
		displayName: 'Type',
		name: 'subtype',
		type: 'options',
		required: true,
		options: SUBTYPE_OPTIONS,
		default: 0,
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
	},
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
		description: 'ID of the user this absence belongs to',
	},
	{
		displayName: 'Start Time',
		name: 'time_start',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
	},
	{
		displayName: 'End Time',
		name: 'time_end',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
		typeOptions: { rows: 3 },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['absence'], operation: ['create'] } },
		options: [
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'Custom ID for the absence. Auto-generated if omitted. Cannot be changed after creation.',
			},
		],
	},

	// ── Update ──────────────────────────────────────────────────────────────
	{
		displayName: 'Absence ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
		description: 'ID of the absence to update',
	},
	{
		displayName: 'Type',
		name: 'subtype',
		type: 'options',
		required: true,
		options: SUBTYPE_OPTIONS,
		default: 0,
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
	},
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
		description: 'ID of the user this absence belongs to',
	},
	{
		displayName: 'Start Time',
		name: 'time_start',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
		typeOptions: { rows: 3 },
	},
	{
		displayName: 'End Time',
		name: 'time_end',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['update'] } },
	},

	// ── Delete ──────────────────────────────────────────────────────────────
	{
		displayName: 'Absence ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['absence'], operation: ['delete'] } },
		description: 'ID of the absence to delete',
	},
];
