import { AuthMongoRepository } from "../repository/auth-mongo.repository";

export class LogoutUseCase {

    static async execute(document: string): Promise<void> {
        if (!document) {
            throw new Error("Error logout");
        }
        await AuthMongoRepository.logout(document);
    }
}