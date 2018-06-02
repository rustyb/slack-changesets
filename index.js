#!/usr/bin/env node

// start planet-stream
var argv = require('minimist')(process.argv.slice(2));

var planetstream = require('planet-stream')({
  limit: argv.limit,
  host: process.env.REDIS_PORT_6379_TCP_ADDR || process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT_6379_TCP_PORT || process.env.REDIS_PORT || 6379
});

var webhookUri = argv.slackWebhook || process.env.slackWebhook;
var bbox;

if (argv.bbox) {
  bbox = JSON.parse(argv.bbox); //|| [26.74072265625, -30.751277776257812, 29.487304687499996, -28.53144]
}

if (process.env.bbox) {
  bbox = JSON.parse(process.env.bbox);
}

if (!webhookUri && !bbox) {
  console.log('You must specifiy both a slack webhook and bbox')
  process.exit(1)
}

function postSlack(obj){
  console.log("Posting to SLACK")
  var Slack = require('slack-node');
  slack = new Slack();
  slack.setWebhook(webhookUri);
  
  // sort out the message
  var link = "http://www.openstreetmap.org/changeset/" + obj.id

  slack.webhook({
    username: "webhookbot",
    text: "[NEW CHANGESET] There were " + obj.count + " changes made by *" + obj.user + "* in the changeset.\n\n View it at: " + link
  }, function(err, response) {
    console.log(err);
  });
}

// Filter out records that have no metadata
planetstream.map(JSON.parse)
.filter(function (data) {
  return data.hasOwnProperty('metadata');
})
.onValue(function (obj) {
  var x = {
    'id': obj.metadata.id,
    'user': obj.metadata.user,
    'min_lon': obj.metadata.min_lon,
    'max_lon': obj.metadata.max_lon,
    'min_lat': obj.metadata.min_lat,
    'max_lat': obj.metadata.max_lat,
    'count': obj.elements.length
  }


  if (x.min_lat >= bbox[1] && x.max_lat <= bbox[3] && x.min_lon >= bbox[0] && x.max_lon <= bbox[2]){
    console.log('PROBABLY IN BBOX')
    postSlack(x)
    console.log('[metadata]:' + JSON.stringify(x))
  } else {
    console.log("NOT IN LAT LONG")
  }
  
});
