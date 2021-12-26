import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
import { setContent } from "../../utils/setContent";
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);

	const { error, loading, getCaracter, clearError, process, setProcess } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line
	}, [charId]);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		if (!charId) {
			return;
		}
		clearError();
		getCaracter(charId).then(onCharLoaded).then(()=>setProcess('confirmed'));
	};


	// const setContent=(process, char)=>{

	// 	switch(process){
	// 		case 'waiting':
	// 			return <Skeleton/>
	// 			break
	// 		case 'loading':
	// 			return <Spinner/>
	// 			break
	// 		case 'confirmed':
	// 			return <View char={char}/>
	// 			break
	// 		case 'error':
	// 			return <ErrorMessage/>
	// 			break
	// 		default : 
	// 			throw new Error('Unexepted state ')	
	// 	}
	// }

	// const skeleton = char || loading || error ? null : <Skeleton />;
	// const errorMessage = error ? <ErrorMessage /> : null;
	// const spinner = loading ? <Spinner /> : null;
	// const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className='char__info'>
			{/* {skeleton}
			{errorMessage}
			{spinner}
			{content} */}
		{setContent(process, View, char)}

		</div>
	);
};

const View = ({ data }) => {
	const { name, description, wiki, thumbnail, comics, id } = data;

	const img = thumbnail.search(/'image_not_available'/) ? (
		<img
			src={thumbnail}
			alt='Random character'
			style={{ objectFit: "contain" }}
			className='randomchar__img'
		/>
	) : (
		<img
			src={thumbnail}
			alt='Random character'
			className='randomchar__img'
		/>
	);

	return (
		<>
			<div className='char__basics'>
				{img}
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<Link
							to={`/characters/${id}`}
							className='button button__main'>
							<div className='inner'>homepage</div>
						</Link>

						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length > 0 ? null : "There is no comics with character"}
				{
					// eslint-disable-next-line
					comics.map((item, i) => {
						if (i <= 10) {
							return (
								<li className='char__comics-item' key={i}>
									<Link
										to={item.resourceURI.replace(
											"http://gateway.marvel.com/v1/public",
											""
										)}>
										{item.name}
									</Link>
								</li>
							);
						}
					})
				}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};

export default CharInfo;
