import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './event/event.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),

    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
