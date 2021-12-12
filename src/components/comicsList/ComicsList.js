import "./comicsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setnewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();

	const onRequest = (offset, initial) => {
		initial ? setnewItemLoading(false) : setnewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setOffset(offset + 8);
		setComicsList([...comicsList, ...newComicsList]);
		setComicsEnded(ended);
		setnewItemLoading(false);
	};
	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li className='comics__item' key={i}>
					<Link to={`/comics/${item.id}`}>
						<img
							src={item.thumbnail}
							alt={item.title}
							className='comics__item-img'
						/>
						<div className='comics__item-name'>{item.title}</div>
						<div className='comics__item-price'>{item.price}</div>
					</Link>
				</li>
			);
		});
		return <ul className='comics__grid'>{items}</ul>;
	}

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='comics__list'>
			{spinner}
			{errorMessage}
			{items}
			<button
				className='button button__main button__long'
				onClick={() => onRequest(offset)}
				disabled={newItemLoading}
				style={{ display: comicsEnded ? "none" : "block" }}>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
