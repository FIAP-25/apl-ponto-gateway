import { created, noContent, ok } from '@/application/helper/http.helper';
import { CategoriaUseCase } from '@/usecase/categoria/categoria.usecase';
import { AdicionarCategoriaInput } from '@/infrastructure/dto/categoria/adicionarCategoria.dto';
import { AtualizarCategoriaPorIdInput } from '@/infrastructure/dto/categoria/atualizarCategoriaPorId.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ICategoriaUseCase } from '@/domain/contract/usecase/categoria.interface';

@ApiTags('Categorias')
@Controller('api/categorias')
export class CategoriaController {
    constructor(private categoriaUseCase: ICategoriaUseCase) {}

    @Post()
    async adicionarCategoria(@Body() body: AdicionarCategoriaInput, @Res() res: Response): Promise<any> {
        const categoriaAdicionada = await this.categoriaUseCase.adicionarCategoria(body);

        return created(categoriaAdicionada, res);
    }

    @Delete(':id')
    async removerCategoriaPorId(@Param('id') id: string, @Res() res: Response): Promise<any> {
        await this.categoriaUseCase.removerCategoriaPorId(id);

        return noContent(res);
    }

    @Put(':id')
    async atualizarCategoriaPorId(@Param('id') id: string, @Body() body: AtualizarCategoriaPorIdInput, @Res() res: Response): Promise<any> {
        const categoriaAtualizada = await this.categoriaUseCase.atualizarCategoriaPorId(id, body);

        return ok(categoriaAtualizada, res);
    }

    @Get()
    async obterCategorias(@Res() res: Response): Promise<any> {
        const categorias = await this.categoriaUseCase.obterCategorias();

        return ok(categorias, res);
    }

    @Get(':id')
    async obterCategoriaPorId(@Param('id') id: string, @Res() res: Response): Promise<any> {
        const categoria = await this.categoriaUseCase.obterCategoriaPorId(id);

        return ok(categoria, res);
    }
}
