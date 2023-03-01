import { Injectable } from '@nestjs/common';

let tmp = {
  id: '',
  name: '',
  type: '',
  description: '',
  contains: []
};

const DEVICES = [
  {
    id: 'home',
    name: 'Home',
    type: 'Apartment',
    description: '',
    contains: [
      {
        name: 'Bathroom',
        id: 'bathroom',
        type: 'Room',
        description: 'Big bathroom with a tub',
        contains: [
          {
            id: 'floor',
            name: 'Warm Floor',
            type: 'Switch',
            description: 'Underfloor Heating of Bathroom',
          },
          {
            id: 'multisensor',
            name: 'Sensor',
            type: 'MultiSensor',
            description: 'Multi-purpose sensor of Bathroom',
          }
        ],
      },
      {
        id: 'corridor',
        name: 'Corridor',
        type: 'Room',
        description: 'Corridor',
        contains: [
          {
            id: 'floor',
            name: 'Warm Floor',
            type: 'Switch',
            description: 'Underfloor Heating of Corridor',
          },
          {
            id: 'multisensor',
            name: 'Sensor',
            type: 'MultiSensor',
            description: 'Multi-purpose sensor of Corridor',
          },
          {
            id: 'light1',
            name: 'Frontdoor light',
            type: 'Switch',
            description: 'Light near the frontdoor',
          },
          {
            id: 'light2',
            name: 'Wardrobe light',
            type: 'Switch',
            description: 'Light near the wardrobe',
          },
        ],
      },
      {
        id: 'studio',
        name: 'Living Room',
        type: 'Room',
        description: 'Living Room',
      },
    ],
  }
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
