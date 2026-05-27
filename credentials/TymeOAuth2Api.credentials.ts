import type { ICredentialType, INodeProperties } from 'n8n-workflow';
import {TYME_API_BASE_URL, TYME_CLIENT_ID} from '../nodes/Tyme/constants';

export class TymeOAuth2Api implements ICredentialType {
	name = 'tymeOAuth2Api';
	displayName = 'Tyme OAuth2 API';
	icon = 'file:../nodes/Tyme/tyme.svg' as const;
	extends = ['oAuth2Api'];
	documentationUrl = 'https://www.tyme-app.com/en/api-doc/';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: `${TYME_API_BASE_URL}/v1/authorize`,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: `${TYME_API_BASE_URL}/v1/access_token`,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'hidden',
			default: TYME_CLIENT_ID,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'hidden',
			default: '',
			typeOptions: { password: true },
		},
{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
