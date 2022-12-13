import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

import { Community } from "./community";
import { User } from "./user";

@ObjectType()
export class Post {
    @Field()
    @Property({ required: true })
    title: string;

    @Field()
    @Property({ required: true })
    content: string;

    @Field()
    @Property({ required: true, default: [] })
    listOfImage: [string];

    @Field()
    @Property({ required: true, ref: () => User })
    uploader: User;

    @Field({ nullable: true })
    @Property({ ref: () => Post })
    replied: Post;

    @Field({ nullable: true })
    @Property({ ref: () => Community })
    topic: Community;
}

@InputType()
export class PostInput implements Partial<PostInput> {
    @Field()
    @MaxLength(255)
    title: string;

    @Field()
    @MaxLength(255)
    content: string;

    @Field()
    listOfImage: [string];

    @Field()
    uploader: User;

    @Field()
    replied: Post;

    @Field()
    topic: Community;
}

export const PostModel = getModelForClass(Post);
