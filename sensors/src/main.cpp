#include <Arduino.h>
#include <WiFi.h>
#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>
#include <SHT1x-ESP.h>
#include <../lib/env.h>
#include <WiFiClientSecure.h>

#define PH_SENSOR_PIN 34
#define SSID "please"
#define PWD "trialnetwork"
#define dataPin 15
#define clockPin 2
#define RE 32
#define DE 33

unsigned long int avgValue;
int buf[10], temp;

WiFiClientSecure wifiClient;
InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN, InfluxDbCloud2CACert);

SHT1x sht1x(dataPin, clockPin, SHT1x::Voltage::DC_3_3v);
float temperature, humidity;
const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};
byte nitrogen, phosphorus, potassium;
byte values[11];

void connectToWiFi()
{
  Serial.print("Connecting to: ");
  Serial.print(SSID);
  WiFi.begin(SSID, PWD);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(200);
  }

  Serial.print("Connected with IP: ");
  Serial.print(WiFi.localIP());
}

void getPH(float &phValue)
{
  for (int i = 0; i < 10; i++)
  {
    buf[i] = analogRead(PH_SENSOR_PIN);
    delay(10);
  }
  for (int i = 0; i < 9; i++)
  {
    for (int j = i + 1; j < 10; j++)
    {
      if (buf[i] > buf[j])
      {
        temp = buf[i];
        buf[i] = buf[j];
        buf[j] = temp;
      }
    }
  }
  avgValue = 0;
  for (int i = 2; i < 8; i++)
    avgValue += buf[i];

  phValue = (float)avgValue * 3.3 / 4095 / 6;
  phValue = 3.5 * phValue;
}

byte readSensor(const byte *query, uint8_t querySize)
{
  Serial2.flush();
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(1);

  for (uint8_t i = 0; i < querySize; i++)
  {
    Serial2.write(query[i]);
  }

  Serial2.flush();
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);
  delay(500);

  byte index = 0;
  while (Serial2.available())
  {
    values[index++] = Serial2.read();
    delay(10);
  }
  return values[4];
}

void getEnv()
{
  temperature = sht1x.readTemperatureC();
  humidity = sht1x.readHumidity();
  nitrogen = readSensor(nitro, sizeof(nitro));
  phosphorus = readSensor(phos, sizeof(phos));
  potassium = readSensor(pota, sizeof(pota));

  float phValue;
  getPH(phValue);

  Point sensorData("environment");
  sensorData.addField("temperature", temperature);
  sensorData.addField("humidity", humidity);
  sensorData.addField("nitrogen", nitrogen);
  sensorData.addField("phosphorus", phosphorus);
  sensorData.addField("potassium", potassium);
  sensorData.addField("ph_value", phValue);

  if (!client.writePoint(sensorData))
  {
    Serial.print("InfluxDB write failed: ");
    Serial.println(client.getLastErrorMessage());
  }
  else
  {
    Serial.println("Data sent to InfluxDB");
  }
}

void setup()
{
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);
  connectToWiFi();

  if (client.validateConnection())
  {
    Serial.print("Connected to InfluxDB: ");
    Serial.println(client.getServerUrl());
  }
  else
  {
    Serial.print("InfluxDB connection failed: ");
    Serial.println(client.getLastErrorMessage());
  }

  pinMode(PH_SENSOR_PIN, INPUT);
  pinMode(13, OUTPUT);
  Serial.println("PH Ready");
}

void loop()
{
  getEnv();
  delay(5000);
}