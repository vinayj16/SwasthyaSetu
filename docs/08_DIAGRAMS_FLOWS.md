# 🗂️ Use-Case, Sequence & ER Diagrams - SwasthyaSetu

This document contains high-fidelity Mermaid diagrams explaining the logic and data flow of the National Health Infrastructure.

---

## 1. System Use-Case Diagram
Defines the interactions between different actors and the core system functionalities.

```mermaid
useCaseDiagram
    actor "Patient" as P
    actor "Doctor" as D
    actor "Receptionist" as R
    actor "National Admin" as NA
    
    package "Identity Module" {
      usecase "Register Health ID (Aadhaar)" as UC1
      usecase "Download Health Card" as UC2
    }
    
    package "Clinical Module" {
      usecase "Book Appointment" as UC3
      usecase "Process Prescription" as UC4
      usecase "View Medical History" as UC5
    }
    
    package "Infrastructure Module" {
      usecase "Manage Bed Capacity" as UC6
      usecase "Sync Blood Inventory" as UC7
      usecase "Generate National Telemetry" as UC8
    }

    P --> UC1
    P --> UC2
    P --> UC3
    
    D --> UC4
    D --> UC5
    
    R --> UC3
    R --> UC6
    
    NA --> UC8
    NA --> UC7
```

---

## 2. Sequence Diagram: Clinical Consultation
Explains the step-by-step logic when a Doctor treats a Patient.

```mermaid
sequenceDiagram
    participant P as Patient
    participant D as Doctor
    participant S as System Middleware
    participant DB as Hospital DB
    
    P->>D: Arrives at Node
    D->>S: Request Patient Portfolio (via UHID)
    S->>S: Verify JWT & Role (Doctor)
    S->>DB: Fetch Encrypted History
    DB-->>S: Record Set
    S-->>D: Decrypted View
    
    D->>D: Conducts Examination
    D->>S: Commit Prescription & Vitals
    S->>DB: Update Health Vault (Encrypted)
    DB-->>S: Success 201
    S-->>P: Sync Notification (Health Hub)
    S-->>D: Record Finalized
```

---

## 3. Entity Relationship (ER) Perspective
A conceptual view of how national health data is structured.

```mermaid
erDiagram
    HOSPITAL ||--o{ DOCTOR : employs
    HOSPITAL ||--o{ APPOINTMENT : hosts
    HOSPITAL ||--|| BLOOD_BANK : manages
    
    PATIENT ||--|| HEALTH_IDENTITY : holds
    PATIENT ||--o{ APPOINTMENT : requests
    
    DOCTOR ||--o{ APPOINTMENT : conducts
    DOCTOR ||--o{ PRESCRIPTION : issues
    
    APPOINTMENT ||--|| PRESCRIPTION : generates
    
    NATIONAL_ADMIN ||--o{ AUDIT_LOG : monitors
    
    PATIENT {
        string id PK
        string uhid FK
        string name
        string blood_group
    }
    
    HOSPITAL {
        string id PK
        string name
        int total_beds
        int available_beds
    }
    
    HEALTH_IDENTITY {
        string uhid PK
        string aadhaar_hash
        string digital_signature
    }
```

---

## 4. Sequence Diagram: Aadhaar Hashing & Verification
Explains why the system is "Viva-Safe" regarding privacy.

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Secure Backend
    participant UDAI as UIDAI API (Mock)
    
    U->>F: Enters 12-digit Aadhaar
    F->>F: Clear memory of raw digits
    F->>B: HTTPS Post (Transit Encrypted)
    B->>B: SHA-256 + System Salt
    B->>B: Store ONLY Hash in DB
    B->>UDAI: Request OTP for Hash
    UDAI-->>U: SMS OTP (External)
    U->>F: Submit OTP
    F->>B: Forward OTP
    B->>UDAI: Verify OTP
    UDAI-->>B: Success + Demographic Data
    B->>B: Activate Health ID
    B-->>U: Issuance Successful
```
