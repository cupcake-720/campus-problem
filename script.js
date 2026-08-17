let reports = JSON.parse(localStorage.getItem("campusFix")) || [];


/* PAGE SWITCH */

function showPage(page, button) {

    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");


    document.querySelectorAll(".nav").forEach(n => {
        n.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }


    if (page === "dashboard") {
        pageTitle.innerText = "Dashboard";
        pageText.innerText =
            "Monitor problems reported around campus.";
    }

    if (page === "report") {
        pageTitle.innerText = "Report Problem";
        pageText.innerText =
            "Submit a new problem to the campus team.";
    }

    if (page === "reports") {
        pageTitle.innerText = "My Reports";
        pageText.innerText =
            "Track the problems you have reported.";
        displayReports();
    }

    updateDashboard();
}


/* ADD REPORT */

function addReport(event) {

    event.preventDefault();

    let report = {
        title: title.value,
        location: location.value,
        category: category.value,
        description: description.value,
        status: "Pending"
    };


    reports.unshift(report);

    localStorage.setItem(
        "campusFix",
        JSON.stringify(reports)
    );


    alert("Report submitted successfully!");

    event.target.reset();

    showPage("dashboard");
}


/* DASHBOARD */
function updateDashboard() {

    total.innerText = reports.length;

    pending.innerText =
        reports.filter(r => r.status === "Pending").length;

    progress.innerText =
        reports.filter(r => r.status === "In Progress").length;

    resolved.innerText =
        reports.filter(r => r.status === "Resolved").length;


    recent.innerHTML = reports
        .slice(0, 4)
        .map(createCard)
        .join("");
}


/* REPORT LIST */
function displayReports() {

    let text = search.value.toLowerCase();

    let filtered = reports.filter(r =>
        r.title.toLowerCase().includes(text) ||
        r.location.toLowerCase().includes(text)
    );

    list.innerHTML = filtered
        .map(createCard)
        .join("");
}


/* CREATE CARD */

function createCard(r) {

    return `
        <div class="card">

            <div>
                <h3>${r.title}</h3>
                <p>${r.category} • ${r.location}</p>
                <p>${r.description}</p>
            </div>

            <span class="status">
                ${r.status}
            </span>

        </div>
    `;
}


/* START */

updateDashboard();