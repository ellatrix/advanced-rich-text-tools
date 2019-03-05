import { I18N_NAMESPACE } from './constants'

const { __ } = window.wp.i18n
const { createElement, Fragment } = window.wp.element
const { registerFormatType, toggleFormat } = window.wp.richText
const { RichTextToolbarButton, RichTextShortcut } = window.wp.editor;

[
  {
    name: 'sup',
    title: __('Superscript', I18N_NAMESPACE),
    character: '.'
  },
  {
    name: 'sub',
    title: __('Subscript', I18N_NAMESPACE),
    character: ','
  }
].forEach(({ name, title, character, icon }) => {
  const type = `advanced/${name}`

  registerFormatType(type, {
    title,
    tagName: name,
    className: null,
    edit ({ isActive, value, onChange }) {
      const onToggle = () => onChange(toggleFormat(value, { type }))

      return (
        createElement(Fragment, null,
          createElement(RichTextShortcut, {
            type: 'primary',
            character,
            onUse: onToggle
          }),
          createElement(RichTextToolbarButton, {
            title,
            onClick: onToggle,
            isActive,
            shortcutType: 'primary',
            shortcutCharacter: character,
            className: `toolbar-button-with-text toolbar-button__advanced-${name}`
          })
        )
      )
    }
  })
})
