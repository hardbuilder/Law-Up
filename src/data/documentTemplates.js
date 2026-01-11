// Document template questions for different legal document types

export const documentTemplates = {
  'employment-agreement': {
    title: 'Employment Agreement',
    description: 'Create a comprehensive employment contract',
    questions: [
      {
        id: 'employer-info',
        type: 'group',
        title: 'Employer Information',
        questions: [
          { id: 'company-name', type: 'text', question: 'Company/Employer Name', required: true },
          { id: 'company-address', type: 'textarea', question: 'Company Address', required: true },
          { id: 'company-type', type: 'select', question: 'Company Type', options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'], required: true }
        ]
      },
      {
        id: 'employee-info',
        type: 'group',
        title: 'Employee Information',
        questions: [
          { id: 'employee-name', type: 'text', question: 'Employee Full Name', required: true },
          { id: 'employee-address', type: 'textarea', question: 'Employee Address', required: true },
          { id: 'job-title', type: 'text', question: 'Job Title/Position', required: true }
        ]
      },
      {
        id: 'employment-terms',
        type: 'group',
        title: 'Employment Terms',
        questions: [
          { id: 'start-date', type: 'date', question: 'Employment Start Date', required: true },
          { id: 'employment-type', type: 'select', question: 'Employment Type', options: ['Full-time', 'Part-time', 'Contract', 'Temporary'], required: true },
          { id: 'work-hours', type: 'number', question: 'Hours per Week', required: true },
          { id: 'probation-period', type: 'number', question: 'Probation Period (months)', required: false }
        ]
      },
      {
        id: 'compensation',
        type: 'group',
        title: 'Compensation',
        questions: [
          { id: 'salary-type', type: 'select', question: 'Salary Type', options: ['Annual', 'Monthly', 'Hourly'], required: true },
          { id: 'salary-amount', type: 'number', question: 'Salary Amount', required: true },
          { id: 'bonus-eligible', type: 'radio', question: 'Eligible for Bonuses?', options: ['Yes', 'No'], required: true },
          { id: 'benefits', type: 'multiselect', question: 'Benefits Included', options: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)', 'Paid Time Off', 'Sick Leave', 'Life Insurance'], required: false }
        ]
      },
      {
        id: 'termination',
        type: 'group',
        title: 'Termination Terms',
        questions: [
          { id: 'notice-period', type: 'number', question: 'Notice Period (days)', required: true },
          { id: 'severance', type: 'radio', question: 'Severance Pay?', options: ['Yes', 'No'], required: true },
          { id: 'non-compete', type: 'radio', question: 'Include Non-Compete Clause?', options: ['Yes', 'No'], required: true },
          { id: 'non-compete-duration', type: 'number', question: 'Non-Compete Duration (months)', required: false, condition: { field: 'non-compete', value: 'Yes' } }
        ]
      }
    ]
  },

  'nda': {
    title: 'Non-Disclosure Agreement (NDA)',
    description: 'Protect confidential information',
    questions: [
      {
        id: 'parties',
        type: 'group',
        title: 'Parties Information',
        questions: [
          { id: 'disclosing-party', type: 'text', question: 'Disclosing Party Name', required: true },
          { id: 'receiving-party', type: 'text', question: 'Receiving Party Name', required: true },
          { id: 'nda-type', type: 'select', question: 'NDA Type', options: ['Unilateral (One-way)', 'Mutual (Two-way)'], required: true }
        ]
      },
      {
        id: 'confidential-info',
        type: 'group',
        title: 'Confidential Information',
        questions: [
          { id: 'info-types', type: 'multiselect', question: 'Types of Confidential Information', options: ['Business Plans', 'Financial Information', 'Customer Lists', 'Technical Data', 'Trade Secrets', 'Marketing Strategies', 'Software/Code', 'Other'], required: true },
          { id: 'purpose', type: 'textarea', question: 'Purpose of Disclosure', required: true }
        ]
      },
      {
        id: 'terms',
        type: 'group',
        title: 'Agreement Terms',
        questions: [
          { id: 'duration', type: 'number', question: 'Agreement Duration (years)', required: true },
          { id: 'return-materials', type: 'radio', question: 'Return Materials Upon Request?', options: ['Yes', 'No'], required: true },
          { id: 'governing-law', type: 'text', question: 'Governing Law (State)', required: true }
        ]
      }
    ]
  },

  'lease-agreement': {
    title: 'Lease Agreement',
    description: 'Residential or commercial lease contract',
    questions: [
      {
        id: 'property-info',
        type: 'group',
        title: 'Property Information',
        questions: [
          { id: 'property-address', type: 'textarea', question: 'Property Address', required: true },
          { id: 'property-type', type: 'select', question: 'Property Type', options: ['Residential', 'Commercial'], required: true },
          { id: 'property-size', type: 'text', question: 'Property Size/Description', required: true }
        ]
      },
      {
        id: 'parties-info',
        type: 'group',
        title: 'Parties Information',
        questions: [
          { id: 'landlord-name', type: 'text', question: 'Landlord Name', required: true },
          { id: 'landlord-address', type: 'textarea', question: 'Landlord Address', required: true },
          { id: 'tenant-name', type: 'text', question: 'Tenant Name', required: true },
          { id: 'tenant-phone', type: 'text', question: 'Tenant Phone Number', required: true }
        ]
      },
      {
        id: 'lease-terms',
        type: 'group',
        title: 'Lease Terms',
        questions: [
          { id: 'lease-start', type: 'date', question: 'Lease Start Date', required: true },
          { id: 'lease-duration', type: 'number', question: 'Lease Duration (months)', required: true },
          { id: 'monthly-rent', type: 'number', question: 'Monthly Rent Amount', required: true },
          { id: 'security-deposit', type: 'number', question: 'Security Deposit Amount', required: true },
          { id: 'utilities', type: 'multiselect', question: 'Utilities Included', options: ['Electricity', 'Gas', 'Water', 'Internet', 'Cable', 'Heating', 'Air Conditioning'], required: false }
        ]
      },
      {
        id: 'rules',
        type: 'group',
        title: 'Property Rules',
        questions: [
          { id: 'pets-allowed', type: 'radio', question: 'Pets Allowed?', options: ['Yes', 'No'], required: true },
          { id: 'smoking-allowed', type: 'radio', question: 'Smoking Allowed?', options: ['Yes', 'No'], required: true },
          { id: 'subletting', type: 'radio', question: 'Subletting Allowed?', options: ['Yes', 'No'], required: true }
        ]
      }
    ]
  },

  'service-agreement': {
    title: 'Service Agreement',
    description: 'Contract for services between parties',
    questions: [
      {
        id: 'parties',
        type: 'group',
        title: 'Parties Information',
        questions: [
          { id: 'service-provider', type: 'text', question: 'Service Provider Name', required: true },
          { id: 'client-name', type: 'text', question: 'Client Name', required: true },
          { id: 'provider-address', type: 'textarea', question: 'Provider Address', required: true },
          { id: 'client-address', type: 'textarea', question: 'Client Address', required: true }
        ]
      },
      {
        id: 'services',
        type: 'group',
        title: 'Service Details',
        questions: [
          { id: 'service-type', type: 'select', question: 'Service Type', options: ['Consulting', 'Development', 'Design', 'Marketing', 'Legal', 'Accounting', 'Other'], required: true },
          { id: 'service-description', type: 'textarea', question: 'Detailed Service Description', required: true },
          { id: 'deliverables', type: 'textarea', question: 'Expected Deliverables', required: true }
        ]
      },
      {
        id: 'timeline-payment',
        type: 'group',
        title: 'Timeline & Payment',
        questions: [
          { id: 'start-date', type: 'date', question: 'Service Start Date', required: true },
          { id: 'end-date', type: 'date', question: 'Service End Date', required: false },
          { id: 'payment-type', type: 'select', question: 'Payment Type', options: ['Fixed Fee', 'Hourly Rate', 'Monthly Retainer'], required: true },
          { id: 'payment-amount', type: 'number', question: 'Payment Amount', required: true },
          { id: 'payment-terms', type: 'select', question: 'Payment Terms', options: ['Net 15', 'Net 30', 'Net 60', 'Upon Completion'], required: true }
        ]
      }
    ]
  }
};

export default documentTemplates;
