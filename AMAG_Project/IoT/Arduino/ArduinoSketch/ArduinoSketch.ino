#include <ArduinoUniqueID.h>

String arduino1 = "583839303537121718";
String arduino2 = "58FFDFFFDFFFFFFFFF";

int fsrsensor = 0;                       
int value = 0;  

int mag_sensor = 0;

void setup() {
  Serial.begin(9600);

  pinMode(2,INPUT_PULLUP);
  pinMode(13, OUTPUT);
}

void loop() {
  if(Serial.available()) //시리얼 통신이 가능할 경우
  {
    String input = Serial.readStringUntil('\n'); //시리얼 모니터 입력 값을 읽어옴
    if(input == arduino1) //입력값이 W일 경우
    {
      value = analogRead(fsrsensor);     
      Serial.println(value);                                    
      delay(1000);

      mag_sensor = digitalRead(2);
      if(mag_sensor == LOW){
        //달라붙어있는거 = 닫힘
        Serial.println("close");
        digitalWrite(13, 0);
        delay(1000);
      }else{
        //열림
        Serial.println("open");
        digitalWrite(13, 1);
        delay(1000);
      }
      delay(100);
    }
  }
}

