import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Conecta-se ao banco de dados MySQL e retorna a conexão.
 * @returns {Promise<Connection>} Conexão com o banco de dados.
 */
export const connectDB = async (): Promise<Connection> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Conectado ao banco de dados');
    return connection;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Falha na conexão com o banco de dados:', error);
        throw new Error('Falha na conexão com o banco de dados');
    } else {
        console.error('Erro desconhecido na conexão com o banco de dados:');
        throw new Error('Erro desconhecido na conexão com o banco de dados');
    }
  }
};
