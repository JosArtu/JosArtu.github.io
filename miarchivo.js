const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

const VALID_APIKEY = 'tu_clave_secreta_12345';

const validateAPIKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.body.apiKey;
  
  if (!apiKey || apiKey !== VALID_APIKEY) {
    return res.status(401).json({ 
      error: 'Unauthorized - Invalid or missing APIKEY' 
    });
  }
  
  next();
};

app.get('/api/meals/search/:name', validateAPIKey, async (req, res) => {
  try {
    const mealName = req.params.name;
    
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    
    res.json({
      status: 'success',
      message: 'Meals found from TheMealDB',
      data: response.data.meals || [],
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching meals',
      error: error.message
    });
  }
});

app.post('/api/meals/search', validateAPIKey, async (req, res) => {
  try {
    const { mealName } = req.body;
    
    if (!mealName) {
      return res.status(400).json({
        status: 'error',
        message: 'mealName is required'
      });
    }
    
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    
    res.status(201).json({
      status: 'success',
      message: 'Datos recibidos y procesados',
      received: {
        mealName
      },
      response: {
        meals: response.data.meals || [],
        totalMeals: response.data.meals ? response.data.meals.length : 0,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error processing request',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` APIKEY requerida: ${VALID_APIKEY}`);
  console.log(`\n Endpoints disponibles:`);
  console.log(`  GET /api/meals/search/:name`);
  console.log(`  POST /api/meals/search`);
});
