class MarvelService {
	_apiBase = "https://gateway.marvel.com:443/v1/public/";
	_apiKey = "apikey=9a013dc68021ae6c64d9b8ce45b2bcc9";
	_baseOffset = 210

	getResourse = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Error ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCaracters = async (offset = this._baseOffset) => {
		const res = await this.getResourse(
			`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`
		);
		return res.data.results.map(this._transformCaracter)
	};

	getCaracter = async (id) => {
		const res = await this.getResourse(
			`${this._apiBase}/characters/${id}?${this._apiKey}`
		);
		return this._transformCaracter(res.data.results[0])
	};

	_transformCaracter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		};
	};
}

export default MarvelService;
