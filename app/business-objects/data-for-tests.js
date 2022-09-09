const { faker } = require("@faker-js/faker");
const UserBuilder = require("./user-builder.js");

const testDataForScenario1 = {
  textInputValue: faker.lorem.text(Math.round(Math.random() * (4 - 1) + 1)),
  textAreaInputValue: faker.lorem.text(Math.round(Math.random() * (40 - 1) + 1)),
  quantityOfItems: 3,
};

const testDataForScenario2 = {
  comment: faker.lorem.words(Math.round(Math.random() * (20 - 1) + 1)),
  quantityOfItems: 7,
};

const coupons = {
  couponLuckyUser: "LuckyUser",
};

const user = new UserBuilder()
  .setFirstName(faker.name.firstName())
  .setLastName(faker.name.lastName())
  .setAddress(faker.address.streetAddress({ useFullAddress: false }))
  .setCity(faker.address.city())
  .build();

module.exports = { testDataForScenario1, testDataForScenario2, user, coupons };