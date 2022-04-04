const axios = require('axios');
const baseUrl = 'https://swapi.dev/api';
const cache = require('memory-cache');

class StarWars {
    async getOne(req, res) {
        try {
            const { filter, id } = req.body;

            const response = await axios.get(`${baseUrl}/${filter}/${id}`);

            res.status(200).send(response.data);
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    };

    async getAllFromSpecificTheme(req, res) {
        try {
            const { filter, page } = req.body;

            const cachedData = await cache.get(filter);

            if (cachedData && cachedData.next - 1 === page) {
                console.info({ message: 'The data was already cached' });
                return res.status(200).send(cachedData);
            };
            
            const data = await axios.get(`${baseUrl}/${filter}/?page=${page}`);

            const totalNumberOfPages = Math.ceil(data.data.count/10);

            let numberOfPages = [];

            for (let index = 1; index <= totalNumberOfPages; index++) {
                numberOfPages.push(index);
            };    

            const results = {
                numberOfPages,
                results: data.data.results,
            };

            cache.put(`${filter}`, results, 300000);

            console.info({ message: `The data was cached with the key ${filter}` });

            res.status(200).send(results);
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    };


}

module.exports = new StarWars();