import { AfterAll, BeforeAll } from 'HerkinParkin';
import { initialize, cleanup } from 'HerkinRepos/testUtils/playwright/setupTestEnvironment'

BeforeAll(initialize)
AfterAll(cleanup)