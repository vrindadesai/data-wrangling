---
layout: page
title: "E2: States Data Hunt"
---

# States Data Hunt — E2

In this exercise you will combine the last two lessons: reading from a CSV file and organizing data by row vs. by column using nested data structures. You'll explore a real dataset based on the US 2020 Census. 🇺🇸

---

## Assignment Outline

1. **`get_field`**
2. **`filter_rows`**
3. **`add_density`** and **`max_by`**
4. **`count_unique`** *(challenge)*

**General Notes:**

- `states.py` is organized into blocks: each block gives you one or two functions to implement, followed by the questions those functions can answer. 
- After you implement the function(s) in a block, fill in the `...` with an expression that actually **calls** your function(s) to compute the answer and assign it to the given variable.
- Work through functions in order. Certain questions may require you to call functions from a previous block, but never a future block.
- The comment next to each variable tells you the expected type (`str`, `int`, `float`, `dict`, ...).
- To test as you go, add `print` function calls anywhere in  `states.py` and run the file from your `data_wrangling` folder:
  - **Mac:** `python3 -m exercises.states`
  - **Windows:** `python -m exercises.states`
- The grader will evaluate most of your functions directly, calling them with its own small lists and dictionaries so you do not need to worry about generating test data for those. It will also check the final value of every `Q#` variable, make sure each one actually gets assigned to a real answer instead of being left as `...`.

---

## 0. Setup

Before you start, get both files from **Canvas**:

- Download `states.py` (the starter code) and put it in your `exercises` folder.
- Download `states.csv` and put it in your `data` folder.

Open `states.py`. `read_csv_rows` is provided — it opens the file, parses it with `csv.DictReader`, and converts `'Population'` and `'Land Area'` to `int` (every value comes back as a string otherwise — that's just how `csv.DictReader` works).

Right near the top of the file, this line is already run for you:

```python
states = read_csv_rows("data/states.csv")
```

`states` is the whole table stored in a row-oriented format; it is a `list` of `dict`s with one `dict` one per state. That's the variable you'll pass as the first argument to every function you write below. 

Before moving forward, print out your `states` variable to see what is inside of it!

---

## 1. `get_field`

Given a table and a state name, `get_field` looks up that state's row and returns the value of one particular column.

**Function signature:**
- **Name:** `get_field`
- **Arguments:** A `list` of `dict`s called `table`, a `str` state name, and a `str` `column_name`.
- **Returns:** The value of `row[column_name]` for the row where `row["State"] == state`.

**Example usage:**
```
>>> table = [{'State': 'Alabama', 'Density': 99.21}, {'State': 'Alaska', 'Density': 1.29}]
>>> get_field(table, "Alaska", "Density")
1.29
```

You can assume `state` matches exactly one row.

**Answer these in `states.py`:**
- **Q1:** What is the capital city of Texas? This one's already filled in for you as an example — look at `tx_capital_city` in the starter code.
- **Q2:** What is the population of New York? Fill in `ny_population` in a similar way.

See the starter code for the rest of the questions and expected variables.

---

## 2. `filter_rows`

Given a row-oriented table (or any list of dictionaries), create a **new table** with only the rows of the original where one particular field matches a target value.

**Function signature:**
- **Name:** `filter_rows`
- **Arguments:** A `list` of `dict`s called `table`, a `str` `column_name`, and a `value` to match.
- **Returns:** A new `list` containing only the rows where `row[column_name] == value`.

**Example usage:**
```
>>> table = [{'State': 'Alabama', 'Region': 'South'}, {'State': 'Alaska', 'Region': 'West'}]
>>> filter_rows(table, "Region", "Northeast")
[]
>>> filter_rows(table, "Region", "West")
[{'State': 'Alaska', 'Region': 'West'}]
```

---

## 3. `add_density` and `max_by`

`add_density` returns **a new table** where every row has an added `'Density'` key which is equal to population of a state divided by its land area.

**Function signatures:**
- **`add_density(table)`** → a new `list` of `dict`s, each with a `'Density'` key added.
- **`max_by(table, column_name)`** → the single `dict` (the whole row) with the largest value at `row[column_name]`.

**Example usage:**
```
>>> add_density([{'State': 'Alabama', 'Population': 5024279, 'Land Area': 50645}])
[{'State': 'Alabama', 'Population': 5024279, 'Land Area': 50645, 'Density': 99.21}]
>>> max_by([{'State': 'Alabama', 'Density': 99.21}, {'State': 'Alaska', 'Density': 1.29}], "Density")
{'State': 'Alabama', 'Density': 99.21}
```

🚨 `states` doesn't have a `'Density'` column yet — you need to call `add_density(states)` to get a table that does before you answer your questions.

---

## Challenge: `count_unique`

Please attempt the challenge if you have finished the rest of the parts. Given a table and a column, `count_unique` returns a dictionary mapping every distinct value that appears in that column to the number of rows it appears in.

**Function signature:**
- **Name:** `count_unique`
- **Arguments:** A `list` of `dict`s called `table`, and a `str` `column_name`.
- **Returns:** A `dict` mapping each distinct value of `row[column_name]` to a count of how many rows have that value.

**Example usage:**
```
>>> table = [{'Region': 'South'}, {'Region': 'South'}, {'Region': 'West'}]
>>> count_unique(table, "Region")
{'South': 2, 'West': 1}
```

---

## Submit to Gradescope

Submit your `states.py` file to the **E2** assignment in Gradescope. You can use any number of submits to pass all the test cases.