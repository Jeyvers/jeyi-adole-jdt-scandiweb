<!-- Fixed  -->

Issue: 'defaultPrice is undefined' error when adding items in the tech category to cart.

Fix: The productList was being used to fetch the data. When I changed the defaultCategory to 'clothes', it changed the list sent to the loadProducts function in cart to have only two products which are from the 'clothes' category.
