const notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesHTML = document.querySelector('.toDoList');


const addNote = (e) => {
    e.preventDefault();
    const text = document.querySelector('.noteText').value;
    const note = {
        text: text,
        done: false
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    document.querySelector('.noteText').value= ""; //this.reset() in non arrow function
    printNotes(notes, notesHTML)
};

function printNotes(notes = [], notesHTML) {
    notesHTML.innerHTML = notes.reduce((html,note, i) => {
        return html +=`
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${note.done ? 'class="done" checked' : ''} />
            <label for="item${i}" ${note.done ? 'class="done"' : ''}>${note.text}</label>
            <input type="submit" class="delete" value="DEL">
          </li><hr>
          `;
    }, ``);
  };

  function menageNotes(e) {
    if (!e.target.matches('input')) { return; }
    if (e.target.matches('input.delete')) {
        const del = e.target.parentElement.firstElementChild.dataset.index;
        notes.splice(del,1);
    }else {
        const el = e.target;
        const index = el.dataset.index;
        notes[index].done = !notes[index].done;
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    printNotes(notes, notesHTML)
}

document.querySelector(".add-notes").addEventListener("submit", addNote);
document.querySelector(".toDoList").addEventListener("click", menageNotes);

printNotes(notes, notesHTML);