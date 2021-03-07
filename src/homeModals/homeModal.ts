
POST https://slack.com/api/views.open
Content-type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
{
  "view": {
    "type": "modal",
    "title": {
      "type": "plain_text",
      "text": "Modal title"
    },
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Section name :)"
      },
      "block_id": "section1",
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Dumpling Dates"
        },
        "action_id": "button_abc",
        "value": "Button value",
        "style": "danger"
      },
      "block_id": "section2",
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Manage Users"
        },
        "action_id": "button_abc",
        "value": "Button value",
        "style": "danger"
      }
    },

  ],
  "close": {
    "type": "plain_text",
    "text": "Cancel"
  },
  "submit": {
    "type": "plain_text",
    "text": "Save"
  },
  "private_metadata": "Shhhhhhhh",
  "callback_id": "view_identifier_12"
}
