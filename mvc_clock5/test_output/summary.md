# Test report - mvc_clock5

**All tests passing** - 11/5/2026, 10:47:47 AM

| Passed | Failed | Skipped | Type errors | Lint warnings |
|---:|---:|---:|---:|---:|
| 7 | 0 | 0 | 0 | 0 |

## All tests


**tests/ClockModel_test.ts**

- ✓ addMinutes moves the time forward
- ✓ addMinutes wraps past midnight
- ✓ addHours wraps backwards past midnight
- ✓ observers are told about every change
- ✓ a removed observer is not told about changes

**tests/timeFormat_test.ts**

- ✓ format24 pads hours and minutes to 2 digits
- ✓ format12 handles midnight, noon, morning and afternoon
