# Text Classifier — P3

In this project you will build a program that reads labeled text examples, learns which words tend to appear in each category, and predicts labels for new examples it has never seen — a technique used every day in spam filters, sentiment analyzers, and content moderation systems.

---

## Background

### What Is Machine Learning?

Normally when we write a program, we spell out every rule explicitly. But some problems are too complicated for hand-written rules. Instead of telling the computer *how* to decide, we show it thousands of examples and let it figure out the pattern. That's machine learning.

Your classifier is a specific type called a **Naive Bayes Classifier**. It learns which words tend to appear in each category, then uses that knowledge to make predictions.

### The Bag of Words Model

Your classifier treats each piece of text as a **bag of words** — it only cares *which* words appear, not their order or how many times they repeat. The two sentences below look different, but your classifier treats them as identical:

> "the cat sat on the mat"
> "sat mat the on cat the mat"

Both contain the same set of unique words: `{the, cat, sat, on, mat}`.

### How the Classifier Learns

Before your classifier can predict anything, it needs to be **trained**. During training, it reads labeled examples and counts:

- The total number of training examples.
- How many examples belong to each label (e.g., how many are "positive" vs. "negative").
- For each label, which words appeared in examples with that label, and how often.

These counts become the classifier's "memory" — everything it needs to make future predictions.

### Making a Prediction

To predict the label of a new piece of text, the classifier calculates a **score** for every possible label and picks the highest one. First, let's name the counts we'll use:

- $N$ — total number of training examples
- $N_C$ — number of training examples with label $C$
- $N_w$ — number of training examples that contain word $w$
- $N_{C,w}$ — number of training examples with label $C$ that contain word $w$

**1. How common is this label?**

If 80% of your training examples are labeled "sports," then "sports" starts with a natural advantage. We call this the **log-prior**:

$$\ln P(C) = \ln \frac{N_C}{N}$$

**2. How well do the words fit this label?**

For each word in the new text, we ask: how often does this word appear in examples with this label? We call this the **log-likelihood**:

$$\ln P(w \mid C) = \ln \frac{N_{C,w}}{N_C}$$

**Handling unseen words:**

Sometimes a word in the test data never appeared in training. Dividing by zero — or taking the log of zero — would crash our program. We handle this with two fallback rules:

- If $w$ appeared in training but *not* for label $C$ (i.e. $N_{C,w} = 0$ but $N_w > 0$):

$$\ln P(w \mid C) = \ln \frac{N_w}{N}$$

- If $w$ never appeared in training at all (i.e. $N_w = 0$):

$$\ln P(w \mid C) = \ln \frac{1}{N}$$

**The total score** for label $C$ given a piece of text is:

$$\ln P(C \mid \text{text}) \approx \ln P(C) + \sum_{w \in \text{text}} \ln P(w \mid C)$$

Remember: only count each unique word once (the bag of words model). The classifier predicts whichever label has the highest score. If two labels tie, pick the one that comes first alphabetically.

> **Why logarithms?** Multiplying many small probabilities together produces numbers so tiny that computers lose precision. Taking the log turns multiplication into addition, which is much more stable.

---

## Your Dataset

You will provide your own dataset as a CSV file. Your file must have at least these two columns:

| Column | Description |
|--------|-------------|
| `label` | The category for this example (e.g., `"positive"`, `"sports"`, `"spam"`) |
| `content` | The text of the example (lowercase, no punctuation) |

Your file may have other columns — your program should ignore everything except `label` and `content`.

**Requirements:**
- At least **2 distinct labels**.
- At least **20 examples per label** in your training file.
- Text should be lowercase with no punctuation (clean it up beforehand if needed).

Some ideas: movie reviews (positive/negative), news headlines (sports/politics/tech), song lyrics by genre, or product reviews by rating.

**Example rows:**

```
label,content
positive,this movie was absolutely wonderful and i loved every minute
negative,boring and predictable i fell asleep halfway through
positive,great performances and a compelling story highly recommend
negative,terrible script and the acting was painful to watch
```

Split your dataset into two files:
- `train.csv` — used to train the classifier (~80% of your data)
- `test.csv` — used to test its predictions (~20% of your data)

---

## Assignment Outline

1. **`train`**
2. **`log_prior`**
3. **`log_likelihood`**
4. **`score`**
5. **`predict`**
6. **`evaluate`**

**General Notes:**

- To test your program as you work, run it from your `data_wrangling` folder:
  - **Mac:** `python3 -m projects.classifier train.csv test.csv`
  - **Windows:** `python -m projects.classifier train.csv test.csv`
- The grader imports your functions and calls them directly. Make sure each function matches the signature shown below.

---

## 0. Get Started

Download `classifier.py` from the assignment page and place it in your `projects` folder inside `data_wrangling`. Open it in VS Code — it already contains the imports, four global variables, and two helper functions you'll need.

**Global variables:** The starter file declares these four variables at the top level so every function can access them without needing to pass them around:

```python
n = 0
labels = set()
label_counts = {}
word_counts = {}
label_word_counts = {}
```

`train()` fills them in when it runs. Every other function reads from them directly — you never pass them as arguments.

**Starter helpers:** Do not change these — use them in your implementations:

**Starter helpers:** Do not change these — use them in your implementations:

```python
def read_csv(filename):
    """Read a CSV file and return a list of dictionaries, one per row.

    Each dictionary maps column names to values. For example, a movie
    review CSV would produce rows like:
        [
            {'label': 'positive', 'content': 'this movie was absolutely wonderful'},
            {'label': 'negative', 'content': 'boring and predictable i fell asleep'},
            ...
        ]
    Access values with row['label'] and row['content'].
    """
    rows = []
    with open(filename, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def unique_words(text):
    """Return a set of unique words from a string."""
    words = set()
    for word in text.split():
        words.add(word)
    return words
```

`unique_words` returns the set of distinct words in a string, which is exactly what the bag of words model requires.

---

## 1. `train`

The starter code reads the CSV with `read_csv` and then calls your four helper functions, each of which directly updates the global variables. All you need to do is implement the four helpers below.

---

**`find_labels(rows)`**

This function collects every label seen in the training data into the global `labels` set. It takes `rows` and returns nothing — it mutates `labels` directly.

Here is exactly how to write it:

1. Write **one loop** over `rows`.
2. Inside the loop, get the label: `label = row['label']`.
3. Add it to the global set: `labels.add(label)`. Sets ignore duplicates automatically, so you don't need to check if it's already there.

---

**`count_labels(rows)`**

This function counts how many training examples belong to each label. It takes `rows` and returns nothing — it mutates the global `label_counts` directly.

Here is exactly how to write it:

1. Write **one loop** over `rows`. Each iteration gives you one row — a dictionary representing one training example.
2. Inside the loop, get the label for that row: `label = row['label']`.
3. Increment the count for that label directly in the global: `label_counts[label] = label_counts.get(label, 0) + 1`.

After `train` runs, `label_counts` will look like `{'positive': 80, 'negative': 76}`.

---

**`count_words(rows)`**

This function counts how many training examples contain each word across the whole dataset. It takes `rows` and returns nothing — it mutates the global `word_counts` directly.

Here is exactly how to write it:

1. Write **two nested loops**. The outer loop is over `rows` — one iteration per training example.
2. Inside the outer loop, get the set of unique words in that example: `words = unique_words(row['content'])`. This gives you a set of words with no duplicates, so each word in a single example is counted at most once.
3. The inner loop is over `words` — one iteration per unique word in that example.
4. Inside the inner loop, increment the count directly in the global: `word_counts[word] = word_counts.get(word, 0) + 1`.

After `train` runs, `word_counts` will look like `{'wonderful': 12, 'boring': 8, 'the': 94, ...}`.

---

**`count_label_words(rows)`**

This function counts how many examples with each label contain each word. It takes `rows` and returns nothing — it mutates the global `label_word_counts` directly. `label_word_counts` is a nested dictionary: the outer key is a label, the inner key is a word, and the value is a count.

Here is exactly how to write it:

1. Write **two nested loops**. The outer loop is over `rows`.
2. Inside the outer loop, get the label (`label = row['label']`) and the set of unique words (`words = unique_words(row['content'])`).
3. Before the inner loop, make sure the inner dict exists: `if label not in label_word_counts: label_word_counts[label] = {}`.
4. The inner loop is over `words`.
5. Inside the inner loop, increment: `label_word_counts[label][word] = label_word_counts[label].get(word, 0) + 1`.

After `train` runs, `label_word_counts` will look like `{'positive': {'wonderful': 11, 'the': 48, ...}, 'negative': {'boring': 7, ...}}`.

---

## 2. `log_prior`

Return the log-prior for a given label: how common that label is in the training data.

**Function signature:**

- **Name:** `log_prior`
- **Arguments:** `label`.
- **Returns:** $\ln P(C) = \ln \dfrac{N_C}{N}$, as a float.

**Example call:**

```python
lp = log_prior("positive")
```

Here is exactly how to write it:

1. Look up the count for this label: `label_counts[label]` gives you $N_C$ — how many training examples have this label.
2. `n` is $N$ — the total number of training examples.
3. Both `label_counts` and `n` are global variables, so you can use them directly without passing them in.
4. Divide and take the log: `return math.log(label_counts[label] / n)`.

This is a one-liner once you know what the variables mean.

---

## 3. `log_likelihood`

Return $\ln P(w \mid C)$ for a single word and label. This measures how strongly that word is associated with that label, and uses three cases to handle words that might be missing from the training data.

**Function signature:**

- **Name:** `log_likelihood`
- **Arguments:** `word`, `label`.
- **Returns:** The log-likelihood as a float.

**Example call:**

```python
ll = log_likelihood("wonderful", "positive")
```

Here is exactly how to write it:

1. Look up the three counts you'll need from the global variables:
   - $N_{C,w}$: how many examples with `label` contain `word`. Use `label_word_counts.get(label, {}).get(word, 0)` — this safely returns `0` if the label or word isn't in the dictionary.
   - $N_w$: how many examples (any label) contain `word`. Use `word_counts.get(word, 0)`.
   - $N_C$: how many examples have this label. Use `label_counts[label]`.
2. Now write an `if / elif / else` chain to pick the right formula:
   - **If** $N_{C,w} > 0$: return `math.log(n_cw / n_c)`
   - **Elif** $N_w > 0$: return `math.log(n_w / n)`
   - **Else**: return `math.log(1 / n)`

> **Important:** Never pass `0` to `math.log()` — it will crash. Every case above guarantees a positive numerator, so as long as you check in order you're safe.

---

## 4. `score`

Return the total log-probability score for a piece of text given a label. This is the number the classifier uses to decide which label wins.

$$\ln P(C \mid \text{text}) \approx \ln P(C) + \sum_{w \in \text{text}} \ln P(w \mid C)$$

**Function signature:**

- **Name:** `score`
- **Arguments:** `text`, `label`.
- **Returns:** The log-probability score as a float.

**Example call:**

```python
s = score("this movie was wonderful", "positive")
```

Here is exactly how to write it:

1. Start the running total with the log-prior: `total = log_prior(label)`.
2. Write **one loop** over `unique_words(text)`. Each iteration gives you one unique word from the text.
3. Inside the loop, add the log-likelihood for that word to the total: `total += log_likelihood(word, label)`.
4. After the loop, return `total`.

---

## 5. `predict`

Return the predicted label for a piece of text by computing the score for every possible label and returning the one with the highest score.

**Function signature:**

- **Name:** `predict`
- **Arguments:** `text`.
- **Returns:** The predicted label as a string. Break ties alphabetically.

**Example call:**

```python
predicted = predict("this movie was wonderful")
# predicted == "positive"
```

Here is exactly how to write it:

1. Get the sorted list of labels: `sorted_labels = sorted(labels)`. `labels` is the global set populated by `find_labels` — calling `sorted()` on it gives you a list in alphabetical order.
2. Before the loop, initialize two variables to track the best answer so far. Set `best_label` to `sorted_labels[0]` and `best_score` to `score(text, sorted_labels[0])`.
3. Write **one loop** over `sorted_labels[1:]` (skip the first one, you already scored it).
4. Inside the loop, compute the score for the current label: `s = score(text, label)`. Use a different variable name like `s` — not `score`, which would shadow the function.
5. If `s` is strictly greater than `best_score`, update both `best_label` and `best_score`.
6. After the loop, return `best_label`.

Because you sorted the labels alphabetically and only update on *strictly greater*, the first label alphabetically wins any tie.

---

## 6. `evaluate`

Read the test CSV file, run `predict()` on each example, and print the results.

**Function signature:**

- **Name:** `evaluate`
- **Arguments:** `test_filename`.
- **Returns:** Nothing. Prints results to the terminal.

Here is exactly how to write it:

1. Read the test file: `rows = read_csv(test_filename)`.
2. Create a counter before the loop: `correct = 0`.
3. Write **one loop** over `rows`. Each iteration gives you one test example.
4. Inside the loop:
   - Get the correct label: `correct_label = row['label']`.
   - Get the text: `text = row['content']`.
   - Predict the label: `predicted = predict(text)`.
   - Get the score for the predicted label: `s = score(text, predicted)`.
   - Print the result line: `print(f"correct = {correct_label}, predicted = {predicted}, score = {s:.1f}")`.
   - Print the content on the next line with two spaces of indentation: `print(f"  content = {text}")`.
   - If `predicted == correct_label`, increment `correct`.
   - Print a blank line after each example: `print()`.
5. After the loop, print the performance: `print(f"performance: {correct} / {len(rows)} correct")`.

**Example output:**

```
correct = positive, predicted = positive, score = -14.2
  content = this movie was absolutely wonderful

correct = negative, predicted = positive, score = -15.8
  content = boring and predictable i fell asleep

performance: 1 / 2 correct
```

---

## Running Your Program

The starter code already includes a `main()` function with the argument handling and the call to `train`. Your job is to fill in the training summary print block:

```python
def main():
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python classifier.py TRAIN_FILE [TEST_FILE]")
        sys.exit(1)

    train_file = sys.argv[1]
    train(train_file)

    # TODO: print training summary (see Output Format below)

    if len(sys.argv) == 3:
        test_file = sys.argv[2]
        print("test data:")
        evaluate(test_file)

if __name__ == "__main__":
    main()
```

---

## Output Format

Round all scores to one decimal place using `f"{value:.1f}"`.

**Always print (training summary):**

```
trained on N examples
vocabulary size = V

classes:
  label1, N examples, log-prior = X.X
  label2, N examples, log-prior = X.X
  ...
```

- `N` is the global `n` — the total number of training examples.
- `V` (vocabulary size) is the number of unique words seen across all training examples — that's `len(word_counts)`.
- For the classes block, loop over `sorted(labels)` and print one line per label. `label_counts[label]` gives the example count and `log_prior(label)` gives the log-prior.

**Only print if a test file was given:**

```
test data:
  correct = ..., predicted = ..., score = X.X
  content = ...

performance: K / N correct
```

---

## Tips

**Dictionaries are your main data structure.** Most of what you need to store maps one thing to another (label → count, word → count). Nested dictionaries work well for label-word pairs: `counts[label][word]`.

**`dict.get(key, default)` is your friend.** It returns the value for `key` if it exists, otherwise `default`. This lets you safely look up counts without crashing when a key is missing.

**Log of zero will crash your program.** Never pass `0` to `math.log()`. The three-case fallback in `log_likelihood` is designed so you never have to — make sure you check the cases in order.

**Sort labels alphabetically when printing.** Use Python's built-in `sorted()` function on `label_counts.keys()`.

**Test with a tiny dataset first.** Make a CSV with 6–8 rows by hand so you can verify your counts and scores manually before running on real data.

---

## Submit to Gradescope

Submit `classifier.py`, `train.csv`, and `test.csv` to the **P3 - Text Classifier** assignment on Gradescope. Include a short paragraph (3–5 sentences) as a comment at the top of `classifier.py` describing your dataset: what it contains, where you got it, and what labels it uses.
