/**
 * Pigeon
 *
 * Sending mails over HTTP.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

var http = require('http');


function Pigeon(config) {
  this.config = config || {};
}


/**
 * Send mails via the given data.
 */
Pigeon.prototype.send = function(data, cb) {
  cb && cb();
};


/**
 * Create a HTTP server.
 */
Pigeon.prototype.server = function() {
  var me = this;
  var token = me.config.secret || process.env.PIGEON_SECRET;

  var server = http.createServer(function(req, res) {
    var secret = req.headers['x-pigeon-secret'];
    var ct = req.headers['content-type'];

    if (req.url === '/') {
      res.writeHead(200);
      res.end('humor');
    } else if (req.method !== 'POST' || req.url !== '/send') {
      res.writeHead(404);
      res.end('not found');
    } else if (secret === token && ct === 'application/json') {
      var buf = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) { buf += chunk });
      req.on('end', function() {
        // data should contain: user, title, content
        // data may contain: footer, theme
        var data = JSON.parse(buf);
        me.send(data, function(err) {
          res.writeHead(200);
          if (err) {
            res.end(err);
          } else {
            res.end('ok');
          }
        });
      });
    } else {
      res.writeHead(404);
      res.end('invalid');
    }
  });

  return server;
};

module.exports = Pigeon;
