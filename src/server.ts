import express, { Application } from 'express';
import userRoutes from './routes/UserRoutes';
import { UserController } from './controllers/UserController';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const userController = new UserController();

app.use(express.json());
app.use('/api', userRoutes);

// Inicializa o controlador e o banco de dados antes de iniciar o servidor
userController.initializeDB().then(() => {
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    if (error instanceof Error) {
        console.error('Falha ao inicializar a aplicação:', error.message);
    } else {
        console.error('Falha ao inicializar a aplicação');
    }
    process.exit(1);
});
