
const faker = require("@faker-js/faker");
const expectChai = require("chai").expect;

describe('On Awesome-shop', () => {
    it('user could add a product to the cart', async () => {
      await browser.url(`https://awesome-shop.ru/`);

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
            testValueForTextArea = await valueForTextArea.slice(20)
      }
      else {testValueForTextArea = await valueForTextArea; }

      const itemCount = 3;
      await $("input#input-quantity").setValue(itemCount);
      await $("button=Add to Cart").click();
      const successMessage = await $(".alert-success");
      await expect(successMessage).toBeExisting();
      await expect(successMessage).toHaveTextContaining(
        `Success: You have added ${textForItem} to your shopping cart!`
      );
    
      await $("#cart-total").click();
      await $("=View Cart").click();
        
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
        const VATToBe = subTotalPrice * 20 / 100;

        const VAT = await $("tr*=VAT"); 
        await expect(VAT).toBeExisting();
        const VATText = await VAT.getText();
        const VATPrice = Number(VATText.slice(11, VATText.length));

      expectChai(VATPrice).to.equal(VATToBe);
      
    });
    
     it('user could log in and complete a checkout with a coupon', async () => {
        await browser.url(`https://awesome-shop.ru/`);

        const accountSection = await $(".acc-section");
        await (accountSection).click();

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
        const DiscountToBe = -((subTotalPrice * 15) / 100);

        const Discount = await $("tr*=Coupon (LuckyUser):");
        await expect(Discount).toBeExisting();
        const DiscountText = await Discount.getText();
        const DiscountPrice = Number(DiscountText.slice(21, DiscountText.length));

        expectChai(DiscountPrice).to.equal(DiscountToBe);

        await $("#content > div.buttons.clearfix > div.pull-right > a").click();
        await $("label*=new address").click();
        await $("#input-payment-firstname").setValue("Sarah");
        await $("#input-payment-lastname").setValue("Jasmine");
        await $("#input-payment-address-1").setValue(`${Math.round(Math.random() * (400 - 1) + 1)} Walkers Ridge Way`);
        await $("#input-payment-city").setValue("Minsk");
        await $("[name=zone_id]").click();
        await $("#input-payment-zone > option:nth-child(2)").click();
        await $("input#button-payment-address").click();
       
        await $("label*=existing address").click();
        await $("#button-shipping-address").click();
       
        // await expect($("[name=comment]")).toBeExisting();
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
       
     })
});
