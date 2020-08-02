const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const cors = require('cors');
const url = require('url');
const io = require('socket.io')(server, { wsEngine: 'ws' });
const parser = require('xml2json');
const fs = require('fs');

server.listen(8000, () => console.log("Server is listening to port 8000"));

app.use(cors());

app.get('/', (req, res) => {
  const q = url.parse(req.url);
  res.sendFile(path.join(__dirname,'/../client/public','index.html'));
})

app.use(express.static(path.join(__dirname,'/../client/client')));

io.on('connection', (socket) => {
	const filename = "../xml/data.xml";
	fs.readFile( filename, function(err, data) {
		var data = JSON.parse( parser.toJson(data) );
		data = data[ "search_results" ][ "study" ];
		socket.on("FETCH_TOP_10_DRUGS", (disease) => {
			var drugs = [];
			for( let i = 0; i < data.length; i++ ) {
				if( Object.values( data[ i ][ "conditions" ] ).indexOf( disease ) >= 0 ||
				    data[ i ][ "conditions" ][ "condition" ] == disease ) {
					const interventions = data[ i ][ "interventions" ][ "intervention" ];
					if( interventions == undefined ) continue;
					if( interventions[ "type" ] == "Drug" ) {
						drugs = drugs.concat( interventions[ "$t" ] );	
					} else {
						for( let j = 0; j < interventions.length; j++ ) {
							if( interventions[ j ][ "type" ] == "Drug" ) {
								drugs = drugs.concat( interventions[ j ][ "$t" ] );	
							}
						}
					}
				}
			}
			var values = {};
			for( let i = 0; i < drugs.length; i++ ) {
				values[ drugs[ i ] ] = 0;
			}
			for( let i = 0; i < drugs.length; i++ ) {
				values[ drugs[ i ] ]++;
			}
			var items = Object.keys( values ).map(function(key) {
  				return [key, values[key]];
			});
			items.sort(function(first, second) {
  				return second[1] - first[1];
			});
			let topValues = items.slice( 0, 10 );
			for( let i = 0; i < topValues.length; i++ ) {
				topValues[ i ] = topValues[ i ][ 0 ];
			}
			socket.emit("TOP_10_DRUGS", topValues );
		});
	});
});
