---
layout: page
title: "Setup"
---

# Setup Guide

This guide walks you through everything you need to do before the course begins. Follow the instructions for your operating system (Windows or macOS).

---

## Before You Begin: Update Your Operating System

Keeping your OS up to date ensures you have the software features Python and VS Code depend on.

**Windows 10/11**
1. Open the **Start Menu** and go to **Settings > Windows Update**.
2. Click **Check for updates** and install anything available.
3. Restart your computer when prompted.

**macOS**
1. Open **System Settings** (or **System Preferences** on older Macs).
2. Click **General > Software Update**.
3. Install any available updates and restart if prompted.

---

## Step 1: Install Python

Python is the programming language we'll use throughout the course.

**Windows**
1. Go to [python.org](https://www.python.org) and click **Downloads**. The site will show a "Download Python for Windows" button — click it.
2. Open the downloaded installer.
3. **Important:** On the first screen, check the box that says **"Add Python to PATH"** before clicking anything else. If you skip this, Python won't work correctly.
4. Click **Install Now** and accept the defaults through the rest of the installer.
5. Click **Close** when it finishes.

**macOS**
1. Go to [python.org](https://www.python.org) and click **Downloads**. The site will show a "Download Python for macOS" button — click it.
2. Open the downloaded `.pkg` file and follow the installer steps (Continue → Agree → Install).
3. Click **Close** when it finishes.

> Once Python is installed, you can verify the version from the VS Code Terminal after opening your course materials.

---

## Step 2: Install Visual Studio Code

Visual Studio Code (VS Code) is the text editor we'll use to write and run Python programs.

**Windows**
1. Go to [code.visualstudio.com](https://code.visualstudio.com) and click **Download for Windows**.
2. Open the installer and accept the license agreement.
3. Click through the defaults until you reach the **Additional Tasks** screen — check **all available boxes**.
4. Click **Install**, then **Finish**.

**macOS**
1. Go to [code.visualstudio.com](https://code.visualstudio.com) and click **Download for Mac**.
2. The download creates a **Visual Studio Code** app in your Downloads folder.
3. Drag the **Visual Studio Code** icon into your **Applications** folder.
4. Open Spotlight Search (`Command + Space`), type **Code**, and open Visual Studio Code. If asked to confirm opening a file downloaded from the internet, click **Open**.

---

## Step 3: Install the Python Extension for VS Code

VS Code needs a Python extension to understand and run Python files.

1. Open VS Code.
2. Click the **Extensions** icon in the left sidebar (it looks like four squares).
3. Search for **Python** (by Microsoft).
4. Click **Install**.

---

## Step 4: Get Your Course Materials

1. Download the course zip file from **Canvas**. It will be called `data_wrangling.zip`.
2. Find the downloaded file and **unzip/extract** it:
   - **Windows:** Right-click the file and select **Extract All…**, then click **Extract**.
   - **macOS:** Double-click the file — it extracts automatically into a folder called `data_wrangling`.
3. Open VS Code. Go to **File > Open Folder…** and select the `data_wrangling` folder you just extracted.
4. If VS Code asks "Do you trust the authors of the files in this folder?", click **Yes, I trust the authors**.

You should now see the `data_wrangling` folder open in the left sidebar of VS Code.

---

## You're All Set!

Your environment is ready for Data Wrangling. When you come back to work on the course, open VS Code and go to **File > Open Recent** and select `data_wrangling` to pick up where you left off.

When you're ready, head over to the [P0 writeup](hello.html) to write your first program.
