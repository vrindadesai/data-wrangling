---
layout: page
title: "E3: String Cleaning"
---

# String Cleaning — E3

This assignment is optional. Much like "spring cleaning", data scientists invest a lot of time into "string cleaning". In this exercise, you'll write functions that clean up messy playlist data using Python's built-in **string methods**.

---

## Background: String Methods

A **string method** is a piece of behavior that "belongs to" every string value. You call one using **dot notation**: write the string (or a variable holding one), then a dot, then the method name and parentheses.

```
>>> "hello".upper()
'HELLO'
```

Here, `.upper()` is called *on* the string `"hello"`. The same works on a variable, since the variable just holds a string:

```
>>> greeting = "hello"
>>> greeting.upper()
'HELLO'
```

### 🚨 Note: Strings Don't Change

String methods return **brand new strings**, they never modify the originals. If you don't do something with the result (store it, return it, print it), it will be lost.

```
>>> greeting = "hello"
>>> greeting.upper()
'HELLO'
>>> greeting
'hello'          # unchanged!
>>> greeting = greeting.upper()
>>> greeting
'HELLO'          # only changes because we reassigned it
```

### Methods Tour

**`.strip()`** — removes whitespace (spaces, tabs, newlines) from the **start and end** of a string only. The middle is untouched.
```
>>> "  Bohemian Rhapsody \n".strip()
'Bohemian Rhapsody'
```

**`.lower()` / `.upper()` / `.title()`** — change casing. `.title()` capitalizes the first letter of every word.
```
>>> "BOHEMIAN RHAPSODY".lower()
'bohemian rhapsody'
>>> "bohemian rhapsody".title()
'Bohemian Rhapsody'
```

**`.replace(old, new)`** — returns a copy with every occurrence of `old` swapped for `new`. It's case-sensitive.
```
>>> "The Weeknd".replace(" ", "_")
'The_Weeknd'
```

**`.split(sep)`** — breaks a string into a **list** of pieces, cutting everywhere `sep` appears. The separator itself is thrown away.
```
>>> "Blinding Lights | The Weeknd | 2019".split(" | ")
['Blinding Lights', 'The Weeknd', '2019']
```

**`sep.join(list)`** — the reverse of `.split()`. Called **on the separator**, it glues a list of strings together.
```
>>> ", ".join(["Uptown Funk", "Levitating"])
'Uptown Funk, Levitating'
```

**`.startswith(x)` / `.endswith(x)`** — return `True`/`False` depending on whether the string begins or ends with `x`.
```
>>> "song.mp3".endswith(".mp3")
True
```

### Chaining Methods

Since every method hands back a new string, you can call another method directly on the result, left to right:

```
>>> "  BOHEMIAN RHAPSODY \n".strip().lower().title()
'Bohemian Rhapsody'
```

Read this as a pipeline: strip the whitespace, *then* lowercase what's left, *then* title-case the result of that. **Order can matter** — try to strip whitespace before you rely on `.lower()`/`.replace()` .

### f-Strings

Recall, **f-string** let you build a string by embedding Python expressions directly inside it, using curly braces `{}`. Write an `f` right before an opening quote.

```
>>> name = "Dua Lipa"
>>> f"Artist: {name}"
'Artist: Dua Lipa'
```

Anything inside `{}` is evaluated as a Python expression:

```
>>> titles = ["Uptown Funk", "Levitating"]
>>> f"{len(titles)} songs"
'2 songs'
>>> f"{', '.join(titles)}"
'Uptown Funk, Levitating'
```

---

## Assignment Outline

1. **`clean_title`**
2. **`make_slug`**
3. **`artist_from_track`**
4. **`format_playlist`**
5. **`is_mp3`**
6. **`format_track_summary`** *(optional)*

**General Notes:**

- To test your functions as you work, you have two options:
  - **In your program:** Add `print` calls at the bottom of `string_functions.py` and run the file from your `data_wrangling` folder:
    - **Mac:** `python3 -m exercises.string_functions`
    - **Windows:** `python -m exercises.string_functions`
    ```
    print(clean_title("  bohemian rhapsody \n"))   # should print Bohemian Rhapsody
    print(make_slug("The Weeknd"))                 # should print the_weeknd
    print(artist_from_track("Blinding Lights | The Weeknd | 2019"))  # should print The Weeknd
    ```
  - **In the REPL:** Open the VS Code terminal (from your `data_wrangling` folder), start Python with `python3` (Mac) or `python` (Windows), then import and call your functions interactively:
    ```
    from exercises.string_functions import clean_title, make_slug, artist_from_track
    >>> clean_title("  bohemian rhapsody \n")
    'Bohemian Rhapsody'
    >>> make_slug("The Weeknd")
    'the_weeknd'
    ```
- The grader will evaluate your code by importing your functions and calling them with its own chosen inputs. You do not need to worry about generating test data — this will be passed in as parameters.

---

## 0. Create Your File

In VS Code, make sure your `data_wrangling` folder is open in the Explorer sidebar.

Right-click on the `exercises` folder and select **New File**. Name it exactly:

```
string_functions.py
```

Copy the following starter code into your new file and save (`Command+S` on Mac, `Control+S` on Windows). The file now defines 6 function stubs — you will fill in all of these below.

```
def clean_title(raw):
    ...


def make_slug(name):
    ...


def artist_from_track(combined):
    ...


def format_playlist(titles):
    ...


def is_mp3(filename):
    ...


def format_track_summary(row):
    ...
```

---

## 1. `clean_title`

Given a raw song title that may have extra whitespace and inconsistent capitalization, `clean_title` returns a cleaned-up, title-cased version.

**Function signature:**
- **Name:** `clean_title`
- **Arguments:** A `str` called `raw`.
- **Returns:** A `str` with leading/trailing whitespace removed and every word capitalized.

**Example usage:**
```
>>> clean_title("  bohemian rhapsody \n")
'Bohemian Rhapsody'
>>> clean_title("BLINDING LIGHTS")
'Blinding Lights'
```

---

## 2. `make_slug`

Some systems can't handle spaces or mixed case in a name — for example, building a filename or a URL segment from an artist name. `make_slug` converts a human-readable name into a lowercase, underscore-separated slug.

**Function signature:**
- **Name:** `make_slug`
- **Arguments:** A `str` called `name`, possibly with leading/trailing whitespace.
- **Returns:** A `str`: lowercase, with every space replaced by an underscore, and no leading/trailing whitespace.

**Example usage:**
```
>>> make_slug("The Weeknd")
'the_weeknd'
>>> make_slug("  Dua Lipa ")
'dua_lipa'
```

---

## 3. `artist_from_track`

Some playlist exports combine everything about a track into a single line: `"Title | Artist | Year"`. `artist_from_track` pulls just the artist name back out.

**Function signature:**
- **Name:** `artist_from_track`
- **Arguments:** A `str` called `combined`, formatted as `"Title | Artist | Year"` (a space, a pipe `|`, and a space between each piece).
- **Returns:** A `str`, just the artist name (the middle piece).

**Example usage:**
```
>>> artist_from_track("Blinding Lights | The Weeknd | 2019")
'The Weeknd'
>>> artist_from_track("Levitating | Dua Lipa | 2020")
'Dua Lipa'
```

---

## 4. `format_playlist`

Given a list of song titles, `format_playlist` builds a single readable summary string with a count up front.

**Function signature:**
- **Name:** `format_playlist`
- **Arguments:** A `list` of `str` called `titles`.
- **Returns:** A `str` in the form `"{count} songs: {titles joined by commas}"`.

**Example usage:**
```
>>> format_playlist(["Uptown Funk", "Levitating", "Blinding Lights"])
'3 songs: Uptown Funk, Levitating, Blinding Lights'
>>> format_playlist(["Imagine"])
'1 songs: Imagine'
>>> format_playlist([])
'0 songs: '
```

**Hint:** Don't worry about grammar (i.e. "1 songs" vs. "1 song"). The autograder will not check for this.

---

## 5. `is_mp3`

Given a filename, `is_mp3` checks whether it's an MP3 file — but people aren't consistent about capitalizing file extensions, so the check needs to ignore case.

**Function signature:**
- **Name:** `is_mp3`
- **Arguments:** A `str` called `filename`.
- **Returns:** A `bool` — `True` if `filename` ends with `.mp3` (in any combination of upper/lower case), `False` otherwise.

**Example usage:**
```
>>> is_mp3("song.mp3")
True
>>> is_mp3("Song.MP3")
True
>>> is_mp3("song.wav")
False
```

---

## Challenge: `format_track_summary`

This one is optional. Given a single messy row from a playlist (like you'd get back from `csv.DictReader`), `format_track_summary` builds a clean, human-readable summary line — combining everything from this exercise with a couple of tools from past lessons.

**Function signature:**
- **Name:** `format_track_summary`
- **Arguments:** A `dict` called `row` with string keys `'Title'` (possibly messy), `'Artist'` (a clean `str`), and `'Plays'` (a numeric `str`).
- **Returns:** A `str` in the form `"{TITLE in caps} by {Artist} — {plays with comma separators} plays"`.

**Example usage:**
```
>>> format_track_summary({"Title": "  levitating\n", "Artist": "Dua Lipa", "Plays": "1245000000"})
'LEVITATING by Dua Lipa — 1,245,000,000 plays'
```

---

## Submit to Gradescope

Submit your `string_functions.py` file to the **E3** assignment in Gradescope. You can use any number of submits to pass all the test cases. `format_track_summary` is extra work — it's not required to complete the assignment.
