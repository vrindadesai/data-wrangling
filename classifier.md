---
layout: page
title: "P3: Text Classifier"
mathjax: true
---

# Text Classifier — P3

In this project you will build a program that reads labeled text examples, learns which words tend to appear in each category, and predicts labels for new examples it has never seen.

---

## Background

### What is Machine Learning?

Normally when we write a program, we spell out every rule explicitly. But some problems are too complicated for hand-written rules. Instead of telling the computer *how* to decide, we show it thousands of examples and let it figure out the pattern. That's machine learning!

Your classifier is a specific type of ML model called a **Naive Bayes Classifier**. It learns which words tend to appear in each category, then uses that knowledge to make predictions.

### The Bag of Words Model

Your classifier will treat each piece of text as a **bag of words** which means we only care about *which* words appear, not their order or how many times they repeat. The two sentences below look different, but your classifier will treat them as identical:

> "the cat sat on the mat"
>
> "sat mat the on cat the mat"

Both contain the same set of unique words: `{the, cat, sat, on, mat}`.

### How does the classifier learn?

Before your classifier can predict anything, it needs to be **trained**. During training, it reads labeled examples and counts:

- The total number of training examples.
- How many examples belong to each label (e.g., how many are "positive" vs. "negative").
- For each label, which words appeared in examples with that label, and how often.

These counts will be used to make future predictions.

### Making a Prediction

To predict the label of a new piece of text, the classifier calculates a **score** for every possible label and picks the highest one. First, let's name the counts we'll use:

- $N$: total number of training examples
- $N_C$: number of training examples with label $C$
- $N_w$: number of training examples that contain word $w$
- $N_{C,w}$: number of training examples with label $C$ that contain word $w$

**1. How common is this label?**

If 80% of your training examples are labeled "negative", then "negative" starts with a natural advantage. We call this the **log-prior**:

$$\ln P(C) = \ln \frac{N_C}{N}$$

**2. How well do the words fit this label?**

For each word in the new text, we ask: how often does this word appear in examples with this label? We call this the **log-likelihood**:

$$\ln P(w \mid C) = \ln \frac{N_{C,w}}{N_C}$$

**Handling unseen words:**

Sometimes a word in the test data never appeared in training. Dividing by zero (or taking the log of zero) would crash our program. There are two fallback rules:

- If $w$ appeared in training but *not* for label $C$ (i.e. $N_{C,w} = 0$ but $N_w > 0$):

$$\ln P(w \mid C) = \ln \frac{N_w}{N}$$

- If $w$ never appeared in training at all (i.e. $N_w = 0$):

$$\ln P(w \mid C) = \ln \frac{1}{N}$$

**The total score** for label $C$ given a piece of text is:

$$\ln P(C \mid \text{text}) \approx \ln P(C) + \sum_{w \in \text{text}} \ln P(w \mid C)$$

The classifier predicts whichever label has the highest score. If two labels tie, pick the one that comes first alphabetically.

> **Why logarithms?** Without logarithms, this formula would entail multiplication (i.e. multiplying probabilities). However, multiplying many small probabilities together would produce numbers that are really tiny! So instead, we use logarithms and add up our log-prior and log-likelihoods.

---

## Dataset Selection

Pick one of the datasets posted on **Canvas (Files)**, download it, and place it inside your `data` folder. Download the folder that the dataset lives in. For example, if you downloaded the dataset of movie reviews, you would end up with a `data/movies/train.csv` and `data/movies/test.csv` in your workspace. 

See [Dataset Descriptions](data_descriptions.html) for what each one contains and what labels it uses.

In addition to your main dataset, there is a `mini` dataset that is based on the example we saw in class. Download that dataset too so you have a `data/mini/train.csv` and `data/mini/test.csv`.

Each dataset contains the following columns if not more:

| Column | Description |
|--------|-------------|
| `label` | The category for this example (e.g., `"positive"`, `"banned"`, `"disaster"`) |
| `content` | The text of the example which is lowercase and with no punctuation |

**Example rows** from the movies dataset:

```
label,content
positive,this movie was absolutely wonderful and i loved every minute
negative,boring and predictable i fell asleep halfway through
positive,great performances and a compelling story highly recommend
negative,terrible script and the acting was painful to watch
```

Each dataset contains the following files:

- `train.csv` — used to train the classifier
- `test.csv` — used to test its predictions

Once a dataset is downloaded, tell `classifier.py` which one to use by setting the `dataset` variable in `main()` to the folder's name. For example, `dataset = "movies"` reads from `data/movies/train.csv` and `data/movies/test.csv`. See **Running Your Program** below.

---

## Assignment Outline

You will implement these eight functions:

1. **`find_labels`, `count_labels`, `count_words`, `count_label_words`** (the training functions)
2. **`log_prior`**
3. **`log_likelihood`**
4. **`score`**
5. **`predict`**

**General Notes:**

- To test your program as you work, run it from your `data_wrangling` folder:
  - **Mac:** `python3 -m projects.classifier`
  - **Windows:** `python -m projects.classifier`
  - Use the `dataset` and `testing` variables inside `main()` to control which dataset to use and whether testing runs.
- The grader imports your functions and calls them directly. Make sure each function matches the signature shown below.

---

## 0. Get Started

Download `classifier.py` from **Canvas (Files)** and place it in your `projects` folder inside `data_wrangling`. Download one of the datasets from Canvas if you haven't already. Open `classifier.py` in VS Code. The file includes two helper functions, the `main()` function, and stubs for all of the functions you will implement.

Every count ($N$, $N_C$, $N_w$, $N_{C,w}$) will be computed by a function and passed into whichever function needs it next as an argument.

**You will not edit `main()`**, other than the `testing` and `dataset` variables at the top of it.

> What is `main()`?  Using a `main` function as the driver or entrypoint to your program  is a common Python practice. We haven't touched on it heavily, but you will definitely see this in other programs and courses.

**Helper functions:** You are provided with a `read_csv` function which reads in your dataset from the CSV files. You do not have to call this function, it is already called for you inside `main` to produce a table matching the contents of each file. Do not change the `read_csv` function. 

You are also provided with a `unique_words` function which you will use in your implementations. See that `unique_words` returns a list of the distinct words in a string. Consider why we would need a function like this. Do not change the `unique_words` function.

```python
def unique_words(text):
    """Return a list of unique words from a string."""
    words = []
    for word in text.split():
        if word not in words:
            words.append(word)
    return words
```

> Notice the `"""docstring"""` — the text between triple quotes right underneath the function signature. This is another convention we haven't utilized but a docstring gives us a brief description of what a function does or returns. Python style checkers often require a docstring.

---

## 1. Counting Functions for Training

You write four small functions that each take the training `table` and **return** one piece of the count data. `main()` will call all four and hold onto the results.

---

**`find_labels(table)`**

Return a list of every distinct label seen in the training data, in the order they first appear.

**Function signature:**

- **Name:** `find_labels`
- **Arguments:** `table`.
- **Returns:** A `list` of labels, with no duplicates.

**Example usage:**
```
>>> table = [{'label': 'positive', 'content': 'wonderful acting'}, {'label': 'negative', 'content': 'boring acting'}, {'label': 'positive', 'content': 'wonderful movie'}]
>>> find_labels(table)
['positive', 'negative']
```

---

**`count_labels(table)`**

Return $N_C$ for every label: how many training examples belong to each label.

**Function signature:**

- **Name:** `count_labels`
- **Arguments:** `table`.
- **Returns:** A dict mapping each label to its example count.

**Example usage:**
```
>>> table = [{'label': 'positive', 'content': 'wonderful acting'}, {'label': 'negative', 'content': 'boring acting'}, {'label': 'positive', 'content': 'wonderful movie'}]
>>> count_labels(table)
{'positive': 2, 'negative': 1}
```

---

**`count_words(table)`**

Return $N_w$ for every word: how many training examples contain each word, across the whole dataset regardless of label.

**Function signature:**

- **Name:** `count_words`
- **Arguments:** `table`.
- **Returns:** A dict mapping each word to its example count.

**Example usage:**
```
>>> table = [{'label': 'positive', 'content': 'wonderful acting'}, {'label': 'negative', 'content': 'boring acting'}, {'label': 'positive', 'content': 'wonderful movie'}]
>>> count_words(table)
{'wonderful': 2, 'acting': 2, 'boring': 1, 'movie': 1}
```

---

**`count_label_words(table)`**

Return $N_{C,w}$ for every label/word pair: how many examples with each label contain each word.

**Function signature:**

- **Name:** `count_label_words`
- **Arguments:** `table`.
- **Returns:** A nested dict (dict of dicts) where the outer key is a label, the inner key is a word, and the value is a count.

**Example usage:**
```
>>> table = [{'label': 'positive', 'content': 'wonderful acting'}, {'label': 'negative', 'content': 'boring acting'}, {'label': 'positive', 'content': 'wonderful movie'}]
>>> count_label_words(table)
{'positive': {'wonderful': 2, 'acting': 1, 'movie': 1}, 'negative': {'boring': 1, 'acting': 1}}
```

---

## 2. `log_prior`

Return the log-prior for a given label: how common that label is in the training data.

**Function signature:**

- **Name:** `log_prior`
- **Arguments:** `label`, `label_counts`, `n`.
- **Returns:** $\ln P(C) = \ln \dfrac{N_C}{N}$, as a float.

**Example usage:**
```
>>> label_counts = {'positive': 2, 'negative': 2}
>>> n = 4
>>> log_prior("positive", label_counts, n)
-0.6931471805599453
```

---

## 3. `log_likelihood`

Return $\ln P(w \mid C)$ for a single word and label. This measures how strongly that word is associated with that label, and uses three cases to handle words that might be missing from the training data.

**Function signature:**

- **Name:** `log_likelihood`
- **Arguments:** `word`, `label`, `label_counts`, `word_counts`, `label_word_counts`, `n`.
- **Returns:** The log-likelihood as a float.

**Example usage:**
```
>>> label_counts = {'positive': 2, 'negative': 2}
>>> word_counts = {'wonderful': 2, 'acting': 2, 'movie': 2}
>>> label_word_counts = {'positive': {'wonderful': 2, 'acting': 1, 'movie': 1}, 'negative': {'acting': 1, 'movie': 1}}
>>> n = 4
>>> log_likelihood("wonderful", "positive", label_counts, word_counts, label_word_counts, n)
0.0
>>> log_likelihood("wonderful", "negative", label_counts, word_counts, label_word_counts, n)
-0.6931471805599453
```

> **Important:** Never pass `0` to `math.log()`.

`wonderful` never appears in a `negative` example. See the **Making a Prediction** section to see how to handle words that are never seen with a specific label or are never seen throughout our training data. 

> Hint: You should write a conditional statement as part of your `log_likelihood` implementation and it should have three different cases.

---

## 4. `score`

Return the total log-probability score for a piece of text given a label. This is the number the classifier uses to decide which label wins!

$$\ln P(C \mid \text{text}) \approx \ln P(C) + \sum_{w \in \text{text}} \ln P(w \mid C)$$

**Function signature:**

- **Name:** `score`
- **Arguments:** `text`, `label`, `label_counts`, `word_counts`, `label_word_counts`, `n`.
- **Returns:** The log-probability score as a float.

**Example usage:**
```
>>> label_counts = {'positive': 2, 'negative': 2}
>>> word_counts = {'wonderful': 2, 'acting': 2, 'movie': 2}
>>> label_word_counts = {'positive': {'wonderful': 2, 'acting': 1, 'movie': 1}, 'negative': {'acting': 1, 'movie': 1}}
>>> n = 4
>>> score("wonderful acting movie", "positive", label_counts, word_counts, label_word_counts, n)
-2.0794415416798357
>>> score("wonderful acting movie", "negative", label_counts, word_counts, label_word_counts, n)
-2.772588722239781
```

`score` should utilize your `log_prior` and `log_likelihood` functions.

---

## 5. `predict`

Return the predicted label for a piece of text by computing the score for every possible label and returning the one with the highest score.

**Function signature:**

- **Name:** `predict`
- **Arguments:** `text`, `labels`, `label_counts`, `word_counts`, `label_word_counts`, `n`.
- **Returns:** The predicted label as a string. Break ties alphabetically.

**Example usage:**
```
>>> labels = ['positive', 'negative']
>>> label_counts = {'positive': 2, 'negative': 2}
>>> word_counts = {'wonderful': 2, 'acting': 2, 'movie': 2}
>>> label_word_counts = {'positive': {'wonderful': 2, 'acting': 1, 'movie': 1}, 'negative': {'acting': 1, 'movie': 1}}
>>> n = 4
>>> predict("wonderful acting movie", labels, label_counts, word_counts, label_word_counts, n)
'positive'
```

`predict` should utilize your `score` function.

---

## 6. Understanding `main`

`main()` calls your counting functions, prints the training summary, and (if `testing` is `True`) loops over the test data. As part of this loop, `main()` calls `predict` and `score` directly. 

**Training**:

1. Read the training file: `table = read_csv(train_file)`, where `train_file` is built from the `dataset` variable.
2. Compute `n = len(table)`.
3. Call each counting function and hold onto the results: `labels = find_labels(table)`, `label_counts = count_labels(table)`, `word_counts = count_words(table)`, `label_word_counts = count_label_words(table)`.
4. Print the training summary to the **terminal** (see **Output Format** below), using `sorted(labels)` and calling `log_prior(label, label_counts, n)` for each one.

**Testing** (only runs if `testing` is `True`):

1. Read the test file: `test_table = read_csv(test_file)`.
2. Create a counter: `correct = 0`.
3. Open `projects/prediction.txt` for writing — this **overwrites** whatever was in that file from the last run.
4. Loop over `test_table`. Each iteration gives you one test example, and for each one it:
   - Predicts the label: `predicted = predict(text, labels, label_counts, word_counts, label_word_counts, n)`.
   - Scores the prediction: `s = score(text, predicted, label_counts, word_counts, label_word_counts, n)`.
   - Writes the result and content lines **into `prediction.txt`**, not the terminal.
   - Increments `correct` if `predicted == correct_label`.
5. Writes the final `performance: K / N correct` line into `prediction.txt`.

**Example contents of `projects/prediction.txt` after a run:**

```
test data:
correct = positive, predicted = positive, score = -14.2
  content = this movie was absolutely wonderful

correct = negative, predicted = positive, score = -15.8
  content = boring and predictable i fell asleep

performance: 1 / 2 correct
```

---

## Running Your Program

`main()` is written for you. The **only** lines you're allowed to change are the two flags at the top:

```python
def main():
    # You may edit the following flags but nothing else:
    testing = False
    dataset = "movies"

    # The following is provided to you, do not change!
    #___________________________________________________________________
    train_file = f"data/{dataset}/train.csv"
    ...
```

- **`dataset`** must match the name of a dataset folder you downloaded from Canvas into `data/` (e.g. `"movies"` reads from `data/movies/train.csv`).
- **`testing`** controls whether the test loop runs at all. Set it to `True` once you want to see predictions on your test set; leave it `False` if you just want to check the training summary.

Run it from your `data_wrangling` folder:
- **Mac:** `python3 -m projects.classifier`
- **Windows:** `python -m projects.classifier`

> What is `if __name__ == "__main__":`? This is a Python convention which allows us to automatically call main() everytime the file is run.


---

## Submit to Gradescope
Submit `classifier.py` to the P2 assignment on Gradescope. You can use any number of submits to pass all the test cases.
