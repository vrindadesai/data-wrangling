---
layout: page
title: "P0: Hello World"
---

# Hello World — P0

Before you dive into writing programs that process real data, let's make sure everything is working by writing the simplest possible program: one that prints a message to the screen.

This is also a tradition in programming — the very first program people write in a new language is almost always a "Hello World." It's a quick sanity check that your setup is working and your code runs.

---

## 0. Prerequisites

Before continuing, make sure you have completed the setup guide:

- Python is installed
- Visual Studio Code is installed with the Python extension
- Your `data_wrangling` folder is open in VS Code

If you are unsure about any of these steps, revisit the [setup guide](setup.html) before continuing.

---

## 1. Create Your File

In Visual Studio Code, make sure your `data_wrangling` folder is open in the Explorer sidebar.

Right-click on the `projects` folder and select **New File**. Name it exactly:

```
hello_world.py
```

An empty file will open in the editor. The `.py` extension tells VS Code (and Python) that this is a Python program.

---

## 2. Write Your Program

In your empty `hello_world.py` file, write the following line of code:

```
print("Hello, world.")
```

Save the file (`Control+S` on Windows, `Command+S` on Mac).

---

## 3. Run Your Program

Open the VS Code terminal: **View → Terminal**.

Make sure you are in the `data_wrangling` directory. Then run your program with the following command:

- **Mac:** `python3 -m projects.hello_world`
- **Windows:** `python -m projects.hello_world`

You should see this printed in the terminal:

```
Hello, world.
```

If you see an error, double-check that:
- The filename is exactly `hello_world.py` (lowercase, underscore, no spaces)
- The file is saved inside the `projects` folder
- The `print` line matches exactly, including the quotes and parentheses

---

## 4. Experiment

Try changing the text inside the double quotes to something else — for example:

```
print("Hello, Data Wrangling!")
```

Save the file and run the command again. You should see your new message. This is the core loop of programming: write, save, run, observe.

When you're done experimenting, change it back to `"Hello, world."` before submitting.

---

## 5. What Is This Code Doing?

- `print` is a built-in Python **function** — it displays output to the terminal.
- The parentheses `()` pass information to the function — in this case, the text you want to print.
- The text inside the quotes is called a **string**, a sequence of characters.

You'll learn much more about functions and strings in the coming lessons. For now, just appreciate that one line of code can produce visible output — that's the foundation everything else builds on.

---

## Submit to Gradescope

Submit your `hello_world.py` file to the P0 assignment in Gradescope. You can use any number of submits to pass all the test cases.
