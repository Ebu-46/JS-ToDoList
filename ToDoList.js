function read_task() {
    let allLocaltasks = localStorage.getItem("localtask");
    let taskArr;
    if(allLocaltasks == null){
        taskArr = [];
    }
    else{
        taskArr = JSON.parse(allLocaltasks);
        taskArr.sort((a, b) => (a.task_name > b.task_name) ? 1 : -1)
        //console.log(taskArr);
    }
    return taskArr;
}

function write_task(taskArr) {
    localStorage.setItem("localtask", JSON.stringify(taskArr));
}


let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let completedbtn = document.getElementById("completedbtn");
let incompletedbtn = document.getElementById("incompletedbtn");
let taskArr = read_task();
showtask(taskArr);

completedbtn.addEventListener("click", function(){
    taskArr.sort((a, b) => (a.completeStatus == b.completeStatus) ? ((a.task_name > b.task_name) ? 1 : -1) : ((a.completeStatus > b.completeStatus) ? -1 : 1));
    let completedArray = taskArr.filter((a) => a.completeStatus);
    showtask(completedArray);
})

incompletedbtn.addEventListener("click", function(){
    taskArr.sort((a, b) => (a.completeStatus == b.completeStatus) ? ((a.task_name > b.task_name) ? 1 : -1) : ((a.completeStatus > b.completeStatus) ? 1 : -1));
    let incompletedArray = taskArr.filter((a) => !a.completeStatus);
    showtask(incompletedArray);
})


addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    if(addtaskinputval.trim()!=0){
        
        taskArr.push({'task_name':addtaskinputval, 'completeStatus':false});
		
        write_task(taskArr);
        addtaskinput.value = '';
    }
    taskArr = read_task();
    showtask(taskArr);
})

// showtask
function showtask(taskArray){
    
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskArray.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td> <s>${item.task_name}</s></td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th >${index+1}</th>
                    ${taskCompleteValue}
                    <td><button onclick="edittask(${index})" >Edit</button></td>
                    <td><button onclick="completetask(${index})">Complete</button></td>
                    <td><button onclick="deleteitem(${index})">Delete</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edittask
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    
    addtaskinput.value = taskArr[index]['task_name'];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="inline";
}

// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let saveindex = document.getElementById("saveindex").value;
    
    taskArr[saveindex]['task_name'] = addtaskinput.value;
    
    
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="inline";
    write_task(taskArr);
    addtaskinput.value='';
    taskArr=read_task();
    showtask(taskArr);
})
// deleteitem
function deleteitem(index){
    taskArr.splice(index, 1);
    write_task(taskArr);
    taskArr=read_task();
    showtask(taskArr);
}


// complete task
function completetask(index){
    taskArr[index].completeStatus=!taskArr[index].completeStatus;
    
    //console.log(taskArray[index].completeStatus);
    write_task(taskArr);
    taskArr=read_task();
    showtask(taskArr);
}

// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    taskArr = [];
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="inline";
    write_task(taskArr);
    showtask(taskArr);

})















