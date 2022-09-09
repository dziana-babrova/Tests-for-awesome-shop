class UserBuilder {
  constructor() {
    this.user = {};
  }

  setFirstName(firstName) {
    this.user.firstName = firstName;
    return this;
  }

  setLastName(lastName) {
    this.user.lastName = lastName;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  setCity(city) {
    this.user.city = city;
    return this;
  }

  build() {
    return this.user;
  }
}

module.exports = UserBuilder;
