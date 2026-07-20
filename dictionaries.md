---
layout: page
title: "E1: Dictionaries"
---

# Dictionaries — E1

In this exercise you will get some practice writing functions that work with dictionaries — storing, counting, and rearranging data by key instead of by position.

---

## Assignment Outline

1. **`total`**
2. **`contains`**
3. **`invert`**
4. **`count`**
5. **`favorite_color`** *(optional)*

**General Notes:**

- To test your functions as you work, you have two options:
  - **In your program:** Add `print` calls at the bottom of `dictionary.py` and run the file from your `data_wrangling` folder:
    - **Mac:** `python3 -m exercises.dictionary`
    - **Windows:** `python -m exercises.dictionary`
    ```
    print(total({"apple": 2, "banana": 3}))      # should print 5
    print(invert({"a": "z", "b": "y"}))          # should print {'z': 'a', 'y': 'b'}
    print(count(["a", "b", "a", "c", "b", "a"])) # should print {'a': 3, 'b': 2, 'c': 1}
    ```
  - **In the REPL:** Open the VS Code terminal (from your `data_wrangling` folder), start Python with `python3` (Mac) or `python` (Windows), then import and call your functions interactively:
    ```
    from projects.dictionary import total, contains, invert, count, favorite_color
    >>> total({"apple": 2, "banana": 3})
    5
    >>> invert({"a": "z", "b": "y"})
    {'z': 'a', 'y': 'b'}
    >>> count(["a", "b", "a", "c", "b", "a"])
    {'a': 3, 'b': 2, 'c': 1}
    ```
- The grader will evaluate your code by importing your functions and calling them with its own chosen inputs. You do not need to worry about generating test data — this will be passed in as parameters.

---

## 0. Create Your File

In VS Code, make sure your `data_wrangling` folder is open in the Explorer sidebar.

Right-click on the `exercises` folder and select **New File**. Name it exactly:

```
dictionary.py
```

Copy the following starter code into your new file and save (`Command+S` on Mac, `Control+S` on Windows). The file now defines 5 function stubs — you will fill in all of these below.

```
def total(prices):
    ...


def contains(d, target):
    ...


def invert(d):
    ...


def count(data):
    ...


def favorite_color(colors):
    ...
```

---

## 1. `total`

Given a dictionary mapping items to numbers, `total` adds up and returns the sum of all the values. 

**Function signature:**
- **Name:** `total`
- **Arguments:** A `dict`.
- **Returns:** A `float`, the sum of all the values in the dictionary.

**Example usage:**
```
>>> total({"apple": 2, "banana": 3})
5
>>> total({"rent": 1200.0, "groceries": 300.5})
1500.5
>>> total({})
0
```

---

## 2. `contains`

Given a dictionary and a target, `contains` returns whether that target appears anywhere in the dictionary — either as a key or as a value.

**Function signature:**
- **Name:** `contains`
- **Arguments:** A `dict` called `d`, and a `str` called `target`.
- **Returns:** A `bool` — `True` if `target` is one of the keys in `d` or one of the values in `d`, `False` otherwise.

**Example usage:**
```
>>> contains({"🍎": "fruit", "🥕": "vegetable"}, "vegetable")
True
>>> contains({"🍎": "fruit", "🥕": "vegetable"}, "🥕")
True
>>> contains({"🍎": "fruit"}, "vegetable")
False
>>> contains({}, "fruit")
False

```

---

## 3. `invert`

Given a dictionary, `invert` returns a new dictionary that swaps every key and value — the keys of the input become the values of the output, and vice versa.

Keys in a dictionary must be unique. If the same value appears more than once in the input (which would create a duplicate key in the output), raise a `KeyError`.

**Function signature:**
- **Name:** `invert`
- **Arguments:** A `dict`.
- **Returns:** A `dict` with keys and values swapped.

**Example usage:**
```
>>> invert({'a': 'z', 'b': 'y', 'c': 'x'})
{'z': 'a', 'y': 'b', 'x': 'c'}
>>> invert({'apple': 'cat'})
{'cat': 'apple'}
>>> invert({'🏈': 'football', '⚽️': 'football'})
KeyError
```

**Hint:** The syntax for raising a `KeyError` is:
```
raise KeyError("error message of your choice here!")
```

Loop through the input dictionary's items. Before adding a new entry to your result, check whether that value is already a key in your result — if it is, you've found a duplicate and should raise the error.

---

## 4. `count`

Given a `list`, `count` returns a `dict` where each key is a unique value from the list and each value is the number of times that value appeared in the list.

**Function signature:**
- **Name:** `count`
- **Arguments:** A `list`.
- **Returns:** A `dict` mapping each item to the number of times it appeared.

**Example usage:**
```
>>> count(["a", "b", "a", "c", "b", "a"])
{'a': 3, 'b': 2, 'c': 1}
>>> count(["red"])
{'red': 1}
>>> count([])
{}
```

**Implementation strategy:**

1. Start with an empty dictionary to hold your result.
2. Loop through each item in the input list.
3. Check whether that item is already a key in your dictionary: `if item in result:`.
4. If it is, increase its associated value by 1.
5. If it isn't, add it as a new key with a value of 1.
6. Return the resulting dictionary.

---

## Challenge: `favorite_color`

This one is optional. Given a dictionary mapping names to favorite colors, `favorite_color` returns the color that appears most frequently. If there is a tie, return whichever color appeared first among the input dictionary's values.

**Function signature:**
- **Name:** `favorite_color`
- **Arguments:** A `dict` of names to favorite colors.
- **Returns:** A `str`, the most common color.

**Example usage:**
```
>>> favorite_color({"Abby": "yellow", "Foster": "blue", "Yash": "blue"})
blue
```

You can assume the input dictionary is never empty.

---

## Submit to Gradescope

Submit your `dictionary.py` file to the **E1** assignment in Gradescope. You can use any number of submits to pass all the test cases. `favorite_color` is extra work — it's not required to complete the assignment.
