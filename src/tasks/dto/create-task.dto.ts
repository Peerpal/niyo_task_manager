import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 1, description: 'The ID of the user creating the task' })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Task Content', description: 'The content of the task' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
