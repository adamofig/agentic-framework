---
status: "pending"
priority: 5
---

# Tarea 01: Inicializar la wiki para este proyecto

- **Agente**: [Bibliotecario](../BIBLIOTECARIO.md)
- **Origen**: viene con la plantilla. Es lo primero que se hace en una wiki nueva.
- **Relacionadas**: [wiki-specs](../../../03-skills/wiki-specs/SKILL.md),
  [agent-profile-specs](../../../03-skills/agent-profile-specs/SKILL.md)

## Objetivo

Que la wiki deje de ser una plantilla: que sepa qué proyecto documenta, dónde está su código y qué
áreas tiene, y que una IA abierta en el repo de código la encuentre sola.

## Contexto

La persona copió la plantilla y la renombró (o va a hacerlo). Todo lo que diga *Mi Proyecto*,
`mi-proyecto-wiki` o esté entre `*(…)*` es de relleno. No inventes nada del proyecto: pregunta o
léelo del código.

## Pasos

- [ ] **Preguntar** al usuario, en una sola tanda:
  - nombre del proyecto y qué hace, en dos o tres frases;
  - para quién es y qué problema resuelve;
  - dónde está el código respecto de esta wiki (dentro del repo o carpeta hermana; qué repos);
  - en qué idioma quiere la wiki.
- [ ] **Nombre**: si la carpeta sigue llamándose `mi-proyecto-wiki`, proponer renombrarla a
  `<proyecto>-wiki`. Renombrar `_mi-proyecto-wiki.md` a `_<carpeta>.md` y corregir todos los links
  que apuntan a él (`AGENTS.md`, el perfil del Bibliotecario).
- [ ] **AGENTS.md**: cambiar el título y completar la §1 con lo que contó el usuario. Dejar la §6
  con las reglas de proyecto que mencione; si no menciona ninguna, dejar el texto de relleno.
- [ ] **Índice raíz**: escribir la descripción del proyecto.
- [ ] **04-business**: crear `01-producto.md` con el qué, para quién y por qué, y agregarlo al
  índice.
- [ ] **Dominios**: leer la estructura del código (carpetas principales, módulos, servicios) y
  proponer al usuario los primeros dominios de `01-references/` (entre 3 y 7). Para cada uno, decir
  si conviene que tenga un agente dueño o si lo cuida el Bibliotecario por ahora. Crear solo lo que
  el usuario confirme: las carpetas con su índice, y los agentes según `agent-profile-specs`.
- [ ] **Conectar el código**: en el `AGENTS.md` (o `CLAUDE.md`) de cada repo de código, agregar una
  línea que diga dónde está la wiki con ruta relativa y que hay que leer su `AGENTS.md` antes de
  trabajar. Si el archivo no existe, crearlo con esa línea. Pedir confirmación antes de tocar
  repos de código.
- [ ] **Revisar**: correr `node 03-skills/wiki-specs/scripts/check-wiki.mjs .` y dejarlo sin
  problemas.
- [ ] **Memoria**: escribir la primera memoria semanal del Bibliotecario y enlazarla en su §7.

## Cierre

*(Se completa antes de pasar a `done`.)*

- **Qué cambió**:
- **¿Afecta a `01-references/`?**:
- **Pendiente**:
