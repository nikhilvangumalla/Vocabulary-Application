import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Header, AddButton, PopUp } from "../components";
import { GET_ALL_WORDS } from "../graphql/queries";
import { GET_WORD_DATA } from "../graphql/mutations";

const useStyles = makeStyles({
	container: {
		minHeight: "90vh",
	},
	card: {
		width: "100%",
	},
	list_item: {
		fontSize: "2rem",
	},
});

export const Home = () => {
	const classes = useStyles();
	const { data, loading, error, refetch } = useQuery(GET_ALL_WORDS);
	const [
		getWordDetails,
		{ data: getWordData, error: getWordDataError },
	] = useMutation(GET_WORD_DATA);

	const [search, setSearch] = useState("");
	const [openPopup, setOpenPopup] = useState(false);

	if (loading) {
		return (
			<Container maxWidth="md">
				<Header />
				<Skeleton variant="rect" height="100vh" />
			</Container>
		);
	}

	if (error || getWordDataError) {
		return <Alert severity="error">Failed to fetch data</Alert>;
	}

	let allWords = data && data.getAllWords ? data.getAllWords : null;

	let wordData =
		getWordData && getWordData.getWordData
			? getWordData.getWordData.results
			: null;
	console.log("word data", wordData);

	const showWordDetails = async (word) => {
		await getWordDetails({ variables: { word: word } });
		setOpenPopup(true);
	};

	let words = allWords.filter((word) => word.includes(search));

	const wordsList = words ? (
		<List>
			{words.map((word) => (
				<ListItem button key={word} onClick={() => showWordDetails(word)}>
					<ListItemText primary={word} />
				</ListItem>
			))}
		</List>
	) : null;

	return (
		<Container maxWidth="md" className={classes.container}>
			<Header setSearch={setSearch} />
			{wordsList}
			<AddButton refetch={refetch} />
			<PopUp
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				title={wordData && wordData[0].word}
			>
				{wordData
					? wordData.map(
							(result) =>
								result.entries &&
								result.entries.map(
									(entry) =>
										entry.senses &&
										entry.senses.map((sense) => (
											<Typography variant="body1">
												<Typography variant="h6">{result.category}</Typography>
												{entry.etymologies}
												<br />
												{sense.definitions && (
													<>
														Definition: {sense.definitions[0]}
														<br />
													</>
												)}
												{sense.examples && <>Example: {sense.examples[0]}</>}
											</Typography>
										))
								)
					  )
					: null}
			</PopUp>
		</Container>
	);
};
