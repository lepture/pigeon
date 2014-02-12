# Pigeon

Sending mails over HTTP.

## API

Creating the server:

```js
var Pigeon = require('pigeon');
var server = new Pigeon(config, secret).server();
server.listen(8000);
```

## Configuration

The `Pigeon` class accepts two parameters, config and secret.

### config

`config` is an object contains several email services:

```
{
    gmail: {
        type: "SMTP",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "gmail.user@gmail.com",
            pass: "userpass"
        }
    }
}
```

Find more on [Nodemailer](https://github.com/andris9/Nodemailer#setting-up-smtp)

**Special Key Name**:

1. **qq**, there is a limitation for server sending emails to qq mail, better send them with a qq mail server

## License

MIT
