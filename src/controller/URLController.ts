import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

export class URLController {

	public async shorten(req: Request, response: Response): Promise<void> {

		// Verificar se url existe
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}
		// Criar o hash para a url
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		// Salvar a url no banco
		// Retornar a url salva
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		response.json(newURL)
	}

	public async redirect(req: Request, response: Response): Promise<void> {

		// Pegar hash da url
		const { hash } = req.params
		// Encontrar a url original pelo hash
		const url = await URLModel.findOne({ hash })

		// Redirect se url existe
		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}
