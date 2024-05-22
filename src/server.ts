import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import productRoutes from './routes/product.routes';
import saleRoutes from './routes/sale.routes';
import { AppDataSource } from './data-source';

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());

    AppDataSource.initialize()
      .then(() => {
        app.get('/api/', (req, res) => {
          res.send('home');
        });
        app.use('/api', userRoutes);
        app.use('/api', roleRoutes);
        app.use('/api', productRoutes);
        app.use('/api', saleRoutes);

        app.use('*', (req, res) => {
          res.status(404).send('page not found');
        });

        app.listen(4000, () => {
          console.log('Servidor está corriendo en el puerto 4000');
        });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error('Error during database connection:', error);
  }
};

startServer();
