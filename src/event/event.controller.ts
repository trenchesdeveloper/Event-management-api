import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventsController {
  private logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  @Get()
  async getAll() {
    this.logger.log('hey welcome to this endpoint');
    const events = await this.eventRepository.find();
    this.logger.debug(`Found ${events.length} number of events`);
    return events;
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id) {
    const event = await this.eventRepository.findOne({ id });

    if (!event) {
      throw new NotFoundException(`no event with id ${id}`);
    }

    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.eventRepository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id,
    @Body() input: UpdateEventDto,
  ) {
    const event = await this.getOne(id);

    return this.eventRepository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id) {
    const event = await this.getOne(id);

    return await this.eventRepository.remove(event);
  }
}
