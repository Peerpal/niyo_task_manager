import { ApiProperty } from '@nestjs/swagger';

export class Task {
    @ApiProperty({ example: 1, description: 'The ID of the task' })
    id: number;

    @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
    title: string;

    @ApiProperty({ example: 'Task Content', description: 'The content of the task' })
    content: string;

    @ApiProperty({ example: 'pending', description: 'The status of the task' })
    status: string;

    @ApiProperty({ example: 1, description: 'The ID of the user who owns the task' })
    userId: number;

    @ApiProperty({ example: new Date().toISOString(), description: 'The date the task was created' })
    createdAt: Date;

    @ApiProperty({ example: new Date().toISOString(), description: 'The date the task was last updated' })
    updatedAt: Date;
}
