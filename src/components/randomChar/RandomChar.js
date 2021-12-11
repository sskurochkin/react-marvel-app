<<<<<<< Updated upstream
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    componentDidUpdate(){
        // this.updateChar();
    }

    onCharLoaded = (char) =>{
        this.setState({
            char, 
            loading: false})
    }

    onCharLoading = () =>{
        this.setState({
            loading: true})
    }

    onError = () =>{
        this.setState({
            error: true,
            loading: false})
    }

    // onLoadNewChar = () =>{

    // }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
        .getCaracter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
        
    }

   

// marvelService.getAllCaracters().then(res => res.data.results.forEach(item => item.name));
// marvelService.getCaracter(1011053).then(res =>  console.log(res));



    render(){
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null


        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}

const View = ({char}) =>{

    const {name, description, thumbnail, homepage, wiki} = char;
        const img = thumbnail.search(/'image_not_available'/) 
            ?
            <img src={thumbnail} alt="Random character" style={{objectFit: 'contain'}} className="randomchar__img"/>
            :
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            
        
    

    return (
        <div className="randomchar__block">
        {/* <img src={thumbnail} alt="Random character" className="randomchar__img"/> */}
        {img}
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div> 
    )
}

export default RandomChar;
=======
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
	const [char, setChar] = useState(null);

	const { loading, error, getCaracter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 60000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCaracter(id).then(onCharLoaded);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className='randomchar'>
			{errorMessage}
			{spinner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button onClick={updateChar} className='button button__main'>
					<div className='inner'>try it</div>
				</button>
				<img
					src={mjolnir}
					alt='mjolnir'
					className='randomchar__decoration'
				/>
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;
	let imgStyle = { objectFit: "cover" };
	if (
		thumbnail ===
		"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
	) {
		imgStyle = { objectFit: "contain" };
	}

	return (
		<div className='randomchar__block'>
			<img
				src={thumbnail}
				alt='Random character'
				className='randomchar__img'
				style={imgStyle}
			/>
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
>>>>>>> Stashed changes
