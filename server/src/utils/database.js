const { MongoClient } = require('mongodb');

// Connection URI
// const uri = 'mongodb://localhost:27017/vocabulary';
const uri = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.q3x0a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function connect() {
	try {
		// Connect the client to the server
		await client.connect();
		console.log('Connected successfully to database');
		const db = client.db('vocabulary');

		return {
			words: db.collection('words'),
		};
	} catch (err) {
		// Ensures that the client will close when you finish/error
		console.log(err);
		await client.close();
	}
}

module.exports.connect = connect;
