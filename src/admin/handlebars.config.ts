// handlebars.config.ts

import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Define the base directory for views
const viewsBaseDir = isProduction ? 'dist/views' : 'views';

export const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '..', viewsBaseDir, 'layouts'), // Adjust the path based on the environment
  };
