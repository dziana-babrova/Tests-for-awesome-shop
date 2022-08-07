import HomePage from "../../app/page-objects/home-page.js";
import ItemPage from "../../app/page-objects/item-page.js";
import CartPage from "../../app/page-objects/cart-page.js";

describe("On Awesome-shop", () => {
  it("user could add a product to the cart", async () => {
    await HomePage.open();
    const textForItem = await HomePage.getTextFromItemToBuy();
    await HomePage.clickOnItemToBuy();
    await ItemPage.selectItemValues();
    const valueForTextInput = await ItemPage.getTextInputValue();
    const valueForTextArea = await ItemPage.getTextAreaValue();
    await ItemPage.selectQuantityOfItems(3);
    const QuntityOfItemsValue = await ItemPage.getQuantityOfItems();
    await ItemPage.clickOnAddToCartButton();

    await expect(ItemPage.successAlert).toBeExisting();
    await expect(ItemPage.successAlert).toHaveTextContaining(
      `Success: You have added ${textForItem} to your shopping cart!`
    );

    await ItemPage.goToCartPage();

    await expect(HomePage.itemToBuy).toBeExisting();
    await expect(CartPage.radioItem).toHaveTextContaining("Radio: Medium");
    await expect(CartPage.checkbox2Item).toHaveTextContaining("Checkbox: Checkbox 2");
    await expect(CartPage.checkbox4Item).toHaveTextContaining("Checkbox: Checkbox 4");
    await expect(CartPage.textItem).toHaveTextContaining(`${valueForTextInput}`);
    await expect(CartPage.selectItem).toHaveTextContaining("Green");

    let testValueForTextArea = "";
    if (valueForTextArea.length > 20) {
      testValueForTextArea = await valueForTextArea.slice(20);
    } else {
      testValueForTextArea = await valueForTextArea;
    }

    await expect(CartPage.textAreaItem).toHaveTextContaining(`${testValueForTextArea}`);
    await expect(CartPage.quantityItem).toHaveValue(`${QuntityOfItemsValue}`);

    await expect(CartPage.subTotalLine).toBeExisting();
    const subTotalText = await CartPage.getTextFromSubTotal();
    const subTotalPrice = Number(subTotalText.slice(11, subTotalText.length));
    const vatToBe = (subTotalPrice * 20) / 100;

    await expect(CartPage.vatLine).toBeExisting();
    const vatText = await CartPage.getTextFromVat();
    const vatPrice = Number(vatText.slice(11, vatText.length));

    await expect(vatPrice).toEqual(vatToBe);
  });
});
