import { Component } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import "./charList.scss";

<<<<<<< Updated upstream
class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 1120,
		charEnded: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCaracters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true,
		});
=======
const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(1100);
	const [charEnded, setCharEnded] = useState(false);

	const { error, loading, getAllCaracters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);

		setNewItemLoading(true);
		getAllCaracters(offset).then(onCharListLoaded);
>>>>>>> Stashed changes
	};

	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

<<<<<<< Updated upstream
		this.setState(({ offset, charList }) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}));
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	itemRefs = [];

	setRef = (ref) => {
		this.itemRefs.push(ref);
	};

	focusOnItem = (id) => {
		// Я реализовал вариант чуть сложнее, и с классом и с фокусом
		// Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
		// На самом деле, решение с css-классом можно сделать, вынеся персонажа
		// в отдельный компонент. Но кода будет больше, появится новое состояние
		// и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов
=======
		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};

	const itemRefs = useRef([]);
>>>>>>> Stashed changes

		// По возможности, не злоупотребляйте рефами, только в крайних случаях
		this.itemRefs.forEach((item) =>
			item.classList.remove("char__item_selected")
		);
		this.itemRefs[id].classList.add("char__item_selected");
		this.itemRefs[id].focus();
	};

	renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: "cover" };
			if (
				item.thumbnail ===
				"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
			) {
				imgStyle = { objectFit: "unset" };
			}

			return (
				<li
					className='char__item'
					tabIndex={0}
					ref={this.setRef}
					key={item.id}
					onClick={() => {
						this.props.onCharSelected(item.id);
						this.focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === " " || e.key === "Enter") {
							this.props.onCharSelected(item.id);
							this.focusOnItem(i);
						}
					}}>
					<img
						src={item.thumbnail}
						alt={item.name}
						style={imgStyle}
					/>
					<div className='char__name'>{item.name}</div>
				</li>
			);
		});
		return <ul className='char__grid'>{items}</ul>;
	}

<<<<<<< Updated upstream
	render() {
		const { charList, loading, error, newItemLoading, offset, charEnded } =
			this.state;
		const items = this.renderItems(charList);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className='char__list'>
				{errorMessage}
				{spinner}
				{content}
				<button
					className='button button__main button__long'
					disabled={newItemLoading}
					style={{ display: charEnded ? "none" : null }}
					onClick={() => this.onRequest(offset)}>
					<div className='inner'>load more</div>
				</button>
			</div>
		);
	}
}
=======
	const items = renderItems(charList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{items}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				style={{ display: charEnded ? "none" : null }}
				onClick={() => onRequest(offset)}>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};
>>>>>>> Stashed changes

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
