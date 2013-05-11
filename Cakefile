fs = require 'fs'
{print} = require 'sys'
{log, error} = console; print = log
{spawn, exec} = require 'child_process'

run = (name, args...) ->
  proc = spawn(name, args)
  proc.stdout.on('data', (buffer) -> print buffer if buffer = buffer.toString().trim())
  proc.stderr.on('data', (buffer) -> error buffer if buffer = buffer.toString().trim())
  proc.on('exit', (status) -> process.exit(1) if status isnt 0)

task 'system', 'Install system dependancies ', () ->

  # Install system dependencies (Run in sudo)
  run 'npm', 'install', '-g', 'express'

task 'dev', 'Watch src/ for changes, compile, then output to lib/ ', () ->

  # server side coffeescript files
  run 'coffee', '-o', 'lib/', '-wc', 'src/'

  # run server.js using
  run 'node', ['server.js']


