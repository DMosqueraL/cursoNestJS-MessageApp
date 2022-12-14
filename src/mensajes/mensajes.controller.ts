import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private MensajesService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
    this.MensajesService.createMensaje(createMensajeDto)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'Error en la creación del mensaje',
        });
      });
  }

  @Get()
  getAll(@Res() response) {
    this.MensajesService.getAll()
      .then((mensajesList) => {
        response.status(HttpStatus.OK).json(mensajesList);
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'Error en la obtención de mensajes',
        });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: CreateMensajeDto,
    @Res() response,
    @Param('id') idMensaje,
  ) {
    this.MensajesService.updateMensaje(idMensaje, updateMensajeDto)
      .then((mensaje) => {
        response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'Error en la edición/actualización del mensajes',
        });
      });
  }

  @Delete(':id')
  delete(
    @Res() response,
    @Param('id') idMensaje,
  ) {
    this.MensajesService.deleteMensaje(idMensaje)
    .then(respuesta => {
        response.status(HttpStatus.OK).json(respuesta);
    })
    .catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({
          mensaje: 'Error en la eliminación del mensajes',
        });
      });
  }
}
