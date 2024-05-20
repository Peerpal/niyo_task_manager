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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @UseGuards(JwtAuthGuard)
  @Post("create")
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const { userId, title, content } = createTaskDto;
    return await this.tasksService.createTask(userId, title, content);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'Get all tasks for a user' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  async getTasks(@Param('userId') userId: number) {
    return await this.tasksService.getTasks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  async updateTask(@Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto) {
    const { userId, ...data } = updateTaskDto;
    return await this.tasksService.updateTask(userId, taskId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.', type: Task })
  async deleteTask(@Param('taskId') taskId: number, @Body('userId') userId: number) {
    return await this.tasksService.deleteTask(userId, taskId);
  }
}
