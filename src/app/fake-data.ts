export interface PlageSession {
  id: number,
  date: string,
  time: number,
  kmh: number,
  finished: boolean
}

export interface FractionneSession {
  id: number,
  date: string,
  tours: number,
  time: number,
  kmh: number
  finished: boolean,
}

interface MusculationSession {
  date: Date;
  id: number;
}

interface HiitSession {

}


export const fakeSessions = {
  plage: {
    id: 'plage',
    sessions: [
      {
        id: 1,
        date: '22-jan',
        time: 14.54,
        kmh: 10,
        finished: true
      },
      {
        id: 2,
        date: '29-jan',
        time: 13.54,
        kmh: 10.43,
        finished: false
      },
    ]
  },
  fractionne: {
    id: 'fractionne',
    sessions: [
      {
        id: 1,
        date: '23-jan',
        tours: 20,
        time: 12,
        kmh: 14,
        finished: true,
      },
      {
        id: 3,
        date: '30-jan',
        tours: 22,
        time: 12,
        kmh: 16,
        finished: false,
      },
      {
        id: 2,
        date: '8-fév',
        tours: 20,
        time: 12,
        kmh: 24,
        finished: true,
      },
    ]
  }
}
