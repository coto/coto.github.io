source "https://rubygems.org"

gem "jekyll", "~> 4.3.4"

# Standard Ruby 3+ dependencies
gem "logger"
gem "csv"
gem "ostruct"
gem "base64"
gem "webrick"
gem "rexml", ">= 3.4.2"

# Network dependencies
gem "faraday-retry"

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-multiple-languages-plugin"
  gem "jekyll-timeago"
end

# Windows and JRuby platform dependencies
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:windows]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
