# Mi Proyecto — Instrucciones para agentes de IA

> Este archivo es la única fuente de instrucciones para cualquier IA que trabaje con esta wiki.
> `CLAUDE.md` y `GEMINI.md` solo lo importan: las reglas se editan aquí, nunca en ellos.

## 1. El proyecto

*(Lo completa el Bibliotecario en su tarea 01: qué es el proyecto, para quién, y dónde está el
código en relación con esta wiki, con rutas relativas.)*

## 2. Cómo leer la wiki

1. Empieza por el índice raíz, [`_mi-proyecto-wiki.md`](_mi-proyecto-wiki.md).
2. **Cada carpeta tiene un índice `_carpeta.md`** con una línea por archivo. Léelo antes de abrir
   los archivos de esa carpeta; abre solo los que necesitas.
3. Antes de una decisión de arquitectura, revisa lo que `01-references/` dice de esa área.

| Carpeta | Qué contiene |
|---|---|
| `01-references/` | **La verdad.** Cómo funciona el sistema hoy, dividido por dominio. |
| `02-agents/` | Agentes: perfil, tareas, exploraciones y memorias de cada uno. |
| `03-skills/` | Instrucciones para hacer cosas concretas. |
| `04-business/` | Negocio, producto, usuarios: el porqué detrás del código. |
| `05-how-to/` | Guías paso a paso para personas. |
| `_archive/` | Lo que ya no aplica. No lo uses como referencia. |

## 3. Reglas de la documentación

1. **`01-references/` describe el sistema como es hoy**, no como se planeó. Un documento que ya no
   coincide con el código es un defecto, no un registro histórico.
2. **Actualiza en el mismo trabajo.** Si cambias algo que un documento de `01-references/` describe,
   actualizas ese documento antes de dar el trabajo por terminado.
3. **Solo lo verificado va a `01-references/`.** Experimentos, comparaciones y propuestas van a
   `explorations/` de un agente; planes a `tasks/`; procedimientos a `05-how-to/`.
4. **Los índices se mantienen.** Si creas, mueves, renombras o borras un archivo, actualiza el
   `_carpeta.md` de esa carpeta en el mismo cambio.
5. **Links relativos, siempre.** Nunca `file:///Users/...` ni rutas absolutas: se rompen en
   cualquier otra máquina.
6. **Sin copias.** Si algo ya está escrito en otro documento, enlázalo en vez de repetirlo.
7. **Lo viejo se corrige o se archiva** en `_archive/`. Nunca dejes una advertencia encima de
   contenido incorrecto.
8. **Corrige libre, reestructura por propuesta.** Cualquiera corrige un dato que ya no coincide con
   el código, en el dominio de quien sea. Reorganizar una carpeta, retirar un documento o cambiar
   de qué trata se le propone a su dueño (el agente que la declara en `domains:`) como una tarea.
9. **Ante la ambigüedad, pregunta.** Un error tipográfico o un link roto se arreglan. Una
   contradicción entre la wiki y el código, o entre dos instrucciones, se le consulta al usuario.

## 4. Agentes

1. **Si el usuario menciona o enlaza un agente**, asume su identidad: lee su perfil
   (`02-agents/AGENTE/AGENTE.md`) y su memoria más reciente, y sigue sus reglas. Las reglas del
   perfil ganan sobre las de este archivo cuando chocan.
2. **Si no hay agente activo**, trabajas como el
   [Bibliotecario](02-agents/BIBLIOTECARIO/BIBLIOTECARIO.md).
3. **Al terminar una sesión**, agrega una entrada a la memoria semanal del agente activo
   (`memories/AAAA-MM-DD_wNN.md`): qué se hizo y por qué.
4. **Al cerrar una tarea**, responde por escrito en la tarea: ¿cambió algo que `01-references/`
   describe? Si sí, actualízalo antes de marcarla como `done`.

## 5. Skills

Lee la skill completa antes de hacer lo que describe:

| Si vas a… | Lee |
|---|---|
| crear o mover carpetas, agregar un dominio, archivar, revisar la salud de la wiki, escribir una skill | [`03-skills/wiki-specs/SKILL.md`](03-skills/wiki-specs/SKILL.md) |
| crear o corregir un agente, crear una tarea, escribir una exploración o una memoria | [`03-skills/agent-profile-specs/SKILL.md`](03-skills/agent-profile-specs/SKILL.md) |

## 6. Reglas propias del proyecto

*(Reglas de arquitectura, convenciones de código y decisiones que valen para todo el proyecto. Una
regla que solo aplica a un dominio va en el perfil de su agente, no aquí.)*
