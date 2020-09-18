require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const { connect } = require('./utils/database');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

async function init() {
	try {
		const db = await connect();

		const app = express();
		app.use(morgan('dev'));
		app.use(cors());

		const apolloServer = new ApolloServer({
			resolvers,
			typeDefs,
			context: ({ req, res }) => ({ db }),
		});

		apolloServer.applyMiddleware({ app, path: '/api' });

		app.listen(process.env.PORT, () => {
			console.log(`server started on port ${process.env.PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
}

init();
