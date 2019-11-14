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
    notesHTML.innerHTML = notes.reduce((html,note, i) => {
        return html +=`
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${note.done ? 'class="done" checked' : ''} />
            <label for="item${i}" ${note.done ? 'class="done"' : ''}>${note.text}</label>
            <input type="submit" class="delete" value="X">
          </li><hr>
          `;
      }, ``);
    // notesHTML.innerHTML = notes.map((note, i) => {
    //   return `
    //     <li ${note.done ? 'class="done"' : ''}>
    //       <input type="checkbox" data-index=${i} id="item${i}" ${note.done ? 'class="done" checked' : ''} />
    //       <label for="item${i}">${note.text}</label>
    //     </li>
    //     `;
    // }).join('');
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
    //document.querySelectorAll('li')[index].classList.toggle("done", notes[index].done);
}

document.querySelector(".add-notes").addEventListener("submit", addNote);
document.querySelector(".toDoList").addEventListener("click", menageNotes);

printNotes(notes, notesHTML);