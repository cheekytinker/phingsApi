const config = {
  masterAccount: {
    name: process.env.PHINGS_MASTER_ACCOUNT_NAME || 'master',
  },
  masterUser: {
    userName: process.env.PHINGS_MASTER_USERNAME || 'master',
    password: process.env.PHINGS_MASTER_PASSWORD || 'master123',
    email: process.env.PHINGS_MASTER_EMAIL || 'phings@cheekytinker.com',
    firstName: process.env.PHINGS_MASTER_FIRSTNAME || 'master',
    lastName: process.env.PHINGS_MASTER_LASTNAME || 'user',
  },
};

export default config;
