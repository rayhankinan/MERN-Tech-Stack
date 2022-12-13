import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { Length } from "class-validator";

import { Community } from "./community";
import { Image } from "./image";
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
    @Property({ required: true, ref: () => Image, default: [] })
    listOfImage: Ref<Image>[];

    @Field()
    @Property({ required: true, ref: () => User })
    uploader: Ref<User>;

    @Field({ nullable: true })
    @Property({ ref: () => Post })
    replied: Ref<Post>;

    @Field({ nullable: true })
    @Property({ ref: () => Community })
    topic: Ref<Community>;
}

@InputType()
export class PostInput implements Partial<PostInput> {
    @Field()
    @Length(1, 255)
    title: string;

    @Field()
    @Length(1, 255)
    content: string;

    @Field()
    listOfImage: Image[];

    @Field()
    uploader: User;

    @Field()
    replied: Post;

    @Field()
    topic: Community;
}

export const PostModel = getModelForClass(Post);
