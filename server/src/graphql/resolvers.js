const { getWordData: getDataFromApi } = require('../utils/OxfordAPI');

const resolvers = {
	Mutation: {
		getWordData: async (_root, { word }, { db }) => {
			if (word && word.length > 0) {
				try {
					const dataFromDB = await db.words.findOne({
						word,
					});

					if (!dataFromDB) {
						const wordData = await getDataFromApi(word);
						if (!wordData) {
							console.log('null data');
							throw new Error('Failed to retrive data');
						}
						const insertResult = await db.words.insertOne({
							word,
							data: wordData,
						});
						return wordData;
					}
					console.log('Fetched from db');
					return dataFromDB.data;
				} catch (err) {
					throw err;
				}
			} else {
				throw new Error('invalid word');
			}
		},
	},
	Query: {
		getAllWords: async (_root, _args, { db }) => {
			try {
				const allWords = await db.words
					.find(
						{},
						{
							projection: { word: 1 },
						}
					)
					.toArray();

				return allWords.map((obj) => obj.word).reverse();
			} catch (err) {
				throw err;
			}
		},
	},

	Result: {
		results: (data) =>
			data.results && data.results.length > 0
				? data.results[0].lexicalEntries
				: null,
	},

	LexicalEntry: {
		entries: (lexicalEntry) => lexicalEntry.entries,
		category: (lexicalEntry) =>
			lexicalEntry.lexicalCategory ? lexicalEntry.lexicalCategory.text : null,
		word: (lexicalEntry) => lexicalEntry.text,
	},

	Entry: {
		etymologies: (entry) => entry.etymologies,
		senses: (entry) => entry.senses,
	},

	Sense: {
		definitions: (sense) => sense.definitions,
		examples: (sense) => {
			return sense.examples
				? sense.examples.map((exampleObj) => exampleObj.text)
				: null;
		},
	},
};

module.exports = resolvers;
