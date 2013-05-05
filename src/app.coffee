express = require('express')
app = express()
server = require('http').createServer(app)
passport = require 'passport'
config = require './config/config'
# io = require('socket.io').listen(server)
fs = require 'fs'

# Connect to the DB
# mongoose = require 'mongoose'
# mongoose.connect(config.dbURI)

# Models
models = __dirname + '/models'
fs.readdirSync(models).forEach (file) ->
  require(models + '/'  +file)

# Passport Config
require('./config/passport')(passport, config)

# Express Config
require('./config/express')(app, passport)

# Routes
require('./config/routes')(app, passport)

# Socket Events
# io.sockets.on 'connection', (socket) ->
#   socket.emit 'hello', {data : 'Hi!'}


client = require 'phonegap-build-api'
async = require 'async'
config = require '../phonegapbuildconfig'

client.auth { username: config.username, password: config.password }, (e, api) ->
	api.get '/apps', (err, apps) ->
		apps = apps.apps
		refresh = () ->
			tasks = []
			for i in [0...apps.length]
				app = apps[i]
				do (app) ->
					tasks.push (cb) ->

						console.log "Refreshing #{app.title}"

						api.put "/apps/#{app.id}}", {'pull' : true}, (e , data) ->
							
							console.log 'Pull Error : ', e if e
							
							api.post "/apps/#{app.id}/build/ios", (e, data) ->
								console.log ' Build Error : ', e if e
							
								cb()

			async.series tasks, () ->
				console.log "Done refreshing apps on ", new Date()

		setInterval () ->
			refresh()
		, 60000

		refresh()

port = process.env.PORT or 3000
server.listen port, () -> 
  console.log "Server running on port " + port

