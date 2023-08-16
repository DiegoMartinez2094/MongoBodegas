import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
// },
// "id": 11,
// "nombre": "bodega0",
// "id_responsable": 16,
// "estado": 1,
// "created_by": 16,
// "created_at": {
//   "$date": "2022-06-02T15:33:48Z"
// }

export class bodega {
  @Expose({ name: 'id' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El id es obligatorio`}}})
  id: number;

  @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre es obligatorio`}}})
    nombre: string;

    @Expose({ name: 'id_responsable' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id_responsable es obligatorio`}}})
    id_responsable: number;

    @Expose({ name: 'estado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El estado es obligatorio`}}})
    estado: number;

    @Expose({ name: 'created_by' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El created_by es obligatorio`}}})
    created_by: number;

    @Expose({ name: 'created_at' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El created_at es obligatorio`}}})
    created_at: string;


    constructor(data:Partial<bodega>) {
      Object.assign(this, data);
      this.id = 0;
      this.nombre = "nombre bodega";
      this.id_responsable = 0;
      this.estado = 0;
      this.created_by = 0;
      this.created_by = 0;
      this.created_at = "fecha";
    }
}