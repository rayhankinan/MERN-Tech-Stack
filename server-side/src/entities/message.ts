import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { IsInstance, Length } from "class-validator";

import { User } from "./user";
import { Image } from "./image";

@ObjectType()
export class Message {
    @Field()
    @Property({ required: true, ref: () => User })
    sender: Ref<User>;

    @Field()
    @Property({ required: true, ref: () => User })
    receiver: Ref<User>;

    @Field()
    @Property({ required: true })
    content: string;

    @Field()
    @Property({ required: true, ref: () => Image, default: [] })
    listOfImage: Ref<Image>[];
}

@InputType()
export class MessageInput implements Partial<Message> {
    @Field()
    @IsInstance(User)
    sender?: User;

    @Field()
    @IsInstance(User)
    receiver?: User;

    @Field()
    @Length(1, 255)
    content?: string;

    @Field()
    @IsInstance(Array<Image>)
    listOfImage?: Image[];
}

export const MessageModel = getModelForClass(Message);
