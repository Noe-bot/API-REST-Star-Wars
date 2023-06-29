const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/Star_Wars';
const router = express.Router();




const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Star Wars',
      version: '1.0.0',
      description: 'Documentation de l\'API Star Wars',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secretKey', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Endpoint d'authentification (génère un JWT)
app.post('/login', (req, res) => {
  // Vérification des informations d'authentification
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    // Génération du JWT avec une clé secrète
    const token = jwt.sign({ username: 'admin' }, 'secretKey');
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});





mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
})
.catch((error) => console.error(error));


//initialisation des schémas
const peopleSchema = new mongoose.Schema({
  name: String,
  height: String,
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  gender: String,
  homeworld: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planet'
  },
  films: [String],
  species: [String],
  vehicles: [String],
  starships: [String],
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date,
    default: Date.now
  },
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;


const filmSchema = new mongoose.Schema({
  title: String,
  episode_id:Number,
  opening_crawl: String,
  director: String,
  producer:String,
  release_date: Date,
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ],
  starships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Starship'
    }
  ]
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;

const starshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  cost_in_credits: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  crew: {
    type: Number,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  starship_class: {
    type: String,
    required: true
  },
  films: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
    }
  ]
});

const Starship = mongoose.model('Starship', starshipSchema);

module.exports = Starship;

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  cost_in_credits: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  crew: {
    type: Number,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  vehicle_class: {
    type: String,
    required: true
  },
  pilots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ],
  films: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
    }
  ]
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rotation_period: {
    type: Number,
    required: true
  },
  orbital_period: {
    type: Number,
    required: true
  },
  diameter: {
    type: Number,
    required: true
  },
  climate: {
    type: String,
    required: true
  },
  gravity: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  },
  surface_water: {
    type: Number,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  residents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ],
  films: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
    }
  ]
});

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;

  const speciesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    classification: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    average_height: {
      type: Number,
      required: true
    },
    skin_colors: {
      type: String,
      required: true
    },
    hair_colors: {
      type: String,
      required: true
    },
    eye_colors: {
      type: String,
      required: true
    },
    average_lifespan: {
      type: Number,
      required: true
    },
    homeworld: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Planet'
    },
    language: {
      type: String,
      required: true
    },
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
      }
    ],
    films: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
      }
    ]
  });
  
  const Species = mongoose.model('Species', speciesSchema);
  
  module.exports = Species







//Connexion à la DB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((error) => console.error(error));


//POUR LES PERSONNAGES
// GET - Récupérer tous les personnages

/**
 * @swagger
 * /people:
 *   get:
 *     summary: Récupère tous les personnages
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/people', async (req, res) => {
  try {
    const result = await People.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET - Récupérer un personnage par ID

/**
 * @swagger
 * /people/{id}:
 *   get:
 *     summary: Récupère un personnage par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/people/:id', async (req, res) => {
  try {
    const result = await People.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST - Créer un nouveau personnage

/**
 * @swagger
 * /people:
 *   post:
 *     summary: Crée un nouveau personnage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/people', async (req, res) => {
  console.log(req.body)
  try {
    const row = new People(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT - Mettre à jour un personnage existant

/**
 * @swagger
 * /people/{id}:
 *   put:
 *     summary: Met à jour un personnage par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/people/:id', async (req, res) => {
  try {
    const row = await People.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE - Supprimer un personnage existant

/**
 * @swagger
 * /people/{id}:
 *   delete:
 *     summary: Supprime un personnage par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/people/:id', async (req, res) => {
  try {
    // const rowToDelete = await People.findByIdAndDelete(req.params.id);
    const rowToDelete = await People.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});



//POUR LES PLANETES
// GET - Récupérer toutes les planètes

/**
 * @swagger
 * /planet:
 *   get:
 *     summary: Récupère toutes les planètes
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/planet', authenticateJWT ,async (req, res) => {
  try {
    const result = await Planet.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET - Récupérer une planète par ID

/**
 * @swagger
 * /planet/{id}:
 *   get:
 *     summary: Récupère une planète par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/planet/:id', authenticateJWT, async (req, res) => {
  try {
    const result = await Planet.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST - Créer une nouvelle Planète

/**
 * @swagger
 * /planet:
 *   post:
 *     summary: Crée une nouvelle planète
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/planet', authenticateJWT, async (req, res) => {
  console.log(req.body)
  try {
    const row = new Planet(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT - Mettre à jour une planète existante

/**
 * @swagger
 * /planet/{id}:
 *   put:
 *     summary: Met à jour une planète par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/planet/:id', authenticateJWT, async (req, res) => {
  try {
    const row = await Planet.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE - Supprimer une planète existante

/**
 * @swagger
 * /planet/{id}:
 *   delete:
 *     summary: Supprime une planète par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/planet/:id', authenticateJWT, async (req, res) => {
  try {
    const rowToDelete = await Planet.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


//POUR LES VÉHICULES
// GET - Récupérer tous les véhicules

/**
 * @swagger
 * /vehicle:
 *   get:
 *     summary: Récupère tous les véhicules
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/vehicle', async (req, res) => {
  try {
    const result = await Vehicle.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET - Récupérer un véhicule par ID

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Récupère un véhicule par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/vehicle/:id', async (req, res) => {
  try {
    const result = await Vehicle.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST - Créer un nouveau véhicule

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Crée un nouveau véhicule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/vehicle', async (req, res) => {
  console.log(req.body)
  try {
    const row = new Vehicle(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT - Mettre à jour un véhicule existant

/**
 * @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Met à jour un véhicule par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/vehicle/:id', async (req, res) => {
  try {
    const row = await Vehicle.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE - Supprimer un véhicules existant

/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Supprime un véhicule par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/vehicle/:id', async (req, res) => {
  try {
    const rowToDelete = await Vehicle.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


//POUR LES FILMS

/**
 * @swagger
 * /film:
 *   get:
 *     summary: Récupère tous les films
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */
app.get('/film', async (req, res) => {
  try {
    const result = await Film.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /film/{id}:
 *   get:
 *     summary: Récupère un film par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/film/:id', async (req, res) => {
  try {
    const result = await Film.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /film:
 *   post:
 *     summary: Créé un nouveau film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/film', async (req, res) => {
  console.log(req.body)
  try {
    const row = new Film(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /film/{id}:
 *   put:
 *     summary: Met à jour un film par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/film/:id', async (req, res) => {
  try {
    const row = await Film.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * @swagger
 * /film/{id}:
 *   delete:
 *     summary: Supprime un film par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/film/:id', async (req, res) => {
  try {
    const rowToDelete = await Film.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


//POUR LES ESPECES

/**
 * @swagger
 * /species:
 *   get:
 *     summary: Récupère toutes les espèces
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/species', async (req, res) => {
  try {
    const result = await Species.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /species/{id}:
 *   get:
 *     summary: Récupère une espèce par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/species/:id', async (req, res) => {
  try {
    const result = await Species.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /species:
 *   post:
 *     summary: Crée une nouvelle espèce
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/species', async (req, res) => {
  console.log(req.body)
  try {
    const row = new Species(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /species/{id}:
 *   put:
 *     summary: Met à jour une espèce par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/species/:id', async (req, res) => {
  try {
    const row = await Species.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /species/{id}:
 *   delete:
 *     summary: Supprime une espèce par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/species/:id', async (req, res) => {
  try {
    const rowToDelete = await Species.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


//POUR LES VAISSEAUX
/**
 * @swagger
 * /starship:
 *   get:
 *     summary: Récupère tous les starships
 *     responses:
 *       200:
 *         description: Succès de la requête avec les starships récupérés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/starship', async (req, res) => {
  try {
    const result = await Starship.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * @swagger
 * /starship/{id}:
 *   get:
 *     summary: Récupère un vaisseau par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du vaisseau à récupérer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.get('/starship/:id', async (req, res) => {
  try {
    const result = await Starship.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /starship:
 *   post:
 *     summary: Crée un nouveau vaisseau
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Succès de la requête de création
 *         content:
 *           application/json:
 */
app.post('/starship', async (req, res) => {
  console.log(req.body)
  try {
    const row = new Starship(req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /starship/{id}:
 *   put:
 *     summary: Met à jour un vaisseau par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Succès de la requête de mise à jour
 *         content:
 *           application/json:
 */
app.put('/starship/:id', async (req, res) => {
  try {
    const row = await Starship.findByIdAndUpdate(req.params.id, req.body);
    await row.save();
    res.send(row);
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * @swagger
 * /starship/{id}:
 *   delete:
 *     summary: Supprime un vaisseau par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élément à supprimer
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 */
app.delete('/starship/:id', async (req, res) => {
  try {
    const rowToDelete = await Starship.findOneAndDelete(req.params.id);
    res.send(rowToDelete);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));