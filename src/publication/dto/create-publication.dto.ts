import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  mediaId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  postId: number;

  @IsString()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  @IsDateString()
  date: string;
}
