
import { IExecuteFunctions } from 'n8n-core';
// Mocking n8n-workflow types for this context
type INodeExecutionData = any;
type INodeType = any;
type INodeTypeDescription = any;

export class HttpRequest implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'HTTP Request',
    name: 'httpRequest',
    group: ['input'],
    version: 1,
    description: 'Make a HTTP request',
    defaults: {
      name: 'HTTP Request',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Method',
        name: 'method',
        type: 'options',
        options: [
          { name: 'GET', value: 'GET' },
          { name: 'POST', value: 'POST' },
          { name: 'PUT', value: 'PUT' },
          { name: 'DELETE', value: 'DELETE' },
        ],
        default: 'GET',
      },
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        required: true,
      },
      {
        displayName: 'Headers',
        name: 'headers',
        type: 'json',
        default: '{}',
      },
      {
        displayName: 'Body',
        name: 'body',
        type: 'json',
        default: '{}',
      },
    ],
  };

  async execute(this: any): Promise<any[][]> {
    const items = this.getInputData();
    const returnData: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const method = this.getNodeParameter('method', i) as string;
      const url = this.getNodeParameter('url', i) as string;
      const headers = JSON.parse(this.getNodeParameter('headers', i) as string);
      const body = this.getNodeParameter('body', i, {}) as any;

      const options: any = {
        method,
        headers,
      };
      if (method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      // Simulated fetch
      // const response = await fetch(url, options);
      // const responseData = await response.json();
      const responseData = { status: 'mocked', url };

      returnData.push({
        json: responseData,
      });
    }

    return [returnData];
  }
}
