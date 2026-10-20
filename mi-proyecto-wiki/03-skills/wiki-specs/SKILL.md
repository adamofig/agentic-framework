---
name: wiki-specs
description: Estructura de la wiki agéntica (carpetas, índices _carpeta.md, nombres, links relativos), qué va en cada carpeta, cómo agregar un dominio, archivar, revisar la salud de la wiki con check-wiki.mjs y escribir una skill nueva. Úsala antes de crear, mover o renombrar carpetas o archivos de la wiki.
---

# Wiki Specs

Cómo se arma y se mantiene la wiki. Las reglas que valen en toda sesión están en el `AGENTS.md` de
la raíz; esta skill es el detalle para cuando vas a tocar la estructura.

## 1. Estructura

```text
<proyecto>-wiki/
├── AGENTS.md                # reglas para cualquier IA (fuente única)
├── CLAUDE.md, GEMINI.md     # solo contienen "@AGENTS.md"
├── _<proyecto>-wiki.md      # índice raíz
├── 01-references/           # obligatoria
├── 02-agents/               # obligatoria
├── 03-skills/               # obligatoria
├── 04-business/             # obligatoria
├── 05-how-to/               # recomendada
└── _archive/                # recomendada
```

| Carpeta | Qué va | Quién la lee |
|---|---|---|
| `01-references/` | Cómo funciona el sistema **hoy**: modelos, contratos, flujos, configuración, decisiones vigentes. Dividida por dominio. | Todos. Es la verdad. |
| `02-agents/` | Una carpeta por agente con su perfil, tareas, exploraciones y memorias. | El agente activo, y quien busque historia o contexto de un trabajo. |
| `03-skills/` | Instrucciones para hacer algo concreto, en formato `SKILL.md`. | La IA, cuando va a hacer lo que la skill describe. |
| `04-business/` | Producto, usuarios, modelo de negocio, reglas de dominio no técnicas. | Todos, para entender el porqué. |
| `05-how-to/` | Procedimientos paso a paso para personas. | Personas, sobre todo. |
| `_archive/` | Lo que ya no aplica. | Nadie, salvo para historia. No es referencia. |

**El nombre de la carpeta raíz lleva el del proyecto** (`acme-wiki`, no `docs` ni `wiki`). Así no
choca con otras wikis cuando se abren varias juntas (en Obsidian o en un workspace de VS Code) y se
reconoce de un vistazo. Si la wiki tiene repo propio, el repo se llama igual que la carpeta.

## 2. Índices `_carpeta.md`

**Toda carpeta tiene un índice llamado `_` + el nombre de la carpeta + `.md`**:
`01-references/_01-references.md`, `01-references/02-pagos/_02-pagos.md`. La raíz también:
`_acme-wiki.md`.

El índice es el mapa con el que la IA recorre la wiki sin abrir cada archivo. Contiene:

1. Una o dos frases sobre qué va en esta carpeta y qué no.
2. Una línea por archivo y subcarpeta, con un link relativo y una descripción de una o dos frases
   que diga **qué hay dentro** (temas, entidades, nombres propios), no "en este documento se
   explica…".

Excepciones: la carpeta de un agente usa su perfil (`AGENTE/AGENTE.md`) como índice, y la de una
skill usa su `SKILL.md`. Sus subcarpetas (`tasks/`, `scripts/`, `templates/`…) no llevan índice.

Si creas, mueves, renombras o borras un archivo, el índice de su carpeta se actualiza **en el mismo
cambio**.

## 3. Nombres

- Archivos y carpetas en minúsculas y kebab-case, con un prefijo de dos dígitos que da el orden:
  `01-modelo-de-datos.md`, `02-pagos/`. El número solo ordena: no implica secuencia ni importancia,
  y se puede reacomodar.
- Para agregar algo, usa el siguiente número libre de esa carpeta.
- Las carpetas de agente van en mayúsculas sin número: `02-agents/BACKEND/BACKEND.md`.
- Un dominio con dueño puede llevar su nombre entre paréntesis como ayuda visual:
  `01-references/02-pagos-(cobrador)/`. Lo que vale es el `domains:` del perfil.

## 4. Links

**Siempre relativos al archivo que los contiene.** Nunca `file:///Users/...` ni rutas absolutas:
funcionan en tu máquina y en ninguna otra.

Desde el perfil de un agente (`02-agents/AGENTE/AGENTE.md`):

| Destino | Prefijo | Ejemplo |
|---|---|---|
| Sus propias carpetas | *(directo)* | `tasks/01-mi-tarea.md` |
| La raíz de la wiki | `../../` | `../../01-references/02-pagos/_02-pagos.md` |
| Un repo hermano de la wiki | `../../../` | `../../../acme-api/src/payments/service.ts` |

Regla práctica: cuenta cuántas carpetas tienes que subir desde la del archivo hasta un punto común,
y pon un `../` por cada una.

Si un nombre tiene paréntesis o espacios, el link sigue funcionando en VS Code y Obsidian tal cual:
`[Pagos](../../01-references/02-pagos-(cobrador)/_02-pagos-(cobrador).md)`.

## 5. Qué va dónde

| Tienes… | Va a… |
|---|---|
| Algo verificado sobre cómo funciona el sistema hoy | `01-references/<dominio>/` |
| Una investigación, comparación, prueba de concepto o propuesta | `02-agents/<AGENTE>/explorations/` |
| Trabajo por hacer | `02-agents/<AGENTE>/tasks/` |
| Lo que se hizo en una sesión y por qué | `02-agents/<AGENTE>/memories/` |
| Una regla de negocio, una definición de producto | `04-business/` |
| Pasos para que una persona haga algo | `05-how-to/` |
| Instrucciones para que una IA haga algo repetible | `03-skills/<skill>/SKILL.md` |
| Algo que ya no aplica | `_archive/` |

**Promoción.** El conocimiento nace en el espacio de un agente (una exploración, una tarea) y,
cuando se verifica, pasa a `01-references/`. Ese paso no es automático: ocurre cuando una
exploración concluye algo estable o cuando se cierra una tarea que cambió el sistema. Ahí se
escribe o se corrige el documento de referencia y se enlaza desde la exploración o la tarea.

## 6. Procedimientos

### Agregar un dominio a `01-references/`

1. Elige el siguiente número libre y crea `01-references/NN-tema/` (con `-(agente)` si tiene dueño).
2. Crea su índice `_NN-tema.md`.
3. Agrega la fila en la tabla de dominios de `_01-references.md`.
4. Si tiene dueño, agrega la carpeta al `domains:` del perfil de ese agente.

### Archivar

1. Mueve el archivo a `_archive/` conservando su ruta original
   (`_archive/01-references/02-pagos/03-stripe.md`).
2. Quita su línea del índice de donde estaba y agrega una en `_archive/_archive.md` con la fecha y
   el motivo.
3. Busca quién lo enlazaba y corrige esos links: que apunten al documento vigente que lo reemplaza
   o, si no hay ninguno, que pasen a texto sin link.

### Renombrar o mover

1. Mueve el archivo o la carpeta (con `git mv` si la wiki está en git).
2. Busca la ruta vieja en toda la wiki (y en los `AGENTS.md` de los repos de código) y corrige cada
   link.
3. Actualiza los índices de la carpeta de origen y de la de destino.
4. Corre `check-wiki.mjs` y confirma que no aparecen links rotos nuevos.

### Revisar la salud de la wiki

```bash
node 03-skills/wiki-specs/scripts/check-wiki.mjs <carpeta-de-la-wiki>
```

Reporta links relativos rotos, rutas absolutas, carpetas sin índice y archivos vacíos. Ignora
`_archive/`. No modifica nada. Termina con código 1 si encuentra algo, para poder usarlo en CI.

## 7. Escribir una skill

Una skill es una carpeta en `03-skills/` con un `SKILL.md`:

```markdown
---
name: nombre-en-kebab-case
description: Qué hace y cuándo usarla, en una o dos frases. La IA decide si la lee a partir de esta línea, así que nombra los casos concretos que la disparan.
---

# Nombre

Instrucciones: pasos, reglas, ejemplos. Si hay scripts, cómo se corren y qué devuelven.
```

- Scripts y plantillas van en subcarpetas (`scripts/`, `templates/`) y se mencionan desde el
  `SKILL.md` con rutas relativas a la skill.
- Una skill explica cómo hacer algo. Si en realidad describe cómo funciona el sistema, es una
  referencia y va a `01-references/`.
- Agrega la skill a la tabla de `03-skills/_03-skills.md` y, si una IA debería leerla en
  situaciones concretas, a la tabla de skills del `AGENTS.md`.
- Para que un agente la use, decláralo en el `skills:` de su perfil.
