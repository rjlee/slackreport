
const { App, LogLevel } = require('@slack/bolt');

// Slack app credentials
// export SLACKREPORT_SIGNING_SECRET=...
// export SLACKREPORT_BOT_TOKEN=xoxb-...

const app = new App({
  token: process.env.SLACKREPORT_BOT_TOKEN,
  signingSecret: process.env.SLACKREPORT_SIGNING_SECRET
});

app.action({ callback_id: 'slackreport_report_message' }, ({ ack, action, body, payload, say, context }) => {
  ack();
  try {
    const report_message = app.client.chat.postMessage({
      token: context.botToken,
      channel: nconf.get('SLACKREPORT_REPORT_CHANNEL'),
      text: eval('`'+nconf.get('SLACKREPORT_REPORT_MESSAGE_TEXT')+'`')
    });
    const direct_message = app.client.chat.postMessage({
      token: context.botToken,
      channel: body.user.id,
      text: eval('`'+nconf.get('SLACKREPORT_ACKNOWLEDGE_MESSAGE_TEXT')+'`')
    });
  }
  catch (error) {
  	console.error(error);
  }

});

(async () => {

  nconf = require('nconf');
  nconf.argv()
   .env()
   .file({ file: 'config.json' });

  // The *private* channel the reported messages should be sent to
  // export SLACKREPORT_REPORT_CHANNEL=reports
  report_channel=nconf.get('SLACKREPORT_REPORT_CHANNEL');

  await app.start(process.env.PORT || 3000);
  console.log('⚡️ SlackReport app is running!');
})();
