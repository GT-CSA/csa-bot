/**
 * A place to put secrets, envvars, and other project configuration.
 */
require('dotenv').config()

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

export {SLACK_SIGNING_SECRET as signingSecret}
export {SLACK_BOT_TOKEN as botToken}