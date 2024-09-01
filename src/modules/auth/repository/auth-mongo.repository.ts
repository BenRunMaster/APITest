import { userModel } from "../../user/model/user.model";
import { UserRegistered, AuthRequestRegister, LoginRequest } from "../types/types";

import bcrypt from "bcrypt";


export class AuthMongoRepository {


    /**
     * 
     * @param params 
     * @returns 
     */
    static async register(params: AuthRequestRegister): Promise<UserRegistered> {

        try {

            const passTextPlane = {
                ventas: `ventas${params.documento}`,
                admin: `admin${params.documento}`
            }

            const newInfoUser = {
                usuarioVentas: `ventas${params.documento}@innovacion.gob.sv`,
                passwordVentas: bcrypt.hashSync(passTextPlane.ventas, 10),
                usuarioAdmin: `admin${params.documento}@innovacion.gob.sv`,
                passwordAdmin: bcrypt.hashSync(passTextPlane.admin, 10),
                sesionActiva: false,
                ...params
            };


            const newUser = new userModel(newInfoUser);
            await newUser.save();

            const userSaved = await userModel
                .findOne({ documento: params.documento })
                .select('documento nombre correo telefono usuarioVentas passwordVentas usuarioAdmin passwordAdmin');
            if (!userSaved) {
                throw new Error("Error saving user");
            }

            userSaved.passwordVentas = passTextPlane.ventas;
            userSaved.passwordAdmin = passTextPlane.admin;

            return userSaved as UserRegistered;

        } catch (error) {
            console.error('Error en el registro:', error);
            throw new Error('Error inserting user');
        }
    }

    /**
     * 
     * @param value 
     * @param param 
     * @returns 
     */
    static async findByParam(value: string, param: string): Promise<UserRegistered | null> {
        try {
            const user = await userModel.findOne({ [param]: value });
            return user as UserRegistered | null;
        } catch (error) {
            console.error(`Error al buscar por ${param}:`, error);
            return null;
        }
    }


    static async login(param: LoginRequest): Promise<UserRegistered | null> {
        try {

            const user = await userModel.findOne({
                $or: [
                    { 'usuarioVentas': param.email },
                    { 'usuarioAdmin': param.email }
                ]
            }) as UserRegistered;

            if (!user) {
                throw new Error("User not found");
            }

            const matchPassVentas = await bcrypt.compare(param.password, user.passwordVentas);
            const matchPassAdmin = await bcrypt.compare(param.password, user.passwordAdmin);

            if (matchPassVentas || matchPassAdmin) {
                await userModel.updateOne(
                    { documento: user.documento },
                    { $set: { sesionActiva: true } }
                );
                return user;
            }
            throw new Error("Login not complete, check your credential");


        } catch (error) {
            console.error(`Error at searching ${param.email}:`, error);
            return null
        }
    }

    static async logout(documento: string): Promise<void> {
        try {
            await userModel.updateOne(
                { documento },
                { $set: { sesionActiva: false } }
            );
        } catch (error) {
            console.error(`Error at logout:`, error);
        }
    }
}
