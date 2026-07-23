---
layout: page
title: "P3: Dataset Descriptions"
---

# Dataset Descriptions

Each dataset below has a `train.csv` and a `test.csv`. Download the one you want from Canvas and place the entire folder containing the 2 files inside your `data` folder — see [Dataset Selection](classifier.html#dataset-selection) in the P3 writeup.

---

## Banned Books 📚

Descriptions for books which are either uncensored or censored, challenged, and banned.

- **Labels:** `uncensored`, `banned`
- **Columns:** `author`,`title`,`content`,`label`
- **Size:** ~13,800 training rows, 3,500 test rows


---

## Disaster Tweets 🌪️

Tweets which either describe real disasters (hurricanes, floods, fires, etc.) or non-real disasters.

- **Labels:** `disaster-related`, `non-disaster`
- **Columns:** `label`, `content`
- **Size:** ~34,800 training rows, 8,700 test rows

---

## McDonald's Reviews 🍔

Customer reviews of McDonald's locations.

- **Labels:** `horrible`, `bad`, `okay`, `good`, `great` (5 rating levels)
- **Columns:** `label`, `text` — note the text column is named `text`, not `content`
- **Size:** ~26,500 training rows, 6,600 test rows

---

## Song Genres 🎶

Song lyrics labeled by genre.

- **Labels:** `rap`, `pop`, `rock`, `country`, `rb`
- **Columns:** `tag`, `artist`, `title`, `lyrics`
- **Size:** ~13,600 training rows, 3,200 test rows

---

## Movie Reviews 🍿

Movie reviews labeled by sentiment.

- **Labels:** `positive`, `negative`
- **Columns:** `label`, `content`
- **Size:** ~40,000 training rows, 10,000 test rows