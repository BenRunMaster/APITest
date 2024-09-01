export interface ProductRequest {
    codigo?: string,
    producto?: string,
    precio_unitario?: number,
    descuento?: number,
    existencia?: number,
    activo?: boolean
}