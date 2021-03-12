import type { App } from '@slack/bolt'

export default function do_dates(ppl: Array<string>,app:App):void {
    

    while(ppl.length>0){

        let grouping;
        //just gonna assume its already mixed up 
        if (ppl.length%2==0) {
            grouping = ppl.splice(0,2);
        } 

        else {
            grouping = ppl.splice(0,3); 
        }

        const pairing = app.client.conversations.open({
            token: process.env.SLACK_BOT_TOKEN,
            users: grouping
        })

        app.event("im_open", async()=>{
            try {
                const result = await app.client.chat.postMessage({
                    channel: pairing["channel"]["id"],
                    text: "it worked"
                })
                console.log(result);
            }
            catch(error) {
                console.error(error);
            }
        })
        
    }
}

