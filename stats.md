---
layout: page
title: "P2: Statistics Library"
mathjax: true
---

# Statistics Library — P2

In this project, you will get some practice using lists and loops. You will be writing functions for a statistics library to gain familiarity with the tools that data scientists use every day.

You are reproducing well-known functions for analysis and in the future you can and should use Python's built-in libraries (like `statistics` or `numpy`) instead. Your function implementations may only make use of the built-in `len` function, and a list object's `append` and `pop` methods.

Specifically **off-limits** in this project are the following. Making use of any of the following will result in no credit for the function you use them in:

- Cannot use built-in functions besides `len` — specifically not `sum`, `min`, and `max`, or anything from the `statistics` or `math` libraries
- Cannot use the `in` operator of Python
- Cannot use the list class's `+` or `==` operators nor built-in methods beyond `append` and `pop`

> **Note:** You *can* use `+`, `-`, `*`, `/`, `**`, and `==` for individual numeric elements — just not entire lists.

---

## Assignment Outline

1. **`count`** – 10 Points Autograded
2. **`sum`** – 10 Points Autograded
3. **`mean`** – 15 Points Autograded
4. **`max`** – 15 Points Autograded
5. **`min`** – 15 Points Autograded
6. **`stdev`** – 15 Points Autograded

**General Notes:**

- To test your functions as you work, you have two options:
  - **In your program:** Add `print` calls at the bottom of `stats.py` and run the file from your `data_wrangling` folder:
    - **Mac:** `python3 -m projects.stats`
    - **Windows:** `python -m projects.stats`
    ```
    print(count([10, 20, 30]))    # should print 3
    print(mean([1, 2, 3, 4, 5])) # should print 3.0
    ```
  - **In the REPL:** Open the VS Code terminal (from your `data_wrangling` folder), start Python with `python3` (Mac) or `python` (Windows), then import and call your functions interactively:
    ```
    from projects.stats import count, mean
    >>> count([10, 20, 30])
    3
    >>> mean([1, 2, 3, 4, 5])
    3.0
    ```
- The grader will evaluate your code by importing your functions and calling them with its own chosen list inputs. You do not need to worry about generating lists — these will be passed in as parameters.

---

## 0. Create Your File

In VS Code, make sure your `data_wrangling` folder is open in the Explorer sidebar.

Right-click on the `projects` folder and select **New File**. Name it exactly:

```
stats.py
```

Copy the following starter code into your new file and save (`Command+S` on Mac, `Control+S` on Windows). The file now defines 6 function stubs – you will eventually fill in all of these. Each function takes a single parameter called `data`, which is a list of numbers.

```
def count(data):
    ...


def sum(data):
    ...


def mean(data):
    ...


def max(data):
    ...


def min(data):
    ...


def stdev(data):
    ...
```

---

## 1. `count` — 10 pts

The `count` function returns the number of values in a data set.

This may seem trivial — and it is! But building it as an explicit function matters because everything else will call it. It also reinforces that we're building a self-contained library from scratch.

**Function signature:**
- **Name:** `count`
- **Arguments:** A `list`.
- **Returns:** An `int`, the number of elements.

**Example usage:**
```
>>> count([10, 20, 30])
3
>>> count([])
0
```

**Hint:** You are allowed to use `len` here. But what if you *didn't* use `len` — how would you count elements with a loop? Try it both ways!

---

## 2. `sum` — 10 pts

The `sum` function computes the total of all values in a data set.

**Function signature:**
- **Name:** `sum`
- **Arguments:** A `list`.
- **Returns:** The sum of all values. Returns `0` if the list is empty.

**Example usage:**
```
>>> sum([1, 2, 3, 4])
10
>>> sum([10.5, 20.5])
31.0
>>> sum([])
0
```

**Hint:** Start a running total at `0` and loop through the list, adding each element.

> **Important:** Python has a built-in function also called `sum`. Your function will *shadow* it inside your file, which is fine and intentional — but keep in mind the built-in `sum` is off-limits anyway.

---

## 3. `mean` — 10 pts

The **mean** (arithmetic average) of a list of numbers is the sum divided by the count.

For a list of values $x_1, x_2, \ldots, x_n$, the mean $\bar{x}$ is:

$$\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}$$

**Function signature:**
- **Name:** `mean`
- **Arguments:** A `list`.
- **Returns:** The arithmetic mean.

**Example usage:**
```
>>> mean([1, 2, 3, 4, 5])
3.0
>>> mean([10, 20, 30])
20
```

**Hint:** Call your `count` and `sum` functions as helpers — don't recompute them from scratch! You can assume the list passed to `mean` will never be empty.

---

## 4. `max` — 15 pts

The `max` function returns the largest value in a data set. You can assume the list passed to `max` will never be empty.

**Function signature:**
- **Name:** `max`
- **Arguments:** A `list`.
- **Returns:** The maximum value.

**Example usage:**
```
>>> max([3, 1, 4, 1, 5, 9])
9
```

**Hint:** Start by assuming the first element is the current max, then loop through the rest of the list updating your answer whenever you find something larger.

> **Important:** Python has a built-in function also named `max`. Just like with `sum`, your function will shadow it inside your file — and the built-in is off-limits anyway.

---

## 5. `min` — 15 pts

The `min` function returns the smallest value in a data set. You can assume the list passed to `min` will never be empty.

**Function signature:**
- **Name:** `min`
- **Arguments:** A `list`.
- **Returns:** The minimum value.

**Example usage:**
```
>>> min([3, 1, 4, 1, 5, 9])
1
```

**Hint:** Start by assuming the first element is the current min, then loop through the rest of the list updating your answer whenever you find something smaller.

> **Important:** Python has a built-in function also named `min`. Just like with `sum` and `max`, your function will shadow it inside your file — and the built-in is off-limits anyway.

---

## 6. `stdev` — 15 pts

The **standard deviation** measures how spread out the values in a data set are. A small standard deviation means the values are clustered close to the mean; a large one means they are spread out.

We use the **corrected sample standard deviation**, defined as:

$$s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n - 1}}$$

In plain English: find how far each value is from the mean, square each distance, add them all up, divide by $n - 1$, then take the square root.

> **Why $n - 1$ instead of $n$?** When working with a *sample* drawn from a larger population, dividing by $n - 1$ produces a better estimate of the true spread. This is called the *corrected sample standard deviation*.

**Breaking it down:** The formula looks intimidating, but it's just a sequence of steps you already know how to do:

1. Compute the mean of the list — call your `mean` function and store the result.
2. For each value in the list, find how far it is from the mean and square that distance: `(value - m) ** 2`.
3. Add all those squared distances together — use a running total, exactly like in your `sum` function.
4. Divide the total by `n - 1`, where `n` is the count of elements.
5. Take the square root of the result with `** 0.5`.

**Worked example** with `[2, 4, 6]` (mean = 4.0):

| Value | Distance from mean | Squared |
|-------|--------------------|---------|
| 2 | 2 − 4 = −2 | (−2)² = 4 |
| 4 | 4 − 4 = 0 | 0² = 0 |
| 6 | 6 − 4 = 2 | 2² = 4 |

Sum of squares: 4 + 0 + 4 = **8**  
Divide by n − 1 = 2: 8 / 2 = **4.0**  
Square root: 4.0 ** 0.5 = **2.0**

**Function signature:**
- **Name:** `stdev`
- **Arguments:** A `list`.
- **Returns:** The corrected sample standard deviation.

**Example usage:**
```
>>> stdev([2, 4, 4, 4, 5, 5, 7, 9])
2.138089935325853
>>> stdev([600, 470, 170, 430, 300])
164.7118...
```

You do **not** need to implement square root from scratch. You may use `** 0.5` (Python's exponentiation operator):

```
result = some_number ** 0.5
```

> **Pitfall:** Make sure your code does floating-point division, not integer division.
> ```
> x = 1 / 4    # float division: x is 0.25  ✓
> x = 1 // 4   # integer division: x is 0   ✗
> ```

**Hint:** Start by calling `mean(data)` and storing the result in a variable. Then loop through `data` once, accumulating a running total of squared differences — it's the same pattern as your `sum` function, but what you add each iteration is `(value - m) ** 2`. Once you have that total, the last two steps (divide by `count(data) - 1`, then `** 0.5`) are a single expression. You can assume the list will have at least 2 elements.

---

## Submit to Gradescope

Submit your `stats.py` file to the P2 assignment in Gradescope. You can use any number of submits to pass all the test cases.
