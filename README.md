# GasGuard - Real-time IoT Gas Leak Detector

GasGuard is an end-to-end, full-stack IoT safety solution designed to continuously monitor environmental gas concentrations and issue immediate alerts upon detecting leaks. By combining local hardware responsiveness with a modern web application stack, the system provides both physical warning indicators and an interactive dashboard for remote real-time monitoring and control.

---

## 👥 Contributors
This project was designed and developed as a collaborative effort for **CSE 342: IoT Based Project Development** at **East Delta University**.
* **Fairooz Nabilah Prova**
* **Meheroja Alam Nodia**

---

## 🚀 Features
* **Dual-Alert System:** Simultaneous physical alerts (Buzzer & LED) and dynamic web-based dashboard visual alerts.
* **Real-time Data Visualization:** Smooth, live telemetry rendering using **Chart.js**, pulling updates every 0.5 seconds.
* **Remote Management:** Secure API communication permitting users to remotely mute or unmute the physical buzzer via the web interface.
* **Persistent Logging:** Telemetry archiving built on **MongoDB** for data tracking and analytics.

---

## 🛠️ System Architecture & Tech Stack

### Hardware Components
* **ESP32 Microcontroller** (Dev Module)
* **MQ-2 Gas Sensor** (Detection range: 200 ppm - 10,000 ppm)
* **Piezo Buzzer** (3.3V compatible)
* **Yellow LED** (with 220Ω current-limiting resistor)

### Software & Cloud Architecture
* **Firmware:** C++/Arduino IDE (Serial Communication at 115200 bps)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Frontend:** Semantic HTML5, CSS3, JavaScript (Vanilla), Chart.js

---

## 🔌 Hardware Schematics & Pin Mapping

### Pin Configurations
| Component | ESP32 Pin | Details |
| :--- | :--- | :--- |
| **MQ-2 Sensor AOUT** | `D35` | Analog Signal input |
| **Yellow LED Anode** | `D4` | Output via 220Ω resistor to ground |
| **Buzzer Positive** | `D5` | Output trigger |
| **VCC / GND** | `3.3V / GND` | Shared power rails |

---


## 📦 Getting Started

### Prerequisites
* **Node.js** (v16.x or higher)
* **MongoDB** (Local instance or Atlas Cluster)
* **Arduino IDE** (with ESP32 board manager installed)

### 1. Hardware Firmware Setup
1. Open `firmware/firmware.ino` (or your local `.ino` file) in the Arduino IDE.
2. Select **ESP32 Dev Module** and choose your active **COM Port**.
3. Compile and upload the code to the ESP32.

### 2. Backend & Frontend Server Setup
Clone the repository and install dependencies:
```bash
git clone [https://github.com/FairoozProva/GasGuard.git](https://github.com/FairoozProva/GasGuard.git)
cd GasGuard
npm install
