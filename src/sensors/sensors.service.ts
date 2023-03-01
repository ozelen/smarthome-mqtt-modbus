import { Injectable } from '@nestjs/common';
import { flow, fromPairs, map, mapKeys, mapValues, toPairs } from 'lodash/fp';
import { MqttClient, connect } from "mqtt";
import { Sensor } from 'src/common/sensor';

const SENSORS = {
  livingroom: 21,
  corridor: 166,
}

type SensorRegistry = {[sensor: string]: Sensor};

@Injectable()
export class SensorsService {
  private readonly sensors: SensorRegistry;
  constructor() {

    this.sensors = flow(
      toPairs,
      map(([name, address]) => [
        name,
        new Sensor({ name, address })
      ]),
      fromPairs
    )(SENSORS);

    setTimeout(() => {
      console.log('STATE', this.getAll());
    }, 3000);

  }

  public getAll() {
    return mapValues(
      (s: Sensor) => s.state
    )(this.sensors);
  }
}
