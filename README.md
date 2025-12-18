# Task Manager - Dashboard de Gestión de Tareas

Sistema de gestión de tareas desarrollado con Angular 19, PrimeNG y Tailwind CSS como parte de una prueba técnica para Desarrollador Frontend Junior.

##  Características Implementadas

###  Funcionalidades Principales

- **Dashboard con Métricas**
  - Total de tareas
  - Tareas por estado (Pendientes, En Progreso, Completadas)
  - Alertas de tareas próximas a vencer (3 días)

- **Lista de Tareas (PrimeNG Table)**
  - Paginación (5, 10, 20 registros por página)
  - Búsqueda por título
  - Filtros por estado y prioridad
  - Ordenamiento por columnas
  - Acciones: Editar, Eliminar, Cambiar estado

- **Formulario de Tareas (PrimeNG Dialog)**
  - Validaciones con Reactive Forms
  - Campos: título, descripción, estado, prioridad, fecha de vencimiento, asignado, etiquetas
  - Modo crear y editar
  - Validación en tiempo real

###  Funcionalidades Extras (Bonus)

- Toast notifications para todas las acciones
- Confirm dialog para eliminar tareas
- Loading indicators implícitos en componentes PrimeNG
- Animaciones sutiles con Tailwind (hover, transitions)
- Manejo de estado con Angular Signals

##  Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **PrimeNG 21** - Biblioteca de componentes UI
- **Tailwind CSS 3** - Framework de utilidades CSS
- **TypeScript** - Lenguaje de programación
- **Reactive Forms** - Manejo de formularios
- **Angular Signals** - Manejo de estado reactivo

## Instalación y Ejecución

### Prerrequisitos

- Node.js (v20.x o superior)
- npm (v10.x o superior)
- Angular CLI (v19.x)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd task-manager
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

> Nota: Se usa `--legacy-peer-deps` debido a diferencias de versiones entre Angular 19 y PrimeNG 21.

3. **Ejecutar la aplicación**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Componente de métricas
│   │   ├── task-list/          # Componente de lista de tareas
│   │   └── task-form/          # Componente de formulario
│   ├── models/
│   │   └── task.model.ts       # Interface Task
│   ├── services/
│   │   └── task.service.ts     # Servicio de gestión de tareas
│   ├── app.component.*         # Componente principal
│   └── app.config.ts           # Configuración de la app
├── styles.css                  # Estilos globales
└── index.html                  # HTML principal
```

##  Decisiones Técnicas

### Arquitectura

- **Componentes Standalone**: Utilicé la nueva arquitectura standalone de Angular 19 para simplificar la estructura y mejorar el tree-shaking.
- **Signals**: Implementé Angular Signals para el manejo de estado reactivo, reemplazando RxJS donde no era necesario.
- **Computed Signals**: Usé computed signals para las métricas del dashboard, optimizando el rendimiento.

### Manejo de Estado

- **TaskService con Signals**: El servicio utiliza signals para mantener el estado de las tareas de forma reactiva.
- **Sin Backend**: Implementé datos mock en memoria que persisten durante la sesión.

### Estilos

- **Tailwind Utility-First**: Utilicé clases de utilidad de Tailwind para un desarrollo rápido y consistente.
- **PrimeNG Theme**: Integré el tema Lara Light Blue de PrimeNG para una apariencia profesional.
- **Responsive Design**: Grid system de Tailwind para adaptabilidad móvil.

### Validaciones

- **Reactive Forms**: Implementé validaciones síncronas con Validators de Angular.
- **Feedback Visual**: Mensajes de error en tiempo real y estilos visuales para campos inválidos.

##  Dificultades Encontradas

1. **Conflictos de Versiones**
   - **Problema**: PrimeNG 21 requiere Angular 21+, pero el proyecto usa Angular 19.
   - **Solución**: Instalé con `--legacy-peer-deps` para resolver conflictos de peer dependencies.

2. **Configuración de Tailwind**
   - **Problema**: Configuración inicial de Tailwind con Angular 19.
   - **Solución**: Creé manualmente el archivo `tailwind.config.js` y configuré los paths correctos.

3. **Filtros en PrimeNG Table**
   - **Problema**: Los filtros personalizados no funcionaban correctamente con signals.
   - **Solución**: Implementé filtros manuales usando dropdowns separados y búsqueda global.

## Mejoras Futuras

### Funcionalidades

- Persistencia de datos con LocalStorage o IndexedDB
- Drag & drop para reordenar tareas
- Vista de calendario para tareas
- Filtros avanzados (rango de fechas, múltiples tags)
- Exportar tareas a CSV/PDF
- Modo oscuro 

### Técnicas

- Implementar lazy loading para componentes
- Agregar tests unitarios (Jasmine/Karma)
- Implementar tests E2E (Cypress)
- Optimizar bundle size
- Agregar PWA capabilities
- Implementar i18n para múltiples idiomas

### Backend

- Integrar con API REST real
- Autenticación y autorización
- Sincronización en tiempo real (WebSockets)
- Notificaciones push


##  Cumplimiento de Requisitos

### Diseño en Figma 
- Link de Figma: https://www.figma.com/design/pS7oT8cNSx6fIlL3YRicB4/Prueba?m=auto&t=sLsTVFrGaDQSn5gl-6




