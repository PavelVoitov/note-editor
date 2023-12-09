import {SortByTags} from "components/TagsList/SortByTags/SortByTags";
import {AllTags} from "components/TagsList/AllTags/AllTags";
import Box from "@mui/material/Box";

export const TagsList = () => {
	return (
		<div>
			<Box
				sx={{
					paddingTop: 0,
					borderRadius: 2,
					display: 'grid',
					gridTemplateColumns: { md: '1fr 1fr' },
					gap: 2,
				}}
			>
			<AllTags/>
			<SortByTags/>
			</Box>
		</div>
	)
}