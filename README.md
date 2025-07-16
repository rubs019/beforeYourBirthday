# Before Your Birthday

~I think I was a little bit borred when I wrote this code.~

Just display the number of month, days, minutes and secondes left before your next birthday.

Just run the script and enter your birthday date in the format `DD/MM/YYYY`.

Example :
```
GET http://localhost:3002/DD/MM/YYYY

GET http://localhost:3002/19/05/1925
```

Sample response :
```json
{
  "currentDate": "16/07/2025",
  "nextBirthdayDate": "19/05/2026",
  "birthdate": "19/05/1925",
  "isAlreadyDone": true,
  "fromYourBirthday": {
    "displayed": "100 years ago",
    "months": 1201,
    "days": 36583,
    "minutes": 52679510,
    "seconds": 3160770647
  },
  "nextBirthday": {
    "displayed": "in 10 months",
    "monthsBefore": 10,
    "daysBefore": 306,
    "minutesBefore": 442029,
    "secondsBefore": 26521752
  }
}
```
