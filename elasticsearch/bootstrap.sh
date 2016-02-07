#!/bin/bash

elasticsearch="$(docker-machine ip):9200"

curl -XPUT $elasticsearch/_template/pois -d @elasticsearch/templates/pois.json
