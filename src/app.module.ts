import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './categoria/categoria.module';
import { LibroModule } from './libro/libros.module';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';
import { FilesModule } from './files/files.module';
import { HijoModule } from './hijo/hijo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    AuthorModule,
    EditorialModule,
    LibroModule,
    CategoriaModule,
    UsersModule,
    AuthModule,
    FilesModule,
    HijoModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
