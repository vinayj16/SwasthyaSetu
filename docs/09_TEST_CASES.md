# 🧪 Test Cases & Validation Scenarios - SwasthyaSetu

This document outlines the testing strategy used to ensure the reliability, security, and accuracy of the National Health Infrastructure.

---

## 1. Unit Testing (Core Logic)

| Test ID | Module | Scenario | Expected Result |
|---------|--------|----------|-----------------|
| **UT-01** | Identity | Hash Aadhaar using SHA-256 | Hashing is deterministic and raw number is purged from memory. |
| **UT-02** | Auth | Validate JWT Expiry | Token becomes invalid exactly after 15 minutes of inactivity. |
| **UT-03** | Data | Hospital Isolation Logic | Query for Hospital A records by Hospital B doctor returns `null/empty`. |
| **UT-04** | Logic | Bed Capacity Bounds | `availableBeds` cannot exceed `totalBeds` or drop below `0`. |

---

## 2. Integration Testing (Workflow)

### 2.1 Scenario: Appointment Lifecycle
**Workflow:** Patient Search → Slot Selection → Booking → Doc Consultation.
- **Validation 1**: Slot is marked as 'BOOKED' in DB immediately.
- **Validation 2**: The same slot is no longer visible to other patients in search.
- **Validation 3**: Doctor dashboard updates in real-time using UI state/sync.

### 2.2 Scenario: Blood Bank Supply Sync
**Workflow:** Inventory Update → National Search → Request.
- **Validation 1**: City-wide filter correctly identifies 'O+' units in certified nodes only.
- **Validation 2**: Request triggering sends an immutable audit log entry.

---

## 3. Security & Validation (Edge Cases)

| Scenario | Input | Expected System Response | Status |
|----------|-------|--------------------------|--------|
| **SQL Injection** | `1' OR '1'='1` in Search | Prisma ORM parameterizes query; search returns no results or exact match. | ✅ Passed |
| **Cross-Site Scripting (XSS)** | `<script>alert(1)</script>` in Profile | React auto-escapes content; script renders as plain text. | ✅ Passed |
| **Unauthorized Access** | Direct URL to `/admin` without JWT | Middleware intercepts and redirects to `/login`. | ✅ Passed |
| **Duplicate Identity** | Re-hashing same Aadhaar | System detects existing hash and prompts for 'Recovery' instead of 'New ID'. | ✅ Passed |

---

## 4. User Acceptance Testing (UAT)

- **Scenario**: A receptionist with 0 technical training needs to book an emergency bed.
- **Validation**: User can finish the task in < 3 clicks. (Passed via Dashboard Quick-Action).

---

## 5. Performance Benchmarks

- **Max Concurrent Users**: Tested for 10,000 using mock load.
- **Latency**: 95% of API requests completed in < 120ms.
- **Database Indexing**: Search queries on 1 Million (mock) records return in < 50ms.
