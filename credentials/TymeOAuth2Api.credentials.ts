import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TymeOAuth2Api implements ICredentialType {
	name = 'tymeOAuth2Api';
	displayName = 'Tyme OAuth2 API';
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
			default: 'https://api.tyme-app.com/v1/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.tyme-app.com/v1/access_token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'hidden',
			default: 'tyme3_n8n',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'hidden',
			default: '',
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
