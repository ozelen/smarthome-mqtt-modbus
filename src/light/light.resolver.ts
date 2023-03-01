import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Switch } from '../common/switch.model';
import { LightService } from './light.service';

@Resolver(of => Switch)
export class LightResolver {
  constructor(
    private readonly lightService: LightService
  ) {}

  @Query(returns => [Switch])
  bulbs() {
    return this.lightService.getBulbs();
  }

  @Mutation(returns => Switch)
  setLight(
    @Args({name: 'name'}) name: string,
    @Args({name: 'state'}) state?: boolean,
  ) {
    return this.lightService.switchBulb(name, state);
  }

  @Mutation(returns => [Switch])
  setAllLight(
    @Args({name: 'state'}) state?: boolean,
  ) {
    return this.lightService.setAll(state);
  }
}
