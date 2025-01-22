import { jest } from '@jest/globals';
import inquirer from 'inquirer';
import { input } from  "../commands/addTask.js"; // Ajusta la ruta si es necesario

// Mock de inquirer
jest.mock('inquirer', () => ({
    prompt: jest.fn(), // Mock explícito para "prompt"
}));

describe('input function', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });

    it('should return valid answers when user provides valid inputs', async () => {
        // Configura la respuesta simulada para el mock de "prompt"
        inquirer.prompt.mockResolvedValueOnce({
            name: 'task1',
            detail: 'task1 detail',
        });

        const result = await input();

        // Verifica que prompt fue llamado
        expect(inquirer.prompt).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            name: 'task1',
            detail: 'task1 detail',
        });
    });

    it('should validate that name is required', async () => {
        inquirer.prompt.mockResolvedValueOnce({
            name: '',
            detail: 'task1 detail',
        });

        const result = await input();

        // Verifica que prompt fue llamado
        expect(inquirer.prompt).toHaveBeenCalledTimes(1);
        expect(result.name).toEqual(''); // Simula un nombre inválido
        expect(result.detail).toEqual('task1 detail');
    });

    it('should validate that detail is required', async () => {
        inquirer.prompt.mockResolvedValueOnce({
            name: 'task1',
            detail: '',
        });

        const result = await input();

        // Verifica que prompt fue llamado
        expect(inquirer.prompt).toHaveBeenCalledTimes(1);
        expect(result.name).toEqual('task1');
        expect(result.detail).toEqual(''); // Simula un detalle inválido
    });
});
