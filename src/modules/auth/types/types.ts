export interface AuthRequestRegister {
    documento: string,
    nombre: string,
    correo: string,
    telefono: number
}

export interface UserRegistered {
    documento: string,
    nombre: string,
    correo: string,
    telefono: number,
    usuarioVentas: string,
    passwordVentas: string,
    usuarioAdmin: string,
    passwordAdmin: string,
    sesionActiva?: boolean
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LogoutToken {
    documento: string,
    iat: number,
    exp: number
}