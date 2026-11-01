---
name: test
description: "Crea o completa tests exhaustivos con Vitest para componentes Vue de este repositorio. Úsala cuando se pida crear, añadir, ampliar o corregir tests de componentes, especialmente para cubrir todas las props, el paso de props de Reka UI, emits, attrs de raíz, slots y contratos de contexto."
---

# Tests de componentes

Crear o completar el test del componente sin modificar el trabajo no relacionado del usuario. Seguir las convenciones de Vitest y Vue Test Utils del repositorio.

## 1. Inspeccionar primero el contrato

Antes de escribir tests, inspeccionar el componente objetivo, su `index.ts`, las primitivas de Reka UI importadas, los tipos de props y emits, los componentes hijos, los composables y los tests existentes. Crear una lista de comprobación con:

- cada prop pública, su tipo, valor por defecto, valores de enumeración, booleanos, `undefined`, casos límite e interacciones con otras props;
- qué props pertenecen a esta librería y cuáles se pasan a Reka UI;
- cada emit público, su payload, acción que lo dispara, comportamiento controlado/no controlado y si se reenvía desde Reka UI;
- el elemento raíz y si se reenvían attrs arbitrarios, `class`, `style` y atributos de accesibilidad;
- cada slot con nombre, su contenido alternativo, comportamiento de sustitución y props del slot;
- cada factory de contexto, contexto proporcionado/inyectado, hijo que dependa del contexto y todos sus estados relevantes.

Tratar la implementación fuente y las definiciones de tipos como el contrato. No inventar valores que el componente no pueda aceptar. Para tipos unión, cubrir todos sus miembros; para valores opcionales, cubrir tanto el valor explícito como `undefined`; para booleanos, cubrir `true`, `false` y el valor por defecto cuando sea relevante. Añadir casos límite y de interacción cuando la implementación tenga ramas para ellos.

## 2. Localizar o crear el test

Usar `tests/components/<Component>.test.ts`. Si el archivo ya existe, conservar sus tests y los cambios del usuario; añadir únicamente la cobertura que falte y hacer las modificaciones mínimas necesarias. No sustituir el archivo completo ni reformatear secciones no relacionadas.

Usar la configuración establecida:

```ts
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Component, type ComponentProps } from '@/components/Component'

function mountComponent(options: MountingOptions<ComponentProps> = {}) {
  return mount(Component, options)
}
```

Usar `it.each` para matrices exhaustivas de valores. Preferir comportamiento observable, payloads emitidos, props de componentes, atributos, clases y slots renderizados frente a snapshots. Usar los marcadores estables `data-test-*-root` que ya existan en el componente; si no existe ninguno, revisar la convención de los tests antes de elegir un selector.

## 3. Estructura obligatoria del test

Organizar el test bajo estas secciones y en este orden cuando sean aplicables:

```ts
describe('Component', () => {
  describe('props', () => {})
  describe('attrs', () => {})
  describe('emits', () => {})
  describe('slots', () => {})
  describe('context contract', () => {})
})
```

### Props

Crear `describe('<prop>')` para cada prop, sin agrupar varias props públicas en un mismo caso. Cubrir todos los valores declarados posibles y el valor por defecto. Comprobar el contrato real:

- Para una prop propia de la librería, comprobar el comportamiento correcto: texto renderizado, clases, estilos, estado ARIA, visibilidad, elemento, valores derivados o interacción.
- Para una prop de Reka UI, comprobar que el wrapper pasa el valor normalizado al componente Reka subyacente correcto. Inspeccionar las props del hijo cuando el DOM no demuestre el paso. Incluir la normalización por defecto y las actualizaciones importantes.
- Para props con comportamiento dependiente, usar una matriz que combine las props relevantes y probar cada rama, incluidos los estados `disabled`, `loading` y controlado cuando existan.
- Para props de objeto o función como `ui`, probar cada clave sobre su nodo correspondiente usando `testAttrs`. Cada llamada debe comprobar `id`, atributos ARIA, clases y estilos; no limitarse a comprobar que se invocó el resolver.
- No comprobar la prop `slotProps` ni inspeccionar sus valores o efectos.

No considerar cobertura el simple hecho de montar el componente con una prop. Comprobar lo que el usuario del componente puede observar o lo que el wrapper debe pasar a Reka.

### Atributos de raíz

Cuando el componente reenvíe attrs arbitrarios a su raíz, importar y usar el helper del repositorio:

```ts
import { testAttrs } from '../utils/testAttrs'

describe('attrs', () => {
  testAttrs({
    text: 'forwards arbitrary attrs, class and style to root',
    id: '[data-test-component-root]',
    mount: (attrs) => mountComponent({ attrs }),
  })
})
```

Usar el selector real de la raíz. Si los attrs se consumen intencionadamente o se reenvían a un elemento que no es la raíz, probar ese contrato explícito en lugar de forzar `testAttrs`.

### Emits

Crear `describe('<event>')` para cada emit público. Cubrir todas las formas del payload y todos los caminos que lo disparen.

- Para un emit propio de la librería, disparar la acción visible para el usuario y comprobar el nombre del evento, el payload exacto, el número de emisiones y los casos en los que se suprime.
- Para un emit de Reka UI, comprobar el bridge del evento público del wrapper, el payload exacto y cualquier conversión entre el evento de Reka y el evento del wrapper. No comprobar únicamente que la primitiva interna emitió.
- Probar tanto las interacciones del usuario como las actualizaciones externas de props/modelo cuando el componente admita estado controlado.
- Incluir `disabled`, `loading`, `readonly` u otras condiciones que supriman un evento.

Usar `await` para triggers, `setProps` y otras actualizaciones asíncronas. Preferir `toEqual` para arrays de payload exactos y `toHaveLength` cuando solo importe la cantidad.

### Slots

Crear `describe('<slot>')` para cada slot con nombre declarado y para el slot por defecto. Renderizar un elemento y texto distintivos para cada slot y comprobar que aparecen en la ubicación prevista. Probar también cada regla de contenido alternativo/sustitución:

- un slot proporcionado sustituye su icono, etiqueta, spinner o contenido alternativo;
- los slots ausentes renderizan el contenido alternativo documentado;
- los slots condicionales aparecen o desaparecen según la prop o el estado relevante;
- las props del slot se exponen con los valores esperados cuando el slot las acepta.

Usar `h` o una pequeña función de renderizado, de acuerdo con los tests existentes. No probar únicamente que el componente se monta con un objeto `slots` vacío.

### Contrato de contexto

Después de props, attrs, emits y slots, volver a comprobar todos los contratos de contexto. Para cada factory de contexto exportada o función que produzca contexto, añadir matrices para cada estado de entrada relevante y comprobar el objeto devuelto completo, no solo una propiedad. Incluir estados por defecto, `false`/`true`, vacío y límite cuando sean aplicables.

Si un hijo consume el contexto, montar la composición padre-hijo y comprobar que el hijo recibe el estado derivado esperado. Si existen varios contextos, probar cada uno por separado y sus combinaciones relevantes. Mantener la aserción alineada con el tipo de contexto TypeScript exportado, usando `satisfies` cuando ya lo utilicen los tests del repositorio.

## 4. Verificación

Ejecutar primero el test enfocado:

```powershell
npm test -- tests/components/<Component>.test.ts
```

Después ejecutar `npm run typecheck` si los cambios del test afectan a tipos o contratos de contexto. Corregir fallos causados por el test nuevo o por la implementación solo cuando el usuario haya pedido una corrección; en caso contrario, informar claramente de la discrepancia de implementación. Mantener el archivo de test formateado con las convenciones de Prettier del repositorio.

Antes de terminar, comparar la lista de comprobación de la fuente con las secciones del test e indicar cualquier rama intencionadamente no testeable o dependiente del entorno. No afirmar que la cobertura es exhaustiva sin comprobar props, emits, attrs, slots y contextos frente al código fuente.
