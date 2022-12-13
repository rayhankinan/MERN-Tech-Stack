import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { IsInstance } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

import { Post } from "./post";
import { User } from "./user";

@ObjectType()
export class Like {
    @Field()
    @Property({ required: true, ref: () => User })
    user: Ref<User>;

    @Field()
    @Property({ required: true, ref: () => Post })
    post: Ref<Post>;
}

@InputType()
export class LikeInput implements Partial<Like> {
    @Field()
    @IsInstance(User)
    user?: User;

    @Field()
    @IsInstance(Post)
    post?: Post;
}

export const LikeModel = getModelForClass(Like);
