import { MqttClient, connect } from "mqtt";
import { Subject } from "rxjs";
import { flow, map, fromPairs, toPairs, values, invert} from 'lodash/fp';

const MQTT_SERVER = 'mqtt://192.168.0.116';
// const MQTT_SERVER = 'mqtt://home.zelen.uk';
const MQTT_PORT=1883;

const TOPICS = {};

export interface SensorParams {
  name: string;
  address: number;
  host?: string;
  port?: number;
}

export interface SensorMetrics {
  temperature?: number;
  humidity?: number;
  co2?: number;
  airQualityVoc?: number;
  soundLevel?: number;
  illuminance?: number;
  maxMotion?: number;
  currentMotion?: number;
  buzzer?: number;
  redLed?: number;
  greenLed?: number;
}

export class Sensor {
  public subjects: {[key: string]: Subject<number>};
  public subject: Subject<SensorMetrics>;
  public readonly name: string;
  private _state: SensorMetrics = {};
  private names: {[key: string]: string};
  private client: MqttClient;
  private host: string;
  private port: number;
  private address: number;
  
  public readonly metrics = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    co2: 'CO2',
    airQualityVoc: 'Air Quality (VOC)',
    soundLevel: 'Sound Level',
    illuminance: 'Illuminance',
    maxMotion: 'Max Motion',
    currentMotion: 'Current Motion',
    buzzer: 'Buzzer',
    redLed: 'Red LED',
    greenLed: 'Green LED',
  };

  constructor({name, address, host=MQTT_SERVER, port=MQTT_PORT}: SensorParams) {
    this.address = address;
    this.name = name;
    this.host = host;
    this.port = port;
    this.names = invert(this.topics);
    this.subjects = this.forEachTopic(() => new Subject<number>());
    this.subject = new Subject<SensorMetrics>();
    this.connect();
    this.client.setMaxListeners(20);
    console.log(`Created new Sensor ${name}`)
  }

  public get state() {
    return this._state;
  }

  private get topics() {
    return flow(
      toPairs,
      map(([key, metric]) => [key, `/devices/wb-msw-v3_${this.address}/controls/${metric}`]),
      fromPairs,
    )(this.metrics);
  }

  private connect() {
    this.client = connect(this.host);
    this.client.on('connect', () => this.subscribe())
  }

  private forEachTopic(callback) {
    return flow(
      toPairs,
      map(([name, topic]) => [name, callback(name, topic)]),
      fromPairs,
    )(this.topics);
  }

  private subscribe() {
    this.forEachTopic((name, topic) => {
      this.client.subscribe(topic, err => {
        if(err) {
          console.log(err);
          this.subjects[name].error(err);
          this.subject[name].error(err);
        } else {
          this.client.on('message', this.handleMessage.bind(this));
          console.log('Subscribed to ' + topic);
        }
      });
    });
  }

  private handleMessage(topic, message) {
    const cur = + message.toString();
    const metric = this.names[topic];
    const prev = this._state[metric];
    if(prev !== cur) {
      this._state[metric] = cur;
      this.subjects[metric].next(cur);  
      this.subject.next(this.state);
      if(this.isDrasticChange(cur, prev, 2)) {
        console.log(`Change ${metric}`, cur, prev)
        // console.log(this._state);
      }
    }
  }

  private isDrasticChange = (x, y, t) =>
    Math.max(x, y) - Math.min(x, y) >=
    Math.min(x, y) * t - Math.min(x, y);
}