const { createElement } = window.wp.element
const { registerFormatType } = window.wp.richText
const { InspectorControls } = window.wp.editor
const { PanelBody, Button } = window.wp.components

const type = 'advanced/remove-formatting'

registerFormatType(type, {
  title: 'Remove formatting',
  tagName: 'span',
  className: 'remove',
  edit ({ isActive, value, onChange }) {
    return (
      createElement(InspectorControls, null,
        createElement(PanelBody, {
          title: 'Remove Formatting'
        },
        createElement(Button, {
          isDefault: true,
          onClick: () => onChange({ ...value, formats: Array(value.formats.length) })
        },
        'Remove All formatting'
        )
        )
      )
    )
  }
})
