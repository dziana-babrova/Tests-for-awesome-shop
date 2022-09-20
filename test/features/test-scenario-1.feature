Feature: Adding item to cart

    Scenario: Add item to cart with parameters
        Given I'm on awesome-shop.ru
        When I open PDP of "Apple computer"
        And I choose parameters of "Apple computer"
        And I add the product to the cart
        Then the product with selected parameters is added to the cart