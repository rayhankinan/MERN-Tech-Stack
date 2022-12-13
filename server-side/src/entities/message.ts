import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { Length } from "class-validator";

import { User } from "./user";

@ObjectType()
export class Message {
    @Field()
    @Property({ required: true, ref: () => User })
    sender: User;

    @Field()
    @Property({ required: true, ref: () => User })
    receiver: User;

    @Field()
    @Property({ required: true })
    content: string;

    @Field()
    @Property({ required: true, default: [] })
    listOfImage: [string];
}

@InputType()
export class MessageInput implements Partial<Message> {
    @Field()
    sender: User;

    @Field()
    receiver: User;

    @Field()
    @Length(1, 255)
    content: string;

    @Field()
    listOfImage: [string];
}

export const MessageModel = getModelForClass(Message);
