/**
 * Pigeon
 *
 * Sending mails over HTTP.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

var fs = require('fs');
var http = require('http');
var path = require('path');

var themes = ['paper'];
var themeCache = {};


/**
 * Pigeon
 *
 * Create an instance of Pigeon for sending mails.
 */
function Pigeon(config, secret) {
  // config contains mail services
  this.config = config || {};
  this.secret = secret || process.env.PIGEON_SECRET;
}


/**
 * Send mails with the given data.
 */
Pigeon.prototype.send = function(data, cb) {
  var me = this;

  if (!data.title) {
    cb('title is required');
  } else if (data.html) {
    me.sendHtml(data);
  } else if (data.text) {
    me.sendText(data);
  } else if (data.content) {
    render(data, function(err, html) {
      if (err) {
        cb(err);
      } else {
        data.html = html;
        me.sendHtml(data, cb);
      }
    });
  }
};
Pigeon.prototype.sendHtml = function(data, cb) {
  cb && cb();
};
Pigeon.prototype.sendText = function(data, cb) {
  cb && cb();
};
Pigeon.prototype.pickService = function(data) {
};


/**
 * Create a HTTP server.
 */
Pigeon.prototype.server = function() {
  var me = this;

  var server = http.createServer(function(req, resp) {
    var secret = req.headers['x-pigeon-secret'];
    var ct = req.headers['content-type'];

    // should return in 10s
    resp.setTimeout(10000);

    if (req.url === '/') {
      resp.writeHead(200);
      resp.end('humor');
    } else if (req.method !== 'POST' || req.url !== '/send') {
      resp.writeHead(404);
      resp.end('not found');
    } else if (secret === me.secret && ct === 'application/json') {
      var buf = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) { buf += chunk });
      req.on('end', function() {
        // data should contain: user, (title, content) or html
        // data may contain: footer, theme
        var data = JSON.parse(buf);
        me.send(data, function(err) {
          resp.writeHead(200);
          if (err) {
            resp.end(err);
          } else {
            resp.end('ok');
          }
        });
      });
    } else {
      resp.writeHead(404);
      resp.end('invalid');
    }
  });

  return server;
};


function getTheme(name, cb) {
  name = name || 'paper';
  if (!~themes.indexOf(name)) {
    name = 'paper';
  }
  var text = themeCache[name];
  if (text) {
    cb(null, text);
  } else {
    var filepath = path.join(__dirname, 'templates', name + '.html');
    fs.readFile(filepath, {encoding: 'utf8'}, function(err, text) {
      if (err) {
        cb(err);
      } else {
        themeCache[name] = text;
        cb(null, text);
      }
    });
  }
}

function render(data, cb) {
  getTheme(data.theme, function(err, text) {
    if (err) {
      cb(err);
    } else {
      text.replace(/\{\{title\}\}/g, data.title || '');
      text.replace(/\{\{content\}\}/g, data.content || '');
      text.replace(/\{\{footer\}\}/g, data.content || '');
      cb(null, text);
    }
  });
}

module.exports = Pigeon;
