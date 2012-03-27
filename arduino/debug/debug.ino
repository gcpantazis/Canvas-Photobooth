
void setup() {                
  Serial.begin(9600);
  pinMode(12, OUTPUT);     
  digitalWrite(12, HIGH);
}

void loop() {
  Serial.println(analogRead(A0));
  delay(30);
}
