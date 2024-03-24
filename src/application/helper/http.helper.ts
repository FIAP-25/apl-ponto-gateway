import { Response, Request } from 'express';

export const ok = (data: any, res: Response): Response => res.status(200).json({ dados: data });
export const noContent = (res: Response): Response => res.status(204).send();
export const created = (data: any, res: Response): Response => res.status(201).json({ dados: data });
export const unauthorized = (res: Response): Response => res.status(401).json({ mensagem: 'Credenciais inválidas.' });
export const customResponseSuccess = (data: any, res: Response): Response => res.status(200).json({ id: data });
export const serverError = (error: Error, res: Response): Response =>
    res.status(500).json({
        tipo: error.name,
        mensagem: error.message,
        mensagemDetalhe: error.stack
    });

export function obterMatriculaToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
