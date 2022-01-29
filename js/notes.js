const NOTES_FORM_ID = '#notes-form';
const NOTES_INPUT_ID = '#note-text';
const NOTES_OUTPUT_ID = '#notes';
const CLEAR_BUTTON_ID = '#clearBtn';

$(function() {
	$(NOTES_FORM_ID).on('submit', handleTakeNotes);

	$(CLEAR_BUTTON_ID).on('click', handleClearNotes)

	if (localStorage.notes != undefined) {
		$(NOTES_OUTPUT_ID).html(localStorage.notes);
	}
});

function handleTakeNotes(e) {
	let noteText = $(NOTES_INPUT_ID).val();

	if (noteText == undefined || noteText == '') return false;

	takeNote(noteText);

	$(NOTES_INPUT_ID).val('');
	return false;
}

function takeNote(text) {
	let sanitizedText = text.trim();
	let signal = getSignal(sanitizedText);
	let formattedText = formatText(sanitizedText);

	let note = `<li class="${signal}"><b>${getTimeStamp()}</b> ${formattedText}</li>`;
	$(NOTES_OUTPUT_ID).append(note);
	localStorage.notes = $(NOTES_OUTPUT_ID).html();
}

function getTimeStamp() {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getSignal(text) {
	if (text.startsWith('+')) return 'positive';
	if (text.startsWith('-')) return 'negative';

	return null;
}

function formatText(text) {
	// special short cut for writing parts: p1, p2, etc.
	if (!text.match(/p\d/)) return text;
	let partNumber = text.split('')[1];

	return `part ${partNumber}`;
}

function handleClearNotes(e) {
	let response = confirm("Are you sure you want to clear your notes?");
	if (response) {
			localStorage.notes = '';
		$(NOTES_OUTPUT_ID).html('');
	}
}