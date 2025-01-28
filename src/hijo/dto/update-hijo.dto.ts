import { PartialType } from '@nestjs/swagger';
import { CreateHijoDto } from './create-hijo.dto';

export class UpdateHijoDto extends PartialType(CreateHijoDto) {}
