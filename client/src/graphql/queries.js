import { gql } from "apollo-boost";

export const GET_ALL_WORDS = gql`
	query GetAllWords {
		getAllWords
	}
`;
