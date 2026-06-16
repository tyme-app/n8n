import type {
    IDataObject,
    IHookFunctions,
    INode,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    IWebhookResponseData,
} from 'n8n-workflow';
import {NodeApiError, NodeConnectionTypes} from 'n8n-workflow';
import {TYME_API_BASE_URL} from './constants';

export class TymeTrigger implements INodeType {
    private static assertWebhookResponse(node: INode, statusCode: number, failMessage: string): void {
        if (statusCode === 401) {
            throw new NodeApiError(node, {message: 'Authentication failed — check your Tyme credentials'}, {httpCode: '401'});
        }
        if (statusCode === 403) {
            throw new NodeApiError(node, {message: 'Not authorized to manage webhooks on this Tyme account'}, {httpCode: '403'});
        }
        if (statusCode !== 200) {
            throw new NodeApiError(node, {message: failMessage}, {httpCode: String(statusCode)});
        }
    }

    description: INodeTypeDescription = {
        displayName: 'Tyme Trigger',
        name: 'tymeTrigger',
        icon: 'file:tyme.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["event"]}}',
        description: 'Starts the workflow when a Tyme event occurs',
        defaults: {name: 'Tyme Trigger'},
        inputs: [],
        outputs: [NodeConnectionTypes.Main],
        credentials: [{name: 'tymeOAuth2Api', required: true}],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],
        properties: [
            {
                displayName: 'Event',
                name: 'event',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Category Created',
                        value: 'category',
                        description: 'Triggers when a new project category is created',
                    },
                    {
                        name: 'Project Created',
                        value: 'project',
                        description: 'Triggers when a new project is created',
                    },
                    {
                        name: 'Sub-Task Created',
                        value: 'subtask',
                        description: 'Triggers when any new sub-task is created',
                    },
                    {
                        name: 'Task Created',
                        value: 'task',
                        description: 'Triggers when any new task is created',
                    },
                    {
                        name: 'Time Entry Created',
                        value: 'time',
                        description: 'Triggers when a new time entry is created',
                    },
                    {
                        name: 'Time Entry Stopped',
                        value: 'stopped_time',
                        description: 'Triggers when a running time entry is stopped',
                    },
                ],
                default: 'time',
            },
        ],
		usableAsTool: true,
    };

    webhookMethods = {
        default: {
            async checkExists(this: IHookFunctions): Promise<boolean> {
                return false;
            },

            async create(this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default') as string;
                const event = this.getNodeParameter('event') as string;
                const response = await this.helpers.httpRequestWithAuthentication.call(this, 'tymeOAuth2Api', {
                    method: 'POST',
                    url: `${TYME_API_BASE_URL}/webhooks/subscribe`,
                    body: {hook_url: webhookUrl, trigger_type: event},
                    returnFullResponse: true,
                });
                TymeTrigger.assertWebhookResponse(this.getNode(), response.statusCode, 'Failed to subscribe webhook');
                return true;
            },

            async delete(this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default') as string;
                const event = this.getNodeParameter('event') as string;
                const response = await this.helpers.httpRequestWithAuthentication.call(this, 'tymeOAuth2Api', {
                    method: 'DELETE',
                    url: `${TYME_API_BASE_URL}/webhooks/unsubscribe`,
                    body: {hook_url: webhookUrl, trigger_type: event},
                    returnFullResponse: true,
                });
                TymeTrigger.assertWebhookResponse(this.getNode(), response.statusCode, 'Failed to unsubscribe webhook');
                return true;
            },
        },
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const body = this.getBodyData();
        const items: INodeExecutionData[] = Array.isArray(body)
            ? (body as IDataObject[]).map((item) => ({json: item}))
            : [{json: body as IDataObject}];
        return {workflowData: [items]};
    }
}
