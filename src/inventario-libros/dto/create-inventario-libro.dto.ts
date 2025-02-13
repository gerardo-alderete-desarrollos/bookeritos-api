import { IsDateString, IsNotEmpty, IsNumber, IsObject } from "class-validator";
import { EditorialEntity } from "src/editorial/entities/editorial.entity";
import { IdiomaEntity } from "src/idiomas/entities/idioma.entity";

export class CreateInventarioLibroDto {
        @IsDateString()
        @IsNotEmpty()
        createdAt: Date;
     
        @IsDateString()
        @IsNotEmpty()
        updatedAt: Date;
    
        @IsDateString()
        @IsNotEmpty()
        deletedAt: Date;
    
        @IsObject()
        idioma: IdiomaEntity
    
        @IsObject()
        editorial: EditorialEntity; 
    
        @IsNumber()
        paginas: number
    
        @IsNumber()
        year_publicacion: number;
    
        @IsNumber()
        edicion: number;
    
        @IsNumber()
        precio_original: number;
    
        @IsNumber()
        precio_final: number;
    
        @IsDateString()
        proveedor: string;
    
        @IsDateString()
        fecha_compra: Date;
}
