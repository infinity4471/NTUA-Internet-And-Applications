import React from 'react';
import {SimpleTable} from './table';
import '@progress/kendo-theme-default/dist/all.css';
import io from 'socket.io-client';

const url = "http://localhost:8000";
const socket = io( url );

class Selector extends React.Component {
	state = {
		disease: undefined,
		drugs: []
	}
	constructor( props ) {
		super( props );
	}
	getSelection = ( event ) => {
		this.setState({disease: event.target.value});
	}
	sendSelection = ( event ) => {
		socket.emit("FETCH_TOP_10_DRUGS", this.state.disease );
		socket.on("TOP_10_DRUGS", data => {
			this.setState({drugs: data });
		});
	}
	render() {
		return (
			<div className="Selector">
			<h2> Επιλογή Ασθένειας </h2>
			<input type="text" onChange={this.getSelection}/>
			<button onClick={this.sendSelection}>
				Αναζήτηση
			</button>
			<SimpleTable data = {this.state.drugs}>
			</SimpleTable>
			</div>
		);
	}

}

const App = () => {
	return (
		<div id="App">
		<Selector/>
		</div>
	);
}

export default App;
