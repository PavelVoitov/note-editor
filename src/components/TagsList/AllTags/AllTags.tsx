import {useSelector} from "react-redux";
import {NoteType} from "redux/noteSlice";
import {RootState} from "redux/store";
import {Tag} from "components/Tag/Tag";
import React from "react";

export const AllTags = () => {
	const notes = useSelector<RootState, NoteType[]>(state => state.notes.notes)
	const tags = Array.from(new Set(notes.flatMap((n) => n.tags)))

	return (
		<>
			{tags.length
				? <div className={"my-5 mx-10 w-1/2"}>
					<div className={'my-10'}>
				<span className={"text-2xl flex-none font-bold uppercase text-center text-white"}>
					Select tags to sort:
				</span>
					</div>
					{tags.map(t => <Tag key={t} tag={t}/>)}
				</div>
				: ''}
		</>

	)
}