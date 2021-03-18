export const Values = {
  CATEGORIES: {
    STEPS: 'steps',
    FEATURES: 'features',
    DEFINITIONS: 'definitions',
    DEFINITION_TYPES: 'definitionTypes',
    UNITS: 'units',
    WAYPOINTS: 'waypoints',
    ACTIVE_FEATURE: 'activeFeature',
    ACTIVE_TAB: 'activeTab',
    TEST_RUNS: 'testFileOutput',
    CMD_RUNNING: 'cmdRunning',
    FEATURE: 'feature',
    SCREEN: 'screen',
    SCREENS: 'screens',
    COPY_STEP: 'copy_step',
    MODALS: 'modals',
    FILE_TREE: 'fileTree',
    SIDEBAR: 'sidebar',
    PENDING_FILES: 'pendingFiles',
    TOASTS: 'toasts',
  },
  SUB_CATEGORIES: {
    NODES: 'nodes',
    ACTIVE_FILE: 'activeFile',
    MODIFIED_CONTENT: 'modified',
    ACTIVE_DEFINITION: 'activeDefinition',
  },
  MODAL_TYPES: {
    TEST_SELECTOR: 'testSelectorModal',
    CREATE_FILE: 'createFileModal',
  },
  FILE_TYPES: {
    FEATURE: 'feature',
    // DEFINITION: 'definition',
    // WAYPOINT: 'waypoint',
    // UNIT: 'unit',
  },
  SIDEBAR_TYPES: {
    FILE_TREE: 'fileTree'
  },
  STEP_TYPES: [
    'and',
    'given',
    'when',
    'then',
  ],
  EMPTY_STEP: `None Selected`,
  EMPTY_PARAM: `PARAMETER`,
  CREATE_NEW_FILE: 'Create New File',
  SCREENS: {
    EDITOR: 'editor',
    // BUILDER: 'builder',
    EMPTY: 'empty',
    // RUNNER: 'runner',
    RESULTS: 'results',
  },
  EDITOR_TABS: {
    BDD_SPLIT: { id: 'bddSplit', title: `Split` },
    FEATURE: { id: 'feature', title: `Feature` },
    DEFINITIONS: { id: 'definitions', title: `Definitions` },
    OTHER: { id: 'other', title: `Non Test File` },
    UNIT: { id: 'unit', title: `Unit Tests` },
    WAYPOINT: { id: 'waypoint', title: `Waypoint Tests` },
  },
  DEFINITION_TABS: {
    ACTIVE: 'active-definitions',
    LIST: 'list-definitions'
  },
  KEG_DOM_STYLES_ID: 'keg-dom-styles',
  TABBAR_PORTAL_ID: `keg-tabbar-portal-root`,
  // Constants matching the fileModel
  // Used for defining when all tests of a type should be run
  RUN_ALL_TESTS: {
    name: 'RUN_ALL_TESTS',
    location: 'tests',
    relative: '',
    content: '',
    fileType: null,
    mime: 'text/plain',
    ast: {},
    lastModified: 0,
    uuid: 'RUN_ALL_TESTS',
  }
}
