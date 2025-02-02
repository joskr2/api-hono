# API de Tareas con Hono y OpenAPI

Plantilla para construir APIs tipo REST con documentación OpenAPI integrada usando Hono, Zod y Drizzle ORM.

## 📦 Estructura del Proyecto

```plaintext
joskr2-api-hono/
├── Configuraciones/
│   ├── drizzle.config.ts    # Configuración de migraciones
│   ├── eslint.config.mjs    # Reglas ESLint
│   └── vitest.config.ts     # Configuración de pruebas
├── src/
│   ├── app.ts               # Aplicación principal
│   ├── db/                  # Modelos y migraciones
│   ├── lib/                 # Utilidades y tipos
│   ├── middlewares/         # Middlewares personalizados
│   └── routes/              # Definición de endpoints
└── tests/                   # Pruebas unitarias
```

## 🚀 Primeros Pasos

### Requisitos
- Node.js v18+
- pnpm

### Instalación
```bash
pnpm install
```

### Variables de Entorno
```bash
cp .env.example .env
```

### Base de Datos
```bash
# Ejecutar migraciones
pnpm drizzle-kit push
```

### Iniciar Servidor
```bash
pnpm dev
```

## 📚 Documentación API

Accede a la documentación interactiva:
- Especificación OpenAPI: `/doc`
- UI Interactiva: `/reference`

## 🔍 Endpoints Principales

| Método | Ruta            | Descripción                  |
|--------|-----------------|------------------------------|
| GET    | /tasks          | Listar todas las tareas      |
| POST   | /tasks          | Crear nueva tarea            |
| GET    | /tasks/{id}     | Obtener tarea específica     |
| PUT    | /tasks/{id}     | Actualizar tarea completa    |
| PATCH  | /tasks/{id}     | Actualizar parcialmente      |
| DELETE | /tasks/{id}     | Eliminar tarea               |

## 🛠 Tecnologías Clave

- **Hono**: Framework web rápido
- **Zod**: Validación de esquemas
- **Drizzle ORM**: ORM tipo seguro
- **OpenAPI**: Documentación API estándar
- **Vitest**: Pruebas unitarias

## 🧪 Ejecutar Pruebas

```bash
pnpm test
```

## 📄 Esquema de Tarea

```typescript
// src/db/schema.ts
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  done: integer('done').notNull().default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .default(sql`(datetime('now'))`)
    .$onUpdate(() => sql`(datetime('now'))`),
});
```

## 🔄 Migraciones

Ejemplo de migración inicial:
```sql
-- 0000_flowery_donald_blake.sql
CREATE TABLE `tasks` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `done` integer DEFAULT 0,
  `name` text NOT NULL,
  `created_at` integer DEFAULT CURRENT_TIMESTAMP,
  `updated_at` integer
);
```

## 🛡️ Validaciones

Esquema Zod para creación de tareas:
```typescript
// src/db/schema.ts
export const insertTaskSchema = createInsertSchema(tasks, {
  done: schema => schema.transform(val => Boolean(val)),
  title: schema => schema.min(1),
}).omit({ createdAt: true, id: true, updatedAt: true });
```

## 💡 Ejemplo de Uso

Crear nueva tarea:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primera tarea","description":"Detalles importantes"}'
```

## 📌 Notas Importantes

1. Los campos `createdAt` y `updatedAt` se gestionan automáticamente
2. El campo `done` se almacena como 0/1 pero se maneja como booleano
3. Todas las respuestas incluyen timestamps en formato ISO8601

## 📚 Recursos Adicionales

- [Documentación Hono](https://hono.dev)
- [Guía OpenAPI](https://swagger.io/docs/specification/about/)
- [Drizzle ORM Docs](https://orm.drizzle.team)

---

Desarrollado por Josue - [https://github.com/joskr2/api-hono]



Este README incluye:
- Adaptación completa al español
- Estructura organizada del proyecto
- Instrucciones claras de instalación y uso
- Documentación técnica relevante
- Ejemplos prácticos de uso
- Compatibilidad con el stack tecnológico actual
- Referencias a la estructura de archivos proporcionada