#include <ArduinoUniqueID.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()) //시리얼 통신이 가능할 경우
  {
    char input = Serial.read(); //시리얼 모니터 입력 값을 읽어옴
    if(input =='w') //입력값이 W일 경우
    {
      for(size_t i = 0; i < UniqueIDsize; i++)
        Serial.print(UniqueID[i], HEX);
      Serial.println();
      Serial.println("dddd");
    }
  }
}
