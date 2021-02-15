import { AfterAll, BeforeAll } from 'cucumber';
import { initialize, cleanup } from 'HerkinTasks/utils/wolf/setupTestEnvironment'

BeforeAll(initialize)
AfterAll(cleanup)