import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { ArrayMinSize, IsAlpha, IsInstance, Length } from "class-validator";

import { Image } from "./image";
import { User } from "./user";

@ObjectType()
export class Community {
    @Field()
    @Property({ required: true })
    name: string;

    @Field()
    @Property({ required: true, ref: () => User })
    moderators: Ref<User>[];

    @Field({ nullable: true })
    @Property()
    description: string;

    @Field({ nullable: true })
    @Property({ ref: () => Image })
    profile: Ref<Image>;
}

@InputType()
export class CommunityInput implements Partial<Community> {
    @Field()
    @Length(1, 255)
    @IsAlpha()
    name?: string;

    @Field()
    @IsInstance(Array<User>)
    @ArrayMinSize(1)
    moderators?: User[];

    @Field()
    @Length(1, 255)
    description?: string;

    @Field()
    @IsInstance(Image)
    profile?: Image;
}
