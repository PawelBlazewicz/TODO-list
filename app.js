const notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesHTML = document.querySelector('.toDoList');


const addNote = (e) => {
    e.preventDefault();
    const text = document.querySelector('input[name="note"]').value;
    const note = {
        text: text,
        done: false
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    document.querySelector('input[name="note"]').value= ""; //this.reset() in non arrow function
    console.log("test", text, e);
    printNotes(notes, notesHTML)
};

function printNotes(notes = [], notesHTML) {
    notesHTML.innerHTML = notes.map((note, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${note.done ? 'class="done" checked' : 'class="dx"'} />
          <label for="item${i}">${note.text}</label>
        </li>
        `;
    }).join('');
  };


document.querySelector(".add-notes").addEventListener("submit", addNote);
printNotes(notes, notesHTML)
