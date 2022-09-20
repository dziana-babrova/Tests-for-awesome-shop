Feature: checkout

    Scenario: checkout with a coupon
        Given I'm on awesome-shop.ru
        When I login
        And I open PDP of "iPhone"
        And I choose parameters of "iPhone"
        And I add the product to the cart
        And I apply a coupon
        Then I'm able to complete checkout
        And It is present on the order iist