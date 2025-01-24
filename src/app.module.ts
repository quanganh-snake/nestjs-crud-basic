import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from 'src/entities/user.entity';
import { EntitySystem } from 'src/entities';
import { ProductsModule } from './modules/products/products.module';
import { LoggingMiddleware } from 'src/midllewares/logging/logging.middleware';
import { AuthMiddleware } from 'src/midllewares/auth/auth.middleware';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: true,
      // host: process.env.DB_HOST,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      host: configuration().database.host,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.dbname,
      entities: [...EntitySystem], // Danh sách các entity sẽ được ánh xạ vào database
      synchronize: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
      autoLoadEntities: true,
    }),
    UsersModule,
    ProductsModule,
    RolesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware, AuthMiddleware).forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
    // .apply(AuthMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.ALL
    // });
    //có thể apply thêm các middleware khác
  }
}
