import { AuthMongoRepository } from "../repository/auth-mongo.repository";
import { AuthRequestRegister, UserRegistered } from "../types/types";

export class RegisterUseCase {

    static async execute(params: AuthRequestRegister):Promise<UserRegistered> {
        const regex = /^\d{8}-\d{1}$/;
        console.log('From Use Case ',params.documento)
        if (!regex.test(params.documento)) {
            throw new Error("Documento isn't in the correct format");
        }

        const user = await AuthMongoRepository.findByParam(params.documento, "documento");
        if (user) {
            throw new Error("Registration not complete, check the inserted data");
        }

        if (!params.nombre || !params.telefono) {
            throw new Error("Nombre  or Telefono is empty");
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(params.correo)) {
            throw new Error("Correo isn't in the correct format");
        }

        return await AuthMongoRepository.register(params);

    }
}