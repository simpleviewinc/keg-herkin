import { EventEmitter } from 'events'
import ansiHTML from 'ansi-html'
import { GherkinStreams } from '@cucumber/gherkin'
import { messages, IdGenerator } from '@cucumber/messages'
import { setTestResults } from 'SVActions/runner/setTestResults'

const { uuid } = IdGenerator
let outputArr = []

const appendToOutput = (data, isEnd) => {
  // Call end action here
  outputArr.push(data)
  isEnd && setTestResults(outputArr)
}

if(typeof window !== 'undefined')
  window.onerror = error => appendToOutput(error.stack, false)

const setupEvents = () => {
  const eventBroadcaster = new EventEmitter();
  const eventDataCollector = new Cucumber.formatterHelpers.EventDataCollector(eventBroadcaster)

  return { eventBroadcaster, eventDataCollector }
}

const buildMessageStream = (featureText, newId) => {
  return GherkinStreams.fromSources([
    messages.Envelope.fromObject({
      source: {
        data: featureText,
        uri: 'test.feature',
      },
    }),
  ], { newId })
}

const buildFormatter = (eventBroadcaster, eventDataCollector, supportCodeLibrary) => {
  return Cucumber.FormatterBuilder
    .build('progress', {
      cwd: '/',
      eventBroadcaster,
      eventDataCollector,
      parsedArgvOptions: {
        colorsEnabled: true,
      },
      log(data) {
        appendToOutput(ansiHTML(data))
      },
      supportCodeLibrary,
    })
}

const parseMessageStream = (eventBroadcaster, eventDataCollector, gherkinMessageStream) => {
  return Cucumber.parseGherkinMessageStream({
    cwd: '',
    eventBroadcaster,
    eventDataCollector,
    gherkinMessageStream,
    pickleFilter: new Cucumber.PickleFilter({ cwd: '' }),
    order: 'defined',
  })
}

const resetCucumber = (definitionText, newId) => {
  Cucumber.supportCodeLibraryBuilder.reset('', newId)
  new Function(definitionText)()
}

export const runFeature = async (featureText, definitionText) => {

  const newId = uuid()
  const { eventBroadcaster, eventDataCollector } = setupEvents()

  const gherkinMessageStream = buildMessageStream(
    featureText,
    newId
  )

  const pickleIds = parseMessageStream(
    eventBroadcaster,
    eventDataCollector,
    gherkinMessageStream
  )

  resetCucumber(definitionText, newId)

  const supportCodeLibrary = await Cucumber.supportCodeLibraryBuilder.finalize()

  buildFormatter(
    eventBroadcaster,
    eventDataCollector,
    supportCodeLibrary
  )

  const runtime = new Cucumber.Runtime({
    eventBroadcaster,
    eventDataCollector,
    newId,
    options: {},
    pickleIds,
    supportCodeLibrary,
  })

  return runtime.start()
}


export const cucumberRunner = (featureText, definitionText) => {
  outputArr = []

  runFeature(featureText, definitionText)
    .then((success) => {
      const exitStatus = success ? '0' : '1'
      appendToOutput(`Exit Status: ${exitStatus}`, true)
    })
    .catch(error => appendToOutput(error.stack, true))

}