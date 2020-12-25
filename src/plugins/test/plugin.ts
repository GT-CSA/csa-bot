import type { App } from '@slack/bolt'
import type { PrefixFunction } from '../../util/plugin'

export default async function test(app:App, pre:PrefixFunction){
    // Listens to incoming messages that contain "hello"
    app.message('hello', async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say({
        blocks: [
            {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `Hey there <@${message.user}>!`
            },
            "accessory": {
                "type": "button",
                "text": {
                "type": "plain_text",
                "text": "Click Me"
                },
                "action_id": pre("button_click")
            }
            }
        ],
        text: `Hey there <@${message.user}>!`
        });
    });
    
    // Listens to incoming messages that contain "goodbye"
    app.message('goodbye', async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say(`See ya later, <@${message.user}> :wave:`);
    });
    
    app.action(pre('button_click'), async ({ body, ack, say }) => {
        // Acknowledge the action
        await ack();
        await say(`<@${body.user.id}> clicked the button`);
    });

    app.command('/echo', async ({ command, ack, say }) => {
        await ack()
        await say(`${command.text}`);
      });
}