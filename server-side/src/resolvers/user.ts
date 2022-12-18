import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectId } from "mongoose";

import { User, UserInput, UserModel } from "../entities/user";

@Resolver(() => User)
export class UserResolver {
    @Query(() => User, { nullable: false })
    async getUser(@Arg("id") id: ObjectId): Promise<User> {
        return await UserModel.findById(id);
    }

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    // TODO: Add search using elastic search
    @Query(() => [User])
    async searchUsers(@Arg("input") input: UserInput): Promise<User[]> {
        return;
    }
}
