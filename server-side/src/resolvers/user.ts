import { prop as Property, Ref } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import {
    IsAlpha,
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsPhoneNumber,
    IsStrongPassword,
    IsUrl,
    MaxLength,
} from "class-validator";

@ObjectType()
export class User {
    // Required
    @Field()
    @MaxLength(255)
    @IsAlphanumeric()
    @Property({ required: true, unique: true })
    username!: string;

    @Field()
    @IsEmail()
    @Property({ required: true, unique: true })
    email!: string;

    @Field()
    @IsPhoneNumber()
    @Property({ required: true })
    phoneNumber!: string;

    @Field()
    @MaxLength(255)
    @IsAlpha()
    @Property({ required: true })
    firstName!: string;

    @Field()
    @MaxLength(255)
    @IsAlpha()
    @Property({ required: true })
    lastName!: string;

    @Field()
    @IsDate()
    @Property({ required: true })
    dateOfBirth!: Date;

    @Field()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Property({ required: true })
    password!: string;

    // Optional
    @Field()
    @Property()
    description?: string;

    @Field()
    @IsUrl()
    @Property()
    linkToProfile?: string;
}
