import { useHttp } from "../hooks/http.hook";

const useMarvelService = ()=> {

	const {loading, request, error, clearError} = useHttp();
	
	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=9a013dc68021ae6c64d9b8ce45b2bcc9";
	const _baseOffset = 210

	

	const getAllCaracters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCaracter)
	};

	const getCaracter = async (id) => {
		const res = await request(
			`${_apiBase}/characters/${id}?${_apiKey}`
		);
		return _transformCaracter(res.data.results[0])
	};

	const _transformCaracter = (char) => {
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

	return {loading, error, getAllCaracters, getCaracter, clearError}
}

export default useMarvelService;
