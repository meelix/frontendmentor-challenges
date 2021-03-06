fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    let heighest = 0;
    data.forEach(dataSet => {
        document.querySelector(`[data-day="${dataSet.day}"] .info`).innerHTML = `$${dataSet.amount}`;
        document.querySelector(`[data-day="${dataSet.day}"] .bar`).style.setProperty("--percent", dataSet.amount + "%");
        if (!heighest || heighest < dataSet.amount) {
            heighest = dataSet.amount
        }
    });
    document.documentElement.style.setProperty('--heighest', heighest);
});

const weekDays = ["sun","mon","tue","wed","thu","fri","sat"]

document.querySelector(`[data-day="${weekDays[new Date().getDay()]}"]`).classList.add("today");

