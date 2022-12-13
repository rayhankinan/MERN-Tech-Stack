import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { IsInstance } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

import { Community } from "./community";
import { User } from "./user";

@ObjectType()
export class Join {
    @Field()
    @Property({ required: true, ref: () => User })
    user: Ref<User>;

    @Field()
    @Property({ required: true, ref: () => Community })
    community: Ref<Community>;
}

@InputType()
export class JoinInput implements Partial<Join> {
    @Field()
    @IsInstance(User)
    user?: User;

    @Field()
    @IsInstance(Community)
    community?: Community;
}

export const JoinModel = getModelForClass(Join);
