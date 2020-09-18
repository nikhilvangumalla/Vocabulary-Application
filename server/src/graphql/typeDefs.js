const { gql } = require('apollo-server-express');

module.exports = gql`
	type Sense {
		definitions: [String!]
		examples: [String!]
		subsenses: [Sense!]
	}

	type Entry {
		etymologies: [String!]
		senses: [Sense!]
	}

	type LexicalEntry {
		entries: [Entry!]
		category: String
		word: String
	}

	type Result {
		results: [LexicalEntry!]
	}

	type Query {
		getAllWords: [String!]!
	}
	type Mutation {
		getWordData(word: String): Result
	}
`;
