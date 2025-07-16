const express = require('express');
const app = express();
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

dayjs.tz.setDefault("Europe/Paris")

const port = 3002

const DEFAULT_FORMAT = 'DD/MM/YYYY'

app.get('/:day/:month/:year', function(req, res) {
    const { day, month, year } = req.params

    if (!isValidDate(day, month, year)) {
        return res.status(400).json({ error: 'Invalid date parameters' });
    }
    
    const currentDate = dayjs().utc()
    const birthdayDate = dayjs()
        .set('year', year)
        .set('month', parseInt(month, 10) - 1)
        .set('date', day)
        .set('minutes', 0)
        .set('seconds', 0)
    
    const _nextBirthdayDate = birthdayDate.clone().set('year', dayjs().year())
    const isAlreadyDone = _nextBirthdayDate.isBefore(currentDate)
    const nextBirthdayDate = isAlreadyDone 
        ? _nextBirthdayDate.add(1, 'year')
        : _nextBirthdayDate.clone()
    
    const response = {
        currentDate : currentDate.format(DEFAULT_FORMAT),
        nextBirthdayDate: nextBirthdayDate.format(DEFAULT_FORMAT),
        birthdate : birthdayDate.format(DEFAULT_FORMAT),
        isAlreadyDone,
        fromYourBirthday: {
            displayed : birthdayDate.from(currentDate),
            months : currentDate.diff(birthdayDate, 'month'),
            days : currentDate.diff(birthdayDate, 'days'),
            minutes : currentDate.diff(birthdayDate, 'minutes'),
            seconds : currentDate.diff(birthdayDate, 'seconds'),
        },
        nextBirthday: {
            displayed : nextBirthdayDate.from(currentDate),
            monthsBefore : nextBirthdayDate.diff(currentDate, 'month'),
            daysBefore : nextBirthdayDate.diff(currentDate, 'days'),
            minutesBefore : nextBirthdayDate.diff(currentDate, 'minutes'),
            secondsBefore : nextBirthdayDate.diff(currentDate, 'seconds'),  
        },
    }
    return res
        .header({ 'Content-Type': 'application/json' })
        .send(response);
});

function isValidDate(day, month, year) {
    return day && month && year 
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})