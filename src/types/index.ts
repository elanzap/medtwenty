export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
}

export interface Prescription {
  id?: string;
  prescriptionId: string;
  visitId: string;
  patientId: string;
  patientName: string;
  date: string;
  vitalSigns?: VitalSigns;
  symptoms?: string;
  diagnoses?: string[];
  medications?: Medication[];
  labTests?: string[];
}

export interface VitalSigns {
  bloodPressure: string;
  pulseRate: number;
  temperature: number;
  weight: number;
}

export interface Medication {
  name: string;
  dosage: string;
  interval: string;
  duration: string;
  instructions: string;
}

export interface DiagnosisTemplate {
  id: string;
  name: string;
  medications: Medication[];
  labTests: string[];
}
