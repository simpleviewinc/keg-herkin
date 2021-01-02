
/**
 * Default Messenger Parent config
 * @Object
 */
export const parentConfig = {
  // Load the editor as open
  startOpen: false,
  iframe: {
    // ID of iframe. If not passed, will auto-create the iframe,
    id: `keg-messenger-iframe`,
    class: `keg-messenger-iframe`,
    // Custom onLoad method called when the Iframe is loaded
    // onLoad: null
    // URL to set the Iframe too, overrides the default Keg-Herkin bundle
    // TODO: update this to be the bundled keg-herkin client code as data url
    src: `http://herkin-master.local.kegdev.xyz/`,
    // Extra attributes to add to the iframe 
    attrs: {
      frameborder: "0",
      allowfullscreen: true,
    },
  },
  toggle: {
    // Time in milliseconds (ms)
    speed: 1000,
    // Location of the keg-herkin editor (top, bottom, left, right)
    side: 'right',
    // Toggle animation for the editor (linear, ease-in, ease-out, ease-in-out)
    type: 'ease-in-out',
    // Custom on toggle method called when the messenger is toggle open an closed
    // onToggle: null,
  },
  // Custom connection options [See here for more info](https://github.com/Aaronius/penpal#readme)
  connection: {
    // onConnection: null,
    // onDisconnect: null,
  },
  // Custom methods that can be called by the child iframe within the parent's context
  methods: {
  }
}
