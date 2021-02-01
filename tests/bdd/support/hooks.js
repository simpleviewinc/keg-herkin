import { AfterAll, BeforeAll } from 'cucumber';
import { initialize, cleanup } from '../../../tasks/utils/wolf/setupTestEnvironment'

BeforeAll(initialize)
AfterAll(cleanup)