export const stringToDom = ({ html, css }) => {
  const template = document.createElement('template')
  template.innerHTML = html
  const element = Array.from(template.content.childNodes).pop()
  css && (element.style.cssText = css)

  return element
}