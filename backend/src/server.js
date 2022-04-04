const app = require('./app');

app.listen(process.env.PORT || 4000, () => {
    console.info(`Server runnning on port 4000`);
});
