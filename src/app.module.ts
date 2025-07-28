import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //Se importan los module.ts de los demás módulos para que 
  //sea reconocidos y funcionen en el servidor de nest

  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('MONGODB_URI:', uri);  // Aquí muestras la variable
        return { uri };
      },
      inject: [ConfigService]
    }),
    
    ProductModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
