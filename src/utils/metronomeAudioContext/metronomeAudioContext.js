// @flow

// A time primitive
type Time = number

// A length of time, expressed in seconds
type Seconds = Time
// A length of time, expressed in BPM
type BeatsPerMinute = Time

const convertBpmToSeconds: Seconds = (bpm: BeatsPerMinute) => 60 / bpm
const convertSecondsToBpm: BeatsPerMinute = (s: Seconds) => 60 / s

// A timestamp, in seconds since the construction of an audio context
type Timestamp = Time

/**
 * @class MetronomeEvent:
 * @description holds a timestamp in the future
 */
class MetronomeEvent {
  timestamp: Timestamp

  constructor(timestamp: Timestamp) {
    this.timestamp = timestamp
  }
}

/**
 * @class MetronomeQueue
 * @description a data structure that enqueues MetronomeEvents
 */
class MetronomeQueue {
  queue: Array<MetronomeEvent> = []

  getLength: number = () => this.queue.length

  isEmpty: boolean = () => this.queue.length === 0

  enqueueEvent: void = (item: MetronomeEvent) => this.queue.push(item)

  peek: MetronomeEvent = () => this.queue[0]

  getNextEvent: MetronomeEvent = () => {
    // We don't really expect this queue to get longer than 3 or 4
    // items long – would defeat the purpose of the very short loops
    return this.queue.shift()
  }

  clear: void = () => {
    this.queue = []
  }
}

const TEMPO: Seconds = convertBpmToSeconds(180)
const NOTES_TO_SCHEDULE = 2
const NOTE_DURATION: Seconds = 125 / 1000
const LOOK_AHEAD_LENGTH: Seconds = 0.05

/**
 * @class Metronome
 * @description An AudioContext that has a MetronomeQueue for scheduling and playing boops
 */
export default class Metronome {
  upcomingNotes: MetronomeQueue = new MetronomeQueue()
  audioCtx: AudioContext = new AudioContext()
  gainNode: GainNode = this.audioCtx.createGain()
  timeBetweenNotes: Seconds = TEMPO
  noteDuration: Seconds = NOTE_DURATION
  isRunning: boolean = false
  schedulerId: number

  constructor() {
    this.gainNode.connect(this.audioCtx.destination)
  }

  getNoteDuration: Seconds = () => this.noteDuration
  setNoteDuration: void = (duration: Seconds) => {
    this.noteDuration = duration
  }

  getTimeBetweenNotes: Seconds = () => this.timeBetweenNotes
  setTimeBetweenNotes: void = (timeBetweenNotes: Seconds) => {
    this.timeBetweenNotes = timeBetweenNotes
  }

  getBPM: BeatsPerMinute = () => convertSecondsToBpm(this.getTimeBetweenNotes())

  start: void = () => {
    this.isRunning = true
    this.gainNode.gain.value = 0.1
    this._enqueueNotesStartingAtTime(this.audioCtx.currentTime)
    this.schedulerId = requestAnimationFrame(this._scheduler)
  }

  stop: void = () => {
    this.isRunning = false
    this.gainNode.gain.value = 0
    this.upcomingNotes.clear()
    cancelAnimationFrame(this.schedulerId)
  }

  _scheduler: void = () => {
    // how far into the future we should look to schedule notes
    const lookaheadLength: Seconds = LOOK_AHEAD_LENGTH

    const currentTime: Timestamp = this.audioCtx.currentTime
    const lookaheadEndTimestamp: Timestamp = currentTime + lookaheadLength

    /**
     * A, B, C are upcomingNotes
     *
     * ⇣ currentTime
     * |-----------------------A-------------------B---------|--------C------
     *                                 lookaheadEndTimestamp ⇡
     *
     * Only schedule A and B, even though C is enqueued.
     */
    while (
      this.upcomingNotes.peek() &&
      this.upcomingNotes.peek().timestamp < lookaheadEndTimestamp
    ) {
      const nextEvent = this.upcomingNotes.getNextEvent()

      this._scheduleNote({ noteDuration: this.getNoteDuration(), startTime: nextEvent.timestamp })

      if (this.upcomingNotes.isEmpty() && this.isRunning) {
        /**
         * D is within the lookahead time,
         * but it's been popped from its queue so now upcomingNotes isEmpty.
         *
         *        ⇣ currentTime
         * -(C)---|-----------------------(D)--------------------------------|------
         *   ⇡ Played                                  lookaheadEndTimestamp ⇡
         *
         * So, enqueue a few more.
         */
        this._enqueueNotesStartingAtTime(nextEvent.timestamp + this.getTimeBetweenNotes())
      }
    }

    requestAnimationFrame(this._scheduler)
  }

  _enqueueNotesStartingAtTime = (startTime: Timestamp): void => {
    // This is a 'Do this N times' kinda thing.
    // The thing we're doing N times is adding metronome events to a queue
    // And N is a constant defined above.
    // This is so we don't schedule notes too far in the future.
    new Array(NOTES_TO_SCHEDULE).fill(0).forEach((each, index) => {
      this.upcomingNotes.enqueueEvent(
        new MetronomeEvent(startTime + index * this.getTimeBetweenNotes()),
      )
    })
  }

  _scheduleNote: void = ({
    noteDuration,
    startTime,
  }: {
    noteDuration: Seconds,
    startTime: Timestamp,
  }) => {
    // Yeah, so you can only start() and stop() an oscNode once...
    // So we gotta make a new one each time.
    // But it's OK because once it's stop()'d, it gets garbage-collected!
    const oscNode = this.audioCtx.createOscillator()
    oscNode.connect(this.gainNode)
    oscNode.frequency.value = 660
    oscNode.start(startTime)
    oscNode.stop(startTime + noteDuration)
  }
}
