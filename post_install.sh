#!/bin/bash
gem install bundler -N
bundle install --path vendor/bundle --without development test --deployment --quiet

# build if there's a Gruntfile for
# this environment. Currently used
# to compress on staging deployment
GRUNTFILE="Gruntfile.$ENVIRONMENT.js"
if [ -e "$GRUNTFILE" ]
then
  ./node_modules/grunt-cli/bin/grunt --gruntfile $GRUNTFILE build
fi

exit $?
