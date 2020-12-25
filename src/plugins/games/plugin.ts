import type { App } from '@slack/bolt'
import type { PrefixFunction } from '../../util/plugin'
import { ticTacToe, setClickListeners } from './scripts/ticTacToe'

export default async function games(app:App, pre:PrefixFunction){
    app.command(`/${pre('tic-tac-toe')}`, async ({ command, ack, respond}) => {
        await ack()
        await respond({
            //TODO: Figure out how to make the initial name highlighted
            blocks: ticTacToe([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']], 'X', command.user_name),
            response_type: 'in_channel'
        })
    })

    setClickListeners(app, pre)

    app.action(pre('close'), async ({ack, respond}) => {
        await ack()
        await respond({
            delete_original: true
        })
    })
    
    // Listens to incoming messages that contain "goodbye"
    app.command('/goodbye', async ({ command, ack, say }) => {
        // say() sends a message to the channel where the event was triggered
        await ack();
        console.log(command)
        await say(`See ya later :wave:`);
    });
}