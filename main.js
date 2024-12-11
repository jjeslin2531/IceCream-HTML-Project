/* This is an AJAX (Asynchronous JavaScript and XML)--actually AJAJ (Asynchronous JavaScript and JSON)
   file, but it's still called AJAX--file.  This will allow us to send and receive data on the fly
   without reloading the page. */

/****************************************************************************/
/**** This must be run from a server (you can use Web Server for Chrome) ****/
/****************************************************************************/
 
//Create a variable to reference the empty table body on the HTML document.
var prodRows = document.getElementById("tbodyRows") ;

/* Create a variable to store the XMLHTTPRequest object (tool available through browsers and is
   used to send and receive data via HTTP. */
var prodRequest ;

//Variable to store the data from the JSON file
var prodData;
//Variable to store the HTML that will create the table
var prodRowData = "";
//Variable to store the product info for the selected products (those with a Qty > 0)
var selectedProducts = "" ;
// variable to store sort order ("A" or "D")
var sortOrder = "D" ;

var prodObj = [] ;
var prodJSON;
var tblCells;
var prodQty, prodID ;


// Store the new XMLHTTPRequest object in the variable
prodRequest = new XMLHttpRequest( ) ;

// Open the request object to "GET" data from the server
prodRequest.open("GET", "Products.json") ;

//send the request
prodRequest.send( ) ;

//create a function to read through the data from the JSON file and build the table when the XMLHttpRequest object loads
prodRequest.onload = function( )

{
    //Assign the data from the JSON file to a variable by parsing it
    prodData = JSON.parse(prodRequest.responseText) ;

    //call the function to render the table using the data from the JSON file
    renderTable(prodData) ;
}
    

function renderTable(data)
{
    prodRowData = "" ;
    for (i = 0; i<data.length; i++)
    {
        prodRowData += "<tr><td id='prodID" +i+ "'>" + data[i].prodID + "</td><td>" + "<img src=" + data[i].prodImg + "/>" + "</td><td id='prodName"+i+"'>" + data[i].prodName + "</td> <td id='prodDesc"+i+"'>" + data[i].prodDesc + "</td><td>" + data[i].prodPrice + "</td><td>" + "<input type='number' min ='0' max = '9' id='ProdQty"+i+"' value='0'" + "</td></tr>";
    }

    prodRows.innerHTML = prodRowData ;
}


function confirmQty( )
{
    for (i = 0; i<prodData.length; i++)
    {
        var rowNum = i.toString( ) ;
        var columnID = "ProdQty" + rowNum ;
        var iQty = document.getElementById(columnID).value;

        if(iQty > 0)
        {
            columnID = "prodName" + rowNum ;
            productID = "prodID" + rowNum ;

            selectedProducts += document.getElementById(productID).innerText + " " + document.getElementById(columnID).innerText + ": Qty " + iQty + "\n";
            prodObj.push({ "prodID":document.getElementById(productID).innerText,"prodQty":iQty});
        }

    }

    if (selectedProducts > "" && selectedProducts != null)
    {
        let text= "You have selected the following products: \n" + selectedProducts;
        if(confirm("Are you sure you want to order the following: \n" + selectedProducts)==true)
        {
            alert("Thank you! Your order has been placed.");
        }
    }


    prodJSON = JSON.stringify(prodObj);

    localStorage.setItem("prodJSON", prodJSON);
}


function confirmreset()
{
    return confirm("Are you sure you want to cancel your selections?");

}
/* The functions below are being called in the href property of each <a> element nested in the <th> elements of the table in the HTML 
document that's linked to this JavaScript file. */

function sortByID()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodID - b.prodID ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodID - a.prodID ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByName()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName < b.prodName)
            {
                return -1 ;
            }
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName > b.prodName) 
            {
                return -1  
            }
        } ) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByPrice()
{
   if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodPrice - b.prodPrice ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodPrice - a.prodPrice ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

