---
layout: page
title: "P1: Skills Roundup"
---

# Skills Roundup — P1

In this assignment you will practice the core tools from Lessons 2–6: working with data types, building expressions, storing values in variables, and making decisions with conditional statements. Each of the three programs below focuses on a different combination of those skills.

Specifically **off-limits** for all three programs. Making use of any of the following will result in no credit for the program you use them in:

- Cannot use `def` to define functions
- Cannot use loops (`while`, `for`)
- Cannot use lists
- Cannot use string methods (`.upper()`, `.lower()`, `.split()`, etc.)
- Cannot use `len()`

---

## Working with Input and Output

To build some interesting programs, we'll work with three tools for getting information in and displaying results: `print`, `input`, and f-strings. You have worked with these tools during lessons, but here is a quick reminder.

### `print`

`print` displays output in the terminal. Unlike the REPL, stored programs only show output when you explicitly call it.

```
print("Howdy!")               # string literal
print(name)                   # variable
```

### `input`

`input` prints a prompt and waits for the user to type something. It always returns a `str` so convert it before doing math.

```
name = input("Your name: ")          # str
age  = int(input("Your age: "))      # int
rate = float(input("Rate: "))        # float
```

### f-strings

Write `f` before the opening quote and put variable names (or any expression) inside `{ }`. Python evaluates what's inside and drops the result into the string. We have seen manual string concatenation, but this is the way to concatenate data of any type into a string.

```
name  = "Alicia"
score = 82
print(f"{name} scored {score} points.")
# Alicia scored 82 points.
```

---

## Assignment Outline

1. **howdy.py** — 20 Points Autograded
2. **roundup.py** — 50 Points Autograded
3. **auction.py** — 30 Points Autograded

---

## 1. howdy.py — 20 pts

Write a program that asks for the user's name and prints one personalized greeting.

Create `howdy.py` in your `projects` folder. It should start with:

```
name = input("What's your name, partner? ")
```

Add one `print` call that uses `name` somewhere in the message. Write your own line — don't copy the example.

**Example run:**

```
What's your name, partner? Buck
You were born to be on a saddle, Buck!
```

---

## 2. roundup.py — 50 pts

A rancher wants to project how a starter herd grows over four breeding seasons. Each season, the calves born in the previous season produce new calves at the same rate.

Create `roundup.py` in your `projects` folder and write the full program from scratch.

**Input**

Ask for two values in this order, with these exact prompts:

```
Enter breed rate:
Enter starting herd size: 
```

`input` always returns a `str`. Use `float(...)` to convert the breed rate and `int(...)` to convert the herd size before doing any arithmetic.

**Model**

New calves each season come from the *previous season's new calves*, not the running total. Use `round(...)` to get a whole number each season:

```
new_s1 = round(t0 * breed_rate)
new_s2 = round(new_s1 * breed_rate)
new_s3 = round(new_s2 * breed_rate)
new_s4 = round(new_s3 * breed_rate)
```

The running total at each season is the previous total plus that season's new calves.

**Output**

Print four lines in exactly this format:

```
s1 - New: 200 - Total: 300
```

**Example runs:**

Breed rate `2.0`, starting herd `100`:

```
Enter breed rate: 2.0
Enter starting herd size: 100
s1 - New: 200 - Total: 300
s2 - New: 400 - Total: 700
s3 - New: 800 - Total: 1500
s4 - New: 1600 - Total: 3100
```

Breed rate `0.33`, starting herd `1000`:

```
Enter breed rate: 0.33
Enter starting herd size: 1000
s1 - New: 330 - Total: 1330
s2 - New: 109 - Total: 1439
s3 - New: 36 - Total: 1475
s4 - New: 12 - Total: 1487
```

> **Warning:** The autograder checks output character-for-character. The spacing (`s1 - New: __ - Total: __`) must match exactly.

**Hint:** If your totals are off by one, check where you are rounding — rounding at the wrong step carries the error forward.

---

## 3. auction.py — 30 pts

At a cattle auction, each lot is assigned a grade and sold by the pound. Write a quick pricer for the auctioneer.

Create `auction.py` in your `projects` folder. Start with these two lines:

```
grade = input("Grade (A/B/C): ")
weight = int(input("Weight (lbs): "))
```

Use an `if / elif / else` chain to compute the price and print one line of output:

| Grade | Price per lb |
|-------|-------------|
| `"A"` | $3 |
| `"B"` | $2 |
| `"C"` | $1 |
| Anything else | print `"INVALID"` |

**Example runs:**

```
Grade (A/B/C): A
Weight (lbs): 500
A | $1500
```

```
Grade (A/B/C): B
Weight (lbs): 750
B | $1500
```

```
Grade (A/B/C): X
Weight (lbs): 600
INVALID
```

**Hint:** Compute `total = weight * price` before the print, or put the math right inside the f-string.

---

## Submit to Gradescope

Submit `howdy.py`, `roundup.py`, and `auction.py` to the **P1** assignment on Gradescope. You can resubmit as many times as you need before the deadline.
