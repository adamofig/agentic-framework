---
name: agent-profile-specs
description: Cómo crear, corregir y trabajar como un agente de la wiki — carpeta del agente, perfil con frontmatter y 8 secciones, dominios que mantiene, tareas, exploraciones y memorias semanales. Úsala para "crea un agente", "corrige este perfil", "crea una tarea", al escribir una memoria o al abrir una exploración.
---

# Agent Profile Specs

Un agente es un especialista con nombre: sabe de un área del proyecto, responde por su
documentación y lleva su propio registro de trabajo. Su perfil es lo que convierte a una IA
genérica en ese especialista al inicio de una sesión.

| Vas a… | Ve a |
|---|---|
| Crear un agente | §1, §2 y [templates/AGENTE.md](templates/AGENTE.md) |
| Corregir un perfil que no cumple | §2 |
| Trabajar como un agente | §3 |
| Crear o cerrar una tarea | §4 y [templates/tarea.md](templates/tarea.md) |
| Abrir o concluir una exploración | §5 y [templates/exploracion.md](templates/exploracion.md) |
| Escribir la memoria de la sesión | §6 y [templates/memoria.md](templates/memoria.md) |

## 1. Crear un agente

1. Confirma con el usuario el **nombre**, el **área** de la que sabe y qué carpetas de
   `01-references/` mantendrá. Si su área se superpone con la de otro agente, dilo antes de crear.
2. Crea la carpeta `02-agents/NOMBRE/` (mayúsculas, sin número):

   ```text
   NOMBRE/
   ├── NOMBRE.md        # perfil
   ├── tasks/
   ├── explorations/
   └── memories/
   ```

3. Copia [templates/AGENTE.md](templates/AGENTE.md) como `NOMBRE.md` y complétalo (§2).
4. Si mantiene un dominio que todavía no existe, créalo según `wiki-specs` §6.
5. Agrega la fila del agente en `02-agents/_02-agents.md`.

## 2. El perfil

### Frontmatter

```yaml
---
name: "Cobrador"
title: "Especialista en pagos y facturación"       # menos de 15 palabras
description: "30 a 60 palabras: qué sabe, de qué responde y cuándo conviene llamarlo."
domains:                                           # carpetas que MANTIENE (relativas a la raíz de la wiki)
  - path: "01-references/02-pagos-(cobrador)/"
    description: "Cobros, suscripciones, webhooks del proveedor y facturación."
skills:                                            # skills que usa (relativas al perfil)
  - name: "wiki-specs"
    path: "../../03-skills/wiki-specs/SKILL.md"
    description: "Estructura de la wiki."
tasks:                                             # índice de sus tareas (relativas al perfil)
  - number: 1
    priority: 2                                    # 1 baja · 2 media · 3 alta · 4 importante · 5 crítica
    status: "pending"                              # pending | in_progress | in_review | done | paused
    name: "Documentar el flujo de reembolsos"
    path: "tasks/01-documentar-reembolsos.md"
    description: "Una frase sobre qué resuelve."
---
```

- **`domains:`** son las carpetas de las que el agente **responde**, no las que consulta. Su `path`
  es relativo a la **raíz de la wiki**, con barra final. Un agente sin `domains:` es válido: consulta
  documentación, no la mantiene.
- **`skills:`** y **`tasks:`** usan rutas relativas al **perfil**.
- Si el perfil tiene otros campos (por ejemplo, IDs de una plataforma que lo sincroniza), se
  respetan tal cual: no los borres ni los inventes.

### Las 8 secciones

| # | Sección | Qué lleva | Reglas |
|---|---|---|---|
| 1 | Identidad y responsabilidades | "Eres NOMBRE, …" en segunda persona, y la lista de lo que hace. | Corta. Es lo primero que se lee. |
| 2 | Dominio y reglas | Glosario, modelos de datos, flujo principal, reglas de arquitectura de su área, archivos de código clave. | **Único lugar donde se enlaza código fuente.** |
| 3 | Conocimiento | Abre con "Mi dominio" (lo que mantiene y el compromiso de mantenerlo); después, su índice de documentos de consulta. | Solo links a `.md`. Cada link con 20 a 60 palabras de descripción. |
| 4 | Skills | Proyección legible del `skills:` del frontmatter, con una línea de cuándo usar cada una. | Solo links a `SKILL.md`. |
| 5 | Exploraciones | Links a `explorations/` con su estado. | Solo links a `.md`. |
| 6 | Tareas | Proyección legible del `tasks:` del frontmatter. | El archivo de la tarea manda sobre el estado (§4). |
| 7 | Memorias | Link a la semana activa y a las anteriores relevantes. | |
| 8 | Informe directo | Estado actual, prioridad del período, contexto y qué hacer si no hay instrucciones. | **Lo escribe la persona dueña del agente, nunca la IA.** |

**Por qué los links llevan descripción larga:** "Lógica de cola" no le dice nada a una IA, que
decide qué abrir por coincidencia de significado. Una descripción de 2 a 4 frases que nombre las
entidades, temas y casos concretos hace que el link se abra cuando corresponde. Más de un párrafo ya
es repetir el documento.

## 3. Trabajar como un agente

Cuando el usuario menciona o enlaza un agente:

1. Lee su perfil completo y su memoria semanal más reciente.
2. Habla y decide como ese agente. Sus reglas (§2 y §8) ganan sobre las del `AGENTS.md` cuando
   chocan.
3. Si el trabajo toca el dominio de otro agente, corrige datos que ya no coinciden con el código,
   pero propón al dueño (como tarea en su carpeta) cualquier reestructuración.
4. Al terminar, escribe la memoria **solo en la carpeta de este agente** (§6).

Sin agente mencionado, trabajas como el Bibliotecario.

## 4. Tareas

Una tarea es trabajo planeado, en `tasks/NN-slug.md`, numerado correlativamente dentro del agente.

```yaml
---
status: "pending"      # pending | in_progress | in_review | done | paused
priority: 2            # 1..5
---
```

- `in_review`: el trabajo está hecho y espera la aprobación de una persona.
- **El archivo de la tarea manda** sobre `status` y `priority`. Cuando cambies uno, actualiza
  también su entrada en el `tasks:` del perfil.
- El cuerpo sigue [templates/tarea.md](templates/tarea.md): objetivo, contexto, pasos con
  checkboxes, y un cierre.
- **Al cerrar** (antes de pasar a `done` o `in_review`), completa la sección "Cierre" de la tarea:
  qué cambió, y si eso afecta algo que `01-references/` describe. Si lo afecta, actualiza el
  documento en ese momento y enlázalo. Este paso es el que mantiene viva la wiki.
- Una tarea para otro agente se crea en la carpeta de ese agente, no en la propia.

## 5. Exploraciones

Una exploración es una investigación que todavía no es verdad: comparar opciones, entender un bug,
probar una idea. Va en `explorations/NN-slug.md`.

```yaml
---
status: "open"         # open | concluded | discarded
---
```

- Puede estar incompleta, equivocarse y cambiar de opinión. Por eso no va a `01-references/`.
- **Al concluir**, escribe la conclusión arriba del todo. Si es estable y describe el sistema,
  **promuévela**: escribe o corrige el documento en `01-references/` y enlázalo desde la
  exploración. La exploración queda como el porqué; la referencia, como el qué.

## 6. Memorias

Una bitácora por semana: `memories/AAAA-MM-DD_wNN.md`, con la fecha del lunes y el número de
semana ISO (`2026-10-19_w43.md`).

Cada avance agrega una entrada al final, con su hora. Una entrada tiene dos partes:

```markdown
## 2026-10-19 10:32

Los cobros fallidos no avisaban a nadie y nos enterábamos por los clientes.

---

Agregué el webhook `invoice.payment_failed` en `acme-api/src/payments/webhooks.ts` y documenté el
flujo en [Reintentos de cobro](../../../01-references/02-pagos-(cobrador)/03-reintentos.md). Falta
probar con el modo de pruebas del proveedor (tarea 04).
```

1. **Arriba, el porqué**, en lenguaje simple, de 1 a 3 frases, que se entienda sin contexto.
2. **Abajo, después de `---`, qué se hizo**: archivos, decisiones, comandos, lo que quedó pendiente.
   Aquí sí se puede ser técnico.

La memoria es para que la próxima sesión arranque sin preguntar. Escribe lo que necesitarías leer
tú si llegaras mañana sin recordar nada.
