# Agentic Framework

Una wiki en Markdown que tu IA lee, respeta y mantiene al día. Funciona con Claude Code, Codex,
Gemini CLI o cualquier asistente que lea un `AGENTS.md`. No necesita servidor, base de datos ni
instalar nada: son carpetas y archivos `.md`.

## Qué resuelve

Una IA sin contexto adivina, y con demasiado contexto se pierde. La documentación de siempre no
ayuda: nadie la actualiza y a los tres meses describe un sistema que ya no existe.

Este framework le da a la IA cuatro cosas:

1. **Un mapa barato.** Cada carpeta tiene un índice (`_carpeta.md`) con una línea por archivo. La IA
   baja por la wiki leyendo índices, no abriendo todo.
2. **Una sola verdad.** `01-references/` describe el sistema **como es hoy**. Los experimentos, los
   planes y la historia viven en otro lado, así que lo que está ahí se puede creer.
3. **Dueños.** Cada área de la documentación tiene un agente que responde por ella. Una carpeta con
   dueño no se pudre en silencio.
4. **Memoria.** Cada agente tiene sus tareas, sus exploraciones y una bitácora semanal. La siguiente
   sesión empieza donde terminó la anterior.

Y una regla que sostiene todo: **quien cambia el código actualiza la documentación en el mismo
trabajo**, no "después".

## Qué hay aquí

```text
agentic-framework/
├── README.md                 ← estás aquí
└── mi-proyecto-wiki/         ← la plantilla: cópiala
    ├── AGENTS.md             ← las reglas que la IA lee en cada sesión
    ├── CLAUDE.md, GEMINI.md  ← solo importan AGENTS.md
    ├── _mi-proyecto-wiki.md  ← índice raíz
    ├── 01-references/        ← la verdad: cómo funciona el sistema hoy
    ├── 02-agents/            ← agentes: perfil, tareas, exploraciones, memorias
    │   └── BIBLIOTECARIO/    ← agente por defecto
    ├── 03-skills/            ← cómo hacer cosas (formato SKILL.md)
    │   ├── wiki-specs/            ← cómo se arma y se mantiene la wiki
    │   └── agent-profile-specs/   ← cómo se crea y se trabaja con un agente
    ├── 04-business/          ← contexto de negocio y producto
    ├── 05-how-to/            ← guías paso a paso
    └── _archive/             ← lo que ya no aplica
```

Lo obligatorio son las cuatro carpetas numeradas y el `AGENTS.md`. Lo demás es recomendado.

## Empezar en 3 pasos

1. **Copia la plantilla** y ponle el nombre de tu proyecto con el sufijo `-wiki`:

   ```bash
   cp -R agentic-framework/mi-proyecto-wiki ~/code/acme-wiki
   ```

2. **Ábrela con tu IA y pídele:** *"Bibliotecario, haz tu tarea 01"*. Te va a preguntar por el
   proyecto, renombrar el índice raíz, completar el `AGENTS.md` y proponerte los primeros dominios
   de documentación a partir de tu código.

3. **Trabaja normal.** Cuando quieras que una sesión la lleve un especialista, menciónalo
   (*"Backend, revisa este endpoint"*) o pídele al Bibliotecario que cree uno nuevo.

## Dónde poner la wiki

| Modo | Cuándo | Cómo |
|---|---|---|
| **Dentro del repo** | Un solo repositorio | `acme/acme-wiki/` |
| **Carpeta hermana** | Varios repos (frontend, backend…) | `~/code/acme-wiki/` junto a `~/code/acme-api/` y `~/code/acme-web/`, versionada como su propio repo |

En los dos casos, agrega esta línea al `AGENTS.md` (o `CLAUDE.md`) de cada repo de código, para que
la IA encuentre la wiki aunque la abras desde el código:

```markdown
La documentación del proyecto vive en `../acme-wiki/`. Antes de trabajar, lee `../acme-wiki/AGENTS.md` y sigue sus reglas.
```

En el modo hermana, abre la wiki junto al código: con un workspace de VS Code que incluya las dos
carpetas, o con `claude --add-dir ../acme-wiki`.

## Cómo evoluciona

| Cuando… | La IA… |
|---|---|
| cambia código que `01-references` describe | actualiza ese documento en el mismo trabajo |
| investiga algo | lo escribe en `explorations/` del agente; si concluye algo estable, lo pasa a `01-references` |
| planea trabajo | crea una tarea en `tasks/` del agente; al cerrarla revisa si cambió algo que `01-references` describe |
| termina una sesión | anota qué hizo y por qué en la memoria semanal del agente |
| encuentra un documento que ya no aplica | lo corrige o lo mueve a `_archive/`, nunca le pone una advertencia encima |

De vez en cuando, revisa la salud de la wiki (links rotos, rutas absolutas, carpetas sin índice):

```bash
node 03-skills/wiki-specs/scripts/check-wiki.mjs .
```

Necesita Node 18 o más nuevo y nada más.

## Opcional

- **Skills nativas en Claude Code.** El `AGENTS.md` ya le dice a cualquier IA cuándo leer cada
  skill. Si además quieres que Claude Code las descubra solo al abrir la wiki:
  `mkdir -p .claude && ln -s ../03-skills .claude/skills`.
- **Obsidian.** La wiki es un vault válido. Con el plugin *Folder Notes* configurado a
  `_{{folder_name}}`, al hacer clic en una carpeta se abre su índice.

## Actualizar el framework

Tu `AGENTS.md` ya es tuyo: lo editaste para tu proyecto. Lo que se actualiza desde aquí son las dos
skills. Reemplaza `03-skills/wiki-specs/` y `03-skills/agent-profile-specs/` por las nuevas, y
compara tu `AGENTS.md` con el de la plantilla para ver si hay alguna regla nueva.

## Licencia

[MIT](LICENSE). Úsalo, cámbialo y compártelo.
