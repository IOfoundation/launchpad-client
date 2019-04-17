export const Service = values => {
  let mapped;

  /*:interpretation_services,
  :name,
  :status,
  :website,
  :wait_time,
  category_ids: [],
  required_documents: [],
  keywords: [],
  service_areas: [],
  languages: [],
  : [
    :id,
    :opens_at,
    :closes_at,
    :weekday,
    :_destroy
  ],

  phones_attributes: [
    :id,
    :department,
    :extension,
    :number,
    :number_type,
    :vanity_number,
    :_destroy
  ]*/

  if (values.acceptedPaymentMethods) {
    mapped.accepted_payments = [values.acceptedPaymentMethods];
  }

  if (values.applicationProcess) {
    mapped.application_process = values.applicationProcess;
  }

  if (values.audience) {
    mapped.audience = values.audience;
  }

  if (values.description) {
    mapped.description = values.description;
  }

  if (values.displayName) {
    mapped.alternate_name = values.displayName;
  }

  if (values.eligibility) {
    mapped.eligibility = values.eligibility;
  }

  if (values.email) {
    mapped.email = values.email;
  }

  if (values.fees) {
    mapped.fees = values.fees;
  }

  if (values.fundingSources) {
    mapped.funding_sources = [values.fundingSources];
  }

  //businessStage
  // businessType
  // holiday_schedules_attributes // hoursHolidays
  // regular_schedules_attributes // hoursRegular
  /* industry: {agriculture: false, arts: false, biosciencesServicesandMfg: false, construction: false, education: false, …}
interpretationServices: ""
keywords: ""
locationId: ""
name: "ASD"
requiredDocuments: ""
serviceCategories: {financialManagement: false, capital: false, legalServices: false, marketingSales: false, networking: false, …}
serviceLanguages: ""
servicesAreas: ""
status: ""
underservedCommunities: {africanAmerican: false, asian: false, hispanic: false, immigrant: false, LGBTQ: false, …}
waitTime: ""
website: ""*/

  return mapped;
};
