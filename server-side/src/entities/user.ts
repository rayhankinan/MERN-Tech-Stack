import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import {
    IsAlpha,
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsInstance,
    IsPhoneNumber,
    IsStrongPassword,
    Length,
    MaxLength,
} from "class-validator";

import { Role } from "../enum/roles";
import { Image } from "./image";

@ObjectType()
export class User {
    @Field()
    @Property({ required: true, unique: true })
    username: string;

    @Field()
    @Property({ required: true, unique: true })
    email: string;

    @Field()
    @Property({ required: true })
    phoneNumber: string;

    @Field()
    @Property({ required: true })
    firstName: string;

    @Field()
    @Property({ required: true })
    lastName: string;

    @Field()
    @Property({ required: true })
    dateOfBirth: Date;

    @Field()
    @Property({ required: true })
    password: string;

    @Field()
    @Property({ required: true })
    role: Role;

    @Field({ nullable: true })
    @Property()
    description: string;

    @Field({ nullable: true })
    @Property({ ref: () => Image })
    profile: Ref<Image>;
}

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    @Length(1, 255)
    @IsAlphanumeric()
    username?: string;

    @Field()
    @IsEmail()
    email?: string;

    @Field()
    @IsPhoneNumber()
    phoneNumber?: string;

    @Field()
    @Length(1, 255)
    @IsAlpha()
    firstName?: string;

    @Field()
    @Length(1, 255)
    @IsAlpha()
    lastName?: string;

    @Field()
    @IsDate()
    dateOfBirth?: Date;

    @Field()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password?: string;

    @Field()
    @IsInstance(Role)
    role?: Role;

    @Field()
    @MaxLength(255)
    description?: string;

    @Field()
    @IsInstance(Image)
    profile?: Image;
}

export const UserModel = getModelForClass(User);
