import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    Select,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    TaskFormComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private allTasks = this.taskService.tasks;
  searchTerm = signal('');
  selectedStatus = signal<string | null>(null);
  selectedPriority = signal<string | null>(null);
  
  tasks = computed(() => {
    let filtered = this.allTasks();
    
    // Filter by search
    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search) ||
        t.assignee.toLowerCase().includes(search)
      );
    }
    
    // Filter by state
    const status = this.selectedStatus();
    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }
    
    // Filter by priority
    const priority = this.selectedPriority();
    if (priority) {
      filtered = filtered.filter(t => t.priority === priority);
    }
    
    return filtered;
  });
  showDialog = signal(false);
  selectedTask = signal<Task | null>(null);

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in-progress' },
    { label: 'Completada', value: 'completed' }
  ];

  priorityOptions = [
    { label: 'Todas', value: null },
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' }
  ];

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      default: return 'warn';
    }
  }

  getPrioritySeverity(priority: string): 'success' | 'info' | 'danger' {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'info';
      default: return 'success';
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'in-progress': 'En Progreso',
      'completed': 'Completada'
    };
    return labels[status] || status;
  }

  getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
      'low': 'Baja',
      'medium': 'Media',
      'high': 'Alta'
    };
    return labels[priority] || priority;
  }

  openNewTaskDialog(): void {
    this.selectedTask.set(null);
    this.showDialog.set(true);
  }

  openEditTaskDialog(task: Task): void {
    this.selectedTask.set(task);
    this.showDialog.set(true);
  }

  closeDialog(): void {
    this.showDialog.set(false);
    this.selectedTask.set(null);
  }

  onTaskSaved(): void {
    this.closeDialog();
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Tarea guardada correctamente',
      closable: false,
      styleClass: 'custom-toast',
      contentStyleClass: 'p-3'
    });
  }

  deleteTask(task: Task): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar la tarea "${task.title}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger p-button-raised',
      rejectButtonStyleClass: 'p-button-text p-button-raised',
      defaultFocus: 'reject',
      accept: () => {
        this.taskService.deleteTask(task.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminada',
          detail: 'Tarea eliminada correctamente',
          closable: false,
          styleClass: 'custom-toast',
          contentStyleClass: 'p-3'
        });
      }
    });
  }

  changeStatus(task: Task, newStatus: Task['status']): void {
    this.taskService.updateTask({ ...task, status: newStatus });
    this.messageService.add({
      severity: 'info',
      summary: 'Actualizada',
      detail: 'Estado de tarea actualizado',
      closable: false,
      styleClass: 'custom-toast',
      contentStyleClass: 'p-3'
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  }
}
