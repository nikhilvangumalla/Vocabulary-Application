import { Card, CardContent, Dialog, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		minWidth: "350px",
	},
});

export const PopUp = ({ title, children, openPopup, setOpenPopup }) => {
	const classes = useStyles();

	const handleClose = () => {
		setOpenPopup(false);
	};
	return (
		<Dialog open={openPopup} onClose={handleClose} maxWidth="lg">
			<Card className={classes.root}>
				<CardContent>
					{title && (
						<>
							<Typography variant="h3">{title}</Typography>
							<br />
						</>
					)}
					{children}
				</CardContent>
			</Card>
		</Dialog>
	);
};
