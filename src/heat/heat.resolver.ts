import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { HeaterModel } from './heater.model';
import { HeatService } from './heat.service';

@Resolver()
export class HeatResolver {
  constructor(private readonly heatService: HeatService) {}

  @Query(returns => [HeaterModel])
  bulbs() {
    return this.heatService.getAll();
  }

  @Mutation(returns => HeaterModel)
  setHeat(
    @Args({name: 'name'}) name: string,
    @Args({name: 'state'}) state?: boolean,
  ) {
    return this.heatService.setOne(name, state);
  }

  @Mutation(returns => [HeaterModel])
  setAllHeat(
    @Args({name: 'state'}) state?: boolean,
  ) {
    return this.heatService.setAll(state);
  }

}
