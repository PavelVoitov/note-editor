import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Note} from "components/NotesList/Note/Note";
import {NoteType} from "../../redux/noteSlice";
import {useSelector} from "react-redux";
import {RootState} from "redux/store";

export const darkTheme = createTheme({ palette: { mode: 'dark' } })

type Props = {
	notes: NoteType[]
}

export const NotesList = ({notes}: Props) => {

	const sortedByTags = useSelector<RootState, string[]>(state => state.notes.filteredTags)
	const sortedNotes = sortedByTags.length ? notes.filter(note => {
		return note.tags.some(tag => sortedByTags.includes(tag));
	}) : notes

	return (
		<div className={"mx-10 my-10"}>
			{notes.length
				? <Grid item xs={6}>
					<ThemeProvider theme={darkTheme}>
						<Box
							sx={{
								paddingTop: 0,
								borderRadius: 2,
								display: 'grid',
								gridTemplateColumns: { md: '1fr 1fr' },
								gap: 2,
								text: 'over',
								maxWidth: "1920px"
							}}
						>
							{sortedNotes.map((note) => (
								<Note key={note.id} note={note}/>
							))}
						</Box>
					</ThemeProvider>
				</Grid>
				: <span className={"text-2xl flex-none font-bold uppercase text-center text-gray-400 opacity-10"}>
				  Note list is empty
				</span>}

		</div>

	);
}