import { Howl } from "howler";

const SOUNDS_DIRECTORY = "sounds/";

export const sounds = {
  instruments: [
    {
      name: "Piano",
      staffType: "normal",
      howl: new Howl({
        preload: true,
        src: [`${SOUNDS_DIRECTORY}piano.mp3`],
        sprite: {
          A3: [0, 3776.2131519274376],
          Asharp3: [5000, 4848.390022675737],
          B3: [11000, 5923.968253968254],
          C3: [18000, 4685.034013605442],
          C4: [24000, 6752.970521541951],
          Csharp3: [32000, 5236.213151927437],
          Csharp4: [39000, 4604.285714285716],
          D3: [45000, 4814.603174603179],
          D4: [51000, 5732.607709750568],
          Dsharp3: [58000, 5294.943310657593],
          Dsharp4: [65000, 4705.011337868484],
          E3: [71000, 4688.752834467124],
          E4: [77000, 4537.25623582767],
          F3: [83000, 3645.7369614512486],
          Fsharp3: [88000, 4553.219954648526],
          G3: [94000, 4056.712018140587],
          Gsharp3: [100000, 3850.2040816326544],
        },
      }),
    },
  ],
};
