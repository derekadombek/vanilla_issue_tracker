//listens for when the form is submitted
document.getElementById('issueInputForm').addEventListener('submit', saveIssue)

//when something is submitted this saves everything to the browsers localstorage
function saveIssue(e) {
    //pulls form input data and translates to variables
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    //add the input variables to an object
    let issue = {
        //name-of-property: value-of-property
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    //first it looks for a localstage named "issues" if it does find anything
    //it creates one with an array and puts the object "issue" inside of "issues"
    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    //if there already is an "issues" storage it grabs it and puts the "issue" object inside of it.
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    //once the object is added the form gets reset to blank
    document.getElementById('issueInputForm').reset();

    //calls the already created issues and displays it or them on the screen
    fetchIssues();

    e.preventDefault();
}

//when the close button is pressed from the fetchIssues(), its passed with the "id" and 
//changes the issues status message to closed
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (i=0;i<issues.length;i++) {
        //checks eachs "issue"'s id to see if it's the id that was passed through
        if (issues[i].id == id) {
            issues[i].status = 'closed';
        }
    }

    //updates the current "issues" storage
    localStorage.setItem('issues', JSON.stringify(issues));

    //shows the current/updated issues
    fetchIssues();
}

//when the delete button is pressed from the fetchIssues(), its passed with the "id" and 
//deletes the issue completely from the UI and the localstorage
function deletIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (i=0;i<issues.length;i++) {
        //checks eachs "issue"'s id to see if it's the id that was passed through
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    //updates the current "issues" storage
    localStorage.setItem('issues', JSON.stringify(issues));

    //shows the current/updated issues
    fetchIssues();
}

//looks for current "issues in localstorage"
function fetchIssues() {
    //grabs the "issues"
    let issues = JSON.parse(localStorage.getItem('issues'));
    //HTML id thats assigned to the div for the issue cards to show up in the UI
    let issuesList = document.getElementById('issuesList');

    //empty string to store add(+=) the below html to show objects in localstorage
    issuesList.innerHTML = '';

    //iterates and adds properties to each issue
    for (i=0;i<issues.length;i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deletIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div';
    }
}