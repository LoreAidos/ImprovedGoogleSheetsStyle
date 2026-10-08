const RESIZE_CELLS = true;

// Google Sheets default dimensions
const DEFAULT_ROW_HEIGHT = 21;
const DEFAULT_COLUMN_WIDTH = 100;

// How much to enlarge each dimension
const ROW_MULTIPLIER = 1.5;
const COLUMN_MULTIPLIER = 1.5;


function onOpen() {
  applyStyle();

  if (RESIZE_CELLS) {
    resizeSheet();
  }
}

// RESIZE CELLS

function resizeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const usedRange = sheet.getDataRange();
  const rowCount = usedRange.getLastRow();
  const columnCount = usedRange.getLastColumn();
  const newRowHeight = Math.round(
    DEFAULT_ROW_HEIGHT * ROW_MULTIPLIER
  );
  const newColumnWidth = Math.round(
    DEFAULT_COLUMN_WIDTH * COLUMN_MULTIPLIER
  );

  if (rowCount > 0 && sheet.getRowHeight(1) !== newRowHeight) {
    sheet.setRowHeights(1, rowCount, newRowHeight);
  }

  if (columnCount > 0 && sheet.getColumnWidth(1) !== newColumnWidth) {
    sheet.setColumnWidths(1, columnCount, newColumnWidth);
  }
}

// STYLE

function applyStyle() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const tables = findTables(values);
  const range = sheet.getRange(
    1,
    1,
    values.length,
    values[0].length
  );

  range.setBackground("#05283b");
  range.setFontFamily("Exo 2");
  range.setFontColor("#89eef0");

  for (const table of tables) {
    const tableRows = table.endRow - table.startRow + 1;
    const tableColumns = table.endCol - table.startCol + 1;
    const tableRange = sheet.getRange(
      table.startRow + 1,
      table.startCol + 1,
      tableRows,
      tableColumns
    );
    const headerRange = sheet.getRange(
      table.startRow + 1,
      table.startCol + 1,
      1,
      tableColumns
    );

    tableRange.setBorder(
      true,
      true,
      true,
      true,
      false,
      false,
      "#288f8d",
      SpreadsheetApp.BorderStyle.SOLID_MEDIUM
    );

    headerRange
      .setBackground("#010c12")
      .setFontColor("#8dd7e3")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
  }
}

// FIND TABLES

function findTables(values) {
  const tables = [];
  const checkedCells = new Set();

  for (let row = 0; row < values.length - 1; row++) {
    for (let col = 0; col < values[row].length - 1; col++) {
      const cellKey = `${row},${col}`;

      if (checkedCells.has(cellKey)) {
        continue;
      }

      if (!hasValue(values[row][col]) || !hasValue(values[row + 1][col])) {
        continue;
      }

      let endCol = col;

      while (
        endCol + 1 < values[row].length &&
        hasValue(values[row][endCol + 1])
      ) {
        endCol++;
      }

      if (endCol === col) {
        continue;
      }

      let endRow = row + 1;

      for (let r = row + 2; r < values.length; r++) {
        let rowHasContent = false;

        for (let c = col; c <= endCol; c++) {
          if (hasValue(values[r][c])) {
            rowHasContent = true;
            break;
          }
        }

        if (!rowHasContent) {
          break;
        }

        endRow = r;
      }

      tables.push({
        startRow: row,
        startCol: col,
        endRow: endRow,
        endCol: endCol
      });

      for (let r = row; r <= endRow; r++) {
        for (let c = col; c <= endCol; c++) {
          checkedCells.add(`${r},${c}`);
        }
      }
    }
  }

  return tables;
}

function hasValue(value) {
  return value !== "" && value !== null;
}
