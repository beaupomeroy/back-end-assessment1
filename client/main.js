const retirementForm = document.querySelector("#retirementForm");
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const goalList = document.getElementById("retirementGoalsList")


function displayGoals(goals) {
    goalList.innerHTML = '';
    goals.forEach(goal => {
        
        let goalItem = document.createElement('li')
        goalItem.textContent = goal;
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => deleteGoal(goal));

        let updateBtn = document.createElement("button")
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => updateGoal(goal));

        goalItem.appendChild(updateBtn);
        goalItem.appendChild(deleteBtn);
        goalList.appendChild(goalItem);
    });
 };

const errCallback = (err) => {
    if (err.response && err.response.data) {
        console.log(err.response.data);
    } else {
        console.log('An error occurred:', err);
    }
};

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const createGoal = (body) => {
    axios.post("http://localhost:4000/api/goals/", body)
    .then(res => displayGoals(res.data.goals)     
    ).catch(e => errCallback(e));
}

const updateGoal = (id) => {
    const updatedGoal = prompt("Enter new Goal:");

    axios.put(`http://localhost:4000/api/goals/update/${id}`, { goal: updatedGoal })
    .then(res => {
        console.log("Goal updated successfully");
        displayGoals(res.data.goals); 
    })
    .catch(err => {
        console.error("Error updating goal:", err);
        errCallback(err); 
    });  
}

function deleteGoal(goal) {
    axios.delete(`http://localhost:4000/api/goals/delete/${goal}`) 
        .then(res => {
            console.log("Goal deleted successfully");
            displayGoals(res.data); 
        })
        .catch(e => {
            console.error("Error deleting goal:", e);
            errCallback(e); 
        });
}


function submitHandler(e) {
    e.preventDefault();
    const goalInput = document.getElementById("retirementGoalInput").value.trim();
    if (goalInput !== '') {
        const body = { goal: goalInput };
        createGoal(body);
        document.getElementById("retirementGoalInput").value = '';
    }
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
retirementForm.addEventListener("submit", submitHandler)
