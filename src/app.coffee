express = require('express')
app = express()
server = require('http').createServer(app)

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

						api.put "/apps/#{app.id}}",options = {form: {data: {pull: true}}}, (e , data) ->
							
							console.log 'Pull Error : ', e if e
	
							api.post "/apps/#{app.id}/build/", {form: {data: {platforms: ['ios']}}}, (e, data) ->
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

