import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { GET_WORD_DATA } from "../graphql/mutations";
import { PopUp } from "./PopUp";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		right: 290,
		bottom: 50,
	},
	button: {
		position: "absolute",
		right: 5,
		bottom: 25,
	},
	add_popup: {
		minWidth: "350px",
	},
}));

export const AddButton = ({ refetch }) => {
	const classes = useStyles();
	const [openPopup, setOpenPopup] = useState(false);
	const [newWord, setNewWord] = useState("");
	const [getWordDetails] = useMutation(GET_WORD_DATA);

	const handleSubmit = async () => {
		console.log(newWord);
		await getWordDetails({ variables: { word: newWord } });
		setOpenPopup(false);
		refetch();
	};

	return (
		<>
			<div className={classes.fab}>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => setOpenPopup(true)}
				>
					<AddIcon />
				</Fab>
			</div>
			<PopUp
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				css={classes.add_popup}
			>
				<Typography variant="h5">Add a New Word</Typography>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Word"
					type="text"
					fullWidth
					onChange={(e) => setNewWord(e.target.value)}
				/>
				<Button
					onClick={handleSubmit}
					color="primary"
					className={classes.button}
				>
					Add
				</Button>
			</PopUp>
		</>
	);
};
