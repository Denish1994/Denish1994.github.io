 //buy details
  var year = 10;
  var amount = 4000000;
  var loanRate = 8.5;
  var payPerYear = 12;
  var initialBuyCost = 100000;
  var propertyPrice = 4000000;
  
  //rent details
  var rent = 12000;
  var rentRate = 10;
  var initialRentCost = 10000;
  
  //investment details
  var investmentRate = 20;
  var homeRate = 10;

  //calculated
  var EMI;
  var interestArr = [];
  var rentArr = [];
  var diffArr = [];
  var rentInvestmentArr = [];
  var rentAccumulationArr = [];
  var rentAccumulation;
  var rentInvestment;
  var buyAccumulation;
  var initialDiff;
  var noOfEMI;
  var initialInvestmentValue;
  var currInvestmentValueArr = [];
  
  
  //globals 
   //buy details
  var m_year;
  var m_amount;
  var m_loanRate;
  var m_payPerYear;
  var m_initialBuyCost;
  var m_propertyPrice;
  
  //rent details
  var m_rent;
  var m_rentRate;
  var m_initialRentCost;
  
  //investment details
  var m_investmentRate;
  var m_homeRate;

  //calculated
  var m_EMI;
  var m_interestArr = [];
  var m_rentArr = [];
  var m_diffArr = [];
  var m_rentInvestmentArr = [];
  var m_rentAccumulationArr = [];
  var m_rentAccumulation;
  var m_rentInvestment;
  var m_buyAccumulation;
  var m_initialDiff;
  var m_noOfEMI;
  var m_initialInvestmentValue;
  var m_currInvestmentValueArr = [];

$("body").on("keyup", "form", function(e){
  if (e.which == 13){
    if ($("#next").is(":visible") && $("fieldset.current").find("input, textarea").valid() ){
      e.preventDefault();
      nextSection();
      return false;
    }
  }
});
 
 
$("#next").on("click", function(e){
  console.log(e.target);
  nextSection();
});
 
$("form").on("submit", function(e){
  if ($("#next").is(":visible") || $("fieldset.current").index() < 2){
    e.preventDefault();
  }
});
 
function goToSection(i){
  $("fieldset:gt("+i+")").removeClass("current").addClass("next");
  $("fieldset:lt("+i+")").removeClass("current");
  $("li").eq(i).addClass("current").siblings().removeClass("current");
  setTimeout(function(){
    $("fieldset").eq(i).removeClass("next").addClass("current active");
      if ($("fieldset.current").index() == 2){
        $("#next").hide();
        $(".last").show();
      } else {
        $("#next").show();
        $(".last").hide();
      }
  }, 80);
 
}
 
function nextSection(){
  var i = $("fieldset.current").index();
  if (i < 3){
    $("li").eq(i+1).addClass("active");
    goToSection(i+1);
  }
}
 
$("li").on("click", function(e){
  var i = $(this).index();
  if ($(this).hasClass("active")){
    goToSection(i);
  } else {
    alert("Please complete previous sections first.");
  }
});

function calculate(){
	console.log("calculate");
	
	//get common input values
	
	//buy details
	amount = parseFloat(document.getElementsByName("amount")[0].value);
	propertyPrice = parseFloat(document.getElementsByName("propertyPrice")[0].value);
	//rent details
	rent = parseFloat(document.getElementsByName("rent")[0].value);
	rentRate = parseFloat(document.getElementsByName("rentRate")[0].value);
	initialRentCost = parseFloat(document.getElementsByName("initialRentCost")[0].value);
	
	//investment details
	investmentRate = parseFloat(document.getElementsByName("investmentRate")[0].value);
	homeRate = parseFloat(document.getElementsByName("homeRate")[0].value);
	
	if (document.getElementById('loanYes').checked){
		year = parseFloat(document.getElementsByName("year")[0].value);
		loanRate = parseFloat(document.getElementsByName("loanRate")[0].value);
		payPerYear = parseFloat(document.getElementsByName("payPerYear")[0].value);
		initialBuyCost = parseFloat(document.getElementsByName("initialBuyCost")[0].value);		
	}
	else{
		year = parseFloat(document.getElementsByName("yearToRent")[0].value);
		initialBuyCost = parseFloat(document.getElementsByName("totalBuyCost")[0].value);
	}
	
	initialDiff = parseFloat(initialBuyCost) - parseFloat(initialRentCost);
	rentAccumulation = initialDiff;
	rentInvestment = initialDiff;
	
	
	console.log(year+" : "+amount+" : "+loanRate+" : "+payPerYear+" : "+initialBuyCost+" : "+rent+" : "+rentRate+" : "+initialRentCost+" : "+investmentRate+" : "+initialDiff);
	
	if (document.getElementById('loanYes').checked){
		calculateStatisticWithLoan();
	}
	else{
		calculateStatisticWithoutLoan();
	}
		
	saveData();
	//printAll();
    showResult();
	
	
	//suggestions
	if (document.getElementById('loanYes').checked){
		showSuggestionBtn();
	}
   
   

   
   }

function calculateStatisticWithLoan(){
	console.log('calculateStatisticWithLoan');	
	noOfEMI = year * payPerYear;
	
	//clean all the array
	rentArr.length = 0;
	diffArr.length = 0;
	rentInvestmentArr.length = 0;
	rentAccumulationArr.length = 0;
	currInvestmentValueArr.length = 0;
  
   calculateEMI();
   calculateInterest();
   calculateRent();
   calculateDiff();
   calculateRentInvestment();
   calculateRentAccumulation();
   calculateBuyAccumulation();
}

function calculateStatisticWithoutLoan(){
	console.log('calculateStatisticWithoutLoan');
	EMI = 0;
	
	//clean all the array
	rentArr.length = 0;
	diffArr.length = 0;
	rentInvestmentArr.length = 0;
	rentAccumulationArr.length = 0;
	currInvestmentValueArr.length = 0;
  
   calculateRent();
   calculateDiff();
   calculateRentInvestment();
   calculateRentAccumulation();
   calculateBuyAccumulation();
}

function saveData(){
	m_year = year;
	m_EMI = EMI;
	m_propertyPrice = propertyPrice;
  m_interestArr = interestArr;
  m_rentArr = rentArr;
  m_diffArr = diffArr;
  m_rentInvestmentArr = rentInvestmentArr;
  m_rentAccumulationArr = rentAccumulationArr;
  m_rentAccumulation = rentAccumulation;
  m_rentInvestment = rentInvestment;
  m_buyAccumulation = buyAccumulation;
  m_initialDiff = initialDiff;
  m_noOfEMI = noOfEMI;
  m_initialInvestmentValue = initialInvestmentValue;
  m_currInvestmentValueArr = currInvestmentValueArr;
}


function calculateEMI(){
  var R = loanRate / 100 / payPerYear;
  var N = year * payPerYear;
  var RtoN = 1;
   
  for(var i = 1; i<= N; i++){
    RtoN = (1 + R) * RtoN;
  }
  
  EMI = (amount * R * RtoN) / (RtoN - 1);
  EMI = parseFloat(EMI).toFixed(2);
  //EMI = 20000;

  //console.log(R);
}

function calculateInterest(){
  
  var R = loanRate / 100 / payPerYear;
  var N = year * payPerYear;
  var P = amount;
  
  for(var i =0; i<N; i++){
    var interest = P*R;
    interestArr.push(parseFloat(interest).toFixed(2));
    //console.log("month "+i+" : "+interest);
    P = P + interest - EMI;
  }
  

}

function calculateRent(){
  var N = year * payPerYear;
  var r = rent;
  for(var i=0; i<N; i++){
    rentArr.push(parseFloat(r).toFixed(2));
    if((i+1)%12 == 0){
      r = r * (1 + (rentRate/100)); 
    }
  }
}

function calculateDiff(){
  initialDiff = initialBuyCost - initialRentCost;
  var N = year * payPerYear;
  for(var i=0; i<N; i++){
    var diff = EMI - rentArr[i];
    diffArr.push(parseFloat(diff).toFixed(2));
  }
}

function calculateRentInvestment(){
  var N = year * payPerYear;
  var investmentValue = initialDiff;
  for(var i =0; i<N; i++){
//     investmentValue = investmentValue * (1 + (investmentRate/100/12));
     investmentValue = parseFloat(investmentValue) + parseFloat(diffArr[i]);
     investmentValue = parseFloat(investmentValue).toFixed(2);
     rentInvestmentArr.push(investmentValue);
  }
  rentInvestment = investmentValue;
}

function calculateRentAccumulation(){
  var N = year * payPerYear;
  var investmentValue = initialDiff;
  initialInvestmentValue = initialDiff;
  var investmentReturnThisYear = 0;
  rentAccumulation = initialDiff;


  for(var i =0; i<N; i++){
	 var currReturn = getCompoundInterest(parseFloat(diffArr[i]), (12-(i%12)-1), investmentRate);
	 console.log("month : "+(i+1)+" diff :"+diffArr[i] +"  currReturn : "+currReturn);
	 investmentReturnThisYear = parseFloat(investmentReturnThisYear) + parseFloat(currReturn);
	 console.log("month : "+(i+1)+" investmentReturnThisYear : "+investmentReturnThisYear);
	 if((i+1)%12 == 0){
		 // add interest of total accumulation till begining of the year
		 var arrierInterest = getCompoundInterest(parseFloat(rentAccumulation), 12, investmentRate) - parseFloat(rentAccumulation);
		 console.log("month : "+(i+1)+" arrier :"+rentAccumulation +"  arrierInterest : "+arrierInterest);
		 rentAccumulation = parseFloat(rentAccumulation) + parseFloat(investmentReturnThisYear) + parseFloat(arrierInterest);
		 console.log("month : "+(i+1)+" rentAccumulation :"+rentAccumulation);
		 investmentReturnThisYear = 0;
		 rentAccumulationArr.push(rentAccumulation);
		 
	 }
	 else{
			if(i ==0)
				rentAccumulationArr.push(parseFloat(rentAccumulation) + parseFloat(diffArr[i]));
			else
				rentAccumulationArr.push(parseFloat(rentAccumulationArr[i-1]) + parseFloat(diffArr[i]));
	 }
  }
  
}

function getCompoundInterest(P, M, R){

	return parseFloat(P* Math.pow((1 + (R/(100))), (M/12))).toFixed(2);
}


function calculateBuyAccumulation() {
  buyAccumulation = propertyPrice;
  for(var i =0; i<year; i++){
    buyAccumulation = buyAccumulation * (1 + (homeRate/100));
  }
}


//global functions ends

//suggestion functions starts
function calculateSuggestions() {
	
	elem = document.getElementById("showStatistics");
	console.log(elem);
	
	if(elem.value == "Hide Statistics"){
		$(".suggestionsTable").hide();
		elem.innerHTML = "Show Statistics with different Loan Period";
		elem.value = "Show Statistics with different Loan Period";
		return;
	}
	
	elem.innerHTML = "Hide Statistics";
	elem.value = "Hide Statistics";
	
	console.log(elem);
	
	
	var steps = 10;
	var currYear = Math.max(m_year - 5,2);
	var suggestionTable = "<div class =\"suggestionsTable\"><div class=\"tbl-header\">";
	suggestionTable += "<table cellpadding=\"0\" cellspacing=\"0\">";
	//suggestionTable += "<caption>Suggestion Table</caption>";
	suggestionTable += "<tr><th>Year</th><th>EMI</th><th>Buy Accumulation</th><th>Rent Accumulation</th></tr>";
	suggestionTable += "</table></div>";
	
	suggestionTable += "<div class=\"tbl-content\">";
	suggestionTable += "<table cellpadding=\"0\" cellspacing=\"0\"><tbody>";
	while(steps > 0){
		calculateStatisticsWithLoanWithYear(currYear);
		console.log(currYear+":"+EMI);
		suggestionTable += "<tr><td>"+currYear+"</td><td>"+parseFloat(EMI).toLocaleString('en-IN')+"</td><td>"+parseFloat(buyAccumulation).toLocaleString('en-IN')+"</td><td>"+parseFloat(rentAccumulation).toLocaleString('en-IN')+"</td></tr>";
		currYear = currYear + 2;
		steps --;
	}
	
	suggestionTable += "</tbody></table></div></div>";
	document.getElementsByClassName("suggestions")[0].innerHTML += suggestionTable;
}


function calculateStatisticsWithLoanWithYear(currYear) {
	year = currYear;
		
	noOfEMI = year * payPerYear;
	
	//clean all the array
	rentArr.length = 0;
	diffArr.length = 0;
	rentInvestmentArr.length = 0;
	rentAccumulationArr.length = 0;
  
   calculateEMI();
   calculateInterest();
   calculateRent();
   calculateDiff();
   calculateRentInvestment();
   calculateRentAccumulation();
   calculateBuyAccumulation();
}

function calculateStartYear() {
	var startAfter = 1;
	var inputYear = year;
	var totalBuyValue = parseFloat(initialBuyCost) + parseFloat(initialRentCost);
	while(startAfter < inputYear){
		
		
		for(var i =0; i<(startAfter*12); i++){
			var currInvestment = parseFloat(m_EMI) - parseFloat(rentArr[i]);  
			var currReturn = getCompoundInterest(parseFloat(diffArr[i]), (12-(i%12)-1), investmentRate);
		}
	}
}




//suggestion ends

function printInterest(){
  for(var i = 0; i<interestArr.length; i++){
    console.log("I month "+(i+1)+" : "+interestArr[i]);
  }
}

function printRent(){
  for(var i = 0; i<rentArr.length; i++){
    console.log("R month "+(i+1)+" : "+rentArr[i]);
  }
}

function printDiff(){
  for(var i = 0; i<diffArr.length; i++){
    console.log("D month "+(i+1)+" : "+diffArr[i]);
  }
}

function printAll(){
  console.log("initial : "+initialBuyCost+" : "+initialRentCost+" : "+initialDiff+" : "+initialDiff+" : "+initialDiff);
  var N = year * payPerYear;
  for(var i = 0; i<N; i++){
    console.log("month "+(i+1)+" : "+EMI+" : "+rentArr[i]+" : "+diffArr[i]+" : "+rentInvestmentArr[i]+" : "+rentAccumulationArr[i]);
  }
}

function showResult(){
	
	var inputSuggestions = "<div class = \"inputSuggestionsDiv\"><input class=\"resultMenuBtn\" onclick=\"showInputSuggestions()\" type=\"button\" value=\"Help me to enter Details\" id=\"inputSuggestionsBtn\"></input></div>";
	document.getElementsByClassName("result")[0].innerHTML = inputSuggestions;
	
	//simple summary table
	var summaryTable = "<table cellpadding=\"0\" cellspacing=\"0\"><tbody><tr>";
	summaryTable += "<caption>Summary Table</caption>";
	summaryTable += "<tr><td></td><th>Buy</th><th>Rent</th></tr>";
	summaryTable += "<tr><th>Investment</th><td>"+parseFloat(propertyPrice).toLocaleString('en-IN')+"</td><td>"+parseFloat(rentInvestment).toLocaleString('en-IN')+"</td></tr>";
	summaryTable += "<tr><th>Accumulated Value</th><td>"+parseFloat(buyAccumulation).toLocaleString('en-IN')+"</td><td>"+parseFloat(rentAccumulation).toLocaleString('en-IN')+"</td></tr>";
	summaryTable += "</tbody></table>";
	
	document.getElementsByClassName("result")[0].innerHTML += summaryTable;
	
	var showDetailsBtn =   "<div class = \"details\"><input class=\"resultMenuBtn\" onclick=\"showDetails()\" type=\"button\" value=\"Show Monthly Details\" id=\"showDetails\"></input></div>";
	document.getElementsByClassName("result")[0].innerHTML += showDetailsBtn;
	
	
}

function showSuggestionBtn(){	
	var showSuggestionBtn = "<div class = \"suggestions\"><input class=\"resultMenuBtn\" onclick=\"calculateSuggestions()\" type=\"button\" value=\"Show Statistics with different Loan Period\" id=\"showStatistics\"></input></div>";
	document.getElementsByClassName("result")[0].innerHTML += showSuggestionBtn;
	
	showSuggestionBtn = "<div class = \"suggestions\"><input class=\"resultMenuBtn\" onclick=\"calculateStartYear()\" type=\"button\" value=\"Show Suggestion to start loan\" id=\"showStartYear\"></input></div>";
	//document.getElementsByClassName("result")[0].innerHTML += showSuggestionBtn;
}

function showDetails(){
	elem = document.getElementById("showDetails");
	console.log(elem);
	
	if(elem.value == "Hide Details"){
		$(".detailsTable").hide();
		elem.innerHTML = "Show Monthly Details";
		elem.value = "Show Monthly Details";
		return;
	}
	elem.innerHTML = "Hide Details";
	elem.value = "Hide Details";
	
	console.log(elem);
	
	//detailed result table
	var detailedTable = "<div class =\"detailsTable\"><div class=\"tbl-header\">";
	detailedTable += "<table cellpadding=\"0\" cellspacing=\"0\">";
	//detailedTable += "<caption>Detailed Table</caption>";
	detailedTable += "<tr><th>Month</th><th>Buy Expense(EMI)</th><th>Rent Expense</th><th>&Delta;</th><th>Accumulated Return</th></tr>"
	detailedTable += "</table></div>";
	
	detailedTable += "<div class=\"tbl-content\">";
	detailedTable += "<table cellpadding=\"0\" cellspacing=\"0\"><tbody>";
	detailedTable += "</tr><td>initial</td><td>"+initialBuyCost.toLocaleString('en-IN')+"</td><td>"+initialRentCost.toLocaleString('en-IN')+"</td><td>"+initialDiff.toLocaleString('en-IN')+"</td><td>"+parseFloat(initialInvestmentValue).toLocaleString('en-IN')+"</td></tr>";
	
	var N = year * payPerYear;
	for (var i = 0; i < N; i++) {
	  detailedTable += "<tr><td>month "+(i+1)+"</td><td>"+parseFloat(EMI).toLocaleString('en-IN')+"</td><td>"+parseFloat(rentArr[i]).toLocaleString('en-IN')+"</td><td>"+parseFloat(diffArr[i]).toLocaleString('en-IN')+"</td><td>"+parseFloat(rentAccumulationArr[i]).toLocaleString('en-IN')+"</td></tr>";
	}

	detailedTable += "</tbody></table></div></div>";
	document.getElementsByClassName("details")[0].innerHTML += detailedTable;
	//document.write(detailedTableable);
}

function showInputSuggestions(){
	elem = document.getElementById("inputSuggestionsBtn");
	console.log(elem);
	
	if(elem.value == "Hide Details"){
		$(".inputSuggestions").hide();
		elem.innerHTML = "Help me to enter Details";
		elem.value = "Help me to enter Details";
		return;
	}
	elem.innerHTML = "Hide Details";
	elem.value = "Hide Details";
	
	console.log(elem);
	
	//detailed result table
	var inputSuggestions = "<div class =\"inputSuggestions\">";
	inputSuggestions += "<ul>"
	inputSuggestions += "<li>We assume that monthly Maintenance Cost is equal in Buy and Rent so do not add it in Rent</li>";
	inputSuggestions += "<li>We assume that monthly Maintenance Cost is equal in Buy and Rent so do not add it in Rent</li>";
	inputSuggestions += "</ul>"
	inputSuggestions += "</div>";
	
	document.getElementsByClassName("inputSuggestionsDiv")[0].innerHTML += inputSuggestions;
}


function setRiskProfile(){
	console.log("setRiskProfile");
	var elem = event.target.id;
	if(elem=="High")
		document.getElementsByName("investmentRate")[0].value= 20;
	else if(elem=="Average")
		document.getElementsByName("investmentRate")[0].value= 15;
	else if(elem=="Low")
		document.getElementsByName("investmentRate")[0].value= 8;
}

function enableLoanDetails() {
	$(".loanDetails").show();
	$(".noLoanDetails").hide();
}

function disableLoanDetails() {
	$(".loanDetails").hide();
	$(".noLoanDetails").show();
}

function checkPropertyCost() {
	console.log("ckeck");
	propertyPrice = parseFloat(document.getElementsByName("propertyPrice")[0].value);
	totalBuyCost = parseFloat(document.getElementsByName("totalBuyCost")[0].value);
	console.log(propertyPrice+":"+totalBuyCost);
	if(totalBuyCost < propertyPrice)
		alert("Total Buy Cost should be greater or equal to Property Price");
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();