import { Connection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { connectDB } from '../config/database';
import { IUser, UserModel } from '../models/UserModel';

/**
 * Classe UserController para gerenciar operações CRUD para usuários.
 */
export class UserController {
    private db?: Connection;
    
    constructor() {
        this.initializeDB();
    }
    
    async initializeDB() {
        try {
            this.db = await connectDB();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao conectar com o banco de dados:', error);
            } else {
                console.error('Erro desconhecido ao conectar com o banco de dados:', error);
            }
            process.exit(1);
        }
    }
    
    /**
     * Busca todos os usuários.
     * @returns {Promise<UserModel[]>} Lista de todos os usuários.
     */    
    async getAllUsers(): Promise<UserModel[]> {
        if (!this.db) {
            console.error('Banco de dados não inicializado');
            throw new Error('Banco de dados não inicializado');
        }
        
        try {
            const [rows] = await this.db.execute<RowDataPacket[]>('SELECT * FROM users');
            const users = rows as IUser[];
            return users.map(user => new UserModel(user));
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao buscar todos os usuários:', error);
                throw new Error('Erro ao buscar todos os usuários');
            } else {
                console.error('Erro desconhecido ao buscar todos os usuários:', error);
                throw new Error('Erro desconhecido ao buscar todos os usuários');
            }
        }
    }

    /**
     * Busca um usuário por ID.
     * @param {number} id ID do usuário.
     * @returns {Promise<UserModel | null>} O usuário encontrado ou null se não existir.
     */
    async getUserById(id: number): Promise<UserModel | null> {
        if (!this.db) {
            console.error('Banco de dados não inicializado');
            throw new Error('Banco de dados não inicializado');
        }    

        try {
            const [rows] = await this.db.execute<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
            const users = rows as IUser[];
            if (users.length === 0) return null;
            return new UserModel(users[0]);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao buscar usuário:', error);
                throw new Error('Erro ao buscar usuário');
            } else {
                console.error('Erro desconhecido ao buscar usuário:', error);
                throw new Error('Erro desconhecido ao buscar usuário');
            }
        }
    }

    /**
     * Cria um novo usuário.
     * @param {IUser} user Dados do usuário.
     * @returns {Promise<UserModel>} O usuário criado.
     */
    async createUser(user: IUser): Promise<UserModel> {
        if (!this.db) {
            console.error('Banco de dados não inicializado');
            throw new Error('Banco de dados não inicializado');
        }

        try {
            const [result] = await this.db.execute<ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
            const insertId = result.insertId;
            return new UserModel({ id: insertId, ...user });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao criar usuário:', error);
                throw new Error('Erro ao criar usuário');
            } else {
                console.error('Erro desconhecido ao criar usuário:', error);
                throw new Error('Erro desconhecido ao criar usuário');
            }
        }
    }    
    
    /**
     * Atualiza um usuário por ID.
     * @param {number} id ID do usuário.
     * @param {IUser} user Dados atualizados do usuário.
     * @returns {Promise<UserModel | null>} O usuário atualizado ou null se não existir.
     */
    async updateUser(id: number, user: IUser): Promise<UserModel | null> {
        if (!this.db) {
            console.error('Banco de dados não inicializado');
            throw new Error('Banco de dados não inicializado');
        }

        try {
            const [result] = await this.db.execute<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id]);
            if (result.affectedRows === 0) return null;
            return new UserModel({ id, ...user });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar usuário:', error);
                throw new Error('Erro ao atualizar usuário');
            } else {
                console.error('Erro desconhecido ao atualizar usuário:', error);
                throw new Error('Erro desconhecido ao atualizar usuário');
            }
        }
    }

    /**
     * Deleta um usuário por ID.
     * @param {number} id ID do usuário.
     * @returns {Promise<boolean>} Retorna true se o usuário foi deletado.
     */
    async deleteUser(id: number): Promise<boolean> {
        if (!this.db) {
            console.error('Banco de dados não inicializado');
            throw new Error('Banco de dados não inicializado');
        }

        try {
            const [result] = await this.db.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao deletar usuário:', error);
                throw new Error('Erro ao deletar usuário');
            } else {
                console.error('Erro desconhecido ao deletar usuário:', error);
                throw new Error('Erro desconhecido ao deletar usuário');
            }
        }
    }
}
