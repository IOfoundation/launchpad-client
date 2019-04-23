import {falsyToString, deepCopy} from '@Utils';

const normalizeArray = arrayArg => {
  if (arrayArg && arrayArg.length > 0) {
    return arrayArg;
  }
  return [];
};

const normalizeArrayData = (arrayArg, join = '') => {
  if (arrayArg) {
    return arrayArg.join(join);
  }
  return '';
};

const mapCategories = (categories, initialTaxonomy) => {
  const taxonomy = deepCopy(initialTaxonomy);

  if (categories) {
    categories.forEach(element => {
      taxonomy[element.parent_id][element.taxonomy_id] = true;
    });
  }

  return taxonomy;
};

const getHours = schedule => {
  if (!schedule) {
    return [];
  }
  return schedule.map(hour => {
    const open = hour.opens_at.split('T')[1].split('.')[0];
    const closes = hour.closes_at.split('T')[1].split('.')[0];

    return {
      id: hour.id,
      closesAt: closes,
      day: hour.weekday,
      opensAt: open,
    };
  });
};

const getHolidays = holidays => {
  if (!holidays) {
    return [];
  }

  return holidays.map(holiday => {
    const clean = Object.keys(holiday).reduce((acc, key) => {
      acc[key] = falsyToString(holiday[key]);
      return acc;
    }, {});
    const open = clean.opens_at && clean.opens_at.split('T')[1].split('.')[0];
    const closes =
      clean.closes_at && clean.closes_at.split('T')[1].split('.')[0];
    const startDate = clean.start_date && clean.start_date.split('T')[0];
    const endDate = clean.end_date && clean.end_date.split('T')[0];

    return {
      closed: holiday.closed ? 'true' : 'false',
      closesAt: closes || '',
      endDate: endDate || '',
      id: holiday.id,
      opensAt: open || '',
      startDate: startDate || '',
    };
  });
};

const getInitialValues = (
  {
    accepted_payments,
    alternate_name,
    application_process,
    audience,
    categories,
    description,
    eligibility,
    email,
    fees,
    funding_sources,
    holiday_schedules,
    interpretation_services,
    keywords,
    languages,
    name,
    regular_schedules,
    required_documents,
    service_areas,
    status,
    wait_time,
    website,
  },
  initialTaxonomy
) => {
  const formModel = {};

  formModel.acceptedPaymentMethods = normalizeArray(accepted_payments);
  formModel.applicationProcess = application_process || '';
  formModel.audience = audience || '';
  formModel.description = description || '';
  formModel.displayName = alternate_name || '';
  formModel.eligibility = eligibility || '';
  formModel.email = email || '';
  formModel.fees = fees || '';
  formModel.fundingSources = normalizeArray(funding_sources);
  formModel.interpretationServices = interpretation_services || '';
  formModel.keywords = normalizeArrayData(keywords, ', ');
  formModel.name = name || '';
  formModel.requiredDocuments = normalizeArray(required_documents);
  formModel.serviceLanguages = normalizeArray(languages);
  formModel.servicesAreas = normalizeArray(service_areas);
  formModel.status = status || '';
  formModel.waitTime = wait_time || '';
  formModel.website = website || '';
  formModel.taxonomy = mapCategories(categories, initialTaxonomy);
  formModel.hoursRegular = getHours(regular_schedules);
  formModel.hoursHolidays = getHolidays(holiday_schedules);

  return formModel;
};

export default getInitialValues;
