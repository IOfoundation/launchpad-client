import {getHolidayHours, getApiHours} from '@Utils';

/* eslint-disable complexity */
const createArrayOfIds = checked => {
  const taxonomiesKeys = Object.keys(checked);

  return taxonomiesKeys.reduce((acc, key) => {
    const category = Object.keys(checked[key]);
    const activeIds = category.reduce((idsArray, categoryId) => {
      if (checked[key][categoryId]) {
        idsArray.push(categoryId);
      }

      return idsArray;
    }, []);

    acc.push(...activeIds);

    return acc;
  }, []);
};

const createKeywordsArray = keywords => {
  return keywords.split(',').reduce((acc, keyword) => {
    if (keyword) {
      acc.push(keyword.trim());
    }

    return acc;
  }, []);
};

const Service = ({
  acceptedPaymentMethods,
  applicationProcess,
  audience,
  delete_hoursHolidays,
  delete_hoursRegular,
  description,
  displayName,
  eligibility,
  email,
  fees,
  fundingSources,
  hoursHolidays,
  hoursRegular,
  interpretationServices,
  keywords,
  name,
  requiredDocuments,
  serviceLanguages,
  servicesAreas,
  status,
  taxonomy,
  waitTime,
  website,
}) => {
  const mapped = {};

  if (acceptedPaymentMethods) {
    mapped.accepted_payments = acceptedPaymentMethods;
  }

  if (applicationProcess) {
    mapped.application_process = applicationProcess;
  }

  if (audience) {
    mapped.audience = audience;
  }

  if (description) {
    mapped.description = description;
  }

  if (displayName) {
    mapped.alternate_name = displayName;
  }

  if (eligibility) {
    mapped.eligibility = eligibility;
  }

  if (email) {
    mapped.email = email;
  }

  if (fees) {
    mapped.fees = fees;
  }

  if (fundingSources) {
    mapped.funding_sources = [fundingSources];
  }

  if (name) {
    mapped.name = name;
  }

  if (status) {
    mapped.status = status;
  }

  if (website) {
    mapped.website = website;
  }

  if (waitTime) {
    mapped.wait_time = waitTime;
  }

  mapped.taxonomy_ids = createArrayOfIds(taxonomy);

  if (requiredDocuments) {
    mapped.required_documents = [requiredDocuments];
  }

  if (keywords) {
    mapped.keywords = createKeywordsArray(keywords);
  }

  if (servicesAreas) {
    mapped.service_areas = [servicesAreas];
  }

  if (interpretationServices) {
    mapped.interpretation_services = [interpretationServices];
  }

  if (serviceLanguages) {
    mapped.languages = [serviceLanguages];
  }

  if (hoursHolidays.length > 0 || delete_hoursHolidays.length > 0) {
    mapped.holiday_schedules_attributes = getHolidayHours(
      hoursHolidays,
      delete_hoursHolidays
    );
  }

  if (hoursRegular.length > 0 || delete_hoursRegular.length > 0) {
    mapped.regular_schedules_attributes = getApiHours(
      hoursRegular,
      delete_hoursRegular
    );
  }

  return mapped;
};
/* eslint-disable complexity */

export default Service;
