import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  
  tasks = this.taskService.tasks;

  totalTasks = computed(() => this.tasks().length);
  
  pendingTasks = computed(() => 
    this.tasks().filter(t => t.status === 'pending').length
  );
  
  inProgressTasks = computed(() => 
    this.tasks().filter(t => t.status === 'in-progress').length
  );
  
  completedTasks = computed(() => 
    this.tasks().filter(t => t.status === 'completed').length
  );
  
  dueSoonTasks = computed(() => {
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    return this.tasks().filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate <= threeDaysFromNow && t.status !== 'completed';
    }).length;
  });
}
