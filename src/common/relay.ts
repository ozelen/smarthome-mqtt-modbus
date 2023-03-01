import { MqttClient, connect } from "mqtt";
import { Subject } from "rxjs";

const MQTT_SERVER = 'mqtt://192.168.0.116';
// const MQTT_SERVER = 'mqtt://home.zelen.uk';
const MQTT_PORT=1883;

export class Relay {
  public subject$: Subject<number>;
  public readonly name: string;
  private statusTopic: string;
  private switchTopic: string;
  private client: MqttClient;
  private host: string;
  private port: number;
  private _state: boolean;

  constructor({name, topic, host=MQTT_SERVER, port=MQTT_PORT}) {
    this.name = name;
    this.subject$ = new Subject<number>();
    this.host = host;
    this.port = port;
    this.statusTopic = topic;
    this.switchTopic = topic + '/on';
    this.connect();
    console.log(`Created new RELAY ${name}`)
  }

  public set state(value: boolean) {
    const msg = value ? '1' : '0';
    this.client.publish(this.switchTopic, msg);
    this.client.publish(this.statusTopic, msg);
    this._state = value;
  }

  public get state() {
    return this._state;
  }

  private connect() {
    this.client = connect(this.host);
    this.client.on('connect', () => this.subscribe())
  }

  private subscribe() {
    this.client.removeAllListeners();
    this.client.subscribe(this.statusTopic, err => {
      if(err) {
        console.log(err);
        this.subject$.error(err);
      } else {
        this.client.on('message', this.handleMessage.bind(this));
        console.log('Subscribed to ' + this.statusTopic);
      }
    });
  }

  private handleMessage(topic, message) {
    const msg = message.toString();
    this._state = !!+msg;
    console.log(`${this.name} got message ${msg} in topic ${topic}`);
  }
}