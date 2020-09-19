import { Card, CardContent, Dialog, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		minWidth: "350px",
		overflow: "scroll",
	},
});

export const PopUp = ({ title, children, openPopup, setOpenPopup, css }) => {
	const classes = useStyles();

	const handleClose = () => {
		setOpenPopup(false);
	};
	return (
		<Dialog open={openPopup} onClose={handleClose} maxWidth="lg">
			<Card className={css ? css : classes.root}>
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
