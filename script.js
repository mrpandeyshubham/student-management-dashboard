document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');
    const searchInput = document.getElementById('searchInput');
    const editModal = document.getElementById('editModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const editStudentForm = document.getElementById('editStudentForm');
    const clearBtn = document.getElementById('clearBtn');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function renderStudents(filter = "") {
        studentTableBody.innerHTML = "";

        students
            .filter(student =>
                student.name.toLowerCase().includes(filter.toLowerCase()) ||
                student.regNo.toLowerCase().includes(filter.toLowerCase())
            )
            .forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.regNo}</td>
                    <td>${student.department}</td>
                    <td>${student.year}</td>
                    <td>${student.marks}</td>
                    <td>
                        <div class="action-btns">
                            <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                        </div>
                    </td>
                `;
                studentTableBody.appendChild(row);
            });
    }

    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('editId').value = index;
        document.getElementById('editName').value = student.name;
        document.getElementById('editRegNo').value = student.regNo;
        document.getElementById('editDepartment').value = student.department;
        document.getElementById('editYear').value = student.year;
        document.getElementById('editMarks').value = student.marks;

        editModal.style.display = 'flex';
    }

    window.deleteStudent = function(index) {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            saveStudents();
            renderStudents(searchInput.value);
        }
    }

    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    editStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = document.getElementById('editId').value;
        students[index] = {
            name: document.getElementById('editName').value,
            regNo: document.getElementById('editRegNo').value,
            department: document.getElementById('editDepartment').value,
            year: document.getElementById('editYear').value,
            marks: document.getElementById('editMarks').value
        };
        saveStudents();
        renderStudents(searchInput.value);
        editModal.style.display = 'none';
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newStudent = {
            name: document.getElementById('name').value,
            regNo: document.getElementById('regNo').value,
            department: document.getElementById('department').value,
            year: document.getElementById('year').value,
            marks: document.getElementById('marks').value
        };
        students.push(newStudent);
        saveStudents();
        renderStudents(searchInput.value);
        studentForm.reset();
    });

    searchInput.addEventListener('input', () => {
        renderStudents(searchInput.value);
    });

    clearBtn.addEventListener('click', () => {
        studentForm.reset();
    });

    renderStudents();
});
