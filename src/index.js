const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { join } = require('path');
const Handlebars = require('handlebars');
const { mongoUri, port } = require('./config');

const templatesPath = join(__dirname, 'templates');
const tmpl = fs.readFileSync(join(templatesPath, 'index.html'), 'utf8');
const compTmpl = Handlebars.compile(tmpl);

const app = express();
app.use(express.urlencoded({ extended: false }))

const Cat = mongoose.model('Cat', { name: String });

app.get('/', async (req, res) => {
    const kittensRaw = await Cat.find();
    const kittens = kittensRaw.map(k => k.toObject());
    return res.send(compTmpl({ kittens }));
});

app.post('/', async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).send('ERR: missing name');
    }
    try {
        await Cat.create({ name });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(`ERR: ${err.message}`);
    }
});

async function bootstrap() {
    const conn = await mongoose.connect(mongoUri);
    console.log('mongo connected?', !!conn);

    app.listen(port, () => console.log(`listening on ${port}`));
}

bootstrap();
