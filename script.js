const validUsername = "planner";
    const validPassword = "password";

    function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === validUsername && password === validPassword) {
            document.getElementById("loginSection").classList.add("hidden");
            document.getElementById("dashboard").classList.remove("hidden");
            document.getElementById("loginMessage").classList.add("hidden");
        } else {
            displayMessage("Invalid username or password!", true);
        }
    }

    function uploadDocument(docType, inputId) {
        const input = document.getElementById(inputId);
        const customerName = document.getElementById("customerName").value;

        if (input.files.length > 0 && customerName) {
            const fileName = input.files[0].name;
            const uploadStatus = "Under Review"; 
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${customerName}</td>
                <td>${docType}: ${fileName}</td>
                <td>
                    <select class="status-select" onchange="updateStatus(this)">
                        <option value="Under Review">Under Review</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </td>
                <td>
                    <button onclick="editDocument(this)">Edit</button>
                    <button onclick="deleteDocument(this)">Delete</button>
                </td>
            `;

            document.getElementById("documentList").appendChild(row);
            input.value = ""; 
            document.getElementById("customerName").value = "";
        } else {
            displayMessage("Please enter a customer name and select a file to upload.", true);
        }
    }

    function displayMessage(message, isError = false) {
        const loginMessage = document.getElementById("loginMessage");
        loginMessage.innerText = message;
        loginMessage.classList.toggle("hidden", !isError);
        loginMessage.style.color = isError ? "#dc3545" : "#28a745"; 
    }

    function updateStatus(select) {
        const status = select.value;
        const row = select.closest("tr");
        row.cells[2].innerText = status; 
    }

    function editDocument(button) {
        const row = button.closest("tr");
        const customerName = row.cells[0].innerText;
        const docType = row.cells[1].innerText.split(":")[0];
        const statusSelect = row.querySelector(".status-select");

        document.getElementById("customerName").value = customerName; 
        statusSelect.focus(); 
    }

    function deleteDocument(button) {
        const row = button.closest("tr");
        row.remove(); 
    }

    function logout() {
        document.getElementById("loginSection").classList.remove("hidden");
        document.getElementById("dashboard").classList.add("hidden");
        document.getElementById("documentList").innerHTML = "";
        document.getElementById("additionalDocumentList").innerHTML = "";
    }

  
    document.getElementById("additionalUploadForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const uploadedFiles = [];
        const fileInputs = [document.getElementById("doc1"), document.getElementById("doc2"), document.getElementById("doc3")];

        fileInputs.forEach(input => {
            if (input.files.length > 0) {
                uploadedFiles.push(input.files[0].name);
                input.value = ""; 
            }
        });


        const documentList = document.getElementById("additionalDocumentList");
        documentList.innerHTML = ""; 

        uploadedFiles.forEach(fileName => {
            const li = document.createElement("li");
            li.textContent = fileName;
            documentList.appendChild(li);
        });

        document.getElementById("uploadedDocuments").style.display = "block";
    });