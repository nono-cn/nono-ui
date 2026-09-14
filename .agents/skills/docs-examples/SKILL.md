---
name: docs-examples
description: Crea o actualiza documentación Nuxt-style y ejemplos copiables de componentes Vue en este repositorio.
---

# Documentación Nuxt-style de componentes

Usa esta skill cuando el usuario pida documentar un componente Vue de esta librería. Conserva los cambios existentes y documenta únicamente el contrato público real del componente. No inventes props, eventos, slots, tipos, valores por defecto ni enlaces.

## Descubrimiento y estructura

Antes de escribir, inspecciona:

- `src/components/ui/<Component>/index.ts` para props, tipos, emits, slots, expose y configuraciones exportadas.
- La implementación `.vue`, defaults, hijos y composables para confirmar el comportamiento observable, el elemento raíz y el paso de attrs.
- Los tests existentes para comprobar accesibilidad, estados e interacciones ya soportadas.
- La infraestructura existente en `docs/components`, `docs/config/component-docs.ts` y `docs/components/examples` antes de crear componentes genéricos nuevos.

Cada componente documentado debe tener un descriptor en `docs/config/components/<slug>.ts` con esta información:

- `slug`, `title`, `description` e `importPath`.
- Ejemplos separados para `usage`, `examples` y `accessibility`.
- API con `props`, `emits`, `slots`, `expose` y `configs` opcional.

No crees una página independiente por componente ni rutas individuales. La página genérica se registra mediante el descriptor y usa la ruta canónica `/components/:slug`. Registra solo componentes con documentación real para evitar enlaces muertos.

## Orden de la página

La página debe seguir siempre este orden:

`Título y descripción → Import → Usage → Examples → Accessibility → API`

- **Título y descripción:** muestra únicamente el título y la descripción del componente. No añadas el kicker azul `Component`.
- **Import:** sección independiente con el import público del componente.
- **Usage:** ejemplo básico y común del componente.
- **Examples:** ejemplos separados para las props relevantes, especialmente cuando cambien el resultado visual o el comportamiento.
- **Accessibility:** recomendaciones y ejemplos de accesibilidad cuando el componente renderice contenido semántico, interactivo o iconos.
- **API:** referencia de la API pública, con tablas solo cuando tengan datos.

El sidebar derecho debe comenzar en `Import`; no debe mostrar `Overview`. El ancla `overview` y la navegación móvil pueden conservarse si ya forman parte de la infraestructura.

## Ejemplos copiables

Crea los ejemplos en `docs/components/examples/<component>/` y reutiliza `ComponentExample.vue` y `example-code.ts` cuando estén disponibles.

- Coloca los controles encima de la preview.
- Mantén la preview en el centro y el código debajo.
- El código mostrado debe ser un snippet completo y ejecutable de Vue (`script setup`, imports, estado y template).
- Sincroniza siempre el snippet con los controles y la preview.
- Incluye copiar al portapapeles y restablecer valores iniciales en ejemplos interactivos.
- El código es solo lectura: no uses textarea, edición directa, compilación runtime ni playground editable.
- Retira ejemplos de APIs eliminadas y no importes primitivas unstyled salvo que el contrato público lo requiera.
- Para una unión cuyos miembros producen resultados visuales distintos, usa ejemplos separados; no fuerces un único ejemplo genérico.

## Tablas API

Usa `ApiTable` y el modelo actual del descriptor:

```ts
interface ComponentApiConfig {
  props: ApiTableRow[]
  configs?: ApiTableConfig[]
  emits: ApiTableRow[]
  slots: ApiTableRow[]
  expose: ApiTableRow[]
}

interface ApiTableConfig {
  id: string
  title: string
  rows: ApiTableRow[]
  description?: string
  typeLabel?: string
  showDefault?: boolean
}
```

Reglas:

- No renderices una tabla cuyo array esté vacío. En particular, no muestres `Emits`, `Slots` o `Expose` si no tienen miembros.
- Incluye en `Props` los valores reales de las uniones directamente en la columna de tipo, por ejemplo `'xs' | 'sm' | 'md' | 'lg'`.
- No crees una tabla genérica de tipos por defecto. Añade una tabla en `configs` solo cuando exista una configuración pública reutilizable que merezca explicación propia.
- No dupliques en una tabla de configuración todas las props ya descritas en `Props` si basta con enlazar o explicar su composición.
- Documenta los defaults reales y marca las props requeridas.
- Usa `typeLink` para anchors locales y `typeParts` cuando solo una parte de un tipo compuesto deba enlazarse.
- Para la prop `ui`, documenta cada resolver únicamente si forma parte del contrato público y enlaza sus contextos reales.
- En slots, usa `type-label="slotProps"` solo cuando existan props de slot documentadas.
- Describe comportamiento observable y accesibilidad, no solo nombres de tipos.

### IconConfig

`IconConfig` es `IconProps & HTMLAttributes`.

Cuando se documente `Icon`, usa una tabla `IconConfig` dentro de `api.configs` para explicar esa composición sin repetir innecesariamente las props:

- `IconProps` incluye `name`, `size` y `color`; enlázalo con `/components/icon#props`.
- `HTMLAttributes` incluye atributos HTML y ARIA, `class`, `style` y listeners nativos como `onClick` u `onFocus`.
- Esos listeners son eventos DOM que se aplican al SVG raíz; no son `emits` propios de `Icon`.
- Si otro componente acepta tanto un nombre directo como una configuración, documenta el tipo `IconName | IconConfig` y muestra ambas formas sin afirmar que solo acepta `IconConfig`.
- Cuando otra prop use `IconConfig`, enlázala con `/components/icon#icon-config`.
- Usa el anchor `/components/icon#icon-config` para identificar la tabla de configuración completa.

Para configuraciones equivalentes de otros componentes, conserva el mismo criterio y usa únicamente rutas de componentes que estén registradas.

## Verificación

Después de modificar la documentación:

1. Ejecuta `scripts/quick_validate.py .agents/skills/docs-examples` desde la skill `skill-creator`.
2. Ejecuta Prettier y ESLint sobre los archivos de documentación modificados.
3. Ejecuta `npm run typecheck` y `npm run build:docs`.
4. Revisa manualmente la ruta `/components/<slug>`:
   - las secciones aparecen en el orden indicado;
   - los controles actualizan preview y código;
   - el código no es editable;
   - copiar y restablecer funcionan;
   - las tablas muestran todos los miembros públicos aplicables;
   - los attrs y atributos ARIA llegan al elemento raíz.

Distingue los fallos preexistentes de los introducidos por el cambio y no afirmes que una comprobación pasa si no se ha ejecutado.
