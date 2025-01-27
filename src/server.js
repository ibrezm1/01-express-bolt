const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const logger = require('./utils/logger');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});