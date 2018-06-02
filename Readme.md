# Slack Changesets
Post changesets within certain bounding box to a slack webhook of your choice.

## Usage

### Got a redis instance

If you have an instance of redis already running all you need to do is run the `index.js` with the `--slackWebhook` & `--bbox` switches. Following is an example for Lesotho:

```
 node index.js --slackWebhook=https://hooks.slack.com/services/... --bbox=[26.74072265625,-30.751277776257812,29.487304687499996,-28.53144]
```

*Note: do not add spaces in the bbox switch.*

#### Docker

After cloning the repository, first copy the sample env file and update the slack web hook url and the bounding box for the country you wish to monitor.

```
cp sample.env > .env
```

Start docker and slack webhooks should start ringing in.

```
docker-compose run -d app
```

## To Do
- [x] Add cmd line args to supply webhook
- [ ] Use geojson polygon to rather than bounding box for filtering (see [turfjs/intersect](http://turfjs.org/docs/#intersect))

#### Inspired by
- [developmentseed/planet-stream](https://github.com/developmentseed/planet-stream)
- [AmericanRedCross/osm-stats](https://github.com/AmericanRedCross/osm-stats)