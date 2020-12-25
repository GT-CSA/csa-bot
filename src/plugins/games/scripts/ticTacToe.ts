import type { App, Button, SectionBlock, ActionsBlock, BlockAction, RespondFn, ButtonAction  } from '@slack/bolt'
import type { PrefixFunction } from '../../../util/plugin'

export function ticTacToe(data: string[][], toMove: string, user: string = ''): (ActionsBlock | SectionBlock)[] {
    let blocks:(ActionsBlock | SectionBlock)[] = []
    for (let i = 0; i < data.length; i++) {
        let els: Button[] = []
        for (let j = 0; j < data[0].length; j++) {
            els.push({
                type: "button",
                text: {
                    type: "plain_text",
                    text: data[i][j]
                },
                value: JSON.stringify({
                    data,
                    toMove
                }),
                action_id: j.toString()
            })
        }
        blocks.push({
            "type": "actions",
            "block_id": i.toString(),
            "elements": els
        })
    }
    if (data.every(row => row.every(x => x == ' '))) {
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Welcome to Tic Tac Toe, @${user}. It is currently *X*'s turn to move!`
            }
        })
    } else {
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `@${user} has just moved. It is currently *${toMove}*'s turn to move!`
            }
        })
    }
    console.log(blocks)
    return blocks
}

interface actionParams {
    body: BlockAction<ButtonAction>,
    ack: Function,
    respond: RespondFn
}

export function setClickListeners(app: App, pre:PrefixFunction) {
    for (let col = 0; col < 3; col++) {
        app.action(col.toString(), async ({body, ack, respond}: actionParams) => {
            await ack();
            const action:ButtonAction = body.actions[0]
            const info = JSON.parse(action.value)
            const data:string[][] = info.data
            const i = parseInt(action.block_id)
            const j = parseInt(action.action_id)
            
            if (data[i][j] == ' ') {
                let toMove:string = info.toMove
                data[i][j] = toMove
                if (checkWin(toMove, i, j, data)) {
                    await respond({
                        blocks: victory(data, toMove, body.user.name, pre),
                        replace_original: true
                    })
                } else {
                    toMove = toMove == 'X' ? 'O' : 'X'
                    await respond({
                        blocks: ticTacToe(data, toMove, body.user.name),
                        replace_original: true
                    })
                }
            }
        })
    }
}

const checkWin = (letter:string, i:number, j:number, arr:string[][]):boolean => {
    //horizontal
    if (arr[i][(j + 1) % 3] == letter && arr[i][(j + 2) % 3] == letter) {
        return true;
    }
    //vertical
    if (arr[(i + 1) % 3][j] == letter && arr[(i + 2) % 3][j] == letter) {
        return true;
    }
    //diagonal
    if (arr[2][2] != ' '){
        if (arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2]) {
            return true
        }
        if (arr[2][2] == arr[2][0] && arr[2][2] == arr[2][0]) {
            return true
        }
    }
    return false
}

const victory = (data:string[][], winner: string, user: string, pre: PrefixFunction):SectionBlock[] => {
    const blocks: SectionBlock[] = []
    blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `${data[0][0]} ${data[0][1]} ${data[0][2]}.\n${data[1][0]} ${data[1][1]} ${data[1][2]}.\n${data[2][0]} ${data[2][1]} ${data[2][2]}.`
        }
    })
    blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `*${winner}* has won. Congratulations *@${user}*!`
        },
        accessory: {
            type: "button",
            text: {
                type: "plain_text",
                text: "Close Game",
                emoji: true
            },
            action_id: pre("close")
        }
    })
    return blocks;
}