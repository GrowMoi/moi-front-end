#!/bin/bash
./node_modules/bower/bin/bower install
./node_modules/grunt-cli/bin/grunt --gruntfile Gruntfile.$ENVIRONMENT.js build
