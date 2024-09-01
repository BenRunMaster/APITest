import { AuthMongoRepository } from "../repository/auth-mongo.repository";
import { LoginRequest, UserRegistered } from "../types/types";

export class LoginUseCase {

    static async execute(params: LoginRequest): Promise<UserRegistered | null> {


        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(params.email)) {
            throw new Error("Email isn't in the correct format");
        }

        if (!params.password) {
            throw new Error("Password is empty");
        }

        return await AuthMongoRepository.login(params);

    }
}