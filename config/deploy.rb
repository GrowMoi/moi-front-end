# config valid only for current version of Capistrano
lock "3.8.1"

set :keep_releases, 3
set :application, "moi-front-end"
set :repo_url, "git@github.com:GrowMoi/moi-front-end.git"

set :npm_flags, '--silent --no-progress'

set :branch, ENV['BRANCH'] || 'master'

set :bundle_path, -> { shared_path.join('vendor/bundle') }

set :npm_env_variables, {
  PATH: "#{fetch(:rbenv_path)}/shims:$PATH"
}

set :slackistrano, {
  channel: '#moi',
  webhook: 'https://hooks.slack.com/services/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'
}

set :deploy_to, '/home/growmoi/moi-front-end'
set :nvm_node, 'v0.12.14'

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"
append :linked_files, '.env'

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads', 'node_modules', 'app/bower_components'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

namespace :deploy do
  desc 'build'
  task :build do
    invoke 'moi:build'
  end

  after :publishing, :build
end
