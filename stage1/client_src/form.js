var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');

$('.wealth').html(new UserWealth().render().elem);
$('.god-gifts').html(new GodGiftForm().render().elem);
