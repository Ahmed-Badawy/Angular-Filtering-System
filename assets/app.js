function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var myApp = angular.module('myApp',[]);
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
	$scope.ng_itiration_data = itiration_data;
	$scope.order_by = "priority";
	// console.log(service_name);
	// $scope.questions = service_name;
	$scope.search_text = "";
	$scope.define_cate = "";
	$scope.define_tag = "";
	$scope.cate_list = cates_list;
	$scope.tags_list = tags_list;
	$scope.assign = function(what,to){
		$scope[what] = to;
	}

	$scope.html = $sce.trustAsHtml;
	$scope.define_cate = getParameterByName("cate");
	$scope.define_tag = getParameterByName("tag");
	$scope.search_text = getParameterByName("q");
});



var cate_list = [];
var tags_list = [];
for(i=0;i<itiration_data.length;i++){
	for(j=0;j<itiration_data[i].tags.length;j++){
		tags_list.push(itiration_data[i].tags[j]);
	}
	cate_list.push(itiration_data[i].cate);
}
cates_list = array_unique(cate_list);
tags_list = array_unique(tags_list);
// console.log(cate_list);
// console.log(tags_list);



function array_unique(array){ 
	var nuique = array.filter(function(value,index,self){
		return self.indexOf(value) == index;
	});
	return nuique;
}