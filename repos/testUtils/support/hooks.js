import { AfterAll, BeforeAll } from 'cucumber';
import { initialize, cleanup } from 'HerkinRepos/testUtils/playwright/setupTestEnvironment'

BeforeAll(initialize)
AfterAll(cleanup)