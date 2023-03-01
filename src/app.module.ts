import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LightService } from './light/light.service';
import { LightResolver } from './light/light.resolver';
import { join } from 'path';
import { WaterService } from './water/water.service';
import { WaterResolver } from './water/water.resolver';
import { SensorsResolver } from './sensors/sensors.resolver';
import { SensorsService } from './sensors/sensors.service';
import { HeatService } from './heat/heat.service';
import { HeatResolver } from './heat/heat.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true
      },
    }),
  ],
  providers: [
    LightService,
    LightResolver,
    WaterService,
    WaterResolver,
    SensorsResolver,
    SensorsService,
    HeatService,
    HeatResolver,
  ],
  controllers: [],
})
export class AppModule {}
