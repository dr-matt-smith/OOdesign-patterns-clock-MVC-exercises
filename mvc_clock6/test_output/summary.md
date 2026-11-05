# Test report - mvc_clock6

**All tests passing** - 11/5/2026, 11:57:38 AM

| Passed | Failed | Skipped | Type errors | Lint warnings |
|---:|---:|---:|---:|---:|
| 10 | 0 | 0 | 0 | 0 |

## All tests


**tests/ClockModel_test.ts**

- ✓ addMinutes moves the time forward
- ✓ addMinutes wraps past midnight
- ✓ addHours wraps backwards past midnight
- ✓ observers are told about every change
- ✓ a removed observer is not told about changes
- ✓ there is no alarm to start with
- ✓ the alarm rings only when the time matches the alarm time
- ✓ clearing the alarm stops it ringing

**tests/timeFormat_test.ts**

- ✓ format24 pads hours and minutes to 2 digits
- ✓ format12 handles midnight, noon, morning and afternoon
