#include <stdio.h>

// 1번 박스
int val1 = 0;
int mag1 = 2;
int sol1 = 13;
int FSRsensor1 = A0;
int mag_sensor1 = 0;

// 2번 박스
int val2 = 0;
int mag2 = 4;
int sol2 = 8;
int FSRsensor2 = A1;
int mag_sensor2 = 0;

void setup() {
  Serial.begin(9600);
  pinMode(mag1, INPUT_PULLUP); // 마그네틱센서1
  pinMode(sol1, OUTPUT); // 잠금장치 1
  pinMode(mag2, INPUT_PULLUP); // 마그네틱센서2
  pinMode(sol2, OUTPUT); // 잠금장치 2
}

bool isLocked1 = true;
bool isLocked2 = true;
// 붙 0 떼 1
void loop() {

  String Data = Serial.readStringUntil('\n');
  Data.trim(); // 라즈베리파이로부터 받아옴
  mag_sensor1 = digitalRead(mag1);
  if (Data == "1 open" && isLocked1) {
    digitalWrite(sol1, HIGH);
    // 사물함 열림
    delay(5000);
    digitalWrite(sol1, LOW);
    mag_sensor1 = digitalRead(mag1);
    if (mag_sensor1 == HIGH && isLocked1) {
      isLocked1 = false;
    }
  } 
  // 변수 isLocked가 열려있다는데, 마그네틱 센서로부터 닫혔다는 신호를 받을 때
  // LOW 닫음 HIGH 열림
  if (!isLocked1 && mag_sensor1 == LOW) {
    val1 = analogRead(FSRsensor1);  
    String str_val1 = String(val1);

    char message[20];
    snprintf(message, sizeof(message), "1 close %d", val1);
    Serial.println(message);
    isLocked1 = true;
  }

  if (Data == "2 open" && isLocked2) {
    digitalWrite(sol2, HIGH);
    delay(5000);
    digitalWrite(sol2, LOW);
    // 사물함 열림

    mag_sensor2 = digitalRead(mag2);
    if (mag_sensor2 == HIGH) {
      isLocked2 = false;
    }
    
  } 
  // 변수 isLocked가 열려있다는데, 마그네틱 센서로부터 닫혔다는 신호를 받을 때
  if (!isLocked2 && digitalRead(mag2) == LOW) {
    val2 = analogRead(FSRsensor2);     
    String str_val2 = String(val2);

    char message2[20];
    snprintf(message2, sizeof(message2), "2 close %d", val2);
    Serial.println(message2);
    isLocked2 = true;
  }
  
  delay(100);
}

