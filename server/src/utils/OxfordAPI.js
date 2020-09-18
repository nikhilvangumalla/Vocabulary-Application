const axios = require('axios').default;

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const fields = [
	'definitions',
	'domains',
	'etymologies',
	'examples',
	'registers',
].join(',');
const strictMatch = 'false';

async function getWordData(wordId) {
	try {
		const response = await axios.get(
			`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordId}`,
			{
				method: 'GET',
				params: {
					fields,
					strictMatch,
				},
				headers: {
					app_id,
					app_key,
				},
			}
		);

		return response.data;
	} catch (err) {
		console.log(err);
	}
}

module.exports.getWordData = getWordData;
