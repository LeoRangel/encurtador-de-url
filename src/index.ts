import express from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'

// Config api
const api = express()
api.use(express.json())

// Conectabdo com BD
const database = new MongoConnection()
database.connect()

// Config rotas
const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

// Config server
api.listen(5000, () => console.log('Express listening'))
