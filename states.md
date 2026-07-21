---
layout: page
title: "E2: State Data"
---

# State Data — E2

In this exercise you will combine the last two lessons — reading a CSV file and organizing data by row vs. by column — to explore a real data set of the 50 US states using nothing but the `csv` module, lists, and dictionaries.

This is the same states data set from Lesson 12, saved as a CSV file. Each row has a state's name, region, capital city, population, land area, and political party.

---

## Assignment Outline

1. **`clean_row`**
2. **`add_density`**
3. **`build_table`**
4. **`index_by_state`**
5. **`to_columns`**
6. **`filter_rows`**
7. **`proportion`**
8. **`max_by`**
9. **`top_n_by`** *(optional)*

**General Notes:**

- To test your functions as you work, you have two options:
  - **In your program:** Add `print` calls at the bottom of `states.py` and run the file from your `data_wrangling` folder:
    - **Mac:** `python3 -m exercises.states`
    - **Windows:** `python -m exercises.states`
    ```
    table = build_table("data/states.csv")
    print(table[0])
    print(max_by(table, "Density")["State"])
    ```
  - **In the REPL:** Open the VS Code terminal (from your `data_wrangling` folder), start Python with `python3` (Mac) or `python` (Windows), then import and call your functions interactively:
    ```
    from exercises.states import build_table, max_by
    >>> table = build_table("data/states.csv")
    >>> max_by(table, "Density")["State"]
    'New Jersey'
    ```
- The grader will evaluate most of your functions by calling them directly with its own small lists and dictionaries — you do not need to worry about generating test data for those. `build_table` is the exception: the grader will call it with a path to its own CSV file, formatted just like `states.csv`.

---

## 0. Create Your File

In VS Code, make sure your `data_wrangling` folder is open in the Explorer sidebar, and that `data/states.csv` exists inside it (the same file from Lesson 12/15 — ask if you don't have it).

Right-click on the `exercises` folder and select **New File**. Name it exactly:

```
states.py
```

Copy the following starter code into your new file and save (`Command+S` on Mac, `Control+S` on Windows). `read_csv` is provided and fully working — you'll build everything else on top of it.

```
import csv


# ---------------------------------------------------------------------------
# Provided — do not change
# ---------------------------------------------------------------------------

def read_csv(filename):
    """Read a CSV file and return a list of dictionaries, one per row.

    Every value comes back as a string, even the numeric-looking ones —
    that's just how csv.DictReader works. clean_row handles the conversion.
    """
    rows = []
    with open(filename, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


# ---------------------------------------------------------------------------
# Functions to implement
# ---------------------------------------------------------------------------

def clean_row(row):
    ...


def add_density(row):
    ...


def build_table(filename):
    ...


def index_by_state(rows):
    ...


def to_columns(rows):
    ...


def filter_rows(rows, column, value):
    ...


def proportion(rows, column, value):
    ...


def max_by(rows, column):
    ...


def top_n_by(rows, column, n):
    ...
```

---

## 1. `clean_row`

Rows fresh out of `read_csv` have every value stored as a `str` — including `'Population'` and `'Land Area'`, which we'll want to do math with. `clean_row` converts just those two fields to numbers and leaves everything else untouched.

**Function signature:**
- **Name:** `clean_row`
- **Arguments:** A `dict` with (at least) the string keys `'Population'` and `'Land Area'`, whose values are numeric strings.
- **Returns:** A new `dict` with the same keys as the input, but with `'Population'` and `'Land Area'` converted to `int`. Every other key/value pair is unchanged.

**Example usage:**
```
>>> clean_row({'State': 'Alabama', 'Region': 'South', 'Population': '5024279', 'Land Area': '50645'})
{'State': 'Alabama', 'Region': 'South', 'Population': 5024279, 'Land Area': 50645}
```

**Hint:** Don't modify the dictionary you were given — build a new one instead. `dict(row)` gives you a shallow copy you can safely change:
```
new_row = dict(row)
new_row["Population"] = int(new_row["Population"])
```

---

## 2. `add_density`

Given a single **cleaned** row (i.e. one that has already been through `clean_row`), `add_density` returns a new dictionary with an added `'Density'` key — population divided by land area, rounded to 2 decimal places.

**Function signature:**
- **Name:** `add_density`
- **Arguments:** A `dict` with (at least) numeric `'Population'` and `'Land Area'` keys.
- **Returns:** A new `dict` with every original key/value pair, plus a `'Density'` key.

**Example usage:**
```
>>> add_density({'State': 'Alabama', 'Population': 5024279, 'Land Area': 50645})
{'State': 'Alabama', 'Population': 5024279, 'Land Area': 50645, 'Density': 99.21}
```

**Hint:** Same copy-then-add-a-key pattern as `clean_row`. Use Python's built-in `round(value, 2)` to round to 2 decimal places.

---

## 3. `build_table`

Tie it all together: read a CSV file and return the fully cleaned, row-oriented table — a list of dictionaries, each with numeric `Population`/`Land Area` and a computed `Density`.

**Function signature:**
- **Name:** `build_table`
- **Arguments:** A `str` filename.
- **Returns:** A `list` of `dict`s — the result of calling `read_csv`, then `clean_row` and `add_density` on every row.

**Example usage:**
```
>>> table = build_table("data/states.csv")
>>> len(table)
50
>>> table[0]
{'State': 'Alabama', 'Region': 'South', 'Capital City': 'Montgomery',
 'Population': 5024279, 'Land Area': 50645, 'Party': 'Republican', 'Density': 99.21}
```

**Hint:** Call `read_csv(filename)` to get the raw rows, then loop through them, calling `clean_row` and `add_density` on each one and appending the result to a new list.

---

## 4. `index_by_state`

Row-oriented data is normally accessed by position (`table[0]`). `index_by_state` re-organizes it so you can look up any state directly by name instead.

**Function signature:**
- **Name:** `index_by_state`
- **Arguments:** A `list` of `dict`s, each with a `'State'` key.
- **Returns:** A `dict` mapping each row's `'State'` value to that entire row (still a `dict`).

**Example usage:**
```
>>> rows = [{'State': 'Alabama', 'Density': 99.21}, {'State': 'Alaska', 'Density': 1.29}]
>>> index_by_state(rows)
{'Alabama': {'State': 'Alabama', 'Density': 99.21}, 'Alaska': {'State': 'Alaska', 'Density': 1.29}}
>>> index_by_state(rows)["Alaska"]["Density"]
1.29
```

**Hint:** Start with an empty dictionary. Loop through `rows`, and for each `row`, add an entry where the key is `row["State"]` and the value is `row` itself.

You can assume every row's `'State'` value is unique.

---

## 5. `to_columns`

Convert a row-oriented table into its column-oriented equivalent: instead of a list of same-shaped dictionaries, one dictionary mapping each column name to a list of that column's values.

**Function signature:**
- **Name:** `to_columns`
- **Arguments:** A `list` of `dict`s, all sharing the same keys.
- **Returns:** A `dict` mapping each column name to a `list` of that column's values, in row order.

**Example usage:**
```
>>> rows = [{'State': 'Alabama', 'Density': 99.21}, {'State': 'Alaska', 'Density': 1.29}]
>>> to_columns(rows)
{'State': ['Alabama', 'Alaska'], 'Density': [99.21, 1.29]}
```

**Hint:** The column names are the keys of any row — `rows[0].keys()` works, or loop `for column in rows[0]:`. Build a dictionary that maps each column name to an empty list, then loop through every row, appending each field to its matching list.

You can assume `rows` is never empty and that every row has exactly the same keys.

---

## 6. `filter_rows`

Given a row-oriented table (or any list of dictionaries), keep only the rows where one particular field matches a target value — this is the building block for asking questions like "which states are in the West?"

**Function signature:**
- **Name:** `filter_rows`
- **Arguments:** A `list` of `dict`s called `rows`, a `str` column name, and a `value` to match.
- **Returns:** A new `list` containing only the rows where `row[column] == value`.

**Example usage:**
```
>>> rows = [{'State': 'Alabama', 'Region': 'South'}, {'State': 'Alaska', 'Region': 'West'}]
>>> filter_rows(rows, "Region", "West")
[{'State': 'Alaska', 'Region': 'West'}]
>>> filter_rows(rows, "Region", "Northeast")
[]
```

**Hint:** Start with an empty result list. Loop through `rows`, and append `row` to your result whenever `row[column] == value`.

---

## 7. `proportion`

Given a list of rows, return the fraction of them where one field matches a target value — this answers questions like "what proportion of states are Republican?"

**Function signature:**
- **Name:** `proportion`
- **Arguments:** A `list` of `dict`s called `rows`, a `str` column name, and a `value` to match.
- **Returns:** A `float` between 0 and 1 — the fraction of rows where `row[column] == value`.

**Example usage:**
```
>>> rows = [{'Party': 'Republican'}, {'Party': 'Republican'}, {'Party': 'Democratic'}]
>>> proportion(rows, "Party", "Republican")
0.6666666666666666
>>> proportion(rows, "Party", "Independent")
0.0
```

**Hint:** Call `filter_rows` to get the matching rows, then divide the length of that result by the length of `rows`. Don't rewrite the filtering loop from scratch — reuse the function you already wrote.

You can assume `rows` is never empty.

---

## 8. `max_by`

Given a list of rows, find the entire row that has the largest value for one particular field — this answers questions like "which state has the highest population density?"

**Function signature:**
- **Name:** `max_by`
- **Arguments:** A `list` of `dict`s called `rows`, and a `str` column name.
- **Returns:** The single `dict` (the whole row) with the largest value at `row[column]`.

**Example usage:**
```
>>> rows = [{'State': 'Alabama', 'Density': 99.21}, {'State': 'Alaska', 'Density': 1.29}]
>>> max_by(rows, "Density")
{'State': 'Alabama', 'Density': 99.21}
```

**Hint:** This is the same "assume the first is best, then update as you scan" pattern you used for `max` back in P2 — except now you're comparing `row[column]` for each row, and keeping track of the entire winning row (not just the winning number).

You can assume `rows` is never empty.

---

## Challenge: `top_n_by`

This one is optional. Given a list of rows, a column, and a count `n`, return the `n` rows with the largest values in that column, ordered from largest to smallest — this generalizes questions like "what are the top 3 most-populated states?"

**Function signature:**
- **Name:** `top_n_by`
- **Arguments:** A `list` of `dict`s called `rows`, a `str` column name, and an `int` `n`.
- **Returns:** A `list` of the `n` rows with the largest `row[column]` values, sorted from largest to smallest. If `rows` has fewer than `n` elements, return all of them, sorted.

**Example usage:**
```
>>> rows = [{'State': 'Alabama', 'Population': 5024279},
...         {'State': 'Alaska', 'Population': 733391},
...         {'State': 'Arizona', 'Population': 7151502}]
>>> top_n_by(rows, "Population", 2)
[{'State': 'Arizona', 'Population': 7151502}, {'State': 'Alabama', 'Population': 5024279}]
```

**Hint:** Python's built-in `sorted()` accepts a `key=` argument — a function that tells it what to sort by:
```
sorted(rows, key=lambda row: row[column], reverse=True)
```
That sorts every row from largest to smallest by `column`. Slice the first `n` of the result with `[:n]`.

---

## Explore on Your Own

Once your functions pass their tests, try combining them at the REPL to answer the same kinds of questions we asked with `babypandas` — no submission required, just practice:

- What is the average population density across all states? (`build_table` + `to_columns` + `sum`/`len` on the `"Density"` column)
- What is Pennsylvania's population density? (`build_table` + `index_by_state`)
- Which states are in the `"West"` region? (`filter_rows`)
- What proportion of states are `"Republican"`? (`proportion`)
- Which Midwestern state has the most land area? (`filter_rows` + `max_by`)
- What are the 3 most-populated Republican states in the South? (`filter_rows` twice + `top_n_by`)

**Note:** we're skipping "which region has the highest total population?" — answering that well means grouping every state by region first, which is a tool called `groupby` that you'll meet later on (it's what makes `babypandas` and `pandas` so powerful for exactly this kind of question).

---

## Submit to Gradescope

Submit your `states.py` file to the **E2** assignment in Gradescope. You can use any number of submits to pass all the test cases. `top_n_by` is extra work — it's not required to complete the assignment.
