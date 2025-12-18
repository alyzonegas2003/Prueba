#  Instrucciones de Ejecución - Task Manager

##  Proyecto Completado

He creado un Dashboard de Gestión de Tareas completo con Angular 19, PrimeNG 21 y Tailwind CSS 3.

##  Lo que se ha implementado

###  Funcionalidades Principales
-  Dashboard con 4 cards de métricas (Total, Pendientes, En Progreso, Completadas)
-  Alerta de tareas próximas a vencer (3 días)
-  Lista de tareas con tabla PrimeNG
-  Paginación (5, 10, 20 registros)
-  Búsqueda por título
-  Filtros por estado y prioridad
-  Ordenamiento por columnas
-  Formulario crear/editar con validaciones Reactive Forms
-  CRUD completo (Crear, Leer, Actualizar, Eliminar)

###  Funcionalidades Bonus
-  Toast notifications (éxito, info)
-  Confirm dialog para eliminar
-  Manejo de estado con Angular Signals
-  Animaciones con Tailwind (hover, transitions)
-  Diseño responsive (desktop y mobile)

##  Cómo Ejecutar el Proyecto

### 1. Navegar a la carpeta del proyecto
```bash
cd task-manager
```

### 2. Instalar dependencias (si no están instaladas)
```bash
npm install --legacy-peer-deps
```

> **Nota**: Se usa `--legacy-peer-deps` debido a diferencias de versiones entre Angular 19 y PrimeNG 21.

### 3. Ejecutar la aplicación
```bash
npm start
```

O alternativamente:
```bash
ng serve
```

### 4. Abrir en el navegador
La aplicación estará disponible en:
```
http://localhost:4200
```

##  Estructura del Proyecto

```
task-manager/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/          # Métricas y estadísticas
│   │   │   ├── task-list/          # Tabla de tareas
│   │   │   └── task-form/          # Formulario crear/editar
│   │   ├── models/
│   │   │   └── task.model.ts       # Interface Task
│   │   ├── services/
│   │   │   └── task.service.ts     # Servicio con Signals
│   │   ├── app.component.*         # Componente raíz
│   │   └── app.config.ts           # Configuración
│   ├── styles.css                  # Estilos globales
│   └── index.html
├── README.md                       # Documentación principal
├── FIGMA-DESIGN-GUIDE.md          # Guía para diseño
├── SCREENSHOTS.md                  # Guía para capturas
├── INSTRUCCIONES.md               # Este archivo
├── package.json
└── tailwind.config.js
```

##  Probar Funcionalidades

### Crear una Tarea
1. Click en botón "Nueva Tarea"
2. Llenar el formulario
3. Click en "Guardar"
4. Ver toast de confirmación

### Editar una Tarea
1. Click en el icono de lápiz en una tarea
2. Modificar los campos
3. Click en "Guardar"
4. Ver toast de confirmación

### Eliminar una Tarea
1. Click en el icono de basura
2. Confirmar en el diálogo
3. Ver toast de confirmación

### Filtrar Tareas
1. Usar el campo de búsqueda para filtrar por título
2. Usar los dropdowns para filtrar por estado o prioridad
3. Click en los headers de columna para ordenar

##  Solución de Problemas

### Error: Cannot find module 'primeng/...'
```bash
npm install --legacy-peer-deps
```

### Error: Tailwind classes not working
```bash
npm install -D tailwindcss@^3 --legacy-peer-deps
```

### Puerto 4200 en uso
```bash
ng serve --port 4201
```

##  Dependencias Principales

- **Angular**: 19.0.0
- **PrimeNG**: 21.0.2
- **PrimeIcons**: 7.0.0
- **Tailwind CSS**: 3.4.0
- **TypeScript**: 5.6.2


