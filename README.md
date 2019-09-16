## SlackReport

A slack bot that adds the option to report a message to a private channel for review.

## Debugging

To aid debugging, the logLevel can be increased:

`const app = new App({
  token: process.env.SLACKREPORT_BOT_TOKEN,
  signingSecret: process.env.SLACKREPORT_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});`

