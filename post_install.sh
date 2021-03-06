#!/bin/bash
gem install bundler -N -v '1.17.3'
bundle install --path vendor/bundle --without development test --deployment --quiet
./node_modules/bower/bin/bower install

# build if there's a Gruntfile for
# this environment. Currently used
# to compress on staging deployment
GRUNTFILE="Gruntfile.$ENVIRONMENT.js"
if [ -e "$GRUNTFILE" ]
then
  ./node_modules/grunt-cli/bin/grunt --gruntfile $GRUNTFILE build
fi

exit $?
