import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { IsMimeType, IsUUID, MaxLength } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Image {
    @Field()
    @Property({ required: true, unique: true })
    filename: string;

    @Field()
    @Property({ required: true })
    mimetype: string;

    @Field()
    @Property({ required: true })
    destination: string;
}

@InputType()
export class ImageInput implements Partial<Image> {
    @Field()
    @IsUUID()
    filename?: string;

    @Field()
    @IsMimeType()
    mimetype?: string;

    @Field()
    @MaxLength(255)
    destination?: string;
}

export const ImageModel = getModelForClass(Image);
