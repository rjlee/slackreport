## SlackReport

A slack bot that adds the option to report a message to a private channel for review.

## Setup

The setup of the Slack application, permissions and general approach is outlined at [Getting started with Bolt](https://slack.dev/bolt/tutorial/getting-started).  

The application does require a 'Request URL' to listen to events (e.g. when a message is reported).  This is an external endpoint that Slack can send event notifications to, during local deveopment this can be achieved using 'ngrok' - see [tunneling with ngrok](https://api.slack.com/tutorials/tunneling-with-ngrok).

### Application Setup

[Create a slack app](https://api.slack.com/apps/new)

![Image of App Setup](https://github.com/rjlee/slackreport/blob/master/docs/setup_app.png)

### Action Setup

Visit 'Interactive Components' and add an action:

![Image of Action Setup](https://github.com/rjlee/slackreport/blob/master/docs/setup_action.png)

## Configuration

The app can be configured by either environment variables and/or a configuration file

```bash
export SLACKREPORT_SIGNING_SECRET=...
export SLACKREPORT_BOT_TOKEN=xoxb-...
export SLACKREPORT_REPORT_CHANNEL=reports
```

```json
{
"SLACKREPORT_REPORT_MESSAGE_TEXT": "<@${body.user.id}> reported message '${payload.message.text}' from <@${payload.message.user}> in channel <#${payload.channel.id}>",
"SLACKREPORT_ACKNOWLEDGE_MESSAGE_TEXT": "The message was successfully reported, we will review the message and contact you if any further information is required."
}
```

## Running

```bash
npm install
node app.js
```

## Debugging

To aid debugging, the logLevel can be increased:

```javascript
const app = new App({
  token: process.env.SLACKREPORT_BOT_TOKEN,
  signingSecret: process.env.SLACKREPORT_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});
```

