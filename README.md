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

1. **qq**, we will send emails to qq users with this address
2. **gmail**, we will send emails to gmail users with this address

## Usage

Start an HTTP server with the command line:

    $ pigeon -c config.js -p 8000 -s mysecret

Now send your emails with a `POST` request to the `/send` url path:

    POST http://127.0.0.1:8000/send
    Content-Type: application/json
    X-Pigeon-Secret: mysecret

    {
        "user": "someone@address.com",
        "title": "This is a testing email",
        "text": "Hello there"
    }

### Request Headers

1. X-Pigeon-Secret: a secret token that is the same with your pigeon server
2. Content-Type: content type must be in `application/json`

### Request Body

The `POST` request payload should in JSON format. Required fields:

1. user: the receiver's email address
2. title: subject title of the email

Email content is also required, but it can be:

1. text: a plain text email
2. html: a html text email
3. content: pigeon will render a html data from the given content

Optional fields:

1. cc:
2. bcc:
3. headers:


## License

MIT
