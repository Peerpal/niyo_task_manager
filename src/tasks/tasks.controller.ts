import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Post("create")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const { userId, title, content } = createTaskDto;
    return await this.tasksService.createTask(userId, title, content);
  }

  @Get('tasks-by-user/:userId')
  @ApiOperation({ summary: 'Get all tasks for a user' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  async getTasks(@Param('userId') userId: number) {
    return await this.tasksService.getTasks(parseInt(userId.toString()));
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task' })
  @ApiResponse({ status: 200, description: 'returns a task', type: Task })
  async getTask(@Param('id') id: number) {
    return await this.tasksService.get(parseInt(id.toString()));
  }

  @Patch(':taskId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  async updateTask(@Param('taskId') taskId: number,
    @Body() updateTaskDto: CreateTaskDto) {
    const { userId, ...data } = updateTaskDto;
    return await this.tasksService.updateTask(userId, taskId, data);
  }

  @Delete(':userId/:taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.', type: Task })
  async deleteTask(@Param('taskId') taskId: number, @Param('userId') userId: number) {

    console.log(userId)
    return await this.tasksService.deleteTask(userId, parseInt(taskId.toString()));
  }
}
