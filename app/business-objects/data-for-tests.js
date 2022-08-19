import { faker } from "@faker-js/faker";

export const testDataForScenario1 = {
  textInputValue: faker.lorem.text(Math.round(Math.random() * (4 - 1) + 1)),
  textAreaInputValue: faker.lorem.text(Math.round(Math.random() * (40 - 1) + 1)),
  quantityOfItems: 3,
};

export const user = {
  email: "SarahJasmine@gmail.com",
  password: "123Qwer!",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress({ useFullAddress: false }),
  city: faker.address.city(),
};

export const testDataForScenario2 = {
  comment: faker.lorem.words(Math.round(Math.random() * (20 - 1) + 1)),
  quantityOfItems: 7,
};

export const coupons = {
  couponLuckyUser: "LuckyUser",
};
