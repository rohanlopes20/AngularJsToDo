var noteApp = angular.module('noteApp', ['ngRoute','masonry']);

noteApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/viewNotes', {
	   templateUrl: 'templates/viewNotes.html',
	   controller: 'ViewNotesController'
	}).
	otherwise({
	   redirectTo: '/viewNotes'
	});
}]); 

noteApp.controller('noteAppController', ['$scope', function($scope) {
	// console.log("In Main controller");
}]);

noteApp.controller('AddNoteController', ['$scope', function($scope) {
	// console.log("In AddNoteController");
}]);

noteApp.controller('ViewNotesController', ['$scope' ,'$http', function($scope, $http) {
	// console.log("In ViewNotesController");

	/*var getNotes = $http.get("js/json-data/notes.json");
	var notes;

    getNotes.success(function(data, status, headers, config) {
       	// console.log(data);

       	notes = data["Notes"];
       	localStorage.setItem("Notes", JSON.stringify(notes));
    });

    getNotes.error(function(data, status, headers, config) {
        alert("AJAX failed!");
    });*/
    showNotes();

    $scope.fnAddNote = function(keyCode){
    	addNote(keyCode);
    }

    $scope.closeMe = function(){
         // $(".wrapper-box, .wrapper-main").hide();
    }

    $scope.fnAddNoteMain = function(keyCode){
        $(".wrapper-box, .wrapper-main").show();
    }

    function addNote(keyCode) {
	    var NotesArray = JSON.parse(localStorage.getItem("Notes")) || [];
		$scope.NoteData = NotesArray;

		$scope.fnAddNote = function(keyCode) {

			if(keyCode.charCode == 13) {
				var newNoteName = $("[name='newNoteName']").val();
                var newNoteDesc = $("[name='newNoteDesc']").val();
                var newNoteTime = $("[name='newNoteTime']").val();
				var note 			= {};
					note.id 		= 2;
					note.desc 		= newNoteDesc;
					note.name 		= newNoteName;
					note.timeOut 	= newNoteTime;
					note.color 		= { "background-color" : globalColorArray[randomRange(0, globalColorArray.length)] };
				NotesArray.push(note);

				setNoteTimeOut(note);

				localStorage.setItem("Notes", JSON.stringify(NotesArray));
				$("[name='newNote']").val("");
                $(".wrapper-box, .wrapper-main").hide();
				showNotes();
			}
		}
	}

	function showNotes() {
		var NotesArray = JSON.parse(localStorage.getItem("Notes")) || [];
		if (NotesArray.length > 0) {
			$scope.NoteData = NotesArray;

            for(var i = 0; i < NotesArray.length; i++){
                if(NotesArray[i].timeOut != "") {
                    setNoteTimeOut(NotesArray[i]);
                }            
            }
        }
	}
}]);

var globalColorArray = ["#C91F37","#DC3023","#9D2933","#CF000F","#E68364","#F22613","#CF3A24","#C3272B","#8F1D21","#D24D57","#F08F90","#F47983","#DB5A6B","#C93756","#FCC9B9","#FFB3A7","#F62459","#F58F84","#875F9A","#5D3F6A","#89729E","#763568","#8D608C","#A87CA0","#5B3256","#BF55EC","#8E44AD","#9B59B6","#BE90D4","#4D8FAC","#5D8CAE","#22A7F0","#19B5FE","#59ABE3","#48929B","#317589","#89C4F4","#4B77BE","#1F4788","#003171","#044F67","#264348","#7A942E","#8DB255","#5B8930","#6B9362","#407A52","#006442","#87D37C","#26A65B","#26C281","#049372","#2ABB9B","#16A085","#36D7B7","#03A678","#4DAF7C","#D9B611","#F3C13A","#F7CA18","#E2B13C","#A17917","#F5D76E","#F4D03F","#FFA400","#E08A1E","#FFB61E","#FAA945","#FFA631","#FFB94E","#E29C45","#F9690E","#CA6924","#F5AB35","#BFBFBF","#F2F1EF","#BDC3C7","#ECF0F1","#D2D7D3","#757D75","#EEEEEE","#ABB7B7","#6C7A89","#95A5A6"];

function randomRange(min, max){
	return randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNoteTimeOut(objNote) {
	try {	
		setTimeout(function(){
			console.log(objNote.desc);
            // notifyMe(objNote.desc);
		}, objNote.timeOut);
	} catch (e){
		console.error(e);
	}
}