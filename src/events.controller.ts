import { CreateEventDto } from './create-event.dto';

import { UpdateEventDto } from './update-event.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return id;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    return input;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id) {
    return id;
  }
}
