import React, { useState, useMemo } from 'react';
import { User, Calendar, FileText, ArrowLeft, Plus, Activity, Eye, Pencil, Printer } from 'lucide-react';
import type { Patient, Prescription } from '../../types';
import { PrescriptionView } from '../prescription/PrescriptionView';

interface PatientDetailsProps {
  patient: Patient;
  prescriptions: Prescription[];
  onBack: () => void;
  onNewPrescription: (patient: Patient) => void;
}

export const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  prescriptions,
  onBack,
  onNewPrescription,
}) => {
  const [viewingPrescription, setViewingPrescription] = useState<Prescription | null>(null);

  const sortedPrescriptions = useMemo(() => {
    return [...prescriptions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [prescriptions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Patients
        </button>
        <button
          onClick={() => onNewPrescription(patient)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </button>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-gray-900">{patient.name}</h2>
              <div className="mt-1 text-sm text-gray-500 space-y-1">
                <p>Patient ID: {patient.patientId}</p>
                <p>{patient.age} years • {patient.gender}</p>
                <p>Phone: {patient.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription History */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900">Prescription History</h3>
          {sortedPrescriptions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions</h3>
              <p className="mt-1 text-sm text-gray-500">
                No prescriptions have been created for this patient yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-6">
              {sortedPrescriptions.map((prescription) => (
                <div
                  key={prescription.prescriptionId}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        Prescription ID: {prescription.prescriptionId}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {new Date(prescription.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewingPrescription(prescription)}
                        className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </div>
                  </div>

                  {prescription.diagnoses && prescription.diagnoses.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Diagnoses: </span>
                        {prescription.diagnoses.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Prescription Modal */}
      {viewingPrescription && (
        <PrescriptionView
          prescription={viewingPrescription}
          onClose={() => setViewingPrescription(null)}
        />
      )}
    </div>
  );
};
