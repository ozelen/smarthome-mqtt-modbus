import { Injectable } from '@nestjs/common';
import { Relay } from '../common/relay';

const DEVICES = [
  { name: 'Corridor',
    topic: '/devices/wb-mr6c_96/controls/K1', },
  { name: 'Frontdoor',
    topic: '/devices/wb-mr6c_96/controls/K2', },
  { name: 'Kitchen',
    topic: '/devices/wb-mr6c_96/controls/K3', },
  { name: 'Table',
    topic: '/devices/wb-mr6c_96/controls/K4', },
  // { name: 'Unused',
  //   topic: '/devices/wb-mr6c_96/controls/K5', },
  { name: 'Bar',
    topic: '/devices/wb-mr6c_96/controls/K6', },
];

@Injectable()
export class LightService {
  bulbs: Relay[];
  constructor() {
    this.bulbs = DEVICES.map(params => new Relay(params));
  }

  setAll(state) {
    return this.bulbs.map(
      bulb => (bulb.state = state, bulb)
    )
  }

  getBulbs() {
    return this.bulbs;
  }

  switchBulb(findName, state?: boolean): Relay {
    const bulb = this.bulbs.find(({name}) => name === findName);
    if(!bulb) {
      throw 'Relay not found';
    }
    bulb.state = state;
    return bulb;
  }
}
