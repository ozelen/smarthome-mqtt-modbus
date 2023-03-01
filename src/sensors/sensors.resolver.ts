import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class SensorsResolver {
  // @Subscription((returns) => Gauge)
  // commentAdded() {
  //   return pubSub.asyncIterator('commentAdded');
  // }
}
