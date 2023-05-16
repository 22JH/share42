

// 1번 박스
int val1 = 0;
int mag1 = 2;
int sol1 = 13;
int FSRsensor1 = A0;
int mag_sensor1 = 0;

int mag_sensor = 0;
void setup() {
  Serial.begin(9600);
  pinMode(mag1, INPUT_PULLUP); // 마그네틱센서1
  pinMode(sol1, OUTPUT); // 잠금장치 1
}

bool isLocked1 = true;
// 붙 0 떼 1
void loop() {
  String Data = Serial.readStringUntil('\n');
  Data.trim(); // 라즈베리파이로부터 받아옴
  mag_sensor1 = digitalRead(mag1);
  Serial.println(mag_sensor1);
  if (Data == "1open" && isLocked1) {
    digitalWrite(sol1, HIGH);
    delay(2000);

    // 사물함 열림
    if (mag_sensor1 == HIGH) {
      isLocked1 = false;
    }
    digitalWrite(sol1, LOW);
  } 
  // 변수 isLocked가 열려있다는데, 마그네틱 센서로부터 닫혔다는 신호를 받을 때
  if (!isLocked1 && mag_sensor1 == LOW) {
    val1 = analogRead(FSRsensor1);     
    Serial.println(val1);
    Serial.println(String("1close ").concat(val1));
    isLocked1 = true;
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
  delay(200);
}

