/* eslint-disable complexity */
const createArrayOfIds = checked => {
  return Object.keys(checked).reduce((acc, key) => {
    if (checked[key]) {
      acc.push(key);
    }

    return acc;
  }, []);
};

const Service = values => {
  const mapped = {};

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

  if (values.name) {
    mapped.name = values.name;
  }

  if (values.status) {
    mapped.status = values.status;
  }

  if (values.website) {
    mapped.website = values.website;
  }

  if (values.waitTime) {
    mapped.wait_time = values.waitTime;
  }

  const category_ids = createArrayOfIds(values[1]);

  if (category_ids.length > 0) {
    mapped.taxonomy_ids = category_ids;
  }

  if (values.requiredDocuments) {
    mapped.required_documents = [values.requiredDocuments];
  }

  if (values.keywords) {
    mapped.keywords = [values.keywords];
  }

  if (values.servicesAreas) {
    mapped.service_areas = [values.servicesAreas];
  }

  if (values.servicesAreas) {
    mapped.service_areas = [values.servicesAreas];
  }

  if (values.interpretationServices) {
    mapped.interpretation_services = [values.interpretationServices];
  }

  if (values.interpretationServices) {
    mapped.interpretation_services = [values.interpretationServices];
  }

  if (values.serviceLanguages) {
    mapped.languages = [values.serviceLanguages];
  }

  if (values.phones) {
    mapped.phones_attributes = [values.phones];
  }
  // holiday_schedules_attributes // hoursHolidays
  // regular_schedules_attributes // hoursRegular

  return mapped;
};
/* eslint-disable complexity */

export default Service;
