import { faker } from '@faker-js/faker';

function userFactory() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.date.month(),
    year: faker.number.int({ min: 1950, max: 2003 }).toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    country: 'United States',  // Faker doesn't handle country names well, so keep this static
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    phoneNumber: faker.phone.number('###-###-####')
  };
}

export { userFactory };
