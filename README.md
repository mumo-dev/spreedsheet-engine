# spreedsheet engine implementation

The implementation provides the below interface
```
class engine.Spreadsheet()
    Spreadsheet engine.

    engine.Spreadsheet.getFormatted(index)
    Get the evaluated and formatted value at the given cell index.

    Arguments:	
    index (models.Index) – cell to evaluate
    Returns:	
    String – the cell value, evaluated (if a formula) and formatted according to the format set with setFormat.

    engine.Spreadsheet.getRaw(index)
    Get the raw text that the user entered into the given cell.

    Arguments:	
    index (models.Index) – the cell to fetch
    Returns:	
    String – the raw most recently set with set.

    engine.Spreadsheet.set(index, raw)
    Set the value at the given cell.

    Arguments:	
    index (models.Index) – the cell to set
    raw (String) – the value of the cell
    engine.Spreadsheet.setFormat(index, type, spec)
    Set the format string for a given cell.

    Arguments:	
    index (models.Index) – the cell to format
    type (String) – the type of format–’default’, ‘number’ or ‘date’
spec (null|Intl.NumberFormat|Intl.DateTimeFormat) – an instance of the appropriate type of formatter to use on the cell.
```

The engine is able to parse formulae eg A1 + sqrt(A2 + A3), sum(A1:A2, A3, A4),  evaluate cell references before storing the values, evaluate operators and functions etc.
The cell references are also updated recursively incase of updates to the values.
The implementation provides extensible interface that makes it easy to add new datatypes, operators and functions.
