import "./singleComicPage.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import AppBanner from '../appBanner/AppBanner'
import ErrorMessage from "../errorMessage/errorMessage";

const SinglePage = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const { error, loading, getComics, getCaracter, clearError } =
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
				getComics(id).then(onDataLoaded);
				break;
			case "character":
				getCaracter(id).then(onDataLoaded);
		}
	};

	const onDataLoaded = (data) => {
		setData(data);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !data) ? (
		<Component data={data} />
	) : null;

	return (
		<>
		<AppBanner/>
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

export default SinglePage;
