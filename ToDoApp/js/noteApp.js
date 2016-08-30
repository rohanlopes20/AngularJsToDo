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

noteApp.controller('ViewNotesController', ['$scope', '$rootScope' ,'$http', function($scope, $rootScope, $http) {
	// console.log("In ViewNotesController");

    $scope.closeMe = function() {
         $(".wrapper-box, .wrapper-main").hide();
    }

    $scope.fnAddNoteMain = function() {
        $("[name='newNoteId']").val("");
        $(".wrapper-box, .wrapper-main").show();
    }

    $scope.fnAddEditNote = function() {
        var noteCount       = 0 || ((localStorage.getItem("Notes")) ? JSON.parse(localStorage.getItem("Notes")).length : 0 );
        var noteId          = $("[name='newNoteId']").val();

        var newNoteName     = $("[name='newNoteName']").val();
        var newNoteDesc     = $("[name='newNoteDesc']").val();
        var newNoteTime     = $("[name='newNoteTime']").val();
        var note            = {};
            note.id         = (!noteId) ? noteCount + 1 : noteId;
            note.name       = newNoteName;
            note.desc       = newNoteDesc;
            note.timeOut    = newNoteTime;

        var NotesArray      = JSON.parse(localStorage.getItem("Notes")) || [];
        note.color          = (!noteId)? { "background-color" : globalColorArray[randomRange(0, globalColorArray.length)] } : NotesArray[noteId-1].color;
        
        if(newNoteName != "" && newNoteDesc != "") {
            // if(noteId) delete NotesArray[noteId];
            (!noteId)? NotesArray.push(note) : NotesArray[noteId-1] = note;

            localStorage.setItem("Notes", JSON.stringify(NotesArray));
            $("[name='newNote']").val("");
            $(".wrapper-box, .wrapper-main").hide();

            $rootScope.NoteData = NotesArray;

            $scope.closeMe();
        }
    }

	$scope.showNotes = function() {
		var NotesArray = JSON.parse(localStorage.getItem("Notes")) || [];

		if (NotesArray.length > 0) {
            for(var i = 0; i < NotesArray.length; i++){
                if(NotesArray[i].timeOut != "") {
                    setNoteTimeOut(NotesArray[i]);
                    // console.log(NotesArray[i]);
                }            
            }
        }

        return NotesArray;
	}

    $scope.editNote = function(noteId) {
        var NotesArray = JSON.parse(localStorage.getItem("Notes")) || [];
        console.log(NotesArray);
        $("[name='newNoteId']").val(noteId);
        $("[name='newNoteName']").val(NotesArray[noteId-1].name);
        $("[name='newNoteDesc']").val(NotesArray[noteId-1].desc);
        $("[name='newNoteTime']").val(NotesArray[noteId-1].timeOut);
        $(".wrapper-box, .wrapper-main").show();
    }

    $rootScope.NoteData = $scope.showNotes();

}]);

var globalColorArray = ["#C91F37","#DC3023","#9D2933","#CF000F","#E68364","#F22613","#CF3A24","#C3272B","#8F1D21","#D24D57","#F08F90","#F47983","#DB5A6B","#C93756","#FCC9B9","#FFB3A7","#F62459","#F58F84","#875F9A","#5D3F6A","#89729E","#763568","#8D608C","#A87CA0","#5B3256","#BF55EC","#8E44AD","#9B59B6","#BE90D4","#4D8FAC","#5D8CAE","#22A7F0","#19B5FE","#59ABE3","#48929B","#317589","#89C4F4","#4B77BE","#1F4788","#003171","#044F67","#264348","#7A942E","#8DB255","#5B8930","#6B9362","#407A52","#006442","#87D37C","#26A65B","#26C281","#049372","#2ABB9B","#16A085","#36D7B7","#03A678","#4DAF7C","#D9B611","#F3C13A","#F7CA18","#E2B13C","#A17917","#F5D76E","#F4D03F","#FFA400","#E08A1E","#FFB61E","#FAA945","#FFA631","#FFB94E","#E29C45","#F9690E","#CA6924","#F5AB35","#BFBFBF","#F2F1EF","#BDC3C7","#ECF0F1","#D2D7D3","#757D75","#EEEEEE","#ABB7B7","#6C7A89","#95A5A6"];

function randomRange(min, max){
	return randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNoteTimeOut(objNote) {
	try {	
		setTimeout(function(){
			// console.log(objNote.desc);
            // notifyMe(objNote.desc);
		}, objNote.timeOut);
	} catch (e){
		console.error(e);
	}
}