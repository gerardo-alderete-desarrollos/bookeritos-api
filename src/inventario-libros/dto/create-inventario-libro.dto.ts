import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { EditorialEntity } from "src/editorial/entities/editorial.entity";
import { IdiomaEntity } from "src/idiomas/entities/idioma.entity";
import { LibroEntity } from "src/libro/entities/libros.entity";

export class CreateInventarioLibroDto {
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
    
        @IsString()
        proveedor: string;
    
        @IsDateString()
        fecha_compra: Date;

        @IsBoolean()
        disponible: boolean;

        libro: LibroEntity;
        
}
