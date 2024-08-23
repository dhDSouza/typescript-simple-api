import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { IUser } from '../models/UserModel';

const router = Router();
const userController = new UserController();

/**
 * Rota para criar um novo usuário.
 */
router.post('/users', async (req: Request, res: Response) => {
    try {
        // Valida se a requisição contém os dados necessários
        const user: IUser = req.body;

        if (!user.name || !user.email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }
        
        const createdUser = await userController.createUser(user);
        res.status(201).json(createdUser);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao criar usuário:', error.message);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
            console.error('Erro desconhecido ao criar usuário:', error);
            res.status(500).json({ error: 'Erro desconhecido ao criar usuário' });
        }
    }
});

/**
 * Rota para buscar um usuário por ID.
 */
router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        const user = await userController.getUserById(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao buscar usuário:', error.message);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        } else {
            console.error('Erro desconhecido ao buscar usuário:', error);
            res.status(500).json({ error: 'Erro desconhecido ao buscar usuário' });
        }
    }
});

/**
 * Rota para buscar todos os usuários.
 */
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await userController.getAllUsers();
        if (users.length === 0) {
            res.status(404).json({ error: 'Usuários não encontrados' });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao buscar todos os usuários:', error.message);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            console.error('Erro desconhecido ao buscar todos os usuários:', error);
            res.status(500).json({ error: 'Erro desconhecido ao buscar usuários' });
        }
    }
});

/**
 * Rota para atualizar um usuário por ID.
 */
router.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        const user: IUser = req.body;
        
        if (!user.name || !user.email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }
        
        const updatedUser = await userController.updateUser(id, user);
        
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao atualizar usuário:', error.message);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        } else {
            console.error('Erro desconhecido ao atualizar usuário:', error);
            res.status(500).json({ error: 'Erro desconhecido ao atualizar usuário' });
        }
    }
});

/**
 * Rota para deletar um usuário por ID.
 */
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        const success = await userController.deleteUser(id);
        
        if (success) {
            res.status(204).json({ message: 'Usuário excluído' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao deletar usuário:', error.message);
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        } else {
            console.error('Erro desconhecido ao deletar usuário:', error);
            res.status(500).json({ error: 'Erro desconhecido ao deletar usuário' });
        }
    }
});

export default router;
