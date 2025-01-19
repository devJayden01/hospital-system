// Class for the Patient
class Patient {
    constructor(name, contact) {
      this.name = name;
      this.contact = contact;
      this.medicalHistory = []; // An array to store the patient's medical history
    }
  
    // This allows the patient to view thier own medical history
    viewMedicalHistory() {
      console.log(`${this.name}'s Medical History:`);
      this.medicalHistory.forEach((record, index) => {
        console.log(`${index + 1}. ${record}`);
      });
    }
  
    makeAppointment(doctor, dateTime) {
      const appointment = new Appointment(this, doctor, dateTime);
      doctor.scheduleAppointment(appointment);
    }
  }
  
  // Class for the Doctor
  class Doctor {
    constructor(name, specialization) {
      this.name = name;
      this.specialization = specialization;
      this.schedule = []; // An array to store the doctor's appointments
    }
  
    prescribeMedication(patient, medication) {
      const prescription = new Prescription(patient, this, medication);
      this.addMedicalHistory(patient, `Prescription: ${medication}`); // this adds the prescription to the patient's medical history
      console.log(`${this.name} prescribed ${medication} to ${patient.name}`);
    }
  
    // Add medical history for the patient
    addMedicalHistory(patient, record) {
      patient.medicalHistory.push(record);
      console.log(`Added to ${patient.name}'s medical history: ${record}`);
    }
  
    scheduleAppointment(appointment) {
      this.schedule.push(appointment);
      console.log(`Appointment scheduled with Dr. ${this.name} for ${appointment.patient.name} on ${appointment.dateTime}`);
    }
  }
  
  // Class for Appointment
  class Appointment {
    constructor(patient, doctor, dateTime) {
      this.patient = patient;
      this.doctor = doctor;
      this.dateTime = dateTime;
    }
  }
  
  // Class for Prescription
  class Prescription {
    constructor(patient, doctor, medication) {
      this.patient = patient;
      this.doctor = doctor;
      this.medication = medication;
    }
  }
  
  // Class for Billing Information
  class Billing {
    constructor(patient) {
      this.patient = patient;
      this.amountDue = 0; // this is for the amount the patient should pay
    }
  
    generateInvoice(amount) {
      this.amountDue = amount;
      console.log(`Invoice for ${this.patient.name}: ₦${this.amountDue}`);
    }
  
    processPayment(amount) {
      if (amount >= this.amountDue) {
        console.log(`${this.patient.name} has paid the bill of ₦${this.amountDue}`);
        this.amountDue = 0; // Reset the amount due after payment
      } else {
        console.log(`Insufficient payment. Amount due: ₦${this.amountDue - amount}`);
      }
    }
  }
  
  // Here is an example of the interaction
  const patient1 = new Patient("Samuel Okafor", "07065748385"); // used const so that patient info cannot be reassigned and there is no mixup of medical history
  const doctor1 = new Doctor("Dr. Tappi", "Cardiology");
  
  patient1.makeAppointment(doctor1, "2025-01-26 10:00 AM");
  
  // Doctor can prescibe a medication and add it to the patient's medical history
  doctor1.prescribeMedication(patient1, "Paracetamol");
  
  // Doctor can also add test results to patient's medical history record
  doctor1.addMedicalHistory(patient1, "Blood Pressure Check: Normal");
  
  // Patient can view their own medical history
  patient1.viewMedicalHistory();
  
  // Doctor can generate a bill for their service
  const billing1 = new Billing(patient1); 
  billing1.generateInvoice(17000);
  billing1.processPayment(1000); // put a lesser amount so it shows the "amount due" message 
  