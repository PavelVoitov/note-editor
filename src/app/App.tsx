import React, {useEffect} from 'react';
import {Header} from "components/Header/Header";
import {NotesList} from "components/NotesList/NotesList";
import {AddNoteForm} from "components/AddNoteForm/AddNoteForm";
import {TagsList} from "components/TagsList/TagsList";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "redux/store";
import {loadNotesFromDB} from "../redux/thunks";
import {NoteType} from "redux/noteSlice";

function App() {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(loadNotesFromDB());
	}, [dispatch]);

	const notes = useSelector<RootState, NoteType[]>(state => state.notes.notes)

	return (
		<div className={"min-h-screen"}>
			<Header/>
			<AddNoteForm/>
			<hr/>
			<NotesList notes={notes}/>
			<hr/>
			{notes.length ? <TagsList/> : ''}
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"/>
		</div>
	);
}

export default App;
