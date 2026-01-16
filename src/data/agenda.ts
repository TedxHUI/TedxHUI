export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface Session {
  id: number;
  sessionTitle: string;
  items: AgendaItem[];
}

export const AGENDA_DATA: Session[] = [
  {
    id: 1,
    sessionTitle: "Speakers Session I",
    items: [
      { time: "9:20 AM - 9:32 AM", title: "Sarkin Mota", description: "Driving Trust: The Vehicular Trailblazer" },
      { time: "9:32 AM - 9:44 AM", title: "Ahmad XM", description: "Web3: Killing Youth Unemployment" },
      { time: "9:44 AM - 9:56 AM", title: "Victory Ashaka", description: "Poetry: A Tool for Change" },
      { time: "10:08 AM - 10:28 AM", title: "Networking Break", description: "Refreshments & Connections" }
    ]
  },
  {
    id: 2,
    sessionTitle: "Speakers Session II",
    items: [
      { time: "10:28 AM - 11:40 AM", title: "Alhan Islam", description: "Peace is a Verb" },
      { time: "11:16 AM - 11:36 AM", title: "Performer Session", description: "Live Spoken Word Performance" }
    ]
  }
];