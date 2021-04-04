import React, { Component } from "react"

import './style.css'

class memeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemesImages: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                const { memes } = res.data

                this.setState({ allMemesImages: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value

        })

    }
    handleClick(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemesImages.length)
        const randMemeImg = this.state.allMemesImages[randNum].url
        this.setState({
            randomImg: randMemeImg
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange}></input><p></p>
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange}></input>
                    <button onClick={this.handleClick}>Gen</button>
                </form >
                <div className="meme">
                    <img src={this.state.randomImg} alt="" name="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>

                </div>
            </div>
        )

    }


}


export default memeGenerator