#include <stdio.h>
int led = 13;

int val = 0;



int mag_sensor = 0;
void setup() {
  Serial.begin(9600);
  pinMode(13, INPUT_PULLUP);
  pinMode(12, INPUT_PULLUP);
}

int temp = 0;
// 붙 0 떼 1
void loop() {
  // put your main code here, to run repeatedly:
  mag_sensor = digitalRead(13);
  if(mag_sensor == LOW){
    if (temp != 0) {
      Serial.println(0);
      temp = 0;
    }
  }else{
    if (temp != 1) {
      Serial.println(1);
      temp = 1;
    }
  }

    // inputString = Serial.readString(); // 시리얼 통신으로부터 데이터 읽기
  String inputString = Serial.readStringUntil('\r');
  if (0 < len(inputString) <) {
    Serial.println(inputString);
  }
  if (inputString == "done"){
    digitalWrite(12, HIGH);
  }
  delay(100);
}

// #include <ArduinoUniqueID.h>

// String arduino1 = "583839303537121718";
// String arduino2 = "58FFDFFFDFFFFFFFFF";

// int fsrsensor = 0;                       
// int value = 0;  

// int mag_sensor = 0;

// void setup() {
//   Serial.begin(9600);

//   pinMode(2,INPUT_PULLUP);
//   pinMode(13, OUTPUT);
// }

// void loop() {
//   if(Serial.available()) //시리얼 통신이 가능할 경우
//   {
//     String input = Serial.readStringUntil('\n'); //시리얼 모니터 입력 값을 읽어옴
//     if(input == arduino1) //입력값이 W일 경우
//     {
//       value = analogRead(fsrsensor);     
//       Serial.println(value);                                    
//       delay(1000);

//       mag_sensor = digitalRead(2);
//       if(mag_sensor == LOW){
//         //달라붙어있는거 = 닫힘
//         Serial.println("close");
//         digitalWrite(13, 0);
//         delay(1000);
//       }else{
//         //열림
//         Serial.println("open");
//         digitalWrite(13, 1);
//         delay(1000);
//       }
//       delay(100);
//     }
//   }
// }

