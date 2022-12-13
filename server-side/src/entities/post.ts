import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { IsInstance, Length } from "class-validator";

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
    title?: string;

    @Field()
    @Length(1, 255)
    content?: string;

    @Field()
    @IsInstance(Array<Image>)
    listOfImage?: Image[];

    @Field()
    @IsInstance(User)
    uploader?: User;

    @Field()
    @IsInstance(Post)
    replied?: Post;

    @Field()
    @IsInstance(Community)
    topic?: Community;
}

export const PostModel = getModelForClass(Post);
