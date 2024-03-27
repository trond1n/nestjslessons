import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../user/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations'
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [
      configurations
    ]
  }), UsersModule, SequelizeModule.forRootAsync({
    imports: [
      ConfigModule
    ],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      port: configService.get('db_port'),
      name: configService.get('db_name'),
      user: configService.get('db_user'),
      password: configService.get('db_password'),
      host: configService.get('db_host'),
      synchronize: true,
      autoLoadModels: true,
      models: []
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
