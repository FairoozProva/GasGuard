#define LED_PIN 4
#define BUZZER_PIN 5
#define MQ2_PIN 35

const int GAS_THRESHOLD = 1000;

bool mute = false;   // flag to mute buzzer

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // Check for serial command from Node.js
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd == "MUTE") {
      mute = true;
    } else if (cmd == "UNMUTE") {
      mute = false;
    }
  }

  int gasValue = analogRead(MQ2_PIN);
  Serial.println(gasValue);

  if (!mute && gasValue > GAS_THRESHOLD) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  }
  delay(1000);
}
