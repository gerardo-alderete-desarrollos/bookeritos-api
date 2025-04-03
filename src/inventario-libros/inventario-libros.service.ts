import { BadRequestException, Injectable, UseFilters } from '@nestjs/common';
import { CreateInventarioLibroDto } from './dto/create-inventario-libro.dto';
import { UpdateInventarioLibroDto } from './dto/update-inventario-libro.dto';
import { Repository } from 'typeorm';
import { InventarioLibroEntity } from './entities/inventario-libro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LibroService } from 'src/libro/libros.service';
import { UsersService } from 'src/users/users.service';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class InventarioLibrosService { 

  constructor(    @InjectRepository(InventarioLibroEntity)
                  private inventarioLibroRepository: Repository<InventarioLibroEntity>,
                  @InjectRepository(InventarioLibroEntity)
                  private userRepository: Repository<UserEntity>,
                  //private userService:UsersService,
                ){}

  async create(createInventarioLibroDto: CreateInventarioLibroDto) {
        try{
          const NEW_LIBRO = await this.inventarioLibroRepository.save(createInventarioLibroDto);
          return NEW_LIBRO;

        } catch (error){
          throw new BadRequestException('Error al crear inventario', error);
        }
  }

  async findInventarioByUser(idUser: number): Promise<InventarioLibroEntity[]> {
    if (!idUser || idUser <= 0) {
      console.warn("ID de usuario inválido:", idUser);
      return [];
    }
  
    try {
      const inventario = await this.inventarioLibroRepository.find({
        relations: { libro: true },
        where: { usuario: { id: idUser } },
      });
  
      return inventario.length ? inventario : []; // Evita devolver `undefined`
    } catch (error) {
      console.error(`Error obteniendo inventario para usuario ${idUser}:`, error);
      return [];
    }
  }

  async desasignarLibros(idUser: number) {
    // Validación del idUser
    if (isNaN(idUser) || idUser <= 0) {
      throw new Error('ID de usuario inválido');
    }
  
    // Crear un QueryRunner para la transacción
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    
    // Iniciar transacción
    await queryRunner.startTransaction();
  
    try {
      // Buscar el inventario asignado al usuario
      const tempInventarioAsignedByUser: InventarioLibroEntity[] = await this.findInventarioByUser(idUser);
  
      // Validación de si el usuario tiene libros asignados
      if (!tempInventarioAsignedByUser || tempInventarioAsignedByUser.length === 0) {
        throw new Error('El usuario no tiene libros asignados');
      }
  
      // Procesar los libros asignados de manera concurrente usando Promise.all()
      const updatePromises = tempInventarioAsignedByUser.map(async (ti) => {
        if (!ti.disponible) {
          // Crear una instancia de la entidad InventarioLibroEntity
          const invTemp = new InventarioLibroEntity();
          
          // Asignar los valores de la entidad
          invTemp.id = ti.id;
          invTemp.disponible = true;
          invTemp.usuario = null;
          
          // Guardar los cambios en el inventario dentro de la transacción
          return queryRunner.manager.save(InventarioLibroEntity, invTemp);
        }
      });
  
      // Esperar a que todas las actualizaciones de inventarios se completen
      await Promise.all(updatePromises);
  
      // Buscar el usuario en la base de datos
      const userFinded = await queryRunner.manager.findOne(UserEntity, {
        where: { id: idUser },
        relations: { inventario: true }
      });
  
      // Validación de si el usuario existe
      if (!userFinded) {
        throw new Error('Usuario no encontrado');
      }
  
      // Limpiar el inventario del usuario
      userFinded.inventario = [];
  
      // Guardar la actualización del usuario con el inventario vacío
      await queryRunner.manager.save(UserEntity, userFinded);
  
      // Confirmar la transacción si todo está correcto
      await queryRunner.commitTransaction();
  
      return tempInventarioAsignedByUser;
  
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
  
      // Proveer un mensaje de error adecuado
      throw new Error(`Error al desasignar libros: ${error.message}`);
    } finally {
      // Liberar el query runner
      await queryRunner.release();
    }
  }
  

  findOne(id: number) {
    return `This action returns a #${id} inventarioLibro`;
  }

  async update(id: number, updateInventarioLibroDto: UpdateInventarioLibroDto) {
    const userUpdated = await this.inventarioLibroRepository.save(updateInventarioLibroDto)
    return userUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} inventarioLibro`;
  }
}
