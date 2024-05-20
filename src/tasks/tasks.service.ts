import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) { }

  async createTask(userId: number, title: string, content: string): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title,
        content,
        userId,
      },
    });
    this.eventEmitter.emit('task.created', task);
    return task;
  }

  async getTasks(userId: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { userId },
    });
  }


  async get(id: number): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: { id },
    });
  }

  async updateTask(userId: number, taskId: number, data: Partial<Task>): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task || task.userId !== userId) {
      throw new NotFoundException('Task not found or you do not have permission to update this task');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data,
    });

    this.eventEmitter.emit('task.updated', updatedTask);

    return updatedTask;
  }

  async deleteTask(userId: number, taskId: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    console.log(task)

    if (!task || task.userId != userId) {
      throw new NotFoundException('Task not found or you do not have permission to delete this task');
    }

    const deletedTask =  this.prisma.task.delete({
      where: { id: taskId },
    });

    this.eventEmitter.emit('task.deleted', deletedTask);

    return deletedTask;
  }
}
