import type { INodeProperties } from 'n8n-workflow';

export const timesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['times'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve time entries for a date range',
				action: 'Get many time entries',
			},
		],
		default: 'getMany',
	},
];

export const timesFields: INodeProperties[] = [
	{
		displayName: 'From',
		name: 'from',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['times'], operation: ['getMany'] } },
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['times'], operation: ['getMany'] } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['times'], operation: ['getMany'] } },
		options: [
			{
				displayName: 'Billing State',
				name: 'billing_state',
				type: 'options',
				options: [
					{ name: 'Unbilled', value: 0 },
					{ name: 'Billed', value: 1 },
					{ name: 'Paid', value: 2 },
				],
				default: 0,
			},
			{
				displayName: 'Pagination Start',
				name: 'start',
				type: 'number',
				default: 0,
				description: 'Offset for pagination',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filter by user ID',
			},
		],
	},
];
