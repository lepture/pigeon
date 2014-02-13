module.exports = {
  qq: {
    service: "QQ",
    auth: {
      user: "name@qq.com",
      pass: "password"
    }
  },
  gmail: {
    service: "Gmail",
    sender: "Mr. Hook <someone@gmail.com>",
    auth: {
      user: "someone@gmail.com",
      pass: "password"
    }
  },
  ses: {
    transport: "SES",
    AWSAccessKeyID: "AWSACCESSKEY",
    AWSSecretKey: "AWS/Secret/key"
  },
  own: {
    host: "smtp.mydomain.com",
    secureConnection: false,
    port: 555,
    auth: {
      user: "me@mydomain.com",
      pass: "password"
    }
  }
};
