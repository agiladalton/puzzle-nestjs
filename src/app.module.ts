import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PzusuarioModule } from './pzusuario/pzusuario.module';
import { PztareaModule } from './pztarea/pztarea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}@${process.env.HOSTNAME_MONGODB}/${process.env.BD_MONGODB}?authSource=admin&replicaSet=atlas-12gjtt-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }),
    PzusuarioModule,
    PztareaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
