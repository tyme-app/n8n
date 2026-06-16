import type {
    IDataObject,
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    JsonObject,
} from 'n8n-workflow';
import {NodeApiError, NodeConnectionTypes, NodeOperationError} from 'n8n-workflow';

import {
    projectCategoryFields,
    projectCategoryOperations,
} from './descriptions/ProjectCategoryDescription';
import {projectFields, projectOperations} from './descriptions/ProjectDescription';
import {timedSubTaskFields, timedSubTaskOperations} from './descriptions/TimedSubTaskDescription';
import {summaryFields, summaryOperations} from './descriptions/SummaryDescription';
import {timedTaskFields, timedTaskOperations} from './descriptions/TimedTaskDescription';
import {teamMemberFields, teamMemberOperations} from './descriptions/TeamMemberDescription';
import {timeEntryFields, timeEntryOperations} from './descriptions/TimeEntryDescription';
import {timesFields, timesOperations} from './descriptions/TimesDescription';
import {absenceFields, absenceOperations} from './descriptions/AbsenceDescription';
import {TYME_API_BASE_URL} from './constants';

function toTymeDate(value: unknown): string {
    if (!value) return '';
    return new Date(value as string).toISOString().replace('T', ' ').slice(0, 19);
}

const DATE_FIELDS = ['start_date', 'due_date', 'completed_date', 'time_end', 'time_start', 'from', 'to'] as const;

function convertDateFields(fields: Record<string, unknown>): void {
    for (const field of DATE_FIELDS) {
        if (fields[field]) {
            fields[field] = toTymeDate(fields[field]);
        }
    }
}

const ENTITY_TYPE_MAP: Record<string, string> = {
    projectCategory: 'ProjectCategory',
    project: 'Project',
    timedTask: 'TimedTask',
    timedSubTask: 'TimedSubTask',
    timeEntry: 'TimedTaskRecord',
};

export class Tyme implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Tyme',
        name: 'tyme',
        icon: 'file:tyme.svg',
        group: ['output'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Track time, manage projects and tasks in Tyme',
        defaults: {name: 'Tyme'},
        usableAsTool: true,
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [{name: 'tymeOAuth2Api', required: true}],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {name: 'Absence', value: 'absence'},
                    {name: 'Project', value: 'project'},
                    {name: 'Project Category', value: 'projectCategory'},
                    {name: 'Summary', value: 'summary'},
                    {name: 'Team Member', value: 'teamMember'},
                    {name: 'Time', value: 'times'},
                    {name: 'Time Entry', value: 'timeEntry'},
                    {name: 'Timed Sub-Task', value: 'timedSubTask'},
                    {name: 'Timed Task', value: 'timedTask'},
                ],
                default: 'timeEntry',
            },
            ...absenceOperations,
            ...absenceFields,
            ...projectCategoryOperations,
            ...projectCategoryFields,
            ...projectOperations,
            ...projectFields,
            ...timedTaskOperations,
            ...timedTaskFields,
            ...timedSubTaskOperations,
            ...timedSubTaskFields,
            ...timeEntryOperations,
            ...timeEntryFields,
            ...timesOperations,
            ...timesFields,
            ...summaryOperations,
            ...summaryFields,
            ...teamMemberOperations,
            ...teamMemberFields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                let responseData: unknown;

                // ── Absence ────────────────────────────────────────────────────────
                if (resource === 'absence') {
                    if (operation === 'create') {
                        const additional = (this.getNodeParameter('additionalFields', i) as Record<string, unknown>) ?? {};
                        convertDateFields(additional);
                        const body: Record<string, unknown> = {
                            type: 'NonWorkingRecord',
                            subtype: this.getNodeParameter('subtype', i) as number,
                            user_id: this.getNodeParameter('user_id', i) as string,
                            time_start: toTymeDate(this.getNodeParameter('time_start', i)),
                            time_end: toTymeDate(this.getNodeParameter('time_end', i)),
                            note: this.getNodeParameter('note', i) as string,
                            ...additional,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                        );
                        returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                        continue;
                    }

                    if (operation === 'update') {
                        const body: Record<string, unknown> = {
                            type: 'NonWorkingRecord',
                            id: this.getNodeParameter('id', i) as string,
                            subtype: this.getNodeParameter('subtype', i) as number,
                            user_id: this.getNodeParameter('user_id', i) as string,
                            time_start: toTymeDate(this.getNodeParameter('time_start', i)),
                            time_end: toTymeDate(this.getNodeParameter('time_end', i)),
                            note: this.getNodeParameter('note', i) as string,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                        );
                        returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                        continue;
                    }

                    if (operation === 'delete') {
                        const id = this.getNodeParameter('id', i) as string;
                        await this.helpers.httpRequestWithAuthentication.call(this, 'tymeOAuth2Api', {
                            method: 'DELETE',
                            url: `${TYME_API_BASE_URL}/data/entity`,
                            qs: {time_ids: [id]},
                        });
                        returnData.push({json: {success: true}, pairedItem: {item: i}});
                        continue;
                    }
                }

                // ── Summary ────────────────────────────────────────────────────────
                if (resource === 'summary') {
                    const from = toTymeDate(this.getNodeParameter('from', i));
                    const to = toTymeDate(this.getNodeParameter('to', i));
                    const user_id = this.getNodeParameter('user_id', i, '') as string;

                    const qs: IDataObject = {from, to};
                    if (user_id) qs.user_id = user_id;

                    const response = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'tymeOAuth2Api',
                        {
                            method: 'GET',
                            url: `${TYME_API_BASE_URL}/data/summary`,
                            qs,
                        },
                    );
                    const items2 = Array.isArray(response) ? response : [response];
                    for (const item of items2) {
                        returnData.push({json: item as IDataObject, pairedItem: {item: i}});
                    }
                    continue;
                }

                // ── Team Member ────────────────────────────────────────────────────
                if (resource === 'teamMember') {
                    if (operation === 'getMany') {
                        const response = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'GET', url: `${TYME_API_BASE_URL}/data/members`},
                        );
                        const members = Array.isArray(response) ? response : [response];
                        for (const member of members) {
                            returnData.push({json: member as IDataObject, pairedItem: {item: i}});
                        }
                    } else if (operation === 'get') {
                        const userId = this.getNodeParameter('userId', i) as string;
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'GET', url: `${TYME_API_BASE_URL}/data/members/${userId}`},
                        );
                        returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                    }
                    continue;
                }

                // ── Times ─────────────────────────────────────────────────────────
                if (resource === 'times') {
                    const from = toTymeDate(this.getNodeParameter('from', i));
                    const to = toTymeDate(this.getNodeParameter('to', i));
                    const filters = this.getNodeParameter('filters', i) as Record<string, unknown>;
                    const qs: IDataObject = {from, to, ...(filters as IDataObject)};
                    responseData = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'tymeOAuth2Api',
                        {method: 'GET', url: `${TYME_API_BASE_URL}/data/times`, qs},
                    );
                    const entries = Array.isArray(responseData)
                        ? responseData
                        : ((responseData as Record<string, unknown>)?.data ?? [responseData]);
                    for (const entry of entries as IDataObject[]) {
                        returnData.push({json: entry as IDataObject, pairedItem: {item: i}});
                    }
                    continue;
                }

                // ── Time Entry ─────────────────────────────────────────────────────
                if (resource === 'timeEntry') {
                    if (operation === 'create') {
                        const timeEntryCreateAdditional = (this.getNodeParameter('additionalFields', i) as Record<string, unknown>) ?? {};
                        convertDateFields(timeEntryCreateAdditional);
                        const body: Record<string, unknown> = {
                            type: 'TimedTaskRecord',
                            related_id: this.getNodeParameter('related_id', i) as string,
                            user_id: this.getNodeParameter('user_id', i) as string,
                            time_start: toTymeDate(this.getNodeParameter('time_start', i)),
                            ...timeEntryCreateAdditional,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                        );
                        returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                        continue;
                    }

                    if (operation === 'update') {
                        const timeEntryUpdateFields = (this.getNodeParameter('updateFields', i) as Record<string, unknown>) ?? {};
                        convertDateFields(timeEntryUpdateFields);
                        const body: Record<string, unknown> = {
                            type: 'TimedTaskRecord',
                            id: this.getNodeParameter('id', i) as string,
                            related_id: this.getNodeParameter('related_id', i) as string,
                            user_id: this.getNodeParameter('user_id', i) as string,
                            time_start: toTymeDate(this.getNodeParameter('time_start', i)),
                            ...timeEntryUpdateFields,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                        );
                        returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                        continue;
                    }

                    if (operation === 'delete') {
                        const id = this.getNodeParameter('id', i) as string;
                        responseData = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'tymeOAuth2Api',
                            {
                                method: 'DELETE',
                                url: `${TYME_API_BASE_URL}/data/entity`,
                                qs: {time_ids: [id]},
                            },
                        );
                        returnData.push({json: {success: true}, pairedItem: {item: i}});
                        continue;
                    }
                }

                // ── Entities: ProjectCategory, Project, TimedTask, TimedSubTask ──────────────
                const entityType = ENTITY_TYPE_MAP[resource];
                if (!entityType) {
                    throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, {
                        itemIndex: i,
                    });
                }

                if (operation === 'search') {
                    const name = this.getNodeParameter('name', i, '') as string;
                    const related_id = this.getNodeParameter('related_id', i, '') as string;

                    const qs: IDataObject = {type: entityType};
                    if (name) qs.name = name;
                    if (related_id) qs.parent_id = related_id;

                    const response = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'tymeOAuth2Api',
                        {method: 'GET', url: `${TYME_API_BASE_URL}/data/search_entity`, qs},
                    );
                    const results = Array.isArray(response) ? response : [response];
                    for (const result of results) {
                        returnData.push({json: result as IDataObject, pairedItem: {item: i}});
                    }
                    continue;
                }

                if (operation === 'create') {
                    const name = this.getNodeParameter('name', i) as string;
                    const additionalFields = (this.getNodeParameter('additionalFields', i) as Record<
                        string,
                        unknown
                    >) ?? {};
                    convertDateFields(additionalFields);

                    const body: Record<string, unknown> = {type: entityType, name, ...additionalFields};

                    if (resource === 'timedTask' || resource === 'timedSubTask') {
                        body.related_id = this.getNodeParameter('related_id', i) as string;
                    }

                    responseData = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'tymeOAuth2Api',
                        {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                    );
                    returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                    continue;
                }

                if (operation === 'update') {
                    const id = this.getNodeParameter('id', i) as string;
                    const updateFields = (this.getNodeParameter('updateFields', i) as Record<
                        string,
                        unknown
                    >) ?? {};
                    convertDateFields(updateFields);

                    const body: Record<string, unknown> = {type: entityType, id, ...updateFields};

                    responseData = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'tymeOAuth2Api',
                        {method: 'POST', url: `${TYME_API_BASE_URL}/data/update_entity`, body},
                    );
                    returnData.push({json: responseData as IDataObject, pairedItem: {item: i}});
                    continue;
                }

                if (operation === 'delete') {
                    const id = this.getNodeParameter('id', i) as string;
                    await this.helpers.httpRequestWithAuthentication.call(this, 'tymeOAuth2Api', {
                        method: 'DELETE',
                        url: `${TYME_API_BASE_URL}/data/entity`,
                        qs: {project_ids: [id]},
                    });
                    returnData.push({json: {success: true}, pairedItem: {item: i}});
                    continue;
                }

                throw new NodeOperationError(
                    this.getNode(),
                    `Unknown operation "${operation}" for resource "${resource}"`,
                    {itemIndex: i},
                );
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {error: (error as Error).message},
                        pairedItem: {item: i},
                    });
                    continue;
                }

                throw new NodeApiError(this.getNode(), error as JsonObject, {itemIndex: i});
            }
        }

        return [returnData];
    }
}
