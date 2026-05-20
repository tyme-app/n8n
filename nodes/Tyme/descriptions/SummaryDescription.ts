import type {INodeProperties} from 'n8n-workflow';

export const summaryOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['summary']}},
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get task summaries for a date range',
                action: 'Get summary',
            },
        ],
        default: 'get',
    },
];

export const summaryFields: INodeProperties[] = [
    {
        displayName: 'From',
        name: 'from',
        type: 'dateTime',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['summary'], operation: ['get']}},
    },
    {
        displayName: 'To',
        name: 'to',
        type: 'dateTime',
        required: true,
        default: '',
        displayOptions: {show: {resource: ['summary'], operation: ['get']}},
    },
];
