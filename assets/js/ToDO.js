// Local Storage
// /*if (typeof(Storage) !== "undefined") {
// 	localStorage.setItem("task1", "Read Book");
// 	localStorage.setItem("task2", "Drink Water");

// 	document.getElementById("label-incomplete-task").innerHTML = localStorage.getItem("task1");
// }

// else {
//     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
// }
// */

// /*function addTaskFunction() {
	
// 	var input = document.getElementById('new-task').value
	
// 	console.log(input)
// 	var node = document.createElement("li");
// 	var textNode = document.createTextNode(input);
// 	node.appendChild(textNode);
// 	document.getElementById("incomplete-task").append(node)

// }*/


// /*var button = document.getElementById('add-button')
// button.addEventListener('click', addTaskFunction)*/


var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


var createNewTaskElement = function(taskString) {
 
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); 
  var label = document.createElement("label");
  var editInput = document.createElement("input"); 
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit btn";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete btn";
  
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add task
/*var addTask = function() {
  console.log("aaaa");
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  taskInput.value = "";   
}*/

//ADD ITEM
	$('button#add').on('click',function(){
		//get input's value
		var $newTask = $('#new-task').val();
		//check for empty value
		if($newTask==='') {
			//show alert message
			$('.warning').html('<i class="fa fa-warning"></i> No task added').show();
			//hide success message
			$('.success').hide();
		}else{
			//show success message
			$('.success').html('<i class="fa fa-check"></i>Task added to list').fadeIn('slow').delay(500).fadeOut();
			//hide warning
			$('.warning').hide();
			//generate and add new list item
			var newListItem = '<li>';
			newListItem+='<input type="checkbox">';
			newListItem+='<label>'+$newTask+'</label>';
			newListItem+='<input type="text" class="inputTask">';
			newListItem+='<button class="edit">Edit</button>';
			newListItem+='<button class="delete">Delete</button>';
			newListItem+='</li>';
      //apend to list
			$('ul#incomplete-tasks').append(newListItem);
      $('.inputTask').val($newTask);
			//empty input value
			$('#new-task').val('');
		};//end else statement
		countTask();
	});//end button click function

	function countTask(){
		var remainTask = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(300).html(remainTask);
	};


// Edit task
var editTask = function() {
  console.log("Edit Task");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass) {

    label.innerText = editInput.value;
  } else {

    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
 
}


// Delete task
var deleteTask = function() {
  console.log("Delete task");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}


var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}


// addButton.addEventListener("click", addTask);


for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}