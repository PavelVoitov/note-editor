import * as React from "react";
import {ReactNode} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "redux/store";
import {setFilterTag} from "../../redux/noteSlice";

type Props = {
	tag: string
	children?: ReactNode
}

export const Tag = ({tag, children}: Props) => {
	const dispatch = useDispatch<AppDispatch>()
	const addTag = () => {
		dispatch(setFilterTag({tag}))
	}

	return <span
		onClick={addTag}
		className={"mr-5 bg-amber-600 py-1 px-2 min-h-min rounded-lg text-white cursor-pointer"}
	>
		{tag}
		{children}
	</span>
}