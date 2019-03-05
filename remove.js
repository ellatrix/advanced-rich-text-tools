import { I18N_NAMESPACE } from './constants'

const { __ } = window.wp.i18n
const { createElement } = window.wp.element
const { registerFormatType } = window.wp.richText
const { InspectorControls } = window.wp.editor
const { PanelBody, Button } = window.wp.components

const type = 'advanced/remove-formatting'

registerFormatType(type, {
  title: __('Remove formatting', I18N_NAMESPACE),
  tagName: 'span',
  className: 'remove',
  edit ({ isActive, value, onChange }) {
    return (
      createElement(InspectorControls, null,
        createElement(PanelBody, {
          title: __('Remove Formatting', I18N_NAMESPACE)
        },
        createElement(Button, {
          isDefault: true,
          onClick: () => onChange({ ...value, formats: Array(value.formats.length) })
        },
        __('Remove All formatting', I18N_NAMESPACE)
        )
        )
      )
    )
  }
})
