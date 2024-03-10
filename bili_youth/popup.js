// popup.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkbox states from storage
    chrome.storage.sync.get(['adBlockingEnabled', 'liveBlockingEnabled'], function(result) {
        document.getElementById('adCheckbox').checked = !!result.adBlockingEnabled;
        document.getElementById('liveCheckBox').checked = !!result.liveBlockingEnabled;
        updateRowState('adRow', result.adBlockingEnabled);
        updateRowState('liveRow', result.liveBlockingEnabled);
    });

    document.getElementById('adRow').addEventListener('click', function() {
        toggleCheckbox('adCheckbox', 'adRow');
    });

    document.getElementById('liveRow').addEventListener('click', function() {
        toggleCheckbox('liveCheckBox', 'liveRow');
    });

    document.getElementById('saveBtn').addEventListener('click', function() {
        // Save the current states to storage
        chrome.storage.sync.set({
            adBlockingEnabled: document.getElementById('adCheckbox').checked,
            liveBlockingEnabled: document.getElementById('liveCheckBox').checked
        }, function() {
            console.log('Settings saved.');
            window.close(); // Close the popup window
        });
    });
});

function toggleCheckbox(checkboxId, rowId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
    updateRowState(rowId, checkbox.checked);

    // Save the new state to storage
    const key = checkboxId === 'adCheckbox' ? 'adBlockingEnabled' : 'liveBlockingEnabled';
    chrome.storage.sync.set({ [key]: checkbox.checked });
}

function updateRowState(rowId, isActive) {
    const row = document.getElementById(rowId);
    if (isActive) {
        row.classList.add('active');
    } else {
        row.classList.remove('active');
    }
}
