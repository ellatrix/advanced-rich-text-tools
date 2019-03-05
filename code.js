import { I18N_NAMESPACE } from './constants'

const { __ } = window.wp.i18n
const { createElement, Fragment } = window.wp.element
const { registerFormatType, unregisterFormatType, toggleFormat } = window.wp.richText
const { RichTextToolbarButton, RichTextShortcut } = window.wp.editor

const type = 'core/code'

unregisterFormatType(type)
registerFormatType(type, {
  title: __('Code', I18N_NAMESPACE),
  tagName: 'code',
  className: null,
  edit ({ isActive, value, onChange }) {
    const onToggle = () => onChange(toggleFormat(value, { type }))

    return (
      createElement(Fragment, null,
        createElement(RichTextShortcut, {
          type: 'access',
          character: 'x',
          onUse: onToggle
        }),
        createElement(RichTextToolbarButton, {
          icon: 'editor-code',
          title: __('Code', I18N_NAMESPACE),
          onClick: onToggle,
          isActive,
          shortcutType: 'access',
          shortcutCharacter: 'x'
        })
      )
    )
  }
})
