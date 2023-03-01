import { Injectable } from '@nestjs/common';
import { Relay } from '../common/relay';

const DEVICES = [
  { name: 'Floor Corridor',
    topic: '/devices/wb-gpio/controls/EXT1_R3A1', },
  { name: 'Floor Office',
    topic: '/devices/wb-gpio/controls/EXT1_R3A2', },
  { name: 'Floor Bathroom',
    topic: '/devices/wb-gpio/controls/EXT1_R3A3', },
  { name: 'Floor Kitchen',
    topic: '/devices/wb-gpio/controls/EXT1_R3A4', },
  { name: 'Salon',
    topic: '/devices/wb-gpio/controls/EXT1_R3A5', },
  { name: 'Radiator Office',
    topic: '/devices/wb-gpio/controls/EXT1_R3A6', },
  { name: 'Radiator Bedroom',
    topic: '/devices/wb-gpio/controls/EXT1_R3A7', },
  { name: 'Radiator Children',
    topic: '/devices/wb-gpio/controls/EXT1_R3A8', },
];

@Injectable()
export class HeatService {
  devices: Relay[];
  constructor() {
    this.devices = DEVICES.map(params => new Relay(params));
  }

  setAll(state) {
    return this.devices.map(
      device => (device.state = state, device)
    )
  }

  getAll() {
    return this.devices;
  }

  setOne(findName, state?: boolean): Relay {
    const device = this.devices.find(({name}) => name === findName);
    if(!device) {
      throw `${findName} Relay not found`;
    }
    device.state = state;
    return device;
  }
}
