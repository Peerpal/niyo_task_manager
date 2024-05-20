import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ example: 1, description: 'The ID of the user creating the task' })
    userId: number;

    @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
    title: string;

    @ApiProperty({ example: 'Task Content', description: 'The content of the task' })
    content: string;
}
