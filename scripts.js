let selectedTimeZone = 'Asia/Colombo';

document.getElementById('regionSelect').addEventListener('change', function() {
  selectedTimeZone = this.value;
});

function updateClock() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', { timeZone: selectedTimeZone });
  const currentDate = now.toLocaleDateString('en-US', { timeZone: selectedTimeZone });

  document.getElementById('clock').innerText = currentTime;
  document.getElementById('date').innerText = currentDate;
}
setInterval(updateClock, 1000);

let alarms = [];

function addAlarm() {
  const alarmTime = document.getElementById('alarmTime').value;
  if (!alarmTime) {
    alert('Please select a time for the alarm.');
    return;
  }

  alarms.push(alarmTime);
  renderAlarms();
}

function renderAlarms() {
  const alarmList = document.getElementById('alarmList');
  alarmList.innerHTML = '';

  alarms.forEach((alarm, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${alarm} <button onclick="deleteAlarm(${index})">Delete</button>`;
    alarmList.appendChild(listItem);
  });
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

setInterval(() => {
  const now = new Date().toLocaleTimeString('en-US', { timeZone: selectedTimeZone, hour12: false });
  alarms.forEach(alarm => {
    if (now.startsWith(alarm)) {
      alert(`Alarm! Time is ${alarm}`);
    }
  });
}, 1000);
