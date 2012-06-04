# -*- encoding: utf-8 -*-
require File.expand_path('../lib/tentjs-rails/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Jonathan Clem"]
  gem.email         = ["j@jclem.net"]
  gem.description   = %q{Tent.js is a lighweight application structure built on top of Backbone.}
  gem.summary       = %q{Tent.js: A lightweight application structure built on top of Backbone.}

  gem.files         = Dir["vendor/**/*"] + ["LICENSE", "README.md"]
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "tentjs-rails"
  gem.require_paths = ["lib"]
  gem.version       = Tentjs::Rails::VERSION
  gem.add_dependency 'railties', '~> 3.1'
  gem.add_dependency 'jasmine'
end
