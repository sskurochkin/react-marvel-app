import "./singleComicPage.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { setContent } from "../../utils/setContent";
import useMarvelService from "../../services/MarvelService";
import AppBanner from '../appBanner/AppBanner'

const SinglePage = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const { getComics, getCaracter, clearError, process, setProcess } =
		useMarvelService();

	useEffect(() => {
		updateData();
		// eslint-disable-next-line
	}, [id]);

	const updateData = () => {
		clearError();
		// eslint-disable-next-line
		switch (dataType) {
			case "comic":
				getComics(id).then(onDataLoaded).then(()=>setProcess('confirmed'));
				break;
			case "character":
				getCaracter(id).then(onDataLoaded).then(()=>setProcess('confirmed'));
		}
	};

	const onDataLoaded = (data) => {
		setData(data);
	};

	// const errorMessage = error ? <ErrorMessage /> : null;
	// const spinner = loading ? <Spinner /> : null;
	// const content = !(loading || error || !data) ? (
	// 	<Component data={data} />
	// ) : null;

	return (
		<>
		<AppBanner/>
			{/* {errorMessage}
			{spinner}
			{content} */}
			{setContent(process, Component, data)}
		</>
	);
};

export default SinglePage;
