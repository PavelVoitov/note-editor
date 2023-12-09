import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "redux/store";
import {Tag} from "components/Tag/Tag";
import React from "react";
import {DeleteButton} from "components/DeleteButton/DeleteButton";
import {deleteFilterTag} from "../../../redux/noteSlice";
import {ThemeProvider} from "@mui/material/styles";
import {darkTheme} from "components/NotesList/NotesList";

export const SortByTags = () => {
	const filteredTags = useSelector<RootState, string[]>(state => state.notes.filteredTags)
	const dispatch = useDispatch<AppDispatch>()

	const handleDelete = (tag: string) => {
		dispatch(deleteFilterTag({tag}))
	}

	return (
		<>
			{filteredTags.length ?
				<div className={"my-5 mx-10 w-1/2"}>
					<div className={'mt-10 mb-7'}>
				<span className={"text-2xl flex-none font-bold uppercase text-center text-white"}>
					Sorted by:
				</span>
					</div>
					<div className={"flex items-start p-0"}>
						<ThemeProvider theme={darkTheme}>
							{filteredTags.map(t =>
								<div key={t} className={"relative text-white flex items-center"}>
									<DeleteButton onClick={() => handleDelete(t)}/>
									<Tag tag={t}/>
								</div>
							)}
						</ThemeProvider>
					</div>
				</div>
				: ''
			}
		</>
	)
}

