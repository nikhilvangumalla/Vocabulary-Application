import { gql } from "apollo-boost";

export const GET_WORD_DATA = gql`
	mutation GetAllWords($word: String!) {
		getWordData(word: $word) {
			results {
				entries {
					etymologies
					senses {
						definitions
						examples
						subsenses {
							definitions
							examples
						}
					}
				}
				category
				word
			}
		}
	}
`;
