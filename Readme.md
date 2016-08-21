# Slack Changesets
Post changesets within certain bounding box to a slack webhook of your choice.

## Usage
#### Docker

After cloning the repository:

```
docker-compose run -d app
```

## To Do
- [ ] Add cmd line args to supply webhook
- [ ] Use geojson polygon to rather than bounding box for filtering (see [turfjs/intersect](http://turfjs.org/docs/#intersect))

#### Inspired by
- [developmentseed/planet-stream](https://github.com/developmentseed/planet-stream)
- [AmericanRedCross/osm-stats](https://github.com/AmericanRedCross/osm-stats)