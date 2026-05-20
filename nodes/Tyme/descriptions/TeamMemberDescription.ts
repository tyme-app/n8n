import type {INodeProperties} from 'n8n-workflow';

export const teamMemberOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {show: {resource: ['teamMember']}},
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get a specific team member',
                action: 'Get a team member',
            },
            {
                name: 'Get Many',
                value: 'getMany',
                description: 'Get all team members',
                action: 'Get many team members',
            },
        ],
        default: 'getMany',
    },
];

export const teamMemberFields: INodeProperties[] = [
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        default: 'me',
        displayOptions: {show: {resource: ['teamMember'], operation: ['get']}},
        description: 'User ID to retrieve. Use "me" for the authenticated user.',
    },
];
