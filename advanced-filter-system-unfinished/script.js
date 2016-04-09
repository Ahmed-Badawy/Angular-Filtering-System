function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var myApp = angular.module('myApp',[]);

// will convert +++ seperated string to array then array_unique & remove empty properties. 
//then it will itirate each string & itirate over the array objects & compare if string is in JSON.stringify(object) to determine if string inside obj or not
myApp.filter('search_addtext_filter',function(){ 
	return function(array,search_filter_array){
		if(search_filter_array.length = 0) return array;
		console.log(search_filter_array);
		return array;
		// var new_array = [];
		// for(let i=0;i<search_filter_array.length-1;i++){
		// 	console.log(new_array,search_filter_array);
		// 	// console.log(search_filter_array[i]);
		// 	// if(search_filter_array[i]==undefined || search_filter_array[i]=="" || search_filter_array[i]==false) return array;
		// 	angular.forEach(array, function(value, key) {
		// 		// console.log(search_filter_array[i]);
		// 	  if(JSON.stringify(value).includes(search_filter_array[i])) new_array.push(value);
		// 	  console.log(new_array);
		// 	}, false);
		// 	console.log(new_array);
		// }	
		// return new_array;	
	}
});

//search if a object property equals certain value
myApp.filter('equality_filter',function(){ 
	return function(array,eq_field_name,eq_value){
		if(eq_value==undefined || eq_value=="" || eq_value==false) return array;
		var new_array = [];
		angular.forEach(array, function(value, key) {
		  if(value[eq_field_name]==eq_value) this.push(value);
		}, new_array);
		return new_array;
	}
});

//search if object property that contains array contains a certain value
myApp.filter('array_contains_filter',function(){ 
	return function(array,inner_array_name,inner_array_value){
		if(inner_array_value==undefined || inner_array_value=="" || inner_array_value==false) return array;
		var new_array = [];
		angular.forEach(array, function(value, key) {
		  if(value[inner_array_name].includes(inner_array_value)) this.push(value);
		}, new_array);
		return new_array;		
	}
});

myApp.controller('mainController',function($scope,$sce){
	$scope.questions = itiration_data;
	// console.log(service_name);
	// $scope.questions = service_name;
	$scope.define_cate = "";
	$scope.define_tag = "";
	$scope.cate_list = cates_list;
	$scope.tags_list = tags_list;

	$scope.html = $sce.trustAsHtml;
	$scope.define_cate = getParameterByName("cate");
	$scope.define_tag = getParameterByName("tag");
	$scope.assign = function(defined,to){
		$scope[defined] = to;
	}

	$scope.currently_text = "";
	$scope.search_filter_array = [];	
	$scope.add_search_string = function(){
		$scope.search_filter_array.push($scope.currently_text);
		console.log($scope.search_filter_array);
		$scope.search_filter_array = array_unique($scope.search_filter_array);
		$scope.currently_text = "";
	}
	$scope.remove_search_string = function(index){
		$scope.search_filter_array.splice(index,1);
	}

});



var cate_list = [];
var tags_list = [];
for(i=0;i<itiration_data.length-1;i++){
	for(j=0;j<itiration_data[i].tags.length-1;j++){
		tags_list.push(itiration_data[i].tags[j]);
	}
	cate_list.push(itiration_data[i].cate);
}
// console.log(tags_list);
cates_list = array_unique(cate_list);
tags_list = array_unique(tags_list);



function array_unique(array){ 
	var nuique = array.filter(function(value,index,self){
		if(value.trim()=="") return false;
		return self.indexOf(value) == index;
	});
	return nuique;
}

