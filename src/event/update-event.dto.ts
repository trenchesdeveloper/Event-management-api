import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from '../event/create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
