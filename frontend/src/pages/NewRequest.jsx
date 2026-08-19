import { useState } from 'react'
import { ArrowLeft, FileText, Upload } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { api } from '../lib/api'
<<<<<<< HEAD
import {
  COMORBIDITIES,
  DIAGNOSES,
  DOSE_CATEGORIES,
  FREQUENCIES,
  PAYERS,
  PROVIDER_TYPES,
  REQUEST_REASONS,
  ROUTES,
  SEVERITIES,
  SPECIALTIES,
  STATES,
  TREATMENTS,
} from '../lib/vocab'

import { Alert, Card, Field, Spinner } from '../components/ui'

const INITIAL = {
  age: '',
  sex: '',
  bmi: '',
  diagnosis: '',
  diagnosis_code: '',
  disease_severity: '',
  symptom_burden_0_10: '',
  symptom_duration_months: '',
  comorbidities: 'Unknown',

  requested_treatment: '',
  dose_category: '',
  frequency: '',
  route: '',
  requested_duration_months: '',
  request_reason: '',

  previous_treatment_count: '0',
  previous_failed_count: '0',
  previous_partial_response_count: '0',
  previous_adverse_effect_count: '0',
  longest_previous_treatment_weeks: '0',

  doctor_note_present: 0,
  lab_results_present: 0,
  imaging_present: 0,
  medication_history_present: 0,
  documentation_complete: 0,

  provider_specialty: '',
  provider_state: '',
  provider_type: '',
  payer: '',

  member_eligible: 1,
  treatment_covered: 1,

  clinical_evidence_score: '',
=======
import { Alert, Card, Field } from '../components/ui'

const INITIAL = {
  document_type: 'HOSPITAL_PA',

  // Patient
  patient_name: '',
  member_id: '',
  date_of_birth: '',
  age: '',
  sex: '',
  mobile: '',
  email: '',
  policy_id: '',
  group_number: '',
  primary_care_provider: '',

  // Provider / Hospital
  treating_provider: '',
  provider_npi: '',
  provider_contact: '',
  hospital_facility: '',
  facility_id: '',
  facility_status: '',
  hospital_contact: '',

  // Clinical
  clinical_complaint: '',
  clinical_findings: '',
  past_relevant_history: '',
  symptom_duration_days: '',
  date_first_consultation: '',
  diagnosis: '',
  diagnosis_code: '',
  comorbidities: '',
  clinical_rationale: '',

  // Treatment
  treatment_type: '',
  requested_treatment: '',
  procedure_code: '',
  treatment_details: '',
  medication_therapy: '',
  route: '',
  requested_service_date: '',

  // Hospitalization
  admission_date_time: '',
  hospitalization_type: '',
  expected_length_of_stay_days: '',
  expected_icu_stay_days: '',
  room_level_of_care: '',
  maternity_delivery: '',
  accident_injury: '',
  accident_cause: '',
  rta: '',
  medico_legal: '',
  police_fir: '',
  fir_number: '',
  substance_related_injury: '',
  chronic_conditions: '',

  // Cost
  room_nursing_diet_cost: '',
  investigation_diagnostics_cost: '',
  icu_charges: '',
  procedure_charges: '',
  professional_fees: '',
  medicines_consumables: '',
  implants_cost: '',
  other_hospital_expenses: '',
  package_charges: '',
  total_expected_cost: '',

  // Supporting documents
  clinical_records_present: 0,
  diagnostic_lab_reports_present: 0,
  imaging_reports_present: 0,
  prescription_present: 0,
  previous_medical_records_present: 0,
  procedure_documentation_present: 0,
  cost_estimate_present: 0,
  other_supporting_documents: '',

  // Declaration
  provider_declaration: '',
  treating_provider_signature: '',
  hospital_authorized_signature: '',
  hospital_provider_stamp: '',

  // Compatibility / prediction fields
  member_eligible: 1,
  treatment_covered: 1,
  documentation_complete: 0,
>>>>>>> origin/HARINI
}

const NUMERIC_FIELDS = [
  'age',
<<<<<<< HEAD
  'bmi',
  'symptom_burden_0_10',
  'symptom_duration_months',
  'requested_duration_months',
  'previous_treatment_count',
  'previous_failed_count',
  'previous_partial_response_count',
  'previous_adverse_effect_count',
  'longest_previous_treatment_weeks',
  'clinical_evidence_score',
]

function normalizeExtracted(fields) {
  const next = {}

  Object.entries(fields || {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return
    }

    next[key] = value
  })

  return next
=======
  'symptom_duration_days',
  'expected_length_of_stay_days',
  'expected_icu_stay_days',
  'room_nursing_diet_cost',
  'investigation_diagnostics_cost',
  'icu_charges',
  'procedure_charges',
  'professional_fees',
  'medicines_consumables',
  'implants_cost',
  'other_hospital_expenses',
  'package_charges',
  'total_expected_cost',
]

const BOOLEAN_FIELDS = [
  'clinical_records_present',
  'diagnostic_lab_reports_present',
  'imaging_reports_present',
  'prescription_present',
  'previous_medical_records_present',
  'procedure_documentation_present',
  'cost_estimate_present',
  'member_eligible',
  'treatment_covered',
  'documentation_complete',
]

function cleanValue(value) {
  if (value === null || value === undefined) return ''
  return value
}

function numberValue(value) {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const cleaned = String(value).replace(/[$,\s]/g, '')
  const number = Number(cleaned)

  return Number.isFinite(number) ? number : value
}

/*
 * The backend may use slightly different names depending on
 * the hospital parser version. This function makes the frontend
 * tolerant of those names.
 */
function normalizeExtracted(fields = {}) {
  const source = { ...fields }

  const aliases = {
    patient_name: [
      'patient_name',
      'member_name',
      'name',
    ],

    member_id: [
      'member_id',
      'insurance_member_id',
      'member_number',
    ],

    date_of_birth: [
      'date_of_birth',
      'dob',
    ],

    sex: [
      'sex',
      'gender',
    ],

    policy_id: [
      'policy_id',
      'policy_group_id',
      'policy_number',
    ],

    group_number: [
      'group_number',
      'group_no',
    ],

    treating_provider: [
      'treating_provider',
      'provider_name',
    ],

    provider_npi: [
      'provider_npi',
      'npi',
    ],

    hospital_facility: [
      'hospital_facility',
      'hospital',
      'facility_name',
    ],

    facility_id: [
      'facility_id',
    ],

    facility_status: [
      'facility_status',
      'network_status',
    ],

    clinical_complaint: [
      'clinical_complaint',
      'complaint',
      'chief_complaint',
    ],

    clinical_findings: [
      'clinical_findings',
      'relevant_clinical_findings',
      'findings',
    ],

    past_relevant_history: [
      'past_relevant_history',
      'relevant_history',
      'past_history',
    ],

    symptom_duration_days: [
      'symptom_duration_days',
      'duration_present_condition_days',
    ],

    diagnosis: [
      'diagnosis',
      'primary_diagnosis',
      'primary_provisional_diagnosis',
    ],

    diagnosis_code: [
      'diagnosis_code',
      'icd10_code',
      'icd_10_code',
    ],

    comorbidities: [
      'comorbidities',
      'additional_diagnosis',
      'additional_diagnoses',
    ],

    clinical_rationale: [
      'clinical_rationale',
      'medical_necessity',
      'necessity',
    ],

    treatment_type: [
      'treatment_type',
    ],

    requested_treatment: [
      'requested_treatment',
      'treatment_procedure',
      'procedure',
      'authorization_requested_for',
    ],

    procedure_code: [
      'procedure_code',
      'cpt_code',
      'cpt',
    ],

    treatment_details: [
      'treatment_details',
    ],

    medication_therapy: [
      'medication_therapy',
      'medication',
      'therapy',
    ],

    route: [
      'route',
      'route_of_administration',
    ],

    admission_date_time: [
      'admission_date_time',
      'admission_datetime',
      'admission_date',
    ],

    hospitalization_type: [
      'hospitalization_type',
    ],

    expected_length_of_stay_days: [
      'expected_length_of_stay_days',
      'expected_length_of_stay',
    ],

    expected_icu_stay_days: [
      'expected_icu_stay_days',
      'expected_icu_stay',
    ],

    room_level_of_care: [
      'room_level_of_care',
      'room_level',
    ],

    total_expected_cost: [
      'total_expected_cost',
      'total_cost',
      'expected_total_cost',
    ],

    provider_declaration: [
      'provider_declaration',
      'declaration',
    ],

    treating_provider_signature: [
      'treating_provider_signature',
      'provider_signature',
    ],

    hospital_authorized_signature: [
      'hospital_authorized_signature',
      'hospital_signature',
    ],

    hospital_provider_stamp: [
      'hospital_provider_stamp',
      'provider_stamp',
      'hospital_stamp',
    ],
  }

  const normalized = {}

  Object.entries(aliases).forEach(([target, possibleKeys]) => {
    for (const key of possibleKeys) {
      if (
        source[key] !== undefined &&
        source[key] !== null &&
        source[key] !== ''
      ) {
        normalized[target] = source[key]
        break
      }
    }
  })

  // Keep every original backend field too.
  Object.entries(source).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      normalized[key] = value
    }
  })

  // Normalize gender values for the select.
  if (normalized.sex) {
    const gender = String(normalized.sex).toLowerCase()

    if (gender === 'female' || gender === 'f') {
      normalized.sex = 'Female'
    } else if (gender === 'male' || gender === 'm') {
      normalized.sex = 'Male'
    } else if (gender === 'other') {
      normalized.sex = 'Other'
    }
  }

  // Convert numeric fields.
  NUMERIC_FIELDS.forEach((field) => {
    if (normalized[field] !== undefined) {
      normalized[field] = numberValue(normalized[field])
    }
  })

  return normalized
>>>>>>> origin/HARINI
}

export default function NewRequest() {
  const navigate = useNavigate()

  const [form, setForm] = useState(INITIAL)
  const [documentId, setDocumentId] = useState(null)
  const [filename, setFilename] = useState('')
  const [extraction, setExtraction] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
<<<<<<< HEAD

=======
>>>>>>> origin/HARINI
  const [error, setError] = useState(null)

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const uploadPdf = async (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.name.toLowerCase().endsWith('.pdf')) {
<<<<<<< HEAD
      setError('Please upload a PDF prior-authorization packet.')
=======
      setError('Please upload a PDF prior-authorization request.')
>>>>>>> origin/HARINI
      return
    }

    setUploading(true)
    setError(null)
    setExtraction(null)

    try {
      const result = await api.upload(
        '/api/documents/upload',
        file,
      )

      setDocumentId(result.document_id)
      setFilename(result.filename)

      const extracted = normalizeExtracted(result.fields)

      setForm((current) => ({
        ...current,
        ...extracted,
<<<<<<< HEAD
=======
        document_type: 'HOSPITAL_PA',
>>>>>>> origin/HARINI
      }))

      setExtraction(result)
    } catch (e) {
<<<<<<< HEAD
      setError(e.message)
=======
      setError(e.message || 'Unable to extract the PDF.')
>>>>>>> origin/HARINI
    } finally {
      setUploading(false)
    }
  }

  const submit = async (event) => {
    event.preventDefault()

<<<<<<< HEAD
=======
    if (!documentId) {
      setError('Please upload the hospital PDF first.')
      return
    }

>>>>>>> origin/HARINI
    setSubmitting(true)
    setError(null)

    try {
      const features = {
        ...form,
<<<<<<< HEAD
      }

=======
        document_type: 'HOSPITAL_PA',
      }

      // Convert numeric fields.
>>>>>>> origin/HARINI
      for (const field of NUMERIC_FIELDS) {
        if (
          features[field] !== '' &&
          features[field] !== null &&
          features[field] !== undefined
        ) {
<<<<<<< HEAD
          features[field] = Number(features[field])
        }
      }

      for (const field of [
        'doctor_note_present',
        'lab_results_present',
        'imaging_present',
        'medication_history_present',
        'documentation_complete',
        'member_eligible',
        'treatment_covered',
      ]) {
        features[field] = Number(features[field] || 0)
      }

=======
          const value = numberValue(features[field])

          if (value !== '') {
            features[field] = value
          }
        }
      }

      // Convert checkbox fields.
      for (const field of BOOLEAN_FIELDS) {
        features[field] = Number(
          Boolean(features[field])
        )
      }

      // Calculate documentation completeness.
      const documentFields = [
        'clinical_records_present',
        'diagnostic_lab_reports_present',
        'imaging_reports_present',
        'prescription_present',
        'previous_medical_records_present',
        'procedure_documentation_present',
        'cost_estimate_present',
      ]

      const attachedCount = documentFields.reduce(
        (count, field) =>
          count + (features[field] ? 1 : 0),
        0,
      )

      features.supporting_documents_count =
        attachedCount

      features.documentation_complete =
        attachedCount >= 5 ? 1 : 0

>>>>>>> origin/HARINI
      const result = await api.post('/api/requests', {
        features,
        document_id: documentId,
        patient_name: form.patient_name || null,
<<<<<<< HEAD
        mrn: form.mrn || null,
=======
        mrn: form.member_id || null,
>>>>>>> origin/HARINI
      })

      navigate(`/hospital/requests/${result.id}`)
    } catch (e) {
<<<<<<< HEAD
      setError(e.message)
=======
      setError(
        e.message ||
          'Unable to submit the authorization request.',
      )
>>>>>>> origin/HARINI
    } finally {
      setSubmitting(false)
    }
  }

  const missing =
    extraction?.missing_required || []

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Link
        to="/hospital"
        className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink"
      >
        <ArrowLeft size={13} />
        Hospital dashboard
      </Link>

      <div>
<<<<<<< HEAD
        <div className="eyebrow">Prior authorization</div>
        <h1 className="mt-1 text-2xl font-semibold">
          New authorization request
        </h1>
        <p className="mt-1.5 text-[13px] text-ink-2">
          Upload the PA packet first. The extraction service will populate
          what it can identify; review every field before submitting.
=======
        <div className="eyebrow">
          Prior authorization
        </div>

        <h1 className="mt-1 text-2xl font-semibold">
          New authorization request
        </h1>

        <p className="mt-1.5 text-[13px] text-ink-2">
          Upload the hospital authorization PDF.
          Information will be extracted automatically.
>>>>>>> origin/HARINI
        </p>
      </div>

      {error && (
        <Alert onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

<<<<<<< HEAD
      <Card
        eyebrow="Step 1"
        title="Upload the prior-authorization packet"
      >
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-ruleStrong bg-canvas px-6 py-10 text-center hover:bg-surface">
          <Upload size={24} className="text-provider" />

          <div className="mt-3 text-sm font-medium">
            {uploading
              ? 'Extracting clinical information…'
              : 'Choose a PDF packet'}
          </div>

          <div className="mt-1 text-[13px] text-ink-3">
            The backend extracts labelled fields and controlled vocabulary
            matches.
=======
      {/* STEP 1 */}
      <Card
        eyebrow="Step 1"
        title="Upload hospital authorization PDF"
      >
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-ruleStrong bg-canvas px-6 py-10 text-center hover:bg-surface">
          <Upload
            size={26}
            className="text-provider"
          />

          <div className="mt-3 text-sm font-medium">
            {uploading
              ? 'Extracting hospital information…'
              : 'Choose a PDF'}
          </div>

          <div className="mt-1 text-[13px] text-ink-3">
            Upload the completed hospital prior-authorization
            request.
>>>>>>> origin/HARINI
          </div>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={uploadPdf}
            disabled={uploading}
          />
        </label>

        {filename && (
          <div className="mt-4 flex items-center gap-2 rounded-md border border-rule bg-canvas px-3 py-2.5">
<<<<<<< HEAD
            <FileText size={15} className="text-provider" />
=======
            <FileText
              size={16}
              className="text-provider"
            />
>>>>>>> origin/HARINI

            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">
                {filename}
              </div>

              {extraction && (
                <div className="text-2xs text-ink-3">
                  {extraction.page_count} pages ·{' '}
                  {extraction.char_count} characters ·{' '}
<<<<<<< HEAD
                  {(extraction.extraction_confidence * 100).toFixed(1)}%
                  extraction confidence
=======
                  {(
                    extraction.extraction_confidence *
                    100
                  ).toFixed(1)}
                  % extraction confidence
>>>>>>> origin/HARINI
                </div>
              )}
            </div>
          </div>
        )}

        {missing.length > 0 && (
          <div className="mt-4 rounded-md border border-review-line bg-review-soft px-3 py-2.5 text-[13px] text-review">
            <strong>Fields requiring review:</strong>{' '}
            {missing.join(', ')}
          </div>
        )}
      </Card>

<<<<<<< HEAD
      <form onSubmit={submit} className="space-y-5">
        <Card eyebrow="Step 2" title="Patient and condition">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
=======
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        {/* STEP 2 */}
        <Card
          eyebrow="Step 2"
          title="Patient information"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Patient name">
              <input
                className="input"
                value={form.patient_name}
                onChange={(e) =>
                  update(
                    'patient_name',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Member ID">
              <input
                className="input"
                value={form.member_id}
                onChange={(e) =>
                  update(
                    'member_id',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Date of birth">
              <input
                className="input"
                value={form.date_of_birth}
                onChange={(e) =>
                  update(
                    'date_of_birth',
                    e.target.value,
                  )
                }
              />
            </Field>

>>>>>>> origin/HARINI
            <Field label="Age">
              <input
                className="input"
                type="number"
                min="0"
                max="120"
<<<<<<< HEAD
                required
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
              />
            </Field>

            <Field label="Sex">
              <select
                className="input"
                required
                value={form.sex}
                onChange={(e) => update('sex', e.target.value)}
              >
                <option value="">Select</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </Field>

            <Field label="BMI">
              <input
                className="input"
                type="number"
                min="5"
                max="100"
                step="0.1"
                required
                value={form.bmi}
                onChange={(e) => update('bmi', e.target.value)}
              />
            </Field>

            <Field label="Symptom burden (0–10)">
              <input
                className="input"
                type="number"
                min="0"
                max="10"
                step="0.1"
                required
                value={form.symptom_burden_0_10}
                onChange={(e) =>
                  update('symptom_burden_0_10', e.target.value)
=======
                value={form.age}
                onChange={(e) =>
                  update('age', e.target.value)
>>>>>>> origin/HARINI
                }
              />
            </Field>

<<<<<<< HEAD
            <Field label="Diagnosis">
              <select
                className="input"
                required
                value={form.diagnosis}
                onChange={(e) => update('diagnosis', e.target.value)}
              >
                <option value="">Select diagnosis</option>
                {DIAGNOSES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Diagnosis code">
              <input
                className="input"
                value={form.diagnosis_code}
                placeholder="Auto-filled from diagnosis"
                onChange={(e) =>
                  update('diagnosis_code', e.target.value)
=======
            <Field label="Gender">
              <select
                className="input"
                value={form.sex}
                onChange={(e) =>
                  update('sex', e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Female">
                  Female
                </option>
                <option value="Male">
                  Male
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </Field>

            <Field label="Mobile">
              <input
                className="input"
                value={form.mobile}
                onChange={(e) =>
                  update(
                    'mobile',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Email">
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) =>
                  update(
                    'email',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Policy ID">
              <input
                className="input"
                value={form.policy_id}
                onChange={(e) =>
                  update(
                    'policy_id',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Group number">
              <input
                className="input"
                value={form.group_number}
                onChange={(e) =>
                  update(
                    'group_number',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Primary care provider">
              <input
                className="input"
                value={
                  form.primary_care_provider
                }
                onChange={(e) =>
                  update(
                    'primary_care_provider',
                    e.target.value,
                  )
                }
              />
            </Field>
          </div>
        </Card>

        {/* STEP 3 */}
        <Card
          eyebrow="Step 3"
          title="Provider and hospital"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Treating provider">
              <input
                className="input"
                value={form.treating_provider}
                onChange={(e) =>
                  update(
                    'treating_provider',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Provider NPI">
              <input
                className="input"
                value={form.provider_npi}
                onChange={(e) =>
                  update(
                    'provider_npi',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Provider contact">
              <input
                className="input"
                value={form.provider_contact}
                onChange={(e) =>
                  update(
                    'provider_contact',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Hospital / Facility">
              <input
                className="input"
                value={form.hospital_facility}
                onChange={(e) =>
                  update(
                    'hospital_facility',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Facility ID">
              <input
                className="input"
                value={form.facility_id}
                onChange={(e) =>
                  update(
                    'facility_id',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Facility status">
              <select
                className="input"
                value={form.facility_status}
                onChange={(e) =>
                  update(
                    'facility_status',
                    e.target.value,
                  )
                }
              >
                <option value="">
                  Select
                </option>
                <option value="In-Network">
                  In-Network
                </option>
                <option value="Out-of-Network">
                  Out-of-Network
                </option>
              </select>
            </Field>

            <Field label="Hospital contact">
              <input
                className="input"
                value={form.hospital_contact}
                onChange={(e) =>
                  update(
                    'hospital_contact',
                    e.target.value,
                  )
                }
              />
            </Field>
          </div>
        </Card>

        {/* STEP 4 */}
        <Card
          eyebrow="Step 4"
          title="Clinical information"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary diagnosis">
              <input
                className="input"
                value={form.diagnosis}
                onChange={(e) =>
                  update(
                    'diagnosis',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="ICD-10 code">
              <input
                className="input"
                value={form.diagnosis_code}
                onChange={(e) =>
                  update(
                    'diagnosis_code',
                    e.target.value,
                  )
>>>>>>> origin/HARINI
                }
              />
            </Field>

<<<<<<< HEAD
            <Field label="Disease severity">
              <select
                className="input"
                required
                value={form.disease_severity}
                onChange={(e) =>
                  update('disease_severity', e.target.value)
                }
              >
                <option value="">Select severity</option>
                {SEVERITIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Symptom duration (months)">
=======
            <Field label="Duration of present condition">
              <input
                className="input"
                value={
                  form.symptom_duration_days
                    ? `${form.symptom_duration_days} days`
                    : ''
                }
                onChange={(e) =>
                  update(
                    'symptom_duration_days',
                    e.target.value.replace(
                      /[^0-9]/g,
                      '',
                    ),
                  )
                }
              />
            </Field>

            <Field label="Date of first consultation">
              <input
                className="input"
                value={
                  form.date_first_consultation
                }
                onChange={(e) =>
                  update(
                    'date_first_consultation',
                    e.target.value,
                  )
                }
              />
            </Field>
          </div>

          <div className="mt-4 space-y-4">
            <TextAreaField
              label="Clinical complaint"
              value={form.clinical_complaint}
              onChange={(value) =>
                update(
                  'clinical_complaint',
                  value,
                )
              }
            />

            <TextAreaField
              label="Relevant clinical findings"
              value={form.clinical_findings}
              onChange={(value) =>
                update(
                  'clinical_findings',
                  value,
                )
              }
            />

            <TextAreaField
              label="Past / relevant history"
              value={
                form.past_relevant_history
              }
              onChange={(value) =>
                update(
                  'past_relevant_history',
                  value,
                )
              }
            />

            <TextAreaField
              label="Comorbidities"
              value={form.comorbidities}
              onChange={(value) =>
                update(
                  'comorbidities',
                  value,
                )
              }
            />

            <TextAreaField
              label="Clinical rationale / medical necessity"
              value={form.clinical_rationale}
              onChange={(value) =>
                update(
                  'clinical_rationale',
                  value,
                )
              }
            />
          </div>
        </Card>

        {/* STEP 5 */}
        <Card
          eyebrow="Step 5"
          title="Requested treatment / procedure"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Treatment type">
              <select
                className="input"
                value={form.treatment_type}
                onChange={(e) =>
                  update(
                    'treatment_type',
                    e.target.value,
                  )
                }
              >
                <option value="">
                  Select
                </option>
                <option value="Medical Management">
                  Medical Management
                </option>
                <option value="Surgical">
                  Surgical
                </option>
                <option value="ICU">
                  ICU
                </option>
                <option value="Investigation">
                  Investigation
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </Field>

            <Field label="Treatment / Procedure">
              <input
                className="input"
                value={form.requested_treatment}
                onChange={(e) =>
                  update(
                    'requested_treatment',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Procedure code / CPT">
              <input
                className="input"
                value={form.procedure_code}
                onChange={(e) =>
                  update(
                    'procedure_code',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Route">
              <input
                className="input"
                value={form.route}
                onChange={(e) =>
                  update(
                    'route',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Requested service date">
              <input
                className="input"
                value={
                  form.requested_service_date
                }
                onChange={(e) =>
                  update(
                    'requested_service_date',
                    e.target.value,
                  )
                }
              />
            </Field>
          </div>

          <div className="mt-4 space-y-4">
            <TextAreaField
              label="Treatment details"
              value={form.treatment_details}
              onChange={(value) =>
                update(
                  'treatment_details',
                  value,
                )
              }
            />

            <TextAreaField
              label="Medication / therapy"
              value={form.medication_therapy}
              onChange={(value) =>
                update(
                  'medication_therapy',
                  value,
                )
              }
            />
          </div>
        </Card>

        {/* STEP 6 */}
        <Card
          eyebrow="Step 6"
          title="Hospitalization details"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Admission date / time">
              <input
                className="input"
                value={
                  form.admission_date_time
                }
                onChange={(e) =>
                  update(
                    'admission_date_time',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Hospitalization type">
              <select
                className="input"
                value={
                  form.hospitalization_type
                }
                onChange={(e) =>
                  update(
                    'hospitalization_type',
                    e.target.value,
                  )
                }
              >
                <option value="">
                  Select
                </option>
                <option value="Emergency">
                  Emergency
                </option>
                <option value="Planned">
                  Planned
                </option>
                <option value="Day Care">
                  Day Care
                </option>
                <option value="Maternity">
                  Maternity
                </option>
              </select>
            </Field>

            <Field label="Expected length of stay">
>>>>>>> origin/HARINI
              <input
                className="input"
                type="number"
                min="0"
<<<<<<< HEAD
                step="1"
                required
                value={form.symptom_duration_months}
                onChange={(e) =>
                  update('symptom_duration_months', e.target.value)
=======
                value={
                  form.expected_length_of_stay_days
                }
                onChange={(e) =>
                  update(
                    'expected_length_of_stay_days',
                    e.target.value,
                  )
                }
              />
            </Field>

            <Field label="Expected ICU stay">
              <input
                className="input"
                type="number"
                min="0"
                value={
                  form.expected_icu_stay_days
                }
                onChange={(e) =>
                  update(
                    'expected_icu_stay_days',
                    e.target.value,
                  )
>>>>>>> origin/HARINI
                }
              />
            </Field>
          </div>

          <div className="mt-4">
<<<<<<< HEAD
            <Field label="Comorbidities">
              <select
                className="input"
                value={form.comorbidities}
                onChange={(e) =>
                  update('comorbidities', e.target.value)
                }
              >
                <option value="Unknown">Unknown</option>
                {COMORBIDITIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card eyebrow="Step 3" title="Requested therapy">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Requested treatment">
              <select
                className="input"
                required
                value={form.requested_treatment}
                onChange={(e) =>
                  update('requested_treatment', e.target.value)
                }
              >
                <option value="">Select treatment</option>
                {TREATMENTS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Dose category">
              <select
                className="input"
                required
                value={form.dose_category}
                onChange={(e) =>
                  update('dose_category', e.target.value)
                }
              >
                <option value="">Select</option>
                {DOSE_CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Frequency">
              <select
                className="input"
                required
                value={form.frequency}
                onChange={(e) =>
                  update('frequency', e.target.value)
                }
              >
                <option value="">Select</option>
                {FREQUENCIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Route">
              <select
                className="input"
                required
                value={form.route}
                onChange={(e) =>
                  update('route', e.target.value)
                }
              >
                <option value="">Select</option>
                {ROUTES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Requested duration (months)">
              <select
                className="input"
                required
                value={form.requested_duration_months}
                onChange={(e) =>
                  update(
                    'requested_duration_months',
                    e.target.value,
                  )
                }
              >
                <option value="">Select</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </Field>

            <Field label="Reason for request">
              <select
                className="input"
                required
                value={form.request_reason}
                onChange={(e) =>
                  update('request_reason', e.target.value)
                }
              >
                <option value="">Select reason</option>
                {REQUEST_REASONS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card eyebrow="Step 4" title="Previous treatment history">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <NumberField
              label="Previous treatments"
              value={form.previous_treatment_count}
              onChange={(v) =>
                update('previous_treatment_count', v)
              }
            />

            <NumberField
              label="Failed treatments"
              value={form.previous_failed_count}
              onChange={(v) =>
                update('previous_failed_count', v)
              }
            />

            <NumberField
              label="Partial responses"
              value={form.previous_partial_response_count}
              onChange={(v) =>
                update('previous_partial_response_count', v)
              }
            />

            <NumberField
              label="Adverse effects"
              value={form.previous_adverse_effect_count}
              onChange={(v) =>
                update('previous_adverse_effect_count', v)
              }
            />

            <NumberField
              label="Longest trial (weeks)"
              value={form.longest_previous_treatment_weeks}
              onChange={(v) =>
                update('longest_previous_treatment_weeks', v)
=======
            <TextAreaField
              label="Room / level of care"
              value={
                form.room_level_of_care
              }
              onChange={(value) =>
                update(
                  'room_level_of_care',
                  value,
                )
              }
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CheckField
              label="Accident / injury"
              checked={
                form.accident_injury === 'Yes'
              }
              onChange={(value) =>
                update(
                  'accident_injury',
                  value ? 'Yes' : 'No',
                )
              }
            />

            <CheckField
              label="RTA"
              checked={form.rta === 'Yes'}
              onChange={(value) =>
                update(
                  'rta',
                  value ? 'Yes' : 'No',
                )
              }
            />

            <CheckField
              label="Medico-legal"
              checked={
                form.medico_legal === 'Yes'
              }
              onChange={(value) =>
                update(
                  'medico_legal',
                  value ? 'Yes' : 'No',
                )
              }
            />

            <CheckField
              label="Police / FIR reported"
              checked={
                form.police_fir === 'Yes'
              }
              onChange={(value) =>
                update(
                  'police_fir',
                  value ? 'Yes' : 'No',
                )
>>>>>>> origin/HARINI
              }
            />
          </div>
        </Card>

<<<<<<< HEAD
        <Card eyebrow="Step 5" title="Documentation and coverage">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CheckField
              label="Clinical note attached"
              checked={form.doctor_note_present}
              onChange={(v) =>
                update('doctor_note_present', v ? 1 : 0)
              }
            />

            <CheckField
              label="Lab results attached"
              checked={form.lab_results_present}
              onChange={(v) =>
                update('lab_results_present', v ? 1 : 0)
              }
            />

            <CheckField
              label="Imaging attached"
              checked={form.imaging_present}
              onChange={(v) =>
                update('imaging_present', v ? 1 : 0)
              }
            />

            <CheckField
              label="Medication history attached"
              checked={form.medication_history_present}
              onChange={(v) =>
                update('medication_history_present', v ? 1 : 0)
              }
            />

            <CheckField
              label="Member eligible"
              checked={form.member_eligible}
              onChange={(v) =>
                update('member_eligible', v ? 1 : 0)
              }
            />

            <CheckField
              label="Treatment is covered"
              checked={form.treatment_covered}
              onChange={(v) =>
                update('treatment_covered', v ? 1 : 0)
              }
            />
          </div>
        </Card>

        <Card eyebrow="Step 6" title="Provider and payer information">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Provider specialty">
              <select
                className="input"
                required
                value={form.provider_specialty}
                onChange={(e) =>
                  update('provider_specialty', e.target.value)
                }
              >
                <option value="">Select</option>
                {SPECIALTIES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Provider state">
              <select
                className="input"
                required
                value={form.provider_state}
                onChange={(e) =>
                  update('provider_state', e.target.value)
                }
              >
                <option value="">Select</option>
                {STATES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Provider type">
              <select
                className="input"
                required
                value={form.provider_type}
                onChange={(e) =>
                  update('provider_type', e.target.value)
                }
              >
                <option value="">Select</option>
                {PROVIDER_TYPES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Payer">
              <select
                className="input"
                required
                value={form.payer}
                onChange={(e) =>
                  update('payer', e.target.value)
                }
              >
                <option value="">Select</option>
                {PAYERS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="btn bg-provider text-white border-provider hover:bg-provider-deep"
          >
            {submitting
              ? 'Processing authorization…'
              : 'Submit for automated adjudication'}
=======
        {/* STEP 7 */}
        <Card
          eyebrow="Step 7"
          title="Expected hospitalization cost"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MoneyField
              label="Room + nursing + diet"
              value={
                form.room_nursing_diet_cost
              }
              onChange={(v) =>
                update(
                  'room_nursing_diet_cost',
                  v,
                )
              }
            />

            <MoneyField
              label="Investigation / diagnostics"
              value={
                form.investigation_diagnostics_cost
              }
              onChange={(v) =>
                update(
                  'investigation_diagnostics_cost',
                  v,
                )
              }
            />

            <MoneyField
              label="ICU charges"
              value={form.icu_charges}
              onChange={(v) =>
                update('icu_charges', v)
              }
            />

            <MoneyField
              label="OT / procedure charges"
              value={form.procedure_charges}
              onChange={(v) =>
                update(
                  'procedure_charges',
                  v,
                )
              }
            />

            <MoneyField
              label="Professional fees"
              value={form.professional_fees}
              onChange={(v) =>
                update(
                  'professional_fees',
                  v,
                )
              }
            />

            <MoneyField
              label="Medicines / consumables"
              value={
                form.medicines_consumables
              }
              onChange={(v) =>
                update(
                  'medicines_consumables',
                  v,
                )
              }
            />

            <MoneyField
              label="Implants"
              value={form.implants_cost}
              onChange={(v) =>
                update(
                  'implants_cost',
                  v,
                )
              }
            />

            <MoneyField
              label="Other hospital expenses"
              value={
                form.other_hospital_expenses
              }
              onChange={(v) =>
                update(
                  'other_hospital_expenses',
                  v,
                )
              }
            />

            <MoneyField
              label="Package charges"
              value={form.package_charges}
              onChange={(v) =>
                update(
                  'package_charges',
                  v,
                )
              }
            />

            <MoneyField
              label="Total expected cost"
              value={form.total_expected_cost}
              onChange={(v) =>
                update(
                  'total_expected_cost',
                  v,
                )
              }
            />
          </div>
        </Card>

        {/* STEP 8 */}
        <Card
          eyebrow="Step 8"
          title="Supporting documents"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CheckField
              label="Clinical records attached"
              checked={
                form.clinical_records_present
              }
              onChange={(v) =>
                update(
                  'clinical_records_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Diagnostic / lab reports attached"
              checked={
                form.diagnostic_lab_reports_present
              }
              onChange={(v) =>
                update(
                  'diagnostic_lab_reports_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Imaging reports attached"
              checked={
                form.imaging_reports_present
              }
              onChange={(v) =>
                update(
                  'imaging_reports_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Prescription / treatment order attached"
              checked={
                form.prescription_present
              }
              onChange={(v) =>
                update(
                  'prescription_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Previous medical records attached"
              checked={
                form.previous_medical_records_present
              }
              onChange={(v) =>
                update(
                  'previous_medical_records_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Procedure / surgical documentation attached"
              checked={
                form.procedure_documentation_present
              }
              onChange={(v) =>
                update(
                  'procedure_documentation_present',
                  v ? 1 : 0,
                )
              }
            />

            <CheckField
              label="Cost estimate attached"
              checked={
                form.cost_estimate_present
              }
              onChange={(v) =>
                update(
                  'cost_estimate_present',
                  v ? 1 : 0,
                )
              }
            />
          </div>

          <div className="mt-4">
            <TextAreaField
              label="Other supporting documents"
              value={
                form.other_supporting_documents
              }
              onChange={(value) =>
                update(
                  'other_supporting_documents',
                  value,
                )
              }
            />
          </div>
        </Card>

        {/* STEP 9 */}
        <Card
          eyebrow="Step 9"
          title="Request and declaration"
        >
          <div className="space-y-4">
            <TextAreaField
              label="Provider declaration"
              value={
                form.provider_declaration
              }
              onChange={(value) =>
                update(
                  'provider_declaration',
                  value,
                )
              }
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Treating provider signature">
                <input
                  className="input"
                  value={
                    form.treating_provider_signature
                  }
                  onChange={(e) =>
                    update(
                      'treating_provider_signature',
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Hospital authorized signature">
                <input
                  className="input"
                  value={
                    form.hospital_authorized_signature
                  }
                  onChange={(e) =>
                    update(
                      'hospital_authorized_signature',
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Hospital / provider stamp">
                <input
                  className="input"
                  value={
                    form.hospital_provider_stamp
                  }
                  onChange={(e) =>
                    update(
                      'hospital_provider_stamp',
                      e.target.value,
                    )
                  }
                />
              </Field>
            </div>
          </div>
        </Card>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              submitting || uploading || !documentId
            }
            className="btn bg-provider text-white border-provider hover:bg-provider-deep disabled:opacity-50"
          >
            {submitting
              ? 'Processing authorization…'
              : 'Submit'}
>>>>>>> origin/HARINI
          </button>
        </div>
      </form>
    </div>
  )
}

<<<<<<< HEAD
function NumberField({ label, value, onChange }) {
=======
function TextAreaField({
  label,
  value,
  onChange,
}) {
  return (
    <Field label={label}>
      <textarea
        className="input min-h-[90px] resize-y"
        value={value || ''}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </Field>
  )
}

function MoneyField({
  label,
  value,
  onChange,
}) {
>>>>>>> origin/HARINI
  return (
    <Field label={label}>
      <input
        className="input"
        type="number"
        min="0"
<<<<<<< HEAD
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
=======
        step="0.01"
        value={value ?? ''}
        onChange={(e) =>
          onChange(e.target.value)
        }
>>>>>>> origin/HARINI
      />
    </Field>
  )
}

<<<<<<< HEAD
function CheckField({ label, checked, onChange }) {
=======
function CheckField({
  label,
  checked,
  onChange,
}) {
>>>>>>> origin/HARINI
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-rule bg-canvas px-3 py-3">
      <input
        type="checkbox"
        checked={Boolean(checked)}
<<<<<<< HEAD
        onChange={(e) => onChange(e.target.checked)}
=======
        onChange={(e) =>
          onChange(e.target.checked)
        }
>>>>>>> origin/HARINI
        className="h-4 w-4 accent-sky-700"
      />

      <span className="text-[13px]">
        {label}
      </span>
    </label>
  )
}