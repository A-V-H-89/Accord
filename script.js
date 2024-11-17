
const STANDARTRATE = 237
const CLASSHIDE = 'd-none'
const CLASSERROR = 'error'
const elements = {
    accord: document.getElementById('accord'),
    producing: document.getElementById('producing'),
    rate: document.getElementById('rate'),
    hours: document.getElementById('hours'),
    calculateByRate: document.getElementById('calculateByRate'),
    calculateByProducing: document.getElementById('calculateByProducing'),
    calculateByHours: document.getElementById('calculateByHours'),
    cleanAll: document.getElementById('clean'),
    cleanButtons: document.querySelectorAll('.clean'),
    errorsInput: document.querySelectorAll('.error'),
    errorsText: document.querySelectorAll('.text-danger')

}

elements.calculateByRate.addEventListener('click', () => {
    const accordMinimum = document.getElementById('accord')
    const rate = document.getElementById('rate')
    const calculatedStandartRate = STANDARTRATE / Number(accordMinimum.value)
    let validation = []

    if (!isValid(accordMinimum)) validation.push(false);
    if (validation.length > 0) return

    elements.hours.value = 1
    elements.producing.value = rate.value / calculatedStandartRate
})

elements.calculateByProducing.addEventListener('click', () => {
    const accordMinimum = document.getElementById('accord')
    const producing = document.getElementById('producing')
    const rate = document.getElementById('rate')
    let validation = []

    if (!isValid(producing)) validation.push(false);
    if (!isValid(accordMinimum)) validation.push(false);
    if (validation.length > 0) return

    const approximatellyHours = Math.round(producing.value / Number(accordMinimum.value) / 0.5) * 0.5
    const calculatedStandartRate = STANDARTRATE / Number(accordMinimum.value)

    elements.hours.value = approximatellyHours
    rate.value = (producing.value / approximatellyHours) * calculatedStandartRate
})

elements.calculateByHours.addEventListener('click', () => {
    const accordMinimum = document.getElementById('accord')
    const producing = document.getElementById('producing')
    const rate = document.getElementById('rate')
    const hours = document.getElementById('hours')
    let validation = []

    if (!isValid(producing)) validation.push(false);
    if (!isValid(accordMinimum)) validation.push(false);
    if (!isValid(rate)) validation.push(false);
    if (!isValid(hours)) validation.push(false);
    if (validation.length > 0) return

    const calculatedStandartRate = STANDARTRATE / Number(accordMinimum.value)
    rate.value = (producing.value / hours.value) * calculatedStandartRate
})

elements.cleanAll.addEventListener('click', () => {

    elements.errorsInput.forEach((el) => {
        el.classList.remove(CLASSERROR)
    })

    elements.errorsText.forEach((el) => {
        el.classList.add(CLASSHIDE)
    })

    elements.accord.value = ''
    elements.producing.value = ''
    elements.hours.value = ''
    elements.rate.value = 237
})

elements.cleanButtons.forEach(e => {
    e.addEventListener('click', (e) => {
        e.currentTarget.previousElementSibling.value = '';
        e.currentTarget.previousElementSibling.previousElementSibling.classList.add(CLASSHIDE);
        e.currentTarget.previousElementSibling.focus()
    })
});

function isValid(field) {
    const isValid = field.value && field.value !== '0';
    field.classList.toggle(CLASSERROR, !isValid);
    field.previousElementSibling.classList.toggle(CLASSHIDE, isValid);
    return isValid;
}