import "./comicsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";


const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case "waiting":
			return <Spinner />;
			break;
		case "loading":
			return newItemLoading ? <Component /> : <Spinner />;
			break;
		case "confirmed":
			return <Component/>;
			break;
		case "error":
			return <ErrorMessage />;
			break;
		default:
			throw new Error("Unexepted state ");
	}
};

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setnewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics, process, setProcess } = useMarvelService();

	const onRequest = (offset, initial) => {
		initial ? setnewItemLoading(false) : setnewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded).then(()=>setProcess('confirmed'));
	};

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line
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

	// const items = renderItems(comicsList);
	// const errorMessage = error ? <ErrorMessage /> : null;
	// const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='comics__list'>
			{/* {spinner}
			{errorMessage}
			{items} */}

			{setContent(process, ()=>renderItems(comicsList), newItemLoading)}

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
