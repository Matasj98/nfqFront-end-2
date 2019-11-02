import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
import Genres from './Genres';

class  App extends React.Component{


    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
            genre_Id: null
        };
    }

    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });

        axios
            .get(endpoints.genres())
            .then((data) => {
                this.setState({
                    genres: data.data.genres
                });
            });

    }
    //saugom koks zanro id
    selectedGenre = (id) =>{
        this.setState({genre_Id: id});
    }


    render() {

        const {list, genres} = this.state;

        return (
            <div>

                <div>
                    {genres.map((genre, index) => <Genres key = {index} genre = {genre.name} id={genre.id} handle={this.selectedGenre}/>)}
                </div>

                {list.filter(data => {
                    if(this.state.genre_Id === null){
                        return data;
                    }else{
                        //tikrinam ar filmo ID array turi this.state zanro id, kuri pasiinkom is menu
                        let n = data.genre_ids.includes(this.state.genre_Id);
                        return n ? data : null;
                    }
                }).map((card) => (
                    <Card
                        key={card.id}
                        title={card.original_title}
                        backgroundImage={getImageUrl(card.backdrop_path)}
                        data={card.release_date}
                        voteAverage={card.vote_average}
                        voteCount={card.vote_count}
                        description={card.overview}
                        index={card.id}
                    />
                ))}
              {/* {console.log(this.state.genres)}
              {console.log(this.state.list)} */}
            </div>
        );
    }
}

export default App;