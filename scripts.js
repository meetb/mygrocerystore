// JavaScript Document

var productNumber = new Array();
var name = new Array();
var category = new Array();
var company = new Array();
var description = new Array();
var price = new Array();
var sale = new Array();
var onSale = new Array();
var image = new Array();
var cart = new Array();
var splitter = new Array();
var cartName = new Array();
var cartQuantity = new Array();

xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET", "database.xml", false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
				
var x=xmlDoc.getElementsByTagName("Item");
for (i=0;i<x.length;i++) {
	productNumber[i] = x[i].getElementsByTagName("ProductNumber")[0].childNodes[0].nodeValue;
	name[i] = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
	category[i] = x[i].getElementsByTagName("Category")[0].childNodes[0].nodeValue;
	company[i] = x[i].getElementsByTagName("Company")[0].childNodes[0].nodeValue;
	description[i] = x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
	price[i] = x[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
	sale[i] = x[i].getElementsByTagName("Sale")[0].childNodes[0].nodeValue;
	onSale[i] = x[i].getElementsByTagName("OnSale")[0].childNodes[0].nodeValue;
	image[i] = x[i].getElementsByTagName("Image")[0].childNodes[0].nodeValue;
}

function generateList(tag){
	var arr = new Array();
	for (i=0;i<x.length;i++) {
		arr[i] = x[i].getElementsByTagName(tag)[0].childNodes[0].nodeValue;
	}
	var sorted_arr=arr.sort();
	var results = new Array();
	for (var i = 0; i < arr.length - 1; i++) {
    	if (sorted_arr[i + 1] != sorted_arr[i]) {
        	results.push(sorted_arr[i]);
    	}
	}	
	for (i=0;i<results.length;i++) {		
		parent.frameA.document.write("<button type='button' id='sidebarbutton' onclick =\"parent.display('" + tag + "','" + results[i] + "')\">" + results[i] + "</button><br />");
	}
}

function display(tag, check){
	parent.frameB.document.open();
	for (i=0;i<x.length;i++){
		if (x[i].getElementsByTagName(tag)[0].childNodes[0].nodeValue==check){
			printItem(i);
		}
	}
	parent.frameB.document.close();
}

function searchSite(){
	var searchItem = parent.frameA.searchBox.searchItem.value;
	parent.frameB.document.open();
	for (i=0;i<x.length;i++){
		if (searchItem.toLowerCase() == name[i].toLowerCase()){
			printItem(i);
		}
		else if (searchItem.toLowerCase() != name[i].toLowerCase()) {
			splitter = name[i].split(" ");
			for (j=0;j<splitter.length;j++) {
				if (searchItem.toLowerCase() == splitter[j].toLowerCase()) {
					printItem(i);
				}
			}
		}
		if (searchItem.toLowerCase() == company[i].toLowerCase()){
			printItem(i);
		}
		else if (searchItem.toLowerCase() != company[i].toLowerCase()) {
			splitter = company[i].split(" ");
			for (j=0;j<splitter.length;j++) {
				if (searchItem.toLowerCase() == splitter[j].toLowerCase()) {
					printItem(i);
				}
			}
		}
		if (searchItem.toLowerCase() == category[i].toLowerCase()){
			printItem(i);
		}
		else if (searchItem.toLowerCase() != category[i].toLowerCase()) {
			splitter = category[i].split(" ");
			for (j=0;j<splitter.length;j++) {
				if (searchItem.toLowerCase() == splitter[j].toLowerCase()) {
					printItem(i);
				}
			}
		}
		if (searchItem.toLowerCase() == description[i].toLowerCase()){
			printItem(i);
		}
		else if (searchItem.toLowerCase() != description[i].toLowerCase()) {
			splitter = description[i].split(" ");
			for (j=0;j<splitter.length;j++) {
				if (searchItem.toLowerCase() == splitter[j].toLowerCase()) {
					printItem(i);
				}
			}
		}
	}
	parent.frameB.document.close();
}

function addToCart(form, name){
	cartName.push(name);
	cartQuantity.push(parseInt(form.Quantity.value));
	alert(name + " has been added to cart! (" + form.Quantity.value + "x)");
} 

function printItem(i) {
	parent.frameB.document.write("<link href='style.css' rel='stylesheet' type='text/css' />");
	parent.frameB.document.write("<form id='product'><table width='670px'>");
	parent.frameB.document.write("<tr><td width='150' rowspan='3'><img src='" + image[i] + "' id='image'/></td>");
	parent.frameB.document.write("<td width='320'><div id='name'>" + name[i] + "</div>");
	parent.frameB.document.write("<div id='number'>" + productNumber[i] + "</div>" + " - " + company[i] + "</td>");
	parent.frameB.document.write("<td>");
	if (onSale[i] == "yes") {
		parent.frameB.document.write("<div id='price'>$" + sale[i] + "</div>");
		parent.frameB.document.write("<div id='sale'>$" + price[i] + "</div>");
	}
	else {
		parent.frameB.document.write("<div id='price'>$" + price[i] + "</div>");
	}
	parent.frameB.document.write("</td></tr>");
	parent.frameB.document.write("<tr><td rowspan='2'>" + description[i] + "</td>");
	parent.frameB.document.write("<td id='quantityBox'>Quantity:<input type='number' name='Quantity' value='1'></td></tr>");
	parent.frameB.document.write("<tr><td id='addToCart'><button type='button' id='addtocartbutton' onclick=\"parent.addToCart(this.form, '" + name[i] + "')\"><img src='image/addtocart.jpg'/></button></td></tr>");			
	parent.frameB.document.write("</table></form>");
}
//	parent.frameB.document.write("<tr><td id='addToCart'><input type='image' src='image/addtocart.jpg' onclick=\"parent.addToCart(this.form, '" + name[i] + "')\"></input></td></tr>");

function logo() {
	parent.frameB.document.open();
	parent.frameB.document.write("<center><img src='image/logo.png' /></center>");
	parent.frameB.document.close();
}

function showCart() {
	parent.frameB.document.open();
	parent.frameB.document.write("<link href='style.css' rel='stylesheet' type='text/css' />");
	parent.frameB.document.write("<table id='cart' border='1'>");
	parent.frameB.document.write("<tr><td>Item Number</td><td>Name</td><td>Quantity</td><td>Cost</td><td>Tax</td><td>Subtotal</td><td>Remove Item</td><td>Remove Quantity</td></tr>");
	for (i=0;i<cartName.length;i++){
		for (j=0;j<name.length;j++){
			if (cartName[i] == name[j]){
				var cost;
				parent.frameB.document.write("<tr><td>Item " + (i+1) + "</td>");
				parent.frameB.document.write("<td>" + name[j] +"</td>");
				parent.frameB.document.write("<td>" + cartQuantity[i] + "</td>");
				if (onSale[j] == "yes") {
					parent.frameB.document.write("<td>$" + ((parseFloat(sale[j]))*cartQuantity[i]).toFixed(2) + "</td>");
					cost = (parseFloat(sale[j]))*cartQuantity[i];
				}
				else {
					parent.frameB.document.write("<td>$" + ((parseFloat(price[j]))*cartQuantity[i]).toFixed(2) + "</td>");
					cost = (parseFloat(price[j]))*cartQuantity[i];
				}
				parent.frameB.document.write("<td>$" + (cost*0.13).toFixed(2) + "</td>");
				parent.frameB.document.write("<td>$" + (cost*1.13).toFixed(2) + "</td>");
				parent.frameB.document.write("<td><button type='button' id='button' onclick='parent.removeItem(" + i + ")'>Remove Item</button></td>");
				parent.frameB.document.write("<td><button type='button' id='button' onclick='parent.removeQuantity(" + i + ")'>Remove 1 Quantity</button></td></tr>");
			}
		}
	}
	parent.frameB.document.write("</table>");
	parent.frameB.document.close();
}

function removeItem(i) {
	cartName.splice(i, 1);
	cartQuantity.splice(i, 1);
	parent.showCart();
}

function removeQuantity(i) {
	cartQuantity[i] -= 1;
	if (cartQuantity[i] == 0) {
		cartName.splice(i, 1);
		cartQuantity.splice(i, 1);
	}
	parent.showCart();
}

function checkOut() {
	parent.frameB.document.open();
	parent.frameB.document.write("<link href='style.css' rel='stylesheet' type='text/css' />");
	parent.frameB.document.write("<table border='5' id='cart'>");
	parent.frameB.document.write("<tr><td>Item Number</td><td>Detailed Summary</td><td>Quantity</td><td>Cost</td><td>Tax</td><td>Subtotal</td></tr>");
	var total = 0;
	var subTotal = 0;
	var shippingCost = 0;
	for (i=0;i<cartName.length;i++){
		for (j=0;j<name.length;j++){
			if (cartName[i] == name[j]){
				var cost;
				parent.frameB.document.write("<tr><td>Item " + (i+1) + "</td>");
				parent.frameB.document.write("<td>Name: " + name[j] + " &nbsp &nbsp &nbsp &nbsp Product Number: " + productNumber[j] + "</br>Company: " + company[j] + "</br>Category: " + category[j] + "</br>Description: " + description[j] + "</td>");
				parent.frameB.document.write("<td>" + cartQuantity[i] + "</td>");
				if (onSale[j] == "yes") {
					parent.frameB.document.write("<td>$" + ((parseFloat(sale[j]))*cartQuantity[i]).toFixed(2) + "</td>");
					cost = ((parseFloat(sale[j]))*cartQuantity[i]).toFixed(2);
				}
				else {
					parent.frameB.document.write("<td>$" + ((parseFloat(price[j]))*cartQuantity[i]).toFixed(2) + "</td>");
					cost = (parseFloat(price[j]))*cartQuantity[i].toFixed(2);
				}
				parent.frameB.document.write("<td>$" + (cost*0.13).toFixed(2) + "</td>");
				subTotal += cost*1.13
				parent.frameB.document.write("<td>$" + (cost*1.13).toFixed(2) + "</td>");
			}
		}
	}
	parent.frameB.document.write("<tr><td>Grand Subtotal</td><td style='float:right'>$" + subTotal.toFixed(2) + "</td></tr>");
	if (60 >= subTotal && subTotal > 0) {
		shippingCost = 5.00;
	}
	else if (120 >= subTotal && subTotal > 60) {
		shippingCost = 10.00;
	}
	total = shippingCost + subTotal;
	parent.frameB.document.write("</table>");
	parent.frameB.document.write("</br>");
	parent.frameB.document.write("<div id='checkOutForm'><table border='5' id='cart'>");
	parent.frameB.document.write("<tr><td>Grand Subtotal:</td><td align='right'>$" + subTotal.toFixed(2) + "</td></tr>");
	parent.frameB.document.write("<tr><td>Shipping Cost:</td><td align='right'>$" + shippingCost.toFixed(2) + "</td></tr>");
	parent.frameB.document.write("<tr><td>Total Cost:</td><td align='right'>$" + total.toFixed(2) + "</td></tr></table>");
	parent.frameB.document.write("</br><form><table><tr><td>Name: </td><td><input type='text'></td></tr>");
	parent.frameB.document.write("<tr><td>Credit Card #:</td><td><input type='text'></td></tr>");
	parent.frameB.document.write("<tr><td>Expiry date:</td><td><input type='text'></td></tr>");
	parent.frameB.document.write("<tr><td>Security number:</td><td><input type='text'></td></tr></table>");
	parent.frameB.document.write("<button type='button' id='sidebarbutton' onclick=\"alert('Thank you for shopping at MJMFoods! Remember to look forward to upcoming sales on our products.')\">Confirm your purchase</button></form></div>");
	parent.frameB.document.close();
}