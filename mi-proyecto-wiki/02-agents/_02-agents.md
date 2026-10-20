# 02 — Agentes

Cada agente es un especialista con una carpeta propia:

```text
AGENTE/
├── AGENTE.md       # perfil: identidad, dominio, reglas, skills, tareas
├── tasks/          # trabajo planeado, un archivo por tarea
├── explorations/   # investigaciones y análisis que todavía no son verdad
└── memories/       # bitácora semanal: qué se hizo y por qué
```

Para usar uno, menciónalo en la conversación (*"Bibliotecario, …"*) o enlaza su perfil. Para crear
uno, sigue [agent-profile-specs](../03-skills/agent-profile-specs/SKILL.md).

## Agentes

| Agente | Rol | Dominios |
|---|---|---|
| [Bibliotecario](BIBLIOTECARIO/BIBLIOTECARIO.md) | Agente por defecto. Cuida la estructura de la wiki, las carpetas sin dueño y las sesiones sin agente asignado. | `_archive/`, `04-business/`, `05-how-to/` |
