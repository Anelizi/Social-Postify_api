import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @IsString()
    @IsNotEmpty({message: 'Todos os campos são obrigatórios!'})
    title: string;

    @IsString()
    @IsNotEmpty({message: 'Todos os campos são obrigatórios!'})
    username: string;
}
