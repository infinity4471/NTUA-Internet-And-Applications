import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 400,
	},
});

function createData( id, name, value ) {
	return { id, name, value };
}

const SimpleTable = ( data ) => {
	const classes = useStyles();
	let rows = [];
	const new_data = Object.values( data )[ 0 ];
	for( let i = 0; i < new_data.length; i++ ) {
		rows.push( createData( i + 1, new_data[ i ][ "name" ], new_data[ i ][ "value" ] ) );
	}
	return (
		<TableContainer component={Paper} style={{width: 500}}>
		<Table className={classes.table} aria-label="simple table">
		<TableHead>
		<TableRow>
		<TableCell>Rank</TableCell>
		<TableCell align="left">Drug name</TableCell>
		<TableCell align="left">Number of times used</TableCell>
		</TableRow>
		</TableHead>
		<TableBody>
		{rows.map((row) => (
			<TableRow key={row.id}>
			<TableCell component="th" scope="row">
			{row.id}
			</TableCell>
			<TableCell align="left">{row.name}</TableCell>
			<TableCell align="left">{row.value}</TableCell>
			</TableRow>
		))}
		</TableBody>
		</Table>
		</TableContainer>
	);
}

export {SimpleTable};
