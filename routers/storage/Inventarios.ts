import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';

export class inventarios {
  @Expose({ name: 'id' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El id es obligatorio`}}})
  id: number;

  @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre es obligatorio`}}})
    nombre: string;

    @Expose({ name: 'descripcion' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El descripcion es obligatorio`}}})
    descripcion: string;

    @Expose({ name: 'estado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El estado es obligatorio`}}})
    estado: number;

    @Expose({ name: 'created_by' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El created_by es obligatorio`}}})
    created_by: number;
    
    constructor(data:Partial<inventarios>) {
      Object.assign(this, data);
      this.id = 0;
      this.nombre = "nombre bodega";
      this.descripcion = "descripción";
      this.estado = 0;
      this.created_by = 0;
    }
}