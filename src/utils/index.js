module.exports = {
    signingKey: () => {
        return `PIXELS@100%2023`;
    },
    extract: (event) => {
		let body = {},
			path = {},
			query = {};

		if (event?.body) {
			try {
				body = JSON.parse(event.body);
			} catch (error) {}
		}

		if (event?.queryStringParameters) {
			try {
				query = (typeof event.queryStringParameters == 'object' ? event.queryStringParameters : JSON.parse(event.queryStringParameters));
				for (const key in query) {
					query[key.replace('.','_')] = query[key];
				}
			} catch (error) {}
		}

		if (event?.pathParameters) {
			try {
				path = event?.pathParameters;
			} catch (error) {}
		}

        return {body, path, query};
	}
}