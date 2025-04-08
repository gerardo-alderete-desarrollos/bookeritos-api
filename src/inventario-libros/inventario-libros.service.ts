import { BadRequestException, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
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

  async desasignarYAsignarLibros(idUser: number) {
    if (isNaN(idUser) || idUser <= 0) {
      throw new Error('ID de usuario inválido');
    }
  
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Buscar usuario
      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { id: idUser },
        relations: { inventario: true }
      });
  
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      // Buscar inventario directamente con queryRunner
      const libros = await queryRunner.manager.find(InventarioLibroEntity, {
        where: { usuario: { id: idUser } },
      });
  
      if (!libros || libros.length === 0) {
        throw new Error('El usuario no tiene libros asignados');
      }
  
      let asignados = 0;
      let desasignados = 0;
  
      const updatePromises = libros.map((libro) => {
        const invTemp = new InventarioLibroEntity();
        invTemp.id = libro.id;
  
        if (libro.isLibroActualAsignado) {
          // DESASIGNAR
          invTemp.disponible = true;
          invTemp.usuario = null;
          invTemp.isLibroActualAsignado = false;
          desasignados++;
        } else {
          // ASIGNAR
          invTemp.disponible = false;
          invTemp.usuario = user;
          invTemp.isLibroActualAsignado = true;
          asignados++;
        }
  
        return queryRunner.manager.save(InventarioLibroEntity, invTemp);
      });
  
      await Promise.all(updatePromises);
  
      // Actualizar el inventario del usuario
      const inventarioActualizado = await queryRunner.manager.find(InventarioLibroEntity, {
        where: { usuario: { id: idUser } }
      });
  
      user.inventario = inventarioActualizado;
      await queryRunner.manager.save(UserEntity, user);
  
      await queryRunner.commitTransaction();
  
      // Registro informativo en consola
      console.log(`${asignados} libros asignados, ${desasignados} libros desasignados`);
  
      return {
        asignados,
        desasignados,
        inventarioFinal: inventarioActualizado
      };
  
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error al procesar libros: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
  
  

  findOne(id: number) {
    return `This action returns a #${id} inventarioLibro`;
  }

  async update(id: number, updateInventarioLibroDto: UpdateInventarioLibroDto) {
    // Verificar si el registro existe
    const existingInventario = await this.inventarioLibroRepository.findOne({ where: { id } });
  
    if (!existingInventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado.`);
    }
  
    // Actualizar solo los campos que vienen en el DTO
    const updated = Object.assign(existingInventario, updateInventarioLibroDto);
  
    // Guardar cambios
    console.log('Actualizando inventario:', updated);
    return await this.inventarioLibroRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} inventarioLibro`;
  }
}
