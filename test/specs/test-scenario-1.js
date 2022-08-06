import { BasePage } from "../../app/page-objects/base-page.js";

describe("On Awesome-shop", () => {
  it("user could add a product to the cart", async () => {
    await browser.url(`https://awesome-shop.ru/`);
    await browser.maximizeWindow();

    const item = await $('=Apple Cinema 30"');
    await item.click();
    const textForItem = await item.getText();

    await $("label*=Medium").click();
    await $("label*=Checkbox 2").click();
    await $("label*=Checkbox 4").click();

    await $("#input-option208").setValue("some new text");
    const valueForTextInput = await $("#input-option208").getText();

    await $("select#input-option217").click();
    await $("option*=Green").click();

    await $("#input-option209").setValue("some new text some new text");
    const valueForTextArea = await $("#input-option209").getValue();

    let testValueForTextArea = "";
    if (valueForTextArea.length > 20) {
      testValueForTextArea = await valueForTextArea.slice(20);
    } else {
      testValueForTextArea = await valueForTextArea;
    }

    const itemCount = 3;
    await $("input#input-quantity").setValue(itemCount);
    await $("button=Add to Cart").click();
    const successMessage = await $(".alert-success");
    await expect(successMessage).toBeExisting();
    await expect(successMessage).toHaveTextContaining(`Success: You have added ${textForItem} to your shopping cart!`);


    await BasePage.goToCartPage();

    await expect(item).toBeExisting();
    await expect($("small*=Radio:")).toHaveTextContaining("Radio: Medium");
    await expect($("small*=Checkbox: Checkbox 2")).toHaveTextContaining("Checkbox: Checkbox 2");
    await expect($("small*=Checkbox: Checkbox 4")).toHaveTextContaining("Checkbox: Checkbox 4");
    await expect($("small*=Text:")).toHaveTextContaining(`${valueForTextInput}`);
    await expect($("small*=Select:")).toHaveTextContaining("Green");
    await expect($("small*=Textarea:")).toHaveTextContaining(`${testValueForTextArea}`);
    await expect($("#content > form > div > table > tbody > tr > td:nth-child(4) > div > input")).toHaveValue(
      itemCount.toString()
    );

    const subTotal = await $("tr*=Sub-Total");
    await expect(subTotal).toBeExisting();
    const subTotalText = await subTotal.getText();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length));
    const vatToBe = (subTotalPrice * 20) / 100;

    const vat = await $("tr*=VAT");
    await expect(vat).toBeExisting();
    const vatText = await vat.getText();
    const vatPrice = Number(vatText.slice(11, vatText.length));

    await expect(vatPrice).toEqual(vatToBe);
  });
});
