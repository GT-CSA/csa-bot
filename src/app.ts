import { App, ExpressReceiver } from '@slack/bolt';
import awsServerlessExpress from 'aws-serverless-express';
import loadPlugins from './util/plugin';
import {signingSecret, botToken} from './util/config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// Initialize your custom receiver
const expressReceiver = new ExpressReceiver({
  signingSecret: signingSecret!,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
  token: botToken,
  receiver: expressReceiver
});

// Initialize your AWSServerlessExpress server using Bolt's ExpressReceiver
const server = awsServerlessExpress.createServer(expressReceiver.app);

//load plugins
loadPlugins(app)

// Handle the Lambda function event
export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  
  console.log('⚡️ Bolt app is running!');
  awsServerlessExpress.proxy(server, event, context);
};