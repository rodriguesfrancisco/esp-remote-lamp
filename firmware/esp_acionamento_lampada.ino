//Importando as bibliotecas necessárias
#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

//Configuração da rede wifi que o ESP irá se conectar
//Put the name of your Wifi network
#define WIFI_SSID ""
//Put the name of your Wifi password
#define WIFI_PWD ""

//Configurações de conexão com o firebase
//Put your firebase host URL here
#define FIREBASE_HOST ""
//Put your firebase authentication token here
#define FIREBASE_AUTH ""

//Define o pino que será utilizado como saída
int powerPin = 5;

void setup() {
  //Configura a taxa de comunicação em bits por segundo
  Serial.begin(9600);

  //Inicia a conexão com o WiFi
  WiFi.begin(WIFI_SSID, WIFI_PWD);
  Serial.print("Connecting");
  //Usado para chegar se já está conectado
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.print("Connected!");
  //Escreve o IP que o ESP pegou na rede Wifi
  Serial.println(WiFi.localIP());

  //Inicia a conexão com o Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  //Define que o pino que está guardado na variável powerPin será usado como OUTPUT
  pinMode(powerPin, OUTPUT);
}

void loop() {
 //Procura o valor "ledStatus" no banco de dados do Firebase e guarda na variável
 int ledStatus = Firebase.getInt("ledStatus");
 Serial.println(ledStatus);

 //Caso a variável ledStatus seja 1, iremos enviar um sinal de energia HIGH para a porta de saída, ligando o led/lâmpada
 //Caso contrário, irá enviar um sinal de energia LOW, desligando o led/lâmpada
 if(ledStatus == 1) {
  digitalWrite(powerPin, HIGH);
 } else {
  digitalWrite(powerPin, LOW);
 }
}
