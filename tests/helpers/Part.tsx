import type { FunctionalComponent } from 'vue'

interface PartProps {
  name: string
  title?: string | boolean
  caption?: string | boolean
}

function unbreakableHyphens(text: string) {
  return text.replaceAll('-', '-⁠')
}

export const Part: FunctionalComponent<PartProps> = (props, { slots }) => {
  const text = (value?: string | boolean) => (value === true ? props.name : value)
  const title = text(props.title)
  const caption = text(props.caption)

  return (
    <figure data-showcase-part={props.name}>
      {title && <span data-showcase-title>{title}</span>}
      {slots.default?.()}
      {caption && <figcaption>{unbreakableHyphens(caption)}</figcaption>}
    </figure>
  )
}

Part.props = {
  name: { type: String, required: true },
  title: { type: [String, Boolean], default: false },
  caption: { type: [String, Boolean], default: false },
}
