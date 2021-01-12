import { buildElement } from './buildElement'
import { deepMerge } from '@keg-hub/jsutils'

/**
 * Gets the initial toggle style for the Messenger container Dom Element
 * @function
 * @private
 * @param {Object} config - Options for setting up the Messenger
 * @param {Object} config.speed - Speed of the slide toggle animation
 * @param  {Object} config.side - Side of the browser to toggle on
 * @param  {Object} config.type - Type of animation to use when slide toggling
 *
 * @return {Object} Slide toggle styles, location, position, and transition
 */
const getToggleStyles = ({ speed, side, type }) => {
  return {
    [side]: 0,
    transition: `${side} ${speed}ms ${type}, opacity ${speed}ms ${type}`,
    ...(side === 'left' || side === 'right'
      ? { position: 'fixed', top: 0 }
      : { position: 'fixed' }),
  }
}

/**
 * Converts the defined dom tree into real Dom Elements
 * @function
 * @param {Object} iframe - Virtual representation of the iframe Dom element
 * @param {Object} config - Options for setting up the Messenger
 * @param  {Object} events - Event handlers for interacting with the Messenger
 * @param  {Object} events.onToggle - Event fired when toggling the Messenger
 *
 * @return {Object} container - Root Dom Element of the Messenger
 */
export const convertTreeToDom = (iframe, config, { onToggle }) => {
  const { speed, type } = config.toggle
  return buildElement(
    ...deepMerge(
      [
        'div',
        {
          id: `keg-messenger`,
          className: `keg-messenger`,
          style: deepMerge(getToggleStyles(config.toggle), {
            width: '50vw',
            height: '100vh',
            maxWidth: '50%',
            opacity: 0,
          }),
        },
        [
          [
            'div',
            {
              id: `keg-toggle`,
              className: `keg-toggle`,
              style: {
                position: 'absolute',
                left: '-20px',
                top: '0px',
                margin: '0px',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '10px 2px',
                backgroundColor: '#27b4ff',
                borderTopLeftRadius: '3px',
                borderBottomLeftRadius: '3px',
              },
            },
            [
              'span',
              {
                id: `keg-toggle-action`,
                className: `keg-toggle-action`,
                click: onToggle,
                style: {
                  display: 'flex',
                  transition: `transform ${speed}ms ${type}`,
                },
              },
              [
                'svg',
                {
                  role: 'img',
                  focusable: 'false',
                  'aria-hidden': ' true',
                  viewBox: '0 0 320 512',
                  xmlns: 'http://www.w3.org/2000/svg',
                  style: {
                    width: '16px',
                    height: '16px',
                    color: '#ffffff',
                  },
                },
                [
                  'path',
                  {
                    fill: 'currentColor',
                    d:
                      'M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z',
                  },
                ],
              ],
            ],
          ],
          iframe,
        ],
      ],
      config.domTree
    )
  )
}
