import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HeaterModel {
  @Field()
  name: string;

  @Field()
  state: boolean;
}
