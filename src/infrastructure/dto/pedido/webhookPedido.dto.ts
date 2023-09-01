import { AutoMap } from "@automapper/classes";


export class webhookPedido {
    @AutoMap()
    id: string
    
    @AutoMap()
    aprovado: boolean

    @AutoMap()
    motivo: string
}