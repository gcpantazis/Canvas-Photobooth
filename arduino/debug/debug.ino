
void setup() {                
  Serial.begin(9600);
  pinMode(7, INPUT);     
  pinMode(12, OUTPUT);     
  digitalWrite(12, HIGH);
}

void loop() {
  Serial.println(digitalRead(7));
  delay(100);
}
