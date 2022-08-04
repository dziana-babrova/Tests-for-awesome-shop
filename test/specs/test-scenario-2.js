import { faker } from "@faker-js/faker";
const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress({ useFullAddress: false }),
  city: faker.address.city(),
};

describe("On Awesome-shop", () => {
  it("user could log in and complete a checkout with a coupon", async () => {
    await browser.url(`https://awesome-shop.ru/`);
    await browser.maximizeWindow();

    const accountSection = await $(".acc-section");
    await accountSection.click();

    await $("*=Login").click();
    await $("#input-email").setValue("SarahJasmine@gmail.com");
    await $("#input-password").setValue("123Qwer!");
    await $("input[value=Login]").click();

    await $("#logo").click();

    const item = await $("=iPhone");
    await item.click();

    const itemCount = 7;
    await $("input#input-quantity").setValue(itemCount);
    await $("button=Add to Cart").click();

    await $("#cart-total").click();
    await $("=View Cart").click();

    await $("=Use Coupon Code").click();
    await $("#input-coupon").setValue("LuckyUser");
    await $("#button-coupon").click();
    await expect($(".alert-success")).toBeExisting();
    await expect($(".alert-success")).toHaveTextContaining("Success: Your coupon discount has been applied!");

    const subTotal = await $("tr*=Sub-Total");
    await expect(subTotal).toBeExisting();
    const subTotalText = await subTotal.getText();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length).replace(",", ""));
    const discountToBe = -((subTotalPrice * 15) / 100);

    const discount = await $("tr*=Coupon (LuckyUser):");
    await expect(discount).toBeExisting();
    const discountText = await discount.getText();
    const discountPrice = Number(discountText.slice(21, discountText.length));

    expect(discountPrice).toEqual(discountToBe);

    await $("#content > div.buttons.clearfix > div.pull-right > a").click();
    await $("label*=new address").click();
    await $("#input-payment-firstname").setValue(user.firstName);
    await $("#input-payment-lastname").setValue(user.lastName);
    await $("#input-payment-address-1").setValue(user.address);
    await $("#input-payment-city").setValue(user.city);
    await $("[name=zone_id]").click();
    await $("#input-payment-zone > option:nth-child(2)").click();
    await $("input#button-payment-address").click();

    await $("label*=existing address").click();
    await $("#button-shipping-address").click();

    await $("[name=comment]").setValue("Some delivery info");
    await $("input#button-shipping-method").click();

    await $("label*=Cash On Delivery").click();
    await $("[name=agree]").click();
    await $("input#button-payment-method").click();

    await $("#button-confirm").click();

    await expect($("h1")).toBeExisting();
    await expect($("h1")).toHaveTextContaining("Your order has been placed!");

    await $(".acc-section").click();
    await $("=Order History").click();
    await $(".btn-info").click();
    await expect($("td=iPhone")).toBeExisting();
  });
});
