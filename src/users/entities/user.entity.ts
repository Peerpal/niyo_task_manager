import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ example: 1, description: 'The ID of the user' })
    id: number;

    @ApiProperty({ example: 'Task Title', description: 'The email address of the user' })
    email: string;

    @ApiProperty({ example: new Date().toISOString(), description: 'The date the user was created' })
    createdAt: Date;

    @ApiProperty({ example: new Date().toISOString(), description: 'The date the user was last updated' })
    updatedAt: Date;
}
