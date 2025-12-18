import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    Textarea,
    Select,
    DatePicker,
    ButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value && this.task) {
      this.loadTaskData();
    }
  }
  get visible(): boolean {
    return this._visible;
  }
  private _visible = false;

  @Input() set task(value: Task | null) {
    this._task = value;
    if (value && this.taskForm) {
      this.loadTaskData();
    }
  }
  get task(): Task | null {
    return this._task;
  }
  private _task: Task | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  taskForm!: FormGroup;

  statusOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in-progress' },
    { label: 'Completada', value: 'completed' }
  ];

  priorityOptions = [
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' }
  ];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: [new Date(), Validators.required],
      assignee: ['', Validators.required],
      tagsInput: ['']
    });
  }

  loadTaskData(): void {
    if (this.task && this.taskForm) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        priority: this.task.priority,
        dueDate: new Date(this.task.dueDate),
        assignee: this.task.assignee,
        tagsInput: this.task.tags.join(', ')
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.task;
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Editar Tarea' : 'Nueva Tarea';
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const tags = formValue.tagsInput 
        ? formValue.tagsInput.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        : [];
      
      const taskData = {
        ...formValue,
        tags
      };
      delete taskData.tagsInput;
      
      if (this.isEditMode && this.task) {
        this.taskService.updateTask({
          ...this.task,
          ...taskData
        });
      } else {
        this.taskService.addTask(taskData);
      }
      
      this.onSave.emit();
      this.resetForm();
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  handleClose(): void {
    this.resetForm();
    this.onClose.emit();
  }

  resetForm(): void {
    this.taskForm.reset({
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(),
      tagsInput: ''
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }
}
