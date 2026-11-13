const CHIEF_MINISTERS_SOURCE_URL =
  'https://en.wikipedia.org/wiki/Chief_minister_(India)';
const CONSTITUTIONAL_HEADS_SOURCE_URL =
  'https://www.india.gov.in/directory/whos-who';

function chiefMinister(name) {
  return name
    ? { name, role: 'Chief Minister' }
    : null;
}

function constitutionalHead(name, role) {
  return { name, role };
}

export const OFFICE_HOLDERS_SNAPSHOT = {
  snapshotDate: '13 November 2026',
  updatePolicy:
    'Not live; refresh after an official appointment, resignation, or election.',
  sources: [
    {
      label: 'Chief Minister roster (secondary source)',
      url: CHIEF_MINISTERS_SOURCE_URL,
    },
    {
      label: 'Governors and Union Territory heads (National Portal of India)',
      url: CONSTITUTIONAL_HEADS_SOURCE_URL,
    },
  ],
  records: {
    'Andhra Pradesh': {
      chiefMinister: chiefMinister('N. Chandrababu Naidu'),
      constitutionalHead: constitutionalHead('S. Abdul Nazeer', 'Governor'),
    },
    'Arunachal Pradesh': {
      chiefMinister: chiefMinister('Pema Khandu'),
      constitutionalHead: constitutionalHead(
        'Kaiwalya Trivikram Parnaik',
        'Governor',
      ),
    },
    Assam: {
      chiefMinister: chiefMinister('Himanta Biswa Sarma'),
      constitutionalHead: constitutionalHead(
        'Lakshman Prasad Acharya',
        'Governor',
      ),
    },
    Bihar: {
      chiefMinister: chiefMinister('Samrat Choudhary'),
      constitutionalHead: constitutionalHead('Syed Ata Hasnain', 'Governor'),
    },
    Chandigarh: {
      chiefMinister: null,
      constitutionalHead: constitutionalHead(
        'Gulab Chand Kataria',
        'Administrator',
      ),
    },
    Chhattisgarh: {
      chiefMinister: chiefMinister('Vishnu Deo Sai'),
      constitutionalHead: constitutionalHead('Ramen Deka', 'Governor'),
    },
    'Andaman and Nicobar Islands': {
      chiefMinister: null,
      constitutionalHead: constitutionalHead(
        'Dinesh Sharma',
        'Lieutenant Governor',
      ),
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      chiefMinister: null,
      constitutionalHead: constitutionalHead('Praful Patel', 'Administrator'),
    },
    Delhi: {
      chiefMinister: chiefMinister('Rekha Gupta'),
      constitutionalHead: constitutionalHead(
        'Taranjit Singh Sandhu',
        'Lieutenant Governor',
      ),
    },
    Goa: {
      chiefMinister: chiefMinister('Pramod Sawant'),
      constitutionalHead: constitutionalHead(
        'Pusapati Ashok Gajapathi Raju',
        'Governor',
      ),
    },
    Gujarat: {
      chiefMinister: chiefMinister('Bhupendra Patel'),
      constitutionalHead: constitutionalHead('Acharya Dev Vrat', 'Governor'),
    },
    Haryana: {
      chiefMinister: chiefMinister('Nayab Singh Saini'),
      constitutionalHead: constitutionalHead('Ashim Kumar Ghosh', 'Governor'),
    },
    'Himachal Pradesh': {
      chiefMinister: chiefMinister('Sukhvinder Singh Sukhu'),
      constitutionalHead: constitutionalHead('Kavinder Gupta', 'Governor'),
    },
    'Jammu and Kashmir': {
      chiefMinister: chiefMinister('Omar Abdullah'),
      constitutionalHead: constitutionalHead(
        'Manoj Sinha',
        'Lieutenant Governor',
      ),
    },
    Jharkhand: {
      chiefMinister: chiefMinister('Hemant Soren'),
      constitutionalHead: constitutionalHead(
        'Santosh Kumar Gangwar',
        'Governor',
      ),
    },
    Karnataka: {
      chiefMinister: chiefMinister('D. K. Shivakumar'),
      constitutionalHead: constitutionalHead('Sudha Yadav', 'Governor'),
    },
    Kerala: {
      chiefMinister: chiefMinister('V. D. Satheesan'),
      constitutionalHead: constitutionalHead('Om Prakash Mathur', 'Governor'),
    },
    Ladakh: {
      chiefMinister: null,
      constitutionalHead: constitutionalHead(
        'Vinai Kumar Saxena',
        'Lieutenant Governor',
      ),
    },
    Lakshadweep: {
      chiefMinister: null,
      constitutionalHead: constitutionalHead('Praful Patel', 'Administrator'),
    },
    'Madhya Pradesh': {
      chiefMinister: chiefMinister('Mohan Yadav'),
      constitutionalHead: constitutionalHead(
        'Mangubhai Chhaganbhai Patel',
        'Governor',
      ),
    },
    Maharashtra: {
      chiefMinister: chiefMinister('Devendra Fadnavis'),
      constitutionalHead: constitutionalHead('Jishnu Dev Varma', 'Governor'),
    },
    Manipur: {
      chiefMinister: chiefMinister('Yumnam Khemchand Singh'),
      constitutionalHead: constitutionalHead('Ajay Kumar Bhalla', 'Governor'),
    },
    Meghalaya: {
      chiefMinister: chiefMinister('Conrad Sangma'),
      constitutionalHead: constitutionalHead(
        'C. H. Vijayashankar',
        'Governor',
      ),
    },
    Mizoram: {
      chiefMinister: chiefMinister('Lalduhoma'),
      constitutionalHead: constitutionalHead(
        'Vijay Kumar Singh',
        'Governor',
      ),
    },
    Nagaland: {
      chiefMinister: chiefMinister('Neiphiu Rio'),
      constitutionalHead: constitutionalHead(
        'Nand Kishore Yadav',
        'Governor',
      ),
    },
    Odisha: {
      chiefMinister: chiefMinister('Mohan Charan Majhi'),
      constitutionalHead: constitutionalHead('Braj Mohan Ram', 'Governor'),
    },
    Puducherry: {
      chiefMinister: chiefMinister('N. Rangaswamy'),
      constitutionalHead: constitutionalHead(
        'K. Kailashnathan',
        'Lieutenant Governor',
      ),
    },
    Punjab: {
      chiefMinister: chiefMinister('Bhagwant Mann'),
      constitutionalHead: constitutionalHead('Gulab Chand Kataria', 'Governor'),
    },
    Rajasthan: {
      chiefMinister: chiefMinister('Bhajan Lal Sharma'),
      constitutionalHead: constitutionalHead(
        'Haribhau Kisanrao Bagde',
        'Governor',
      ),
    },
    Sikkim: {
      chiefMinister: chiefMinister('Prem Singh Tamang'),
      constitutionalHead: constitutionalHead('Dushyant Gautam', 'Governor'),
    },
    'Tamil Nadu': {
      chiefMinister: chiefMinister('C. Joseph Vijay'),
      constitutionalHead: constitutionalHead(
        'Rajendra Vishwanath Arlekar',
        'Governor',
      ),
    },
    Telangana: {
      chiefMinister: chiefMinister('A. Revanth Reddy'),
      constitutionalHead: constitutionalHead('Shiv Pratap Shukla', 'Governor'),
    },
    Tripura: {
      chiefMinister: chiefMinister('Manik Saha'),
      constitutionalHead: constitutionalHead(
        'Indra Sena Reddy Nallu',
        'Governor',
      ),
    },
    'Uttar Pradesh': {
      chiefMinister: chiefMinister('Yogi Adityanath'),
      constitutionalHead: constitutionalHead('Anandiben Patel', 'Governor'),
    },
    Uttarakhand: {
      chiefMinister: chiefMinister('Pushkar Singh Dhami'),
      constitutionalHead: constitutionalHead('Dhal Singh Bisen', 'Governor'),
    },
    'West Bengal': {
      chiefMinister: chiefMinister('Suvendu Adhikari'),
      constitutionalHead: constitutionalHead('R. N. Ravi', 'Governor'),
    },
  },
};
