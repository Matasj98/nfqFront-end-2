import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDescription: false,
            isLike: false,
            index: this.props.index
        }
    }

    toogleDescription = () => {
        this.setState({
            isDescription: !this.state.isDescription,
        })
    }

    like = () =>{
        this.setState({isLike: !this.state.isLike})
        let which =this.state.isLike ? "fa fa-heart" : "fa fa-heart";
        window.localStorage.setItem(this.state.index, which);
    }

    //uzmauntinam like jei buvo
    componentDidMount(){
        this.setState({isLike: window.localStorage.getItem(this.state.index)})
    }

    render() {
        const {title, backgroundImage, data, voteAverage, voteCount, description} = this.props;

        return (
            <div className="card">
                <div
                    className="card__image"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`
                    }}
                />
            
                <div className="card__title">
                    {title}
                </div>
            
                <div className="card__like" onClick={this.like}>
                    <i className={this.state.isLike ? "fa fa-heart": "fa fa-heart-o"}/>
                </div>
            
                <div className="card__subtitle">
                    <span>{data}</span>
                    <span>{voteAverage} ({voteCount} votes)</span>
                </div>
                <div className="card-info">
                    <div className="card-info__header">SUMMARY</div>
                    <button className="card-info__hideButton" onClick={this.toogleDescription}>Toogle Description</button>
                    <div className="card-info__description">
                        {this.state.isDescription?description:''}
                    </div>
                </div>
            </div>

        )
        
    }
}

export  default  Card;