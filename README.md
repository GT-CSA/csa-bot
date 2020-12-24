# CSA Slack Bot
> Used Slack app example from 📚 [Getting started with Bolt for JavaScript tutorial][1] as a baseline

> Used plugin router created by Max Kaparawich from the [Hack4Impact Slack Bot][2]

> Created with Bolt, deployed with [Serverless and AWS Lambda][3]

## Overview

This is a Slack app built with the Bolt for JavaScript framework that is planned to have a [donut date pairing feature][4] 
and a member participation and tracking feature [using Airtable][5] for the rest of CSA board to use

## Contributing

Look at the issues tab and assign yourself one. We will use Zenhub for project management, so you can go to the Zenhub tab too if you have that installed.

To complete issues, make a branch off of main using this format for branch name:
```
[your-first-name]/[issue-#]/[slug]
```
do whatever it is the issue tells you to do, and create a PR.

Code will be checked for syntactical issues, but CD is set up, meaning new code is automatically deployed to AWS Lambda and changes will be reflected in the live slack bot.

### Local Testing

To test code locally, rather than deploy to AWS every single time, we need to set up a local tunnel that will act as the Slack server to take our requests to its API.

To do so, download ngrok from https://ngrok.com/ and put the ngrok.exe file into your usr/local/bin directory. 
If you are on Mac, you can try installing ngrok using this command as well:
'''
$ brew cask install ngrok
'''
Inside the repo, use the command
'''
npm run ngrok
'''
to set up the tunnel to your local device, and copy paste the link that comes out into the bot here: https://api.slack.com/apps/A01GWKD8KTR/interactive-messages?
and here: https://api.slack.com/apps/A01GWKD8KTR/event-subscriptions?. The second link will verify if you've done this correctly or not. **Be sure to append /slack/events to your ngrok link, otherwise, it will not work!!!!!**

After you've set this up, open up another terminal and run the command 
'''
npm run local
'''
which should use serverless to package and deploy the bot to the local link. Then, feel free to do whatever testing you want here.

Remember to restore the links to the proper AWS Lambda link here: https://3mkv2kq2q5.execute-api.us-east-1.amazonaws.com/dev/slack/events once you are finished testing.

[1]: https://github.com/slackapi/bolt-js-getting-started-app
[2]: https://github.com/hack4impact/slack-bot
[3]: https://slack.dev/bolt-js/deployments/aws-lambda
[4]: https://www.donut.com/
[5]: https://dev.to/hacubu/how-to-use-airtable-as-a-production-database-analyzing-airtable-performance-41e9
