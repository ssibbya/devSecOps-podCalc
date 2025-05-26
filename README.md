# DevSecOps Pipeline Implementation for Pod Calculator

![Screenshot 2025-03-04 at 7 16 48 PM](https://github.com/user-attachments/assets/7ed79f9c-9144-4870-accd-500085a15592)

<img width="1720" alt="Screenshot 2025-05-26 at 1 13 41 PM" src="https://github.com/user-attachments/assets/2ae064ad-4c86-4d73-9221-222faaec41bd" />

## Features

- 🧮 Fully functional Pod Calculator application
- 📊 Resource-based pod estimation (CPU and RAM)
- 🔢 Real-time calculation with input validation
- ⚡ Handles both CPU-limited and RAM-limited scenarios
- 🎯 Accurate rounding using ceiling function
- 📱 Responsive design for all devices

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Lucide React for icons

## Project Structure

```
src/
├── components/               # UI Components
│   ├── CalculatorForm.tsx       
│   └── ResultCard.tsx   
├── utils/                    # Logic utilities
│   └── podCalculator.ts    
├── __tests__/               # Unit tests
│   └── podCalculator.test.ts
├── App.tsx                   # Main application component
└── main.tsx                  # Entry point
```

## Calculation Logic

The Pod Calculator implements the following logic:

- Accepts four inputs: CPU per pod, RAM per pod, total CPU required, and total RAM required
- Validates all inputs are positive numbers (returns 0 for invalid inputs)
- Calculates required pods based on CPU: Math.ceil(totalCpu / cpuPerPod)
- Calculates required pods based on RAM: Math.ceil(totalRam / ramPerPod)
- Returns the maximum of both calculations (the limiting resource determines pod count)
- Uses ceiling function to ensure sufficient resources are allocated

## Example Calculations

- CPU-limited: 8 total CPU, 1 CPU per pod = 8 pods needed
- RAM-limited: 16GB total RAM, 2GB per pod = 8 pods needed
- Balanced: Takes the higher requirement to satisfy both constraints
- Fractional: 1 CPU total, 0.3 CPU per pod = 4 pods (rounded up)

## Testing

The application includes comprehensive unit tests covering:

- Basic calculation scenarios
- Edge cases and validation
- Floating-point precision handling
- TypeScript type safety

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devSecOps-podCalc.git
   cd devSecOps-podCalc
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

