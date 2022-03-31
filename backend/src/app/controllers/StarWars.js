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
            res.status(400).send({ error: err.message });
        }
    };

    async getAllFromSpecificTheme(req, res) {
        try {
            const { filter, page } = req.body;


            const cachedData = await cache.get(filter);

            if (cachedData) {
                console.info({ message: 'The data was already cached' });
                return res.status(200).send(cachedData);
            }
            let data;

            if (page > 1) {
                data = await axios.get(`${baseUrl}/${filter}/?page=${page}`);
            } else {
                data = await axios.get(`${baseUrl}/${filter}/`);
            };

            await cache.put('people', data.data.results, 300000);

            console.info({ message: `The data was cached with the key ${filter}` });

            res.status(200).send(data.data.results);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    };


}

module.exports = new StarWars();