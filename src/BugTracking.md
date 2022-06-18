<!-- Fixed  -->

Issue: 'defaultPrice is undefined' error when adding items in the tech category to cart.

Fix: The productList was being used to fetch the data. When I changed the defaultCategory to 'clothes', it changed the list sent to the loadProducts function in cart to have only two products which are from the 'clothes' category.

<!-- Todo For Attribute Fix -->

- Start with addItem functionality. When the button is clicked, if the item with the selected attribute is chosen, the item will not be added to cart. Use loadash for object comparison. <Fixed>

- Make sure that the attribute on the cart page doesn't change onclick o fthe single product attribute. <Fixed>

- Change the id of cartItem to uniqueID. Use uuid to generate unique id each time item is added to cart. <Fixed>

- Edit id property in cart relatives and functions in order to avoid errors. <Fixed>

- Fix queries, move to seperate page and cleanup AppWrapper. <Fixed>

- User redux to add and remove classes globally. Trigger true and flase scenarios. <Fixed>

- Selected attribute is undefined. <Fixed>

- Create funciton to reset allAttributes when you add an item to cart. <Fixed>
