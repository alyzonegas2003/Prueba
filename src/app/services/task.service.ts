import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>(this.getMockTasks());

  tasks = this.tasksSignal.asReadonly();

  private getMockTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Implementar autenticación',
        description: 'Desarrollar sistema de login con JWT',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2025-01-15'),
        assignee: 'Juan Pérez',
        tags: ['backend', 'seguridad']
      },
      {
        id: '2',
        title: 'Diseñar dashboard',
        description: 'Crear mockups en Figma para el dashboard principal',
        status: 'completed',
        priority: 'medium',
        dueDate: new Date('2025-01-10'),
        assignee: 'María García',
        tags: ['diseño', 'ui/ux']
      },
      {
        id: '3',
        title: 'Optimizar base de datos',
        description: 'Revisar y optimizar queries lentas',
        status: 'pending',
        priority: 'high',
        dueDate: new Date('2025-01-20'),
        assignee: 'Carlos López',
        tags: ['database', 'performance']
      },
      {
        id: '4',
        title: 'Documentar API',
        description: 'Crear documentación completa de endpoints',
        status: 'pending',
        priority: 'low',
        dueDate: new Date('2025-01-25'),
        assignee: 'Ana Martínez',
        tags: ['documentación', 'api']
      },
      {
        id: '5',
        title: 'Testing unitario',
        description: 'Escribir tests para módulo de usuarios',
        status: 'in-progress',
        priority: 'medium',
        dueDate: new Date('2025-01-18'),
        assignee: 'Pedro Sánchez',
        tags: ['testing', 'qa']
      }
    ];
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }
}
