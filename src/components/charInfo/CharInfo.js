import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false,
		});
	};

	onCharLoading = () => {
		this.setState({
			loading: true,
		});
	};
	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}

		this.onCharLoading();
		this.marvelService
			.getCaracter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	render() {
		const { char, loading, error } = this.state;

		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? (
			<View char={char} />
		) : null;

		return (
			<div className='char__info'>
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, description, homepage, wiki, thumbnail, comics } = char;

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
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
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
									{item.name}
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
