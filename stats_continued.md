---
layout: page
title: "E0: Statistics Library Continued"
mathjax: true
---

# Statistics Library Cont'd — E0

In this exercise, you will keep building out the statistics library you started in **P2**. You'll add three new functions to `stats.py`: `median`, `percentile`, and `filter`.


Specifically **off-limits** in this exercise are the following:

- Cannot use built-in functions besides `len` 
- Cannot use the list class's `+` or `==` operators nor built-in methods beyond `append`, `pop`, and `sorted`

> **Note:** You *can* use `+`, `-`, `*`, `/`, `**`, and `==` for individual numeric elements — just not entire lists.

---

## Assignment Outline

1. **`median`**
2. **`percentile`**
3. **`filter`**

**General Notes:**

- To test your functions as you work, you have two options:
  - **In your program:** Add `print` calls at the bottom of `stats.py` and run the file from your `data_wrangling` folder:
    - **Mac:** `python3 -m projects.stats`
    - **Windows:** `python -m projects.stats`
    ```
    print(median([3, 1, 2]))               # should print 2
    print(percentile([15, 20, 35, 40, 50], 0.4))  # should print 29.0
    ```
  - **In the REPL:** Open the VS Code terminal (from your `data_wrangling` folder), start Python with `python3` (Mac) or `python` (Windows), then import and call your functions interactively:
    ```
    from projects.stats import median, percentile, filter
    >>> median([3, 1, 2])
    2
    >>> percentile([15, 20, 35, 40, 50], 0.4)
    29.0
    ```
- The grader will evaluate your code by importing your functions and calling them with its own chosen list inputs. You do not need to worry about generating lists — these will be passed in as parameters.

---

## 0. Add to Your File

Open the `stats.py` file you created for P2 — you'll be adding to it, not starting a new file.

---

## 1. `median`

The **median** is the "middle" value of a sorted data set — the point where half the values fall below and half fall above.

- If the list has an **odd** number of values, the median is the single middle element.
- If the list has an **even** number of values, the median is the average of the two middle elements.

**Function signature:**
- **Name:** `median`
- **Arguments:** A `list`.
- **Returns:** A `float`, the median value.

**Example usage:**
```
>>> median([3, 1, 2])
2
>>> median([4, 1, 3, 2])
2.5
>>> median([9])
9
```

**Hint:** Use Python's built-in `sorted()` to get a sorted copy of the list. `sorted()` returns a *new* list and leaves the original unchanged, so you don't need to worry about modifying the caller's data.

```
data = [3, 1, 2]
sorted_data = sorted(data)   # sorted_data is [1, 2, 3]; data is still [3, 1, 2]
```

Once you have the sorted copy, use your `count` function to find its length and index into the middle.

You can assume the list passed to `median` will never be empty.

---

## 2. `percentile`

A **percentile** answers the question: *"What value is greater than X% of the data?"* For example, if you scored in the 90th percentile on a test, 90% of test-takers scored below you.

A call to `percentile(data, p)` computes the $p$-th percentile for a fractional value $p$ between 0 and 1. For example, `percentile(data, 0.3)` returns the value below which 30% of the data falls.

We use the standard interpolation formula. First, let's define our variables:

- $N$ — total number of values in the list
- $p$ — the percentile as a decimal between 0 and 1

**Step 1.** Compute the **rank** — the approximate position corresponding to fraction $p$:

$$\text{rank} = 1 + p \times (N - 1)$$

**Step 2.** Split the rank into its integer part $i$ and decimal part $d$:

$$\text{rank} = i + d$$

**Step 3.** The percentile is the weighted average of the values at positions $i$ and $i+1$ in the sorted data:

$$\text{percentile} = (1 - d) \times \text{data}[i] + d \times \text{data}[i+1]$$

> **Pitfall:** The formula uses indices starting at 1. Python lists start at 0 — adjust accordingly.

> **Pitfall:** When $p = 1.0$, the rank equals exactly $N$, which would access an out-of-bounds index. Handle this edge case explicitly.

**Worked example** — given `[15, 20, 35, 40, 50]`, find the 40th percentile ($p = 0.4$):

1. Sort: `[15, 20, 35, 40, 50]`
2. Rank: $1 + 0.4 \times 4 = 2.6$
3. Split: $i = 2$, $d = 0.6$
4. Result: $0.4 \times 20 + 0.6 \times 35 = 8 + 21 = \mathbf{29}$

**Example usage:**

```
>>> percentile([15, 20, 35, 40, 50], 0.4)
29.0
>>> percentile([15, 20, 35, 40, 50], 0.0)
15.0
>>> percentile([15, 20, 35, 40, 50], 1.0)
50.0
```

**Function signature:**
- **Name:** `percentile`
- **Arguments:** A `list` and a `float` `p` where $0 \leq p \leq 1$.
- **Returns:** The $p$-th percentile.

**Hint:** To split a float into integer and decimal parts:

```
rank = 2.6
i = int(rank)
d = rank - int(rank)
```

You can assume the list passed to `percentile` will never be empty.

---

## 3. `filter`

The `filter` function separates out the portion of a data set where some measured criterion has a particular target value.

For example, imagine you have temperature readings taken at different locations. `filter` lets you extract only the readings from location 1:

```
locations = [0, 1, 0, 1, 1, 2, 2, 0, 1]
temps     = [15.5, 23.1, 7.8, 19.2, 22.6, 4.6, 1.9, 14.3, 18.0]

temps_at_1 = filter(temps, locations, 1)
# temps_at_1 is [23.1, 19.2, 22.6, 18.0]
```

The function takes three arguments: `data`, `criteria`, and `target`. It returns a new list containing only the elements of `data` at positions where `criteria` equals `target`.

**Function signature:**
- **Name:** `filter`
- **Arguments:** A `list` called `data`, a `list` called `criteria`, and a `float` called `target`.
- **Returns:** A `list` containing only the elements of `data` where the corresponding element in `criteria` equals `target`.

**Example usage:**
```
>>> filter([10, 20, 30, 40], [1, 2, 1, 2], 1)
[10, 30]
>>> filter([10, 20, 30, 40], [1, 2, 1, 2], 2)
[20, 40]
>>> filter([10, 20, 30], [0, 0, 0], 1)
[]
```

**Hint:** Loop through both lists at the same time using an index. When `criteria[i] == target`, append `data[i]` to your result list.

You can assume `data` and `criteria` are always the same length.

> **Important:** `filter` is also a Python built-in. Just like with `sum`, `max`, and `min` in P2, your function will shadow it inside your file — and the built-in is off-limits anyway.

---

## Submit to Gradescope

Submit your updated `stats.py` file to the **E0** assignment in Gradescope. You can use any number of submits to pass all the test cases.
