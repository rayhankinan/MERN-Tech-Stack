import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { IsInstance, Length } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

import { Community } from "./community";
import { Image } from "./image";
import { User } from "./user";

@ObjectType()
export class Discussion {
    @Field()
    @Property({ required: true, ref: () => User })
    member: Ref<User>;

    @Field()
    @Property({ required: true, ref: () => Community })
    group: Ref<Community>;

    @Field()
    @Property({ required: true })
    content: string;

    @Field()
    @Property({ required: true, ref: () => Image, default: [] })
    listOfImage: Ref<Image>[];
}

@InputType()
export class DiscussionInput implements Partial<Discussion> {
    @Field()
    @IsInstance(User)
    member?: User;

    @Field()
    @IsInstance(Community)
    group?: Community;

    @Field()
    @Length(1, 255)
    content?: string;

    @Field()
    @IsInstance(Array<Image>)
    listOfImage?: Image[];
}

export const DiscussionModel = getModelForClass(Discussion);
