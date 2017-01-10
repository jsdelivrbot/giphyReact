import _ from 'lodash';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import GifList from './components/gif_list';
import GifModal from './components/gif_modal';
import request from 'superagent';

const API_KEY = 'dc6zaTOxFJmzC';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      gifs: [],
	      selectedGif: null,
	      modalIsOpen: false
	    }

	    this.handleTermChange = this.handleTermChange.bind(this);
	}

	 openModal(gif) {
	    this.setState({
	      modalIsOpen: true,
	      selectedGif: gif
	    });
	  }

	  closeModal() {
	    this.setState({
	      modalIsOpen: false,
	      selectedGif: null
	    });
	  }

	 handleTermChange(term) {

	    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=` + API_KEY;
	    request.get(url, (err, res) => {
	      this.setState({ gifs: res.body.data })
	    });
	  }

  	render() {
  		const handleTermChange = _.debounce((term) => { this.handleTermChange(term)}, 300);
	    return (
	      <div>
	        <SearchBar onTermChange={handleTermChange} />
	        <GifList  gifs={this.state.gifs}
                  onGifSelect={selectedGif => this.openModal(selectedGif) } />
	        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
	      </div>
	    );
	  }

}

ReactDOM.render(<App />, document.querySelector('.container'));