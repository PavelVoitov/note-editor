import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {IconButton} from "@mui/material";

type Props = {
	onClick: () => void
}

export const DeleteButton = ({onClick}: Props) => {
	return (
		<IconButton onClick={onClick}>
			<CloseIcon/>
		</IconButton>
	)
}