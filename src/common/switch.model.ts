import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Switch {
  @Field()
  name: string;

  @Field()
  state: boolean;
}
