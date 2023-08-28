import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  text: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Todos os campos são obrigatórios!' })
  @IsString()
  @IsUrl()
  image: string;
}
