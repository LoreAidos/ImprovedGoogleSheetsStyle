# ImprovedGoogleSheetsStyle
This simple script makes Google Sheets easier to read with a dark theme, clearer table headers, and bigger rows and columns. It’s an alternative to Google Sheets’ built-in Tables feature if you find it hard to use, dislike its small action buttons or prominent header, or want more control over header options.


## **Install**

1. Open your Google Sheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with the code from [`Code.gs`](Code.gs), then save.
3. Reload the spreadsheet and approve the requested permissions the first time it runs.

You no longer need to use Google Sheets’ built-in Tables feature. Just enter your data in the cells, then reload the sheet to apply the new table style, including its outline and background.

The script runs on the active sheet whenever the spreadsheet opens. It formats the populated area and looks for tables with a filled header row and at least one following row containing data. Set `RESIZE_CELLS` to `false` near the top of the code to turn off automatic resizing.

## Change the font and colors

In `Code.gs`, change the font name on **line 57** (`"Exo 2"`). The color hex codes are in the style settings: **line 56** for the sheet background, **line 58** for the main text, **line 83** for table borders, and **lines 88–89** for the table header background and text. Replace a hex code (such as `"#05283b"`) with the color you want, keeping the quotation marks. Line numbers may shift if you edit the code.
