import { promises as fs } from 'fs';
import path from 'path';

/**
 * Lê um arquivo JSON e retorna seu conteúdo como um objeto JavaScript
 * @param {string} filePath - O caminho para o arquivo JSON
 * @returns {Promise<Object>} - O conteúdo do arquivo JSON como um objeto JavaScript
 */
export default async function readJSONFile(filePath) {
    try {
        const normalizedPath = path.join(process.cwd(), filePath);
        const fileContent = await fs.readFile(normalizedPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${filePath}:`, error);
        throw error;
    }
}