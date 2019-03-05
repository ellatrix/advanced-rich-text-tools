import { I18N_NAMESPACE } from './constants'

const { __ } = window.wp.i18n
const { createElement } = window.wp.element
const { registerFormatType, applyFormat, removeFormat, getActiveFormat } = window.wp.richText
const { InspectorControls, PanelColorSettings } = window.wp.editor;

[
  {
    name: 'color',
    title: __('Inline Text Colour', I18N_NAMESPACE)
  },
  {
    name: 'background-color',
    title: __('Inline Background Colour', I18N_NAMESPACE)
  }
].forEach(({ name, title }) => {
  const type = `advanced/${name}`

  registerFormatType(type, {
    title,
    tagName: 'span',
    className: name,
    attributes: {
      style: 'style'
    },
    edit ({ isActive, value, onChange }) {
      let activeColor

      if (isActive) {
        const activeFormat = getActiveFormat(value, type)
        const style = activeFormat.attributes.style

        activeColor = style.replace(new RegExp(`^${name}:\\s*`), '')
      }

      return (
        createElement(InspectorControls, null,
          createElement(PanelColorSettings, {
            title,
            initialOpen: true,
            colorSettings: [
              {
                value: activeColor,
                onChange: (color) => {
                  if (color) {
                    onChange(applyFormat(value, {
                      type,
                      attributes: {
                        style: `${name}:${color}`
                      }
                    }))
                    return
                  }

                  onChange(removeFormat(value, type))
                },
                label: __('Apply colour to the selected text.', I18N_NAMESPACE)
              }
            ]
          })
        )
      )
    }
  })
})
