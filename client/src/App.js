import React from 'react';
import './App.css';

import { ComboBox } from '@progress/kendo-react-dropdowns';
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
	createData = ( id, val ) => {
		return { id, val };
	}
	make_rows = () => {
		let rows = [];
		for( let i = 0; i < this.state.drugs.length; i++ ) {
			rows.push( this.createData( i + 1,  this.state.drugs[ i ] ) );
		}
		return rows;
	}
	render() {
		return (
			<div className="Selector">
			<h2> Επιλογή Ασθένειας </h2>
			<input type="text" onChange={this.getSelection}/>
			<button onClick={this.sendSelection}>
				Αναζήτηση
			</button>
			<table>
				{this.make_rows().map(row => (
        				<tr key={row.id}>
          					<td>{row.val}</td>
        				</tr>
      				))}
			</table>
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
