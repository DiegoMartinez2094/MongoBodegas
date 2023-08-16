var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
//   "id": 11,
//   "nombre": "producto0",
//   "descripcion": "producto0",
//   "estado": 1,
//   "created_by": 16
export class productos {
    constructor(data) {
        Object.assign(this, data);
        this.id = 0;
        this.nombre = "nombre bodega";
        this.descripcion = "descripción";
        this.estado = 0;
        this.created_by = 0;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id es obligatorio` }; } }),
    __metadata("design:type", Number)
], productos.prototype, "id", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], productos.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    IsDefined({ message: () => { throw { status: 422, message: `El descripcion es obligatorio` }; } }),
    __metadata("design:type", String)
], productos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El estado es obligatorio` }; } }),
    __metadata("design:type", Number)
], productos.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    IsDefined({ message: () => { throw { status: 422, message: `El created_by es obligatorio` }; } }),
    __metadata("design:type", Number)
], productos.prototype, "created_by", void 0);
